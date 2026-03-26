import type { ReportingAnswers, CostBreakdown, Sector, RevenueRange } from "../../types/audit";
import {
  COUT_HORAIRE_CHARGE,
  COEFFICIENT_MAUVAISE_DECISION,
  FREQUENCE_ANNUELLE,
  REVENUE_RANGES,
} from "../constants";

export function calculateReporting(
  answers: ReportingAnswers,
  _sector: Sector,
  revenueRange: RevenueRange
) {
  const caAnnuel = REVENUE_RANGES.find((r) => r.value === revenueRange)?.midpoint ?? 300000;
  const frequence = FREQUENCE_ANNUELLE[answers.frequence];

  if (frequence === 0) {
    return { annualCost: 0, costBreakdown: [] as CostBreakdown };
  }

  const coutCompilation =
    answers.tempsParReporting * frequence * COUT_HORAIRE_CHARGE[answers.quiCompile];

  const coeff = COEFFICIENT_MAUVAISE_DECISION[answers.nbSources];
  const coutDecision = coeff * caAnnuel * 0.02;

  const annualCost = Math.round(coutCompilation + coutDecision);

  const costBreakdown: CostBreakdown = [
    {
      label: `${answers.tempsParReporting}h x ${frequence} reportings/an de compilation`,
      amount: Math.round(coutCompilation),
    },
    {
      label: `Impact estimé des décisions sans données fiables`,
      amount: Math.round(coutDecision),
    },
  ];

  return { annualCost, costBreakdown };
}
