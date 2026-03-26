import type { FacturationAnswers, CostBreakdown, Sector, RevenueRange } from "../../types/audit";
import {
  COUT_HORAIRE_CHARGE,
  TAUX_ERREUR_FACTURATION,
  MONTANT_MOYEN_FACTURE,
} from "../constants";

export function calculateFacturation(
  answers: FacturationAnswers,
  sector: Sector,
  _revenueRange: RevenueRange
) {
  const coutHoraire = COUT_HORAIRE_CHARGE["moyen"];
  const tempsHeures = answers.tempsParFacture / 60;

  const coutSaisie = answers.nbFactures * tempsHeures * 12 * coutHoraire;

  const tauxErreur = TAUX_ERREUR_FACTURATION[answers.tauxErreur];
  const montantMoyen = MONTANT_MOYEN_FACTURE[sector];
  // Coût réel d'une erreur : avoir, correction, relance (≈2% du montant facturé)
  const coutErreurs = answers.nbFactures * tauxErreur * montantMoyen * 12 * 0.02;

  const annualCost = Math.round(coutSaisie + coutErreurs);

  const costBreakdown: CostBreakdown = [
    {
      label: `${answers.nbFactures} factures/mois x ${answers.tempsParFacture}min de saisie`,
      amount: Math.round(coutSaisie),
    },
    {
      label: `Erreurs de facturation (taux estimé ${Math.round(tauxErreur * 100)}%)`,
      amount: Math.round(coutErreurs),
    },
  ];

  return { annualCost, costBreakdown };
}
