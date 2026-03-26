export type Sector =
  | "services_conseil"
  | "formation"
  | "agence"
  | "commerce"
  | "btp"
  | "industrie"
  | "sante"
  | "autre";

export type RevenueRange = "<500K" | "500K-1M" | "1-3M" | "3-10M" | ">10M";

export type ProcessId =
  | "relances"
  | "reporting"
  | "facturation"
  | "commercial"
  | "onboarding"
  | "admin";

export type RelancesAnswers = {
  nbFactures: number;
  delaiPaiement: "30j" | "45j" | "60j" | "90j+";
  quiGere: "dirigeant" | "assistant" | "comptable" | "personne";
  outilActuel: "excel" | "logiciel_comptable" | "rien";
};

export type ReportingAnswers = {
  frequence: "hebdo" | "mensuel" | "trimestriel" | "jamais";
  nbSources: "1-2" | "3-5" | "6+";
  tempsParReporting: number;
  quiCompile: "dirigeant" | "daf_raf" | "assistant" | "chacun";
};

export type FacturationAnswers = {
  nbFactures: number;
  tempsParFacture: number;
  tauxErreur: "rare" | "1_sur_10" | "1_sur_5" | "frequent";
  outilActuel: "excel" | "word" | "logiciel_dedie" | "erp";
};

export type CommercialAnswers = {
  nbLeads: number;
  tempsContact: "< 1h" | "< 24h" | "24-48h" | "> 48h" | "variable";
  tauxConversion: "< 5%" | "5-15%" | "15-30%" | "> 30%";
  outilCrm: "aucun" | "excel" | "crm_dedie" | "notes_emails";
};

export type OnboardingAnswers = {
  nbRecrutements: number;
  dureeOnboarding: "1_sem" | "2_sem" | "1_mois" | "> 1_mois";
  nbEtapes: "< 5" | "5-15" | "> 15";
  quiCoordonne: "rh" | "manager" | "nouveau" | "pas_de_process";
};

export type AdminAnswers = {
  nbPersonnes: number;
  heuresJour: number;
  typeTaches: "saisie" | "copier_coller" | "emails" | "maj_fichiers";
  outilsPrincipaux: "excel" | "google_sheets" | "erp" | "multiples";
};

export type ProcessAnswers =
  | RelancesAnswers
  | ReportingAnswers
  | FacturationAnswers
  | CommercialAnswers
  | OnboardingAnswers
  | AdminAnswers;

export type CostBreakdown = {
  label: string;
  amount: number;
}[];

export type RadarScores = Record<ProcessId, { score: number; locked: boolean }>;

export type AuditResult = {
  annualCost: number;
  costBreakdown: CostBreakdown;
  radarScores: RadarScores;
  suggestedStack: string[];
  automationMonthlyCost: number;
  roiWeeks: number;
};

export type AuditState = {
  step: number;
  sector: Sector | null;
  teamSize: number;
  avgGrossSalary: number;
  revenueRange: RevenueRange | null;
  selectedProcess: ProcessId | null;
  answers: ProcessAnswers | null;
  result: AuditResult | null;
};

export type LeadFormData = {
  firstName: string;
  email: string;
  phone: string;
  companyName: string;
  consentRgpd: boolean;
};
