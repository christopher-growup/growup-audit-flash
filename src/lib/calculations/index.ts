import type { ProcessId, ProcessAnswers, Sector, RevenueRange, AuditResult, RadarScores } from "../../types/audit";
import { calculateRelances } from "./relances";
import { calculateReporting } from "./reporting";
import { calculateFacturation } from "./facturation";
import { calculateCommercial } from "./commercial";
import { calculateOnboarding } from "./onboarding";
import { calculateAdmin } from "./admin";
import { SUGGESTED_STACKS, AUTOMATION_MONTHLY_COST, PROCESSES } from "../constants";

const calculators: Record<ProcessId, (answers: any, sector: Sector, revenue: RevenueRange) => { annualCost: number; costBreakdown: { label: string; amount: number }[] }> = {
  relances: calculateRelances,
  reporting: calculateReporting,
  facturation: calculateFacturation,
  commercial: calculateCommercial,
  onboarding: calculateOnboarding,
  admin: calculateAdmin,
};

// Coût horaire chargé à partir du salaire brut mensuel
// Formule : brut * 12 * 1.45 (charges patronales) / 1607 (heures légales/an)
export function hourlyChargedRate(grossMonthlySalary: number): number {
  return (grossMonthlySalary * 12 * 1.45) / 1607;
}

export function calculateProcess(
  processId: ProcessId,
  answers: ProcessAnswers,
  sector: Sector,
  revenueRange: RevenueRange,
  avgGrossSalary: number = 3000
): AuditResult {
  // Calculer le ratio de scaling basé sur le salaire réel vs le défaut (40€/h)
  const realHourlyRate = hourlyChargedRate(avgGrossSalary);
  const defaultHourlyRate = 40;
  const salaryRatio = realHourlyRate / defaultHourlyRate;

  const raw = calculators[processId](answers, sector, revenueRange);

  // Appliquer le ratio salarial aux coûts
  const annualCost = Math.round(raw.annualCost * salaryRatio);
  const costBreakdown = raw.costBreakdown.map((item) => ({
    ...item,
    amount: Math.round(item.amount * salaryRatio),
  }));

  const automationMonthlyCost = AUTOMATION_MONTHLY_COST[processId];
  const automationAnnualCost = automationMonthlyCost * 12;
  const roiWeeks = annualCost > 0 ? Math.max(1, Math.round((automationAnnualCost / annualCost) * 52)) : 0;

  const selectedScore = annualCost > 50000 ? 1 : annualCost > 20000 ? 2 : annualCost > 5000 ? 3 : 4;

  const radarScores: RadarScores = {} as RadarScores;
  for (const p of PROCESSES) {
    radarScores[p.id] = {
      score: p.id === processId ? selectedScore : 0,
      locked: p.id !== processId,
    };
  }

  return {
    annualCost,
    costBreakdown,
    radarScores,
    suggestedStack: SUGGESTED_STACKS[processId],
    automationMonthlyCost,
    roiWeeks,
  };
}
