import type { OnboardingAnswers, CostBreakdown, Sector, RevenueRange } from "../../types/audit";
import { COUT_HORAIRE_CHARGE, SEMAINES_SOUS_OPTIMAL } from "../constants";

export function calculateOnboarding(
  answers: OnboardingAnswers,
  _sector: Sector,
  _revenueRange: RevenueRange
) {
  const heuresAdminParOnboarding = { "< 5": 8, "5-15": 20, "> 15": 40 }[answers.nbEtapes];

  const coutAdmin =
    answers.nbRecrutements *
    heuresAdminParOnboarding *
    COUT_HORAIRE_CHARGE[answers.quiCoordonne];

  const semainesSousOptimal = SEMAINES_SOUS_OPTIMAL[answers.dureeOnboarding];
  const salaireHebdoMoyen = COUT_HORAIRE_CHARGE["moyen"] * 35;
  const coutProductivite =
    answers.nbRecrutements * semainesSousOptimal * salaireHebdoMoyen * 0.5;

  const annualCost = Math.round(coutAdmin + coutProductivite);

  const costBreakdown: CostBreakdown = [
    {
      label: `${heuresAdminParOnboarding}h d'admin x ${answers.nbRecrutements} recrutements/an`,
      amount: Math.round(coutAdmin),
    },
    {
      label: `${semainesSousOptimal} semaines de productivité réduite par recrue`,
      amount: Math.round(coutProductivite),
    },
  ];

  return { annualCost, costBreakdown };
}
