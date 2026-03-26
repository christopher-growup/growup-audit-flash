import type { CommercialAnswers, CostBreakdown, Sector, RevenueRange } from "../../types/audit";
import {
  COUT_HORAIRE_CHARGE,
  TAUX_PERTE_PAR_DELAI,
  PANIER_MOYEN,
  TEMPS_SUIVI_PAR_LEAD_HEURES,
} from "../constants";

// Taux de conversion moyen par tranche déclarée (pour pondérer le manque à gagner)
const CONVERSION_MIDPOINT: Record<string, number> = {
  "< 5%": 0.03,
  "5-15%": 0.10,
  "15-30%": 0.22,
  "> 30%": 0.35,
};

// On ne compte que la marge nette perdue, pas le CA brut
const TAUX_MARGE_NETTE = 0.25;

export function calculateCommercial(
  answers: CommercialAnswers,
  sector: Sector,
  _revenueRange: RevenueRange
) {
  const tauxPerte = TAUX_PERTE_PAR_DELAI[answers.tempsContact];
  const conversion = CONVERSION_MIDPOINT[answers.tauxConversion] ?? 0.10;
  const leadsPerdus = answers.nbLeads * tauxPerte;

  // Manque à gagner = leads perdus * probabilité de conversion * panier * marge nette * 12 mois
  const manqueAGagner = leadsPerdus * conversion * PANIER_MOYEN[sector] * TAUX_MARGE_NETTE * 12;

  const tempsSuivi = TEMPS_SUIVI_PAR_LEAD_HEURES[answers.outilCrm];
  const coutSuiviManuel = answers.nbLeads * tempsSuivi * COUT_HORAIRE_CHARGE["moyen"] * 12;

  const annualCost = Math.round(manqueAGagner + coutSuiviManuel);

  const costBreakdown: CostBreakdown = [
    {
      label: `~${Math.round(leadsPerdus)} leads/mois perdus → marge nette manquée`,
      amount: Math.round(manqueAGagner),
    },
    {
      label: `Suivi manuel (${tempsSuivi}h/lead x ${answers.nbLeads} leads/mois)`,
      amount: Math.round(coutSuiviManuel),
    },
  ];

  return { annualCost, costBreakdown };
}
