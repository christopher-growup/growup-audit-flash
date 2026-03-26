import type { ProcessId, Sector } from "../types/audit";

export const SECTORS: { value: Sector; label: string }[] = [
  { value: "services_conseil", label: "Services / Conseil" },
  { value: "formation", label: "Formation" },
  { value: "agence", label: "Agence" },
  { value: "commerce", label: "Commerce" },
  { value: "btp", label: "BTP" },
  { value: "industrie", label: "Industrie" },
  { value: "sante", label: "Santé" },
  { value: "autre", label: "Autre" },
];

export const REVENUE_RANGES = [
  { value: "<500K" as const, label: "< 500K €", midpoint: 300000 },
  { value: "500K-1M" as const, label: "500K - 1M €", midpoint: 750000 },
  { value: "1-3M" as const, label: "1 - 3M €", midpoint: 2000000 },
  { value: "3-10M" as const, label: "3 - 10M €", midpoint: 6500000 },
  { value: ">10M" as const, label: "> 10M €", midpoint: 15000000 },
];

export const PROCESSES: {
  id: ProcessId;
  title: string;
  tagline: string;
  icon: string;
}[] = [
  {
    id: "relances",
    title: "Relances & recouvrement",
    tagline: "Vos factures dorment, votre trésorerie souffre",
    icon: "receipt",
  },
  {
    id: "reporting",
    title: "Reporting & pilotage",
    tagline: "Vous pilotez à l'aveugle ou dans Excel",
    icon: "bar-chart-3",
  },
  {
    id: "facturation",
    title: "Facturation",
    tagline: "Chaque facture est un parcours du combattant",
    icon: "file-text",
  },
  {
    id: "commercial",
    title: "Gestion commerciale",
    tagline: "Vos prospects tombent entre les mailles",
    icon: "users",
  },
  {
    id: "onboarding",
    title: "Onboarding",
    tagline: "Chaque nouveau collaborateur coûte 3 semaines",
    icon: "user-plus",
  },
  {
    id: "admin",
    title: "Admin & saisie",
    tagline: "Votre équipe copie-colle sa journée",
    icon: "clipboard",
  },
];

export const COUT_HORAIRE_CHARGE: Record<string, number> = {
  dirigeant: 85,
  daf_raf: 55,
  assistant: 35,
  comptable: 45,
  manager: 50,
  rh: 45,
  nouveau: 25,
  chacun: 40,
  pas_de_process: 40,
  moyen: 40,
};

export const TAUX_RELANCE_ESTIME: Record<Sector, number> = {
  services_conseil: 0.35,
  formation: 0.4,
  agence: 0.25,
  commerce: 0.3,
  btp: 0.45,
  industrie: 0.35,
  sante: 0.2,
  autre: 0.3,
};

export const TEMPS_MOYEN_PAR_RELANCE_HEURES: Record<string, number> = {
  excel: 0.5,
  logiciel_comptable: 0.25,
  rien: 0.75,
};

export const TAUX_PERTE_PAR_DELAI: Record<string, number> = {
  "< 1h": 0.1,
  "< 24h": 0.3,
  "24-48h": 0.55,
  "> 48h": 0.78,
  variable: 0.5,
};

export const PANIER_MOYEN: Record<Sector, number> = {
  services_conseil: 5000,
  formation: 3000,
  agence: 8000,
  commerce: 2000,
  btp: 15000,
  industrie: 10000,
  sante: 4000,
  autre: 5000,
};

export const TEMPS_SUIVI_PAR_LEAD_HEURES: Record<string, number> = {
  aucun: 1.0,
  excel: 0.75,
  crm_dedie: 0.3,
  notes_emails: 0.5,
};

export const COEFFICIENT_MAUVAISE_DECISION: Record<string, number> = {
  "1-2": 0.01,
  "3-5": 0.02,
  "6+": 0.035,
};

export const FREQUENCE_ANNUELLE: Record<string, number> = {
  hebdo: 52,
  mensuel: 12,
  trimestriel: 4,
  jamais: 0,
};

export const TAUX_ERREUR_FACTURATION: Record<string, number> = {
  rare: 0.02,
  "1_sur_10": 0.1,
  "1_sur_5": 0.2,
  frequent: 0.35,
};

export const MONTANT_MOYEN_FACTURE: Record<Sector, number> = {
  services_conseil: 3500,
  formation: 2000,
  agence: 5000,
  commerce: 500,
  btp: 8000,
  industrie: 6000,
  sante: 1500,
  autre: 3000,
};

export const SEMAINES_SOUS_OPTIMAL: Record<string, number> = {
  "1_sem": 1,
  "2_sem": 2,
  "1_mois": 4,
  "> 1_mois": 8,
};

export const SUGGESTED_STACKS: Record<ProcessId, string[]> = {
  relances: ["Make", "Tiime", "Gmail", "Notion"],
  reporting: ["Make", "Google Sheets", "Notion", "Looker Studio"],
  facturation: ["Make", "Tiime", "Notion"],
  commercial: ["n8n", "Notion CRM", "Gmail", "Brevo"],
  onboarding: ["Make", "Notion", "Google Drive", "Gmail"],
  admin: ["n8n", "Google Sheets", "Notion", "Slack"],
};

export const AUTOMATION_MONTHLY_COST: Record<ProcessId, number> = {
  relances: 45,
  reporting: 35,
  facturation: 30,
  commercial: 55,
  onboarding: 40,
  admin: 50,
};

export const ESTIMATED_SCORES: Record<Sector, Record<ProcessId, number>> = {
  services_conseil: { relances: 2.5, reporting: 2, facturation: 3, commercial: 2, onboarding: 3, admin: 2 },
  formation: { relances: 2, reporting: 1.5, facturation: 2.5, commercial: 2, onboarding: 2, admin: 1.5 },
  agence: { relances: 3, reporting: 2.5, facturation: 3.5, commercial: 1.5, onboarding: 2.5, admin: 2 },
  commerce: { relances: 2, reporting: 2, facturation: 2, commercial: 2.5, onboarding: 3, admin: 1.5 },
  btp: { relances: 1.5, reporting: 1.5, facturation: 2, commercial: 2, onboarding: 2, admin: 1.5 },
  industrie: { relances: 2, reporting: 2, facturation: 2.5, commercial: 2.5, onboarding: 2, admin: 2 },
  sante: { relances: 3, reporting: 2, facturation: 2, commercial: 3, onboarding: 2, admin: 2 },
  autre: { relances: 2.5, reporting: 2, facturation: 2.5, commercial: 2.5, onboarding: 2.5, admin: 2 },
};
