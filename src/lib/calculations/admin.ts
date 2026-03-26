import type { AdminAnswers, CostBreakdown, Sector, RevenueRange } from "../../types/audit";
import { COUT_HORAIRE_CHARGE } from "../constants";

export function calculateAdmin(
  answers: AdminAnswers,
  _sector: Sector,
  _revenueRange: RevenueRange
) {
  const annualCost =
    answers.nbPersonnes * answers.heuresJour * 220 * COUT_HORAIRE_CHARGE["moyen"];

  const costBreakdown: CostBreakdown = [
    {
      label: `${answers.nbPersonnes} personnes x ${answers.heuresJour}h/jour x 220 jours ouvrés`,
      amount: annualCost,
    },
  ];

  return { annualCost, costBreakdown };
}
