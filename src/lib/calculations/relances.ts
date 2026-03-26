import type { RelancesAnswers, CostBreakdown, Sector, RevenueRange } from "../../types/audit";
import {
  COUT_HORAIRE_CHARGE,
  TAUX_RELANCE_ESTIME,
  TEMPS_MOYEN_PAR_RELANCE_HEURES,
  REVENUE_RANGES,
} from "../constants";

export function calculateRelances(
  answers: RelancesAnswers,
  sector: Sector,
  revenueRange: RevenueRange
) {
  const caMensuel =
    (REVENUE_RANGES.find((r) => r.value === revenueRange)?.midpoint ?? 300000) / 12;

  const delaiJours = { "30j": 30, "45j": 45, "60j": 60, "90j+": 90 }[answers.delaiPaiement];

  const tempsRelanceMensuel =
    answers.nbFactures *
    TAUX_RELANCE_ESTIME[sector] *
    TEMPS_MOYEN_PAR_RELANCE_HEURES[answers.outilActuel];

  const coutTemps = tempsRelanceMensuel * COUT_HORAIRE_CHARGE[answers.quiGere];

  const impactTresorerie =
    delaiJours > 30 ? (caMensuel * (delaiJours - 30)) / 365 * 0.05 : 0;

  const annualCost = Math.round((coutTemps + impactTresorerie) * 12);

  const costBreakdown: CostBreakdown = [
    {
      label: `${Math.round(tempsRelanceMensuel)}h/mois de temps perdu en relances`,
      amount: Math.round(coutTemps * 12),
    },
    {
      label: `Trésorerie immobilisée (délai ${delaiJours}j vs 30j)`,
      amount: Math.round(impactTresorerie * 12),
    },
  ];

  return { annualCost, costBreakdown };
}
