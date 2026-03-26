# Audit Flash Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a 5-screen interactive web app that calculates operational cost leaks for PME executives and captures qualified leads for Grow Up Consulting's CLEAR UP offer.

**Architecture:** Single-page React app with step-based navigation (no router needed). All calculations run client-side. On form submission, data is inserted into Supabase which triggers an n8n workflow for PDF generation, Brevo email, and Notion CRM entry.

**Tech Stack:** React 19, Vite 7, Tailwind 4, Framer Motion, Recharts, Supabase, n8n, Brevo API, Notion API

**Spec:** `docs/superpowers/specs/2026-03-26-audit-flash-design.md`

**Post-plan manual steps (not in tasks — require UI configuration):**
- **Supabase:** Create dedicated instance, run `supabase/schema.sql`, configure Database Webhook on `audit_leads` INSERT
- **n8n:** Build workflow "Audit Flash — New Lead" (webhook trigger → generate PDF → send via Brevo → create Notion CRM entry → update Supabase pdf_sent)
- **Brevo:** Create email template for audit report delivery
- **DNS:** Add A/CNAME record for `audit.growup-consulting.fr` pointing to VPS
- **SSL:** Run `certbot --nginx -d audit.growup-consulting.fr`
- **Calendly:** Confirm booking link URL and update in LeadCapture component

---

## Task 1: Project scaffolding & configuration

**Files:**
- Create: `GrowUp_Lead_magnet/package.json`
- Create: `GrowUp_Lead_magnet/vite.config.ts`
- Create: `GrowUp_Lead_magnet/tsconfig.json`
- Create: `GrowUp_Lead_magnet/tsconfig.app.json`
- Create: `GrowUp_Lead_magnet/index.html`
- Create: `GrowUp_Lead_magnet/src/main.tsx`
- Create: `GrowUp_Lead_magnet/src/App.tsx`
- Create: `GrowUp_Lead_magnet/src/index.css`
- Create: `GrowUp_Lead_magnet/.env.example`
- Create: `GrowUp_Lead_magnet/.gitignore`

- [ ] **Step 1: Initialize the project with Vite**

```bash
cd "/Users/growupconsulting/Documents/Grow Up Consulting/growup-hub/GrowUp_Lead_magnet"
npm create vite@latest . -- --template react-ts
```

Expected: Vite scaffolds files. Say "y" if it asks to overwrite since the directory has only docs/.

- [ ] **Step 2: Install dependencies**

```bash
cd "/Users/growupconsulting/Documents/Grow Up Consulting/growup-hub/GrowUp_Lead_magnet"
npm install @supabase/supabase-js framer-motion recharts lucide-react
npm install -D tailwindcss @tailwindcss/vite vitest @testing-library/react @testing-library/jest-dom jsdom
```

- [ ] **Step 3: Configure Vite with Tailwind**

Replace `vite.config.ts` with:

```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/test-setup.ts",
  },
});
```

- [ ] **Step 4: Create test setup file**

Create `src/test-setup.ts`:

```ts
import "@testing-library/jest-dom/vitest";
```

- [ ] **Step 5: Configure Tailwind with custom theme in index.css**

Replace `src/index.css` with:

```css
@import "tailwindcss";

@theme {
  /* Midnight Blue palette */
  --color-midnight-lightest: #e5eaef;
  --color-midnight-lighter: #ccd6e0;
  --color-midnight-light: #4c7093;
  --color-midnight: #003366;
  --color-midnight-dark: #002851;
  --color-midnight-darker: #001428;
  --color-midnight-darkest: #000f1e;

  /* Fire Bush palette */
  --color-fire-lightest: #fcf4eb;
  --color-fire-lighter: #f9e9d7;
  --color-fire-light: #ebb475;
  --color-fire: #e3943b;
  --color-fire-dark: #b5762f;
  --color-fire-darkest: #442c11;

  /* Neutral */
  --color-neutral-darkest: #0b0705;

  /* Fonts */
  --font-sans: "DM Sans", system-ui, sans-serif;
  --font-mono: "Space Mono", ui-monospace, monospace;
}

@layer base {
  body {
    @apply bg-midnight-darkest text-midnight-lightest font-sans antialiased;
  }
}
```

- [ ] **Step 6: Create minimal App.tsx**

Replace `src/App.tsx` with:

```tsx
export default function App() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <h1 className="text-4xl font-bold text-fire">Audit Flash</h1>
    </div>
  );
}
```

- [ ] **Step 7: Update main.tsx**

Replace `src/main.tsx` with:

```tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

- [ ] **Step 8: Add Google Fonts to index.html**

In `index.html`, add inside `<head>`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet" />
<title>Audit Flash — Grow Up Consulting</title>
```

- [ ] **Step 9: Create .env.example**

Create `.env.example`:

```
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

- [ ] **Step 10: Update .gitignore**

Ensure `.gitignore` contains:

```
node_modules
dist
.env
.env.local
```

- [ ] **Step 11: Verify dev server starts**

```bash
cd "/Users/growupconsulting/Documents/Grow Up Consulting/growup-hub/GrowUp_Lead_magnet"
npm run dev
```

Expected: Vite dev server starts. Page shows "Audit Flash" in orange on dark background.

- [ ] **Step 12: Verify tests run**

```bash
cd "/Users/growupconsulting/Documents/Grow Up Consulting/growup-hub/GrowUp_Lead_magnet"
npx vitest run
```

Expected: 0 tests, no errors.

- [ ] **Step 13: Commit**

```bash
git add GrowUp_Lead_magnet/
git commit -m "feat: scaffold Audit Flash project with React, Vite, Tailwind, test setup"
```

---

## Task 2: TypeScript types & constants

**Files:**
- Create: `src/types/audit.ts`
- Create: `src/lib/constants.ts`

- [ ] **Step 1: Create type definitions**

Create `src/types/audit.ts`:

```ts
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
```

- [ ] **Step 2: Create constants with all benchmarks**

Create `src/lib/constants.ts`:

```ts
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
  commercial: ["Make", "n8n", "Notion CRM", "Gmail"],
  onboarding: ["Make", "Notion", "Google Drive", "Gmail"],
  admin: ["Make", "n8n", "Google Sheets", "Notion"],
};

export const AUTOMATION_MONTHLY_COST: Record<ProcessId, number> = {
  relances: 45,
  reporting: 35,
  facturation: 30,
  commercial: 55,
  onboarding: 40,
  admin: 50,
};

// Estimated scores for locked domains (1-5 scale) by sector
// Used for the radar chart — intentionally imprecise
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
```

- [ ] **Step 3: Commit**

```bash
git add GrowUp_Lead_magnet/src/types/ GrowUp_Lead_magnet/src/lib/constants.ts
git commit -m "feat: add TypeScript types and benchmark constants"
```

---

## Task 3: Calculation engine with tests

**Files:**
- Create: `src/lib/calculations/relances.ts`
- Create: `src/lib/calculations/reporting.ts`
- Create: `src/lib/calculations/facturation.ts`
- Create: `src/lib/calculations/commercial.ts`
- Create: `src/lib/calculations/onboarding.ts`
- Create: `src/lib/calculations/admin.ts`
- Create: `src/lib/calculations/index.ts`
- Create: `src/lib/calculations/__tests__/calculations.test.ts`

- [ ] **Step 1: Write failing tests for all 6 calculation modules**

Create `src/lib/calculations/__tests__/calculations.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { calculateRelances } from "../relances";
import { calculateReporting } from "../reporting";
import { calculateFacturation } from "../facturation";
import { calculateCommercial } from "../commercial";
import { calculateOnboarding } from "../onboarding";
import { calculateAdmin } from "../admin";
import { calculateProcess } from "../index";

describe("calculateRelances", () => {
  it("calculates annual cost for a typical services_conseil scenario", () => {
    const result = calculateRelances(
      { nbFactures: 100, delaiPaiement: "60j", quiGere: "assistant", outilActuel: "excel" },
      "services_conseil",
      "500K-1M"
    );
    // 100 * 0.35 * 0.5 = 17.5h/month relance time
    // 17.5 * 35 = 612.5€/month time cost
    // (62500 * (60-30) / 365) * 0.05 = 256.85€/month treasury
    // (612.5 + 256.85) * 12 = 10,432.19€/year
    expect(result.annualCost).toBeGreaterThan(10000);
    expect(result.annualCost).toBeLessThan(11000);
    expect(result.costBreakdown).toHaveLength(2);
    expect(result.costBreakdown[0].label).toContain("temps");
    expect(result.costBreakdown[1].label).toContain("trésorerie");
  });
});

describe("calculateReporting", () => {
  it("calculates annual cost for weekly reporting with many sources", () => {
    const result = calculateReporting(
      { frequence: "hebdo", nbSources: "6+", tempsParReporting: 4, quiCompile: "dirigeant" },
      "services_conseil",
      "1-3M"
    );
    // 4h * 52 * 85€ = 17,680€ compilation
    // 0.035 * 2,000,000 * 0.02 = 1,400€ decision cost
    // total = 19,080€
    expect(result.annualCost).toBeGreaterThan(18000);
    expect(result.annualCost).toBeLessThan(20000);
    expect(result.costBreakdown).toHaveLength(2);
  });

  it("returns zero for jamais frequency", () => {
    const result = calculateReporting(
      { frequence: "jamais", nbSources: "1-2", tempsParReporting: 0, quiCompile: "dirigeant" },
      "autre",
      "<500K"
    );
    expect(result.annualCost).toBe(0);
  });
});

describe("calculateFacturation", () => {
  it("calculates for high error rate scenario", () => {
    const result = calculateFacturation(
      { nbFactures: 200, tempsParFacture: 15, tauxErreur: "1_sur_5", outilActuel: "excel" },
      "services_conseil",
      "1-3M"
    );
    // 200 * (15/60)h * 12 * 40€ = 24,000€ saisie
    // 200 * 0.20 * 3500 * 12 * 0.05 = 84,000€ erreurs
    // total = 108,000€
    expect(result.annualCost).toBeGreaterThan(100000);
    expect(result.annualCost).toBeLessThan(115000);
  });
});

describe("calculateCommercial", () => {
  it("calculates massive loss for slow response time", () => {
    const result = calculateCommercial(
      { nbLeads: 50, tempsContact: "> 48h", tauxConversion: "< 5%", outilCrm: "aucun" },
      "agence",
      "1-3M"
    );
    // 50 * 0.78 = 39 leads perdus/mois
    // 39 * 8000 * 12 = 3,744,000€ manque a gagner
    // 50 * 1.0h * 40€ * 12 = 24,000€ suivi
    // total = 3,768,000€ — capped or not? This is realistic for agencies
    expect(result.annualCost).toBeGreaterThan(3000000);
  });
});

describe("calculateOnboarding", () => {
  it("calculates for growing company", () => {
    const result = calculateOnboarding(
      { nbRecrutements: 20, dureeOnboarding: "1_mois", nbEtapes: "5-15", quiCoordonne: "manager" },
      "services_conseil",
      "3-10M"
    );
    // 20 * (4 weeks * 40h) * 50€ = 160,000€ admin — this seems too high
    // Let's use reasonable onboarding hours: 20 * 20h * 50€ = 20,000€
    // 20 * 4 weeks * (40h * 40€/h) = productivity loss
    // The exact formula depends on implementation
    expect(result.annualCost).toBeGreaterThan(10000);
    expect(result.costBreakdown.length).toBeGreaterThanOrEqual(2);
  });
});

describe("calculateAdmin", () => {
  it("calculates straightforward admin cost", () => {
    const result = calculateAdmin(
      { nbPersonnes: 5, heuresJour: 2, typeTaches: "copier_coller", outilsPrincipaux: "multiples" },
      "services_conseil",
      "1-3M"
    );
    // 5 * 2 * 220 * 40€ = 88,000€
    expect(result.annualCost).toBe(88000);
    expect(result.costBreakdown).toHaveLength(1);
  });
});

describe("calculateProcess (dispatcher)", () => {
  it("dispatches to correct calculator based on processId", () => {
    const result = calculateProcess(
      "admin",
      { nbPersonnes: 3, heuresJour: 1, typeTaches: "saisie", outilsPrincipaux: "excel" },
      "autre",
      "<500K"
    );
    // 3 * 1 * 220 * 40 = 26,400
    expect(result.annualCost).toBe(26400);
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

```bash
cd "/Users/growupconsulting/Documents/Grow Up Consulting/growup-hub/GrowUp_Lead_magnet"
npx vitest run
```

Expected: FAIL — modules not found.

- [ ] **Step 3: Implement relances calculator**

Create `src/lib/calculations/relances.ts`:

```ts
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
```

- [ ] **Step 4: Implement reporting calculator**

Create `src/lib/calculations/reporting.ts`:

```ts
import type { ReportingAnswers, CostBreakdown, Sector, RevenueRange } from "../../types/audit";
import {
  COUT_HORAIRE_CHARGE,
  COEFFICIENT_MAUVAISE_DECISION,
  FREQUENCE_ANNUELLE,
  REVENUE_RANGES,
} from "../constants";

export function calculateReporting(
  answers: ReportingAnswers,
  sector: Sector,
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
```

- [ ] **Step 5: Implement facturation calculator**

Create `src/lib/calculations/facturation.ts`:

```ts
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
  const coutErreurs = answers.nbFactures * tauxErreur * montantMoyen * 12 * 0.05;

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
```

- [ ] **Step 6: Implement commercial calculator**

Create `src/lib/calculations/commercial.ts`:

```ts
import type { CommercialAnswers, CostBreakdown, Sector, RevenueRange } from "../../types/audit";
import {
  COUT_HORAIRE_CHARGE,
  TAUX_PERTE_PAR_DELAI,
  PANIER_MOYEN,
  TEMPS_SUIVI_PAR_LEAD_HEURES,
} from "../constants";

export function calculateCommercial(
  answers: CommercialAnswers,
  sector: Sector,
  _revenueRange: RevenueRange
) {
  const leadsPerdus = answers.nbLeads * TAUX_PERTE_PAR_DELAI[answers.tempsContact];
  const manqueAGagner = leadsPerdus * PANIER_MOYEN[sector] * 12;

  const tempsSuivi = TEMPS_SUIVI_PAR_LEAD_HEURES[answers.outilCrm];
  const coutSuiviManuel = answers.nbLeads * tempsSuivi * COUT_HORAIRE_CHARGE["moyen"] * 12;

  const annualCost = Math.round(manqueAGagner + coutSuiviManuel);

  const costBreakdown: CostBreakdown = [
    {
      label: `~${Math.round(leadsPerdus)} leads perdus/mois par délai de réponse`,
      amount: Math.round(manqueAGagner),
    },
    {
      label: `Suivi manuel (${tempsSuivi}h/lead x ${answers.nbLeads} leads/mois)`,
      amount: Math.round(coutSuiviManuel),
    },
  ];

  return { annualCost, costBreakdown };
}
```

- [ ] **Step 7: Implement onboarding calculator**

Create `src/lib/calculations/onboarding.ts`:

```ts
import type { OnboardingAnswers, CostBreakdown, Sector, RevenueRange } from "../../types/audit";
import { COUT_HORAIRE_CHARGE, SEMAINES_SOUS_OPTIMAL } from "../constants";

export function calculateOnboarding(
  answers: OnboardingAnswers,
  _sector: Sector,
  _revenueRange: RevenueRange
) {
  // Admin hours per onboarding based on number of steps
  const heuresAdminParOnboarding = { "< 5": 8, "5-15": 20, "> 15": 40 }[answers.nbEtapes];

  const coutAdmin =
    answers.nbRecrutements *
    heuresAdminParOnboarding *
    COUT_HORAIRE_CHARGE[answers.quiCoordonne];

  const semainesSousOptimal = SEMAINES_SOUS_OPTIMAL[answers.dureeOnboarding];
  const salaireHebdoMoyen = COUT_HORAIRE_CHARGE["moyen"] * 35; // 35h/week
  const coutProductivite =
    answers.nbRecrutements * semainesSousOptimal * salaireHebdoMoyen * 0.5; // 50% productivity loss

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
```

- [ ] **Step 8: Implement admin calculator**

Create `src/lib/calculations/admin.ts`:

```ts
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
```

- [ ] **Step 9: Create dispatcher**

Create `src/lib/calculations/index.ts`:

```ts
import type { ProcessId, ProcessAnswers, Sector, RevenueRange, AuditResult, RadarScores } from "../../types/audit";
import { calculateRelances } from "./relances";
import { calculateReporting } from "./reporting";
import { calculateFacturation } from "./facturation";
import { calculateCommercial } from "./commercial";
import { calculateOnboarding } from "./onboarding";
import { calculateAdmin } from "./admin";
import { SUGGESTED_STACKS, AUTOMATION_MONTHLY_COST, ESTIMATED_SCORES, PROCESSES } from "../constants";

const calculators: Record<ProcessId, (answers: any, sector: Sector, revenue: RevenueRange) => { annualCost: number; costBreakdown: { label: string; amount: number }[] }> = {
  relances: calculateRelances,
  reporting: calculateReporting,
  facturation: calculateFacturation,
  commercial: calculateCommercial,
  onboarding: calculateOnboarding,
  admin: calculateAdmin,
};

export function calculateProcess(
  processId: ProcessId,
  answers: ProcessAnswers,
  sector: Sector,
  revenueRange: RevenueRange
): AuditResult {
  const { annualCost, costBreakdown } = calculators[processId](answers, sector, revenueRange);

  const automationMonthlyCost = AUTOMATION_MONTHLY_COST[processId];
  const automationAnnualCost = automationMonthlyCost * 12;
  const roiWeeks = annualCost > 0 ? Math.max(1, Math.round((automationAnnualCost / annualCost) * 52)) : 0;

  // Build radar scores: real score for selected process, estimated for others
  const estimatedScores = ESTIMATED_SCORES[sector];
  const selectedScore = annualCost > 50000 ? 1 : annualCost > 20000 ? 2 : annualCost > 5000 ? 3 : 4;

  const radarScores: RadarScores = {} as RadarScores;
  for (const p of PROCESSES) {
    radarScores[p.id] = {
      score: p.id === processId ? selectedScore : estimatedScores[p.id],
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
```

- [ ] **Step 10: Run tests to verify they pass**

```bash
cd "/Users/growupconsulting/Documents/Grow Up Consulting/growup-hub/GrowUp_Lead_magnet"
npx vitest run
```

Expected: All tests PASS.

- [ ] **Step 11: Commit**

```bash
git add GrowUp_Lead_magnet/src/lib/calculations/
git commit -m "feat: implement 6 calculation modules with tests"
```

---

## Task 4: Audit state machine hook

**Files:**
- Create: `src/hooks/useAuditState.ts`
- Create: `src/hooks/__tests__/useAuditState.test.ts`

- [ ] **Step 1: Write failing test**

Create `src/hooks/__tests__/useAuditState.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useAuditState } from "../useAuditState";

describe("useAuditState", () => {
  it("starts at step 0", () => {
    const { result } = renderHook(() => useAuditState());
    expect(result.current.state.step).toBe(0);
  });

  it("advances to step 1 on start", () => {
    const { result } = renderHook(() => useAuditState());
    act(() => result.current.start());
    expect(result.current.state.step).toBe(1);
  });

  it("sets profile and advances to step 2", () => {
    const { result } = renderHook(() => useAuditState());
    act(() => result.current.start());
    act(() =>
      result.current.setProfile("services_conseil", 50, "1-3M")
    );
    expect(result.current.state.step).toBe(2);
    expect(result.current.state.sector).toBe("services_conseil");
    expect(result.current.state.teamSize).toBe(50);
    expect(result.current.state.revenueRange).toBe("1-3M");
  });

  it("sets process and advances to step 3", () => {
    const { result } = renderHook(() => useAuditState());
    act(() => result.current.start());
    act(() => result.current.setProfile("agence", 20, "500K-1M"));
    act(() => result.current.selectProcess("commercial"));
    expect(result.current.state.step).toBe(3);
    expect(result.current.state.selectedProcess).toBe("commercial");
  });

  it("submits answers, calculates result, advances to step 4", () => {
    const { result } = renderHook(() => useAuditState());
    act(() => result.current.start());
    act(() => result.current.setProfile("services_conseil", 30, "1-3M"));
    act(() => result.current.selectProcess("admin"));
    act(() =>
      result.current.submitAnswers({
        nbPersonnes: 3,
        heuresJour: 2,
        typeTaches: "saisie",
        outilsPrincipaux: "excel",
      })
    );
    expect(result.current.state.step).toBe(4);
    expect(result.current.state.result).not.toBeNull();
    expect(result.current.state.result!.annualCost).toBe(52800);
  });

  it("advances to step 5 on showLeadForm", () => {
    const { result } = renderHook(() => useAuditState());
    act(() => result.current.start());
    act(() => result.current.setProfile("autre", 10, "<500K"));
    act(() => result.current.selectProcess("admin"));
    act(() =>
      result.current.submitAnswers({
        nbPersonnes: 1,
        heuresJour: 1,
        typeTaches: "saisie",
        outilsPrincipaux: "excel",
      })
    );
    act(() => result.current.showLeadForm());
    expect(result.current.state.step).toBe(5);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npx vitest run src/hooks/__tests__/useAuditState.test.ts
```

Expected: FAIL — module not found.

- [ ] **Step 3: Implement the hook**

Create `src/hooks/useAuditState.ts`:

```ts
import { useState, useCallback } from "react";
import type { AuditState, Sector, RevenueRange, ProcessId, ProcessAnswers } from "../types/audit";
import { calculateProcess } from "../lib/calculations";

const initialState: AuditState = {
  step: 0,
  sector: null,
  teamSize: 50,
  revenueRange: null,
  selectedProcess: null,
  answers: null,
  result: null,
};

export function useAuditState() {
  const [state, setState] = useState<AuditState>(initialState);

  const start = useCallback(() => {
    setState((s) => ({ ...s, step: 1 }));
  }, []);

  const setProfile = useCallback(
    (sector: Sector, teamSize: number, revenueRange: RevenueRange) => {
      setState((s) => ({ ...s, sector, teamSize, revenueRange, step: 2 }));
    },
    []
  );

  const selectProcess = useCallback((processId: ProcessId) => {
    setState((s) => ({ ...s, selectedProcess: processId, step: 3 }));
  }, []);

  const submitAnswers = useCallback((answers: ProcessAnswers) => {
    setState((s) => {
      const result = calculateProcess(
        s.selectedProcess!,
        answers,
        s.sector!,
        s.revenueRange!
      );
      return { ...s, answers, result, step: 4 };
    });
  }, []);

  const showLeadForm = useCallback(() => {
    setState((s) => ({ ...s, step: 5 }));
  }, []);

  const reset = useCallback(() => {
    setState(initialState);
  }, []);

  return { state, start, setProfile, selectProcess, submitAnswers, showLeadForm, reset };
}
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
npx vitest run src/hooks/__tests__/useAuditState.test.ts
```

Expected: All tests PASS.

- [ ] **Step 5: Commit**

```bash
git add GrowUp_Lead_magnet/src/hooks/
git commit -m "feat: implement audit state machine hook with tests"
```

---

## Task 5: UI components — Landing (Screen 0)

**Files:**
- Create: `src/components/Landing.tsx`
- Modify: `src/App.tsx`

- [ ] **Step 1: Create Landing component**

Create `src/components/Landing.tsx`:

```tsx
import { motion } from "framer-motion";

type LandingProps = {
  onStart: () => void;
};

export function Landing({ onStart }: LandingProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl"
      >
        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
          Chaque mois, votre entreprise{" "}
          <span className="text-fire">brûle du cash</span> sans que vous le
          voyiez.
        </h1>
        <p className="text-lg md:text-xl text-midnight-lighter mb-10">
          En 2 minutes, identifiez votre plus grosse fuite opérationnelle et son
          coût réel.
        </p>
        <button
          onClick={onStart}
          className="bg-fire hover:bg-fire-dark text-white font-bold text-lg px-10 py-4 rounded-lg transition-colors duration-200 cursor-pointer"
        >
          Lancer l'audit
        </button>
      </motion.div>
      <footer className="absolute bottom-8 text-sm text-midnight-light">
        Conçu par un ex-DAF & architecte en automatisation —{" "}
        <span className="text-fire">Grow Up Consulting</span>
      </footer>
    </div>
  );
}
```

- [ ] **Step 2: Wire up App.tsx with state machine**

Replace `src/App.tsx`:

```tsx
import { useAuditState } from "./hooks/useAuditState";
import { Landing } from "./components/Landing";

export default function App() {
  const audit = useAuditState();

  return (
    <div className="min-h-screen bg-midnight-darkest">
      {audit.state.step === 0 && <Landing onStart={audit.start} />}
      {audit.state.step >= 1 && audit.state.step <= 5 && (
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-midnight-lighter">Étape {audit.state.step} — à venir</p>
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 3: Verify visually**

```bash
cd "/Users/growupconsulting/Documents/Grow Up Consulting/growup-hub/GrowUp_Lead_magnet"
npm run dev
```

Expected: Dark page with headline, subtitle, orange "Lancer l'audit" button. Click advances to placeholder.

- [ ] **Step 4: Commit**

```bash
git add GrowUp_Lead_magnet/src/components/Landing.tsx GrowUp_Lead_magnet/src/App.tsx
git commit -m "feat: add Landing screen (screen 0)"
```

---

## Task 6: Profiling screen (Screen 1)

**Files:**
- Create: `src/components/Profiling.tsx`
- Create: `src/components/ui/Slider.tsx`
- Modify: `src/App.tsx`

- [ ] **Step 1: Create custom Slider component**

Create `src/components/ui/Slider.tsx`:

```tsx
type SliderProps = {
  min: number;
  max: number;
  step?: number;
  value: number;
  onChange: (value: number) => void;
  label: string;
  unit?: string;
};

export function Slider({ min, max, step = 1, value, onChange, label, unit }: SliderProps) {
  return (
    <div className="w-full">
      <div className="flex justify-between items-baseline mb-2">
        <label className="text-midnight-lighter text-sm">{label}</label>
        <span className="text-3xl font-bold font-mono text-fire">
          {value}
          {unit && <span className="text-lg text-midnight-lighter ml-1">{unit}</span>}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-midnight-dark accent-fire"
      />
    </div>
  );
}
```

- [ ] **Step 2: Create Profiling component**

Create `src/components/Profiling.tsx`:

```tsx
import { useState } from "react";
import { motion } from "framer-motion";
import type { Sector, RevenueRange } from "../types/audit";
import { SECTORS, REVENUE_RANGES } from "../lib/constants";
import { Slider } from "./ui/Slider";

type ProfilingProps = {
  onSubmit: (sector: Sector, teamSize: number, revenueRange: RevenueRange) => void;
};

export function Profiling({ onSubmit }: ProfilingProps) {
  const [sector, setSector] = useState<Sector | "">("");
  const [teamSize, setTeamSize] = useState(25);
  const [revenueRange, setRevenueRange] = useState<RevenueRange | "">("");

  const isValid = sector !== "" && revenueRange !== "";

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen flex items-center justify-center px-6"
    >
      <div className="w-full max-w-xl space-y-10">
        <h2 className="text-2xl md:text-3xl font-bold text-center">
          Parlez-nous de votre entreprise
        </h2>

        {/* Sector */}
        <div>
          <label className="block text-midnight-lighter text-sm mb-2">
            Secteur d'activité
          </label>
          <select
            value={sector}
            onChange={(e) => setSector(e.target.value as Sector)}
            className="w-full bg-midnight-dark border border-midnight-light rounded-lg px-4 py-3 text-midnight-lightest focus:border-fire focus:outline-none"
          >
            <option value="" disabled>
              Sélectionnez votre secteur
            </option>
            {SECTORS.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </div>

        {/* Team size */}
        <Slider
          min={5}
          max={250}
          step={5}
          value={teamSize}
          onChange={setTeamSize}
          label="Taille de l'équipe"
          unit="collaborateurs"
        />

        {/* Revenue range */}
        <div>
          <label className="block text-midnight-lighter text-sm mb-3">
            CA annuel approximatif
          </label>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {REVENUE_RANGES.map((r) => (
              <button
                key={r.value}
                onClick={() => setRevenueRange(r.value)}
                className={`px-4 py-3 rounded-lg border text-sm font-medium transition-colors cursor-pointer ${
                  revenueRange === r.value
                    ? "bg-fire border-fire text-white"
                    : "bg-midnight-dark border-midnight-light text-midnight-lighter hover:border-fire"
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>
        </div>

        {/* Submit */}
        <div className="text-center">
          <button
            onClick={() => onSubmit(sector as Sector, teamSize, revenueRange as RevenueRange)}
            disabled={!isValid}
            className="bg-fire hover:bg-fire-dark disabled:opacity-30 disabled:cursor-not-allowed text-white font-bold px-10 py-4 rounded-lg transition-colors cursor-pointer"
          >
            Continuer
          </button>
        </div>
      </div>
    </motion.div>
  );
}
```

- [ ] **Step 3: Wire into App.tsx**

Update `src/App.tsx` — add import and step 1 rendering:

```tsx
import { useAuditState } from "./hooks/useAuditState";
import { Landing } from "./components/Landing";
import { Profiling } from "./components/Profiling";

export default function App() {
  const audit = useAuditState();

  return (
    <div className="min-h-screen bg-midnight-darkest">
      {audit.state.step === 0 && <Landing onStart={audit.start} />}
      {audit.state.step === 1 && <Profiling onSubmit={audit.setProfile} />}
      {audit.state.step >= 2 && (
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-midnight-lighter">Étape {audit.state.step} — à venir</p>
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 4: Verify visually**

Open dev server. Click "Lancer l'audit". Expected: profiling screen with sector dropdown, team size slider (number updates live in orange), revenue buttons, and "Continuer" button that's disabled until sector + revenue are selected.

- [ ] **Step 5: Commit**

```bash
git add GrowUp_Lead_magnet/src/components/Profiling.tsx GrowUp_Lead_magnet/src/components/ui/Slider.tsx GrowUp_Lead_magnet/src/App.tsx
git commit -m "feat: add Profiling screen (screen 1) with slider and selectors"
```

---

## Task 7: Process Picker screen (Screen 2)

**Files:**
- Create: `src/components/ProcessPicker.tsx`
- Modify: `src/App.tsx`

- [ ] **Step 1: Create ProcessPicker component**

Create `src/components/ProcessPicker.tsx`:

```tsx
import { motion } from "framer-motion";
import {
  Receipt,
  BarChart3,
  FileText,
  Users,
  UserPlus,
  Clipboard,
} from "lucide-react";
import type { ProcessId } from "../types/audit";
import { PROCESSES } from "../lib/constants";

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  receipt: Receipt,
  "bar-chart-3": BarChart3,
  "file-text": FileText,
  users: Users,
  "user-plus": UserPlus,
  clipboard: Clipboard,
};

type ProcessPickerProps = {
  onSelect: (processId: ProcessId) => void;
};

export function ProcessPicker({ onSelect }: ProcessPickerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen flex items-center justify-center px-6 py-12"
    >
      <div className="w-full max-w-4xl">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
          Quel processus vous fait perdre le plus de temps ?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {PROCESSES.map((process, i) => {
            const Icon = ICONS[process.icon];
            return (
              <motion.button
                key={process.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                onClick={() => onSelect(process.id)}
                className="group bg-midnight-dark border border-midnight-light rounded-xl p-6 text-left cursor-pointer
                  hover:border-fire hover:-translate-y-1 hover:shadow-lg hover:shadow-fire/10 transition-all duration-200"
              >
                <Icon className="w-8 h-8 text-fire mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="font-bold text-lg mb-2">{process.title}</h3>
                <p className="text-midnight-lighter text-sm">{process.tagline}</p>
              </motion.button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
```

- [ ] **Step 2: Wire into App.tsx**

Add import and step 2 rendering in `src/App.tsx`:

```tsx
import { useAuditState } from "./hooks/useAuditState";
import { Landing } from "./components/Landing";
import { Profiling } from "./components/Profiling";
import { ProcessPicker } from "./components/ProcessPicker";

export default function App() {
  const audit = useAuditState();

  return (
    <div className="min-h-screen bg-midnight-darkest">
      {audit.state.step === 0 && <Landing onStart={audit.start} />}
      {audit.state.step === 1 && <Profiling onSubmit={audit.setProfile} />}
      {audit.state.step === 2 && <ProcessPicker onSelect={audit.selectProcess} />}
      {audit.state.step >= 3 && (
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-midnight-lighter">Étape {audit.state.step} — à venir</p>
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 3: Verify visually**

Navigate through steps 0→1→2. Expected: 6 cards with icons, hover animation (lift + orange border), click advances to step 3 placeholder.

- [ ] **Step 4: Commit**

```bash
git add GrowUp_Lead_magnet/src/components/ProcessPicker.tsx GrowUp_Lead_magnet/src/App.tsx
git commit -m "feat: add ProcessPicker screen (screen 2) with animated cards"
```

---

## Task 8: Process Questions screen (Screen 3)

**Files:**
- Create: `src/components/questions/RelancesQuestions.tsx`
- Create: `src/components/questions/ReportingQuestions.tsx`
- Create: `src/components/questions/FacturationQuestions.tsx`
- Create: `src/components/questions/CommercialQuestions.tsx`
- Create: `src/components/questions/OnboardingQuestions.tsx`
- Create: `src/components/questions/AdminQuestions.tsx`
- Create: `src/components/questions/index.tsx`
- Create: `src/components/ui/ChoiceGroup.tsx`
- Modify: `src/App.tsx`

- [ ] **Step 1: Create ChoiceGroup reusable component**

Create `src/components/ui/ChoiceGroup.tsx`:

```tsx
type ChoiceGroupProps<T extends string> = {
  label: string;
  options: { value: T; label: string }[];
  value: T | "";
  onChange: (value: T) => void;
  columns?: number;
};

export function ChoiceGroup<T extends string>({
  label,
  options,
  value,
  onChange,
  columns = 2,
}: ChoiceGroupProps<T>) {
  return (
    <div>
      <label className="block text-midnight-lighter text-sm mb-3">{label}</label>
      <div
        className="grid gap-2"
        style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
      >
        {options.map((opt) => (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            className={`px-3 py-3 rounded-lg border text-sm font-medium transition-colors cursor-pointer ${
              value === opt.value
                ? "bg-fire border-fire text-white"
                : "bg-midnight-dark border-midnight-light text-midnight-lighter hover:border-fire"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Create RelancesQuestions**

Create `src/components/questions/RelancesQuestions.tsx`:

```tsx
import { useState } from "react";
import type { RelancesAnswers } from "../../types/audit";
import { Slider } from "../ui/Slider";
import { ChoiceGroup } from "../ui/ChoiceGroup";

type Props = { onSubmit: (answers: RelancesAnswers) => void };

export function RelancesQuestions({ onSubmit }: Props) {
  const [nbFactures, setNbFactures] = useState(50);
  const [delaiPaiement, setDelaiPaiement] = useState<RelancesAnswers["delaiPaiement"] | "">("");
  const [quiGere, setQuiGere] = useState<RelancesAnswers["quiGere"] | "">("");
  const [outilActuel, setOutilActuel] = useState<RelancesAnswers["outilActuel"] | "">("");

  const isValid = delaiPaiement !== "" && quiGere !== "" && outilActuel !== "";

  return (
    <div className="space-y-8">
      <Slider min={10} max={500} step={10} value={nbFactures} onChange={setNbFactures} label="Nombre de factures émises par mois" />
      <ChoiceGroup label="Délai moyen de paiement" options={[
        { value: "30j", label: "30 jours" }, { value: "45j", label: "45 jours" },
        { value: "60j", label: "60 jours" }, { value: "90j+", label: "90 jours +" },
      ]} value={delaiPaiement} onChange={setDelaiPaiement} />
      <ChoiceGroup label="Qui gère les relances ?" options={[
        { value: "dirigeant", label: "Le dirigeant" }, { value: "assistant", label: "Un·e assistant·e" },
        { value: "comptable", label: "Le comptable" }, { value: "personne", label: "Personne" },
      ]} value={quiGere} onChange={setQuiGere} />
      <ChoiceGroup label="Outil actuel" options={[
        { value: "excel", label: "Excel" }, { value: "logiciel_comptable", label: "Logiciel comptable" },
        { value: "rien", label: "Rien de formalisé" },
      ]} value={outilActuel} onChange={setOutilActuel} columns={3} />
      <div className="text-center pt-4">
        <button onClick={() => onSubmit({ nbFactures, delaiPaiement: delaiPaiement as RelancesAnswers["delaiPaiement"], quiGere: quiGere as RelancesAnswers["quiGere"], outilActuel: outilActuel as RelancesAnswers["outilActuel"] })} disabled={!isValid}
          className="bg-fire hover:bg-fire-dark disabled:opacity-30 disabled:cursor-not-allowed text-white font-bold px-10 py-4 rounded-lg transition-colors cursor-pointer">
          Voir mes résultats
        </button>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Create ReportingQuestions**

Create `src/components/questions/ReportingQuestions.tsx`:

```tsx
import { useState } from "react";
import type { ReportingAnswers } from "../../types/audit";
import { Slider } from "../ui/Slider";
import { ChoiceGroup } from "../ui/ChoiceGroup";

type Props = { onSubmit: (answers: ReportingAnswers) => void };

export function ReportingQuestions({ onSubmit }: Props) {
  const [frequence, setFrequence] = useState<ReportingAnswers["frequence"] | "">("");
  const [nbSources, setNbSources] = useState<ReportingAnswers["nbSources"] | "">("");
  const [tempsParReporting, setTempsParReporting] = useState(4);
  const [quiCompile, setQuiCompile] = useState<ReportingAnswers["quiCompile"] | "">("");

  const isValid = frequence !== "" && nbSources !== "" && quiCompile !== "";

  return (
    <div className="space-y-8">
      <ChoiceGroup label="Fréquence des reportings" options={[
        { value: "hebdo", label: "Hebdomadaire" }, { value: "mensuel", label: "Mensuel" },
        { value: "trimestriel", label: "Trimestriel" }, { value: "jamais", label: "Jamais" },
      ]} value={frequence} onChange={setFrequence} />
      <ChoiceGroup label="Nombre de sources de données" options={[
        { value: "1-2", label: "1 à 2" }, { value: "3-5", label: "3 à 5" }, { value: "6+", label: "6 et plus" },
      ]} value={nbSources} onChange={setNbSources} columns={3} />
      <Slider min={1} max={20} value={tempsParReporting} onChange={setTempsParReporting} label="Temps passé par reporting" unit="heures" />
      <ChoiceGroup label="Qui compile ?" options={[
        { value: "dirigeant", label: "Le dirigeant" }, { value: "daf_raf", label: "DAF / RAF" },
        { value: "assistant", label: "Un·e assistant·e" }, { value: "chacun", label: "Chacun fait le sien" },
      ]} value={quiCompile} onChange={setQuiCompile} />
      <div className="text-center pt-4">
        <button onClick={() => onSubmit({ frequence: frequence as ReportingAnswers["frequence"], nbSources: nbSources as ReportingAnswers["nbSources"], tempsParReporting, quiCompile: quiCompile as ReportingAnswers["quiCompile"] })} disabled={!isValid}
          className="bg-fire hover:bg-fire-dark disabled:opacity-30 disabled:cursor-not-allowed text-white font-bold px-10 py-4 rounded-lg transition-colors cursor-pointer">
          Voir mes résultats
        </button>
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Create FacturationQuestions**

Create `src/components/questions/FacturationQuestions.tsx`:

```tsx
import { useState } from "react";
import type { FacturationAnswers } from "../../types/audit";
import { Slider } from "../ui/Slider";
import { ChoiceGroup } from "../ui/ChoiceGroup";

type Props = { onSubmit: (answers: FacturationAnswers) => void };

export function FacturationQuestions({ onSubmit }: Props) {
  const [nbFactures, setNbFactures] = useState(50);
  const [tempsParFacture, setTempsParFacture] = useState(15);
  const [tauxErreur, setTauxErreur] = useState<FacturationAnswers["tauxErreur"] | "">("");
  const [outilActuel, setOutilActuel] = useState<FacturationAnswers["outilActuel"] | "">("");

  const isValid = tauxErreur !== "" && outilActuel !== "";

  return (
    <div className="space-y-8">
      <Slider min={10} max={500} step={10} value={nbFactures} onChange={setNbFactures} label="Nombre de factures par mois" />
      <Slider min={5} max={60} step={5} value={tempsParFacture} onChange={setTempsParFacture} label="Temps moyen par facture" unit="min" />
      <ChoiceGroup label="Taux d'erreur estimé" options={[
        { value: "rare", label: "Rare" }, { value: "1_sur_10", label: "1 sur 10" },
        { value: "1_sur_5", label: "1 sur 5" }, { value: "frequent", label: "Fréquent" },
      ]} value={tauxErreur} onChange={setTauxErreur} />
      <ChoiceGroup label="Outil actuel" options={[
        { value: "excel", label: "Excel" }, { value: "word", label: "Word" },
        { value: "logiciel_dedie", label: "Logiciel dédié" }, { value: "erp", label: "ERP" },
      ]} value={outilActuel} onChange={setOutilActuel} />
      <div className="text-center pt-4">
        <button onClick={() => onSubmit({ nbFactures, tempsParFacture, tauxErreur: tauxErreur as FacturationAnswers["tauxErreur"], outilActuel: outilActuel as FacturationAnswers["outilActuel"] })} disabled={!isValid}
          className="bg-fire hover:bg-fire-dark disabled:opacity-30 disabled:cursor-not-allowed text-white font-bold px-10 py-4 rounded-lg transition-colors cursor-pointer">
          Voir mes résultats
        </button>
      </div>
    </div>
  );
}
```

- [ ] **Step 5: Create CommercialQuestions**

Create `src/components/questions/CommercialQuestions.tsx`:

```tsx
import { useState } from "react";
import type { CommercialAnswers } from "../../types/audit";
import { Slider } from "../ui/Slider";
import { ChoiceGroup } from "../ui/ChoiceGroup";

type Props = { onSubmit: (answers: CommercialAnswers) => void };

export function CommercialQuestions({ onSubmit }: Props) {
  const [nbLeads, setNbLeads] = useState(20);
  const [tempsContact, setTempsContact] = useState<CommercialAnswers["tempsContact"] | "">("");
  const [tauxConversion, setTauxConversion] = useState<CommercialAnswers["tauxConversion"] | "">("");
  const [outilCrm, setOutilCrm] = useState<CommercialAnswers["outilCrm"] | "">("");

  const isValid = tempsContact !== "" && tauxConversion !== "" && outilCrm !== "";

  return (
    <div className="space-y-8">
      <Slider min={5} max={200} step={5} value={nbLeads} onChange={setNbLeads} label="Nombre de leads entrants par mois" />
      <ChoiceGroup label="Temps moyen avant premier contact" options={[
        { value: "< 1h", label: "< 1 heure" }, { value: "< 24h", label: "< 24 heures" },
        { value: "24-48h", label: "24 à 48h" }, { value: "> 48h", label: "> 48 heures" },
        { value: "variable", label: "Variable" },
      ]} value={tempsContact} onChange={setTempsContact} columns={3} />
      <ChoiceGroup label="Taux de conversion estimé" options={[
        { value: "< 5%", label: "< 5%" }, { value: "5-15%", label: "5 à 15%" },
        { value: "15-30%", label: "15 à 30%" }, { value: "> 30%", label: "> 30%" },
      ]} value={tauxConversion} onChange={setTauxConversion} />
      <ChoiceGroup label="Outil CRM actuel" options={[
        { value: "aucun", label: "Aucun" }, { value: "excel", label: "Excel" },
        { value: "crm_dedie", label: "CRM dédié" }, { value: "notes_emails", label: "Notes / emails" },
      ]} value={outilCrm} onChange={setOutilCrm} />
      <div className="text-center pt-4">
        <button onClick={() => onSubmit({ nbLeads, tempsContact: tempsContact as CommercialAnswers["tempsContact"], tauxConversion: tauxConversion as CommercialAnswers["tauxConversion"], outilCrm: outilCrm as CommercialAnswers["outilCrm"] })} disabled={!isValid}
          className="bg-fire hover:bg-fire-dark disabled:opacity-30 disabled:cursor-not-allowed text-white font-bold px-10 py-4 rounded-lg transition-colors cursor-pointer">
          Voir mes résultats
        </button>
      </div>
    </div>
  );
}
```

- [ ] **Step 6: Create OnboardingQuestions**

Create `src/components/questions/OnboardingQuestions.tsx`:

```tsx
import { useState } from "react";
import type { OnboardingAnswers } from "../../types/audit";
import { Slider } from "../ui/Slider";
import { ChoiceGroup } from "../ui/ChoiceGroup";

type Props = { onSubmit: (answers: OnboardingAnswers) => void };

export function OnboardingQuestions({ onSubmit }: Props) {
  const [nbRecrutements, setNbRecrutements] = useState(5);
  const [dureeOnboarding, setDureeOnboarding] = useState<OnboardingAnswers["dureeOnboarding"] | "">("");
  const [nbEtapes, setNbEtapes] = useState<OnboardingAnswers["nbEtapes"] | "">("");
  const [quiCoordonne, setQuiCoordonne] = useState<OnboardingAnswers["quiCoordonne"] | "">("");

  const isValid = dureeOnboarding !== "" && nbEtapes !== "" && quiCoordonne !== "";

  return (
    <div className="space-y-8">
      <Slider min={1} max={50} value={nbRecrutements} onChange={setNbRecrutements} label="Nombre de recrutements par an" />
      <ChoiceGroup label="Durée moyenne d'onboarding" options={[
        { value: "1_sem", label: "1 semaine" }, { value: "2_sem", label: "2 semaines" },
        { value: "1_mois", label: "1 mois" }, { value: "> 1_mois", label: "> 1 mois" },
      ]} value={dureeOnboarding} onChange={setDureeOnboarding} />
      <ChoiceGroup label="Nombre d'étapes / documents à traiter" options={[
        { value: "< 5", label: "Moins de 5" }, { value: "5-15", label: "5 à 15" }, { value: "> 15", label: "Plus de 15" },
      ]} value={nbEtapes} onChange={setNbEtapes} columns={3} />
      <ChoiceGroup label="Qui coordonne ?" options={[
        { value: "rh", label: "RH" }, { value: "manager", label: "Manager" },
        { value: "nouveau", label: "Le nouveau lui-même" }, { value: "pas_de_process", label: "Pas de process" },
      ]} value={quiCoordonne} onChange={setQuiCoordonne} />
      <div className="text-center pt-4">
        <button onClick={() => onSubmit({ nbRecrutements, dureeOnboarding: dureeOnboarding as OnboardingAnswers["dureeOnboarding"], nbEtapes: nbEtapes as OnboardingAnswers["nbEtapes"], quiCoordonne: quiCoordonne as OnboardingAnswers["quiCoordonne"] })} disabled={!isValid}
          className="bg-fire hover:bg-fire-dark disabled:opacity-30 disabled:cursor-not-allowed text-white font-bold px-10 py-4 rounded-lg transition-colors cursor-pointer">
          Voir mes résultats
        </button>
      </div>
    </div>
  );
}
```

- [ ] **Step 7: Create AdminQuestions**

Create `src/components/questions/AdminQuestions.tsx`:

```tsx
import { useState } from "react";
import type { AdminAnswers } from "../../types/audit";
import { Slider } from "../ui/Slider";
import { ChoiceGroup } from "../ui/ChoiceGroup";

type Props = { onSubmit: (answers: AdminAnswers) => void };

export function AdminQuestions({ onSubmit }: Props) {
  const [nbPersonnes, setNbPersonnes] = useState(3);
  const [heuresJour, setHeuresJour] = useState(2);
  const [typeTaches, setTypeTaches] = useState<AdminAnswers["typeTaches"] | "">("");
  const [outilsPrincipaux, setOutilsPrincipaux] = useState<AdminAnswers["outilsPrincipaux"] | "">("");

  const isValid = typeTaches !== "" && outilsPrincipaux !== "";

  return (
    <div className="space-y-8">
      <Slider min={1} max={50} value={nbPersonnes} onChange={setNbPersonnes} label="Nombre de personnes sur des tâches de saisie" />
      <Slider min={0.5} max={6} step={0.5} value={heuresJour} onChange={setHeuresJour} label="Heures par jour en saisie / copier-coller" unit="h/jour" />
      <ChoiceGroup label="Type de tâches principal" options={[
        { value: "saisie", label: "Saisie de données" }, { value: "copier_coller", label: "Copier-coller entre outils" },
        { value: "emails", label: "Emails répétitifs" }, { value: "maj_fichiers", label: "MAJ de fichiers" },
      ]} value={typeTaches} onChange={setTypeTaches} />
      <ChoiceGroup label="Outils principaux" options={[
        { value: "excel", label: "Excel" }, { value: "google_sheets", label: "Google Sheets" },
        { value: "erp", label: "ERP" }, { value: "multiples", label: "Outils multiples non connectés" },
      ]} value={outilsPrincipaux} onChange={setOutilsPrincipaux} />
      <div className="text-center pt-4">
        <button onClick={() => onSubmit({ nbPersonnes, heuresJour, typeTaches: typeTaches as AdminAnswers["typeTaches"], outilsPrincipaux: outilsPrincipaux as AdminAnswers["outilsPrincipaux"] })} disabled={!isValid}
          className="bg-fire hover:bg-fire-dark disabled:opacity-30 disabled:cursor-not-allowed text-white font-bold px-10 py-4 rounded-lg transition-colors cursor-pointer">
          Voir mes résultats
        </button>
      </div>
    </div>
  );
}
```

- [ ] **Step 8: Create questions dispatcher**

Create `src/components/questions/index.tsx`:

```tsx
import { motion } from "framer-motion";
import type { ProcessId, ProcessAnswers } from "../../types/audit";
import { PROCESSES } from "../../lib/constants";
import { RelancesQuestions } from "./RelancesQuestions";
import { ReportingQuestions } from "./ReportingQuestions";
import { FacturationQuestions } from "./FacturationQuestions";
import { CommercialQuestions } from "./CommercialQuestions";
import { OnboardingQuestions } from "./OnboardingQuestions";
import { AdminQuestions } from "./AdminQuestions";

const QUESTION_COMPONENTS: Record<ProcessId, React.ComponentType<{ onSubmit: (a: any) => void }>> = {
  relances: RelancesQuestions,
  reporting: ReportingQuestions,
  facturation: FacturationQuestions,
  commercial: CommercialQuestions,
  onboarding: OnboardingQuestions,
  admin: AdminQuestions,
};

type Props = {
  processId: ProcessId;
  onSubmit: (answers: ProcessAnswers) => void;
};

export function ProcessQuestions({ processId, onSubmit }: Props) {
  const QuestionComponent = QUESTION_COMPONENTS[processId];
  const processTitle = PROCESSES.find((p) => p.id === processId)?.title ?? "";

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen flex items-center justify-center px-6 py-12"
    >
      <div className="w-full max-w-xl">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">
          {processTitle}
        </h2>
        <p className="text-midnight-lighter text-center mb-10">
          Quelques questions pour estimer le coût de ce processus
        </p>
        <QuestionComponent onSubmit={onSubmit} />
      </div>
    </motion.div>
  );
}
```

- [ ] **Step 9: Wire into App.tsx**

Update `src/App.tsx`:

```tsx
import { useAuditState } from "./hooks/useAuditState";
import { Landing } from "./components/Landing";
import { Profiling } from "./components/Profiling";
import { ProcessPicker } from "./components/ProcessPicker";
import { ProcessQuestions } from "./components/questions";

export default function App() {
  const audit = useAuditState();

  return (
    <div className="min-h-screen bg-midnight-darkest">
      {audit.state.step === 0 && <Landing onStart={audit.start} />}
      {audit.state.step === 1 && <Profiling onSubmit={audit.setProfile} />}
      {audit.state.step === 2 && <ProcessPicker onSelect={audit.selectProcess} />}
      {audit.state.step === 3 && audit.state.selectedProcess && (
        <ProcessQuestions processId={audit.state.selectedProcess} onSubmit={audit.submitAnswers} />
      )}
      {audit.state.step >= 4 && (
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-midnight-lighter">Étape {audit.state.step} — à venir</p>
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 10: Verify visually — test each process**

Open dev server. Go through all 6 processes. Each should show its own set of questions. "Voir mes résultats" should be disabled until all choices are made.

- [ ] **Step 11: Commit**

```bash
git add GrowUp_Lead_magnet/src/components/questions/ GrowUp_Lead_magnet/src/components/ui/ChoiceGroup.tsx GrowUp_Lead_magnet/src/App.tsx
git commit -m "feat: add ProcessQuestions screen (screen 3) with all 6 modules"
```

---

## Task 9: Results screen (Screen 4)

**Files:**
- Create: `src/components/results/CostCounter.tsx`
- Create: `src/components/results/RadarChart.tsx`
- Create: `src/components/results/SolutionStack.tsx`
- Create: `src/components/Results.tsx`
- Modify: `src/App.tsx`

- [ ] **Step 1: Create animated CostCounter**

Create `src/components/results/CostCounter.tsx`:

```tsx
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import type { CostBreakdown } from "../../types/audit";
import { PROCESSES } from "../../lib/constants";
import type { ProcessId } from "../../types/audit";

type Props = {
  annualCost: number;
  costBreakdown: CostBreakdown;
  processId: ProcessId;
};

export function CostCounter({ annualCost, costBreakdown, processId }: Props) {
  const [displayedCost, setDisplayedCost] = useState(0);
  const processTitle = PROCESSES.find((p) => p.id === processId)?.title ?? "";

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = annualCost / steps;
    let current = 0;
    const interval = setInterval(() => {
      current += increment;
      if (current >= annualCost) {
        setDisplayedCost(annualCost);
        clearInterval(interval);
      } else {
        setDisplayedCost(Math.round(current));
      }
    }, duration / steps);
    return () => clearInterval(interval);
  }, [annualCost]);

  const formatted = new Intl.NumberFormat("fr-FR").format(displayedCost);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="text-center py-10"
    >
      <p className="text-midnight-lighter text-lg mb-4">
        Votre processus de <span className="text-fire font-semibold">{processTitle.toLowerCase()}</span> vous coûte
      </p>
      <p className="text-5xl md:text-7xl font-bold font-mono text-fire-light">
        {formatted} €<span className="text-2xl md:text-3xl text-midnight-lighter">/an</span>
      </p>
      <div className="mt-8 space-y-3 max-w-lg mx-auto">
        {costBreakdown.map((item, i) => (
          <div key={i} className="flex justify-between text-sm border-b border-midnight-dark pb-2">
            <span className="text-midnight-lighter">{item.label}</span>
            <span className="font-mono text-midnight-lightest">
              {new Intl.NumberFormat("fr-FR").format(item.amount)} €
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
```

- [ ] **Step 2: Create RadarChart wrapper**

Create `src/components/results/RadarChart.tsx`:

```tsx
import {
  RadarChart as RechartsRadar,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  ResponsiveContainer,
} from "recharts";
import { Lock } from "lucide-react";
import type { RadarScores, ProcessId } from "../../types/audit";
import { PROCESSES } from "../../lib/constants";

type Props = {
  radarScores: RadarScores;
  selectedProcess: ProcessId;
  potentialAdditionalCost: number;
};

export function MaturityRadar({ radarScores, selectedProcess, potentialAdditionalCost }: Props) {
  const data = PROCESSES.map((p) => ({
    process: p.title,
    score: radarScores[p.id].score,
    locked: radarScores[p.id].locked,
    fullMark: 5,
  }));

  return (
    <div className="py-10">
      <h3 className="text-xl font-bold text-center mb-6">Votre radar de maturité opérationnelle</h3>
      <div className="w-full h-80">
        <ResponsiveContainer>
          <RechartsRadar cx="50%" cy="50%" outerRadius="80%" data={data}>
            <PolarGrid stroke="#4c7093" />
            <PolarAngleAxis
              dataKey="process"
              tick={{ fill: "#ccd6e0", fontSize: 11 }}
            />
            <Radar
              dataKey="score"
              stroke="#e3943b"
              fill="#e3943b"
              fillOpacity={0.2}
              strokeWidth={2}
            />
          </RechartsRadar>
        </ResponsiveContainer>
      </div>
      <div className="flex flex-wrap justify-center gap-4 mt-4">
        {PROCESSES.map((p) => (
          <div
            key={p.id}
            className={`flex items-center gap-2 text-sm px-3 py-1 rounded-full ${
              p.id === selectedProcess
                ? "bg-fire/20 text-fire"
                : "bg-midnight-dark text-midnight-light"
            }`}
          >
            {radarScores[p.id].locked && <Lock className="w-3 h-3" />}
            <span>{p.title}</span>
          </div>
        ))}
      </div>
      <p className="text-center text-midnight-lighter text-sm mt-6">
        Vous avez analysé <span className="text-fire font-semibold">1 fuite sur 6</span>.
        Les 5 autres représentent potentiellement{" "}
        <span className="font-mono text-fire-light">
          {new Intl.NumberFormat("fr-FR").format(potentialAdditionalCost)} €
        </span>{" "}
        supplémentaires.
      </p>
    </div>
  );
}
```

- [ ] **Step 3: Create SolutionStack**

Create `src/components/results/SolutionStack.tsx`:

```tsx
import { ArrowRight } from "lucide-react";

type Props = {
  stack: string[];
  automationMonthlyCost: number;
  annualCost: number;
  roiWeeks: number;
};

export function SolutionStack({ stack, automationMonthlyCost, annualCost, roiWeeks }: Props) {
  return (
    <div className="py-10 border-t border-midnight-dark">
      <h3 className="text-xl font-bold text-center mb-6">La solution automatisée</h3>
      <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
        {stack.map((tool, i) => (
          <div key={tool} className="flex items-center gap-3">
            <span className="bg-midnight-dark border border-midnight-light rounded-lg px-4 py-2 font-mono text-sm text-fire-light">
              {tool}
            </span>
            {i < stack.length - 1 && <ArrowRight className="w-4 h-4 text-midnight-light" />}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto text-center">
        <div className="bg-midnight-dark rounded-xl p-6">
          <p className="text-midnight-lighter text-sm mb-1">Coût actuel</p>
          <p className="text-2xl font-bold font-mono text-fire-light">
            {new Intl.NumberFormat("fr-FR").format(annualCost)} €<span className="text-sm text-midnight-lighter">/an</span>
          </p>
        </div>
        <div className="bg-midnight-dark rounded-xl p-6">
          <p className="text-midnight-lighter text-sm mb-1">Coût automatisé</p>
          <p className="text-2xl font-bold font-mono text-green-400">
            {automationMonthlyCost} €<span className="text-sm text-midnight-lighter">/mois</span>
          </p>
        </div>
        <div className="bg-midnight-dark rounded-xl p-6">
          <p className="text-midnight-lighter text-sm mb-1">ROI estimé</p>
          <p className="text-2xl font-bold font-mono text-fire">
            {roiWeeks} sem.
          </p>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Create Results container**

Create `src/components/Results.tsx`:

```tsx
import { motion } from "framer-motion";
import type { AuditResult, ProcessId } from "../types/audit";
import { CostCounter } from "./results/CostCounter";
import { MaturityRadar } from "./results/RadarChart";
import { SolutionStack } from "./results/SolutionStack";

type Props = {
  result: AuditResult;
  processId: ProcessId;
  onShowLeadForm: () => void;
};

export function Results({ result, processId, onShowLeadForm }: Props) {
  // Estimate additional cost from locked domains
  const potentialAdditionalCost = Math.round(result.annualCost * 3.5);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen px-6 py-12 max-w-4xl mx-auto"
    >
      <CostCounter
        annualCost={result.annualCost}
        costBreakdown={result.costBreakdown}
        processId={processId}
      />
      <MaturityRadar
        radarScores={result.radarScores}
        selectedProcess={processId}
        potentialAdditionalCost={potentialAdditionalCost}
      />
      <SolutionStack
        stack={result.suggestedStack}
        automationMonthlyCost={result.automationMonthlyCost}
        annualCost={result.annualCost}
        roiWeeks={result.roiWeeks}
      />
      <div className="text-center py-10">
        <button
          onClick={onShowLeadForm}
          className="bg-fire hover:bg-fire-dark text-white font-bold text-lg px-10 py-4 rounded-lg transition-colors cursor-pointer"
        >
          Recevoir mon rapport détaillé
        </button>
      </div>
    </motion.div>
  );
}
```

- [ ] **Step 5: Wire into App.tsx**

Update `src/App.tsx`:

```tsx
import { useAuditState } from "./hooks/useAuditState";
import { Landing } from "./components/Landing";
import { Profiling } from "./components/Profiling";
import { ProcessPicker } from "./components/ProcessPicker";
import { ProcessQuestions } from "./components/questions";
import { Results } from "./components/Results";

export default function App() {
  const audit = useAuditState();

  return (
    <div className="min-h-screen bg-midnight-darkest">
      {audit.state.step === 0 && <Landing onStart={audit.start} />}
      {audit.state.step === 1 && <Profiling onSubmit={audit.setProfile} />}
      {audit.state.step === 2 && <ProcessPicker onSelect={audit.selectProcess} />}
      {audit.state.step === 3 && audit.state.selectedProcess && (
        <ProcessQuestions processId={audit.state.selectedProcess} onSubmit={audit.submitAnswers} />
      )}
      {audit.state.step === 4 && audit.state.result && audit.state.selectedProcess && (
        <Results result={audit.state.result} processId={audit.state.selectedProcess} onShowLeadForm={audit.showLeadForm} />
      )}
      {audit.state.step === 5 && (
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-midnight-lighter">Formulaire de capture — à venir</p>
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 6: Verify visually — full flow through results**

Complete audit for any process. Expected: animated counter, radar chart, solution stack with 3 metric cards, "Recevoir mon rapport" button.

- [ ] **Step 7: Commit**

```bash
git add GrowUp_Lead_magnet/src/components/results/ GrowUp_Lead_magnet/src/components/Results.tsx GrowUp_Lead_magnet/src/App.tsx
git commit -m "feat: add Results screen (screen 4) with counter, radar, solution stack"
```

---

## Task 10: Lead Capture screen (Screen 5) + Supabase integration

**Files:**
- Create: `src/components/LeadCapture.tsx`
- Create: `src/lib/supabase.ts`
- Modify: `src/App.tsx`

- [ ] **Step 1: Create Supabase client**

Create `src/lib/supabase.ts`:

```ts
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn("Supabase credentials missing. Lead capture will be disabled.");
}

export const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;
```

- [ ] **Step 2: Create LeadCapture component**

Create `src/components/LeadCapture.tsx`:

```tsx
import { useState } from "react";
import { motion } from "framer-motion";
import type { AuditState, LeadFormData } from "../types/audit";
import { supabase } from "../lib/supabase";

type Props = {
  auditState: AuditState;
};

export function LeadCapture({ auditState }: Props) {
  const [form, setForm] = useState<LeadFormData>({
    firstName: "",
    email: "",
    phone: "",
    companyName: "",
    consentRgpd: false,
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const isValid =
    form.firstName.trim() !== "" &&
    form.email.includes("@") &&
    form.companyName.trim() !== "" &&
    form.consentRgpd;

  const handleSubmit = async () => {
    if (!isValid) return;
    setStatus("sending");

    const params = new URLSearchParams(window.location.search);

    const payload = {
      first_name: form.firstName.trim(),
      email: form.email.trim().toLowerCase(),
      phone: form.phone.trim() || null,
      company_name: form.companyName.trim(),
      sector: auditState.sector,
      team_size: auditState.teamSize,
      revenue_range: auditState.revenueRange,
      selected_process: auditState.selectedProcess,
      answers: auditState.answers,
      annual_cost: auditState.result!.annualCost,
      cost_breakdown: auditState.result!.costBreakdown,
      radar_scores: auditState.result!.radarScores,
      suggested_stack: auditState.result!.suggestedStack,
      automation_monthly_cost: auditState.result!.automationMonthlyCost,
      roi_weeks: auditState.result!.roiWeeks,
      consent_rgpd: true,
      source: params.get("utm_source") || null,
      utm_campaign: params.get("utm_campaign") || null,
      utm_medium: params.get("utm_medium") || null,
    };

    if (!supabase) {
      console.log("Supabase not configured. Payload:", payload);
      setStatus("sent");
      return;
    }

    const { error } = await supabase.from("audit_leads").insert(payload);

    if (error) {
      console.error("Supabase insert error:", error);
      setStatus("error");
    } else {
      setStatus("sent");
    }
  };

  if (status === "sent") {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen flex items-center justify-center px-6 text-center"
      >
        <div className="max-w-lg">
          <h2 className="text-3xl font-bold mb-4">Rapport envoyé !</h2>
          <p className="text-midnight-lighter mb-8">
            Consultez votre boîte mail. Votre rapport détaillé arrive dans les prochaines minutes.
          </p>
          <a
            href="https://calendly.com/growup-consulting/audit-clear-up"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-fire hover:bg-fire-dark text-white font-bold px-10 py-4 rounded-lg transition-colors"
          >
            Réservez votre Audit CLEAR UP (30 min offertes)
          </a>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen flex items-center justify-center px-6 py-12"
    >
      <div className="w-full max-w-md">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">
          Recevez votre rapport détaillé
        </h2>
        <p className="text-midnight-lighter text-center mb-8">
          avec le plan d'action pour stopper cette fuite
        </p>
        <div className="space-y-5">
          <input
            type="text"
            placeholder="Prénom *"
            value={form.firstName}
            onChange={(e) => setForm((f) => ({ ...f, firstName: e.target.value }))}
            className="w-full bg-midnight-dark border border-midnight-light rounded-lg px-4 py-3 text-midnight-lightest placeholder:text-midnight-light focus:border-fire focus:outline-none"
          />
          <input
            type="email"
            placeholder="Email professionnel *"
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            className="w-full bg-midnight-dark border border-midnight-light rounded-lg px-4 py-3 text-midnight-lightest placeholder:text-midnight-light focus:border-fire focus:outline-none"
          />
          <input
            type="tel"
            placeholder="Téléphone (optionnel)"
            value={form.phone}
            onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
            className="w-full bg-midnight-dark border border-midnight-light rounded-lg px-4 py-3 text-midnight-lightest placeholder:text-midnight-light focus:border-fire focus:outline-none"
          />
          <input
            type="text"
            placeholder="Nom de l'entreprise *"
            value={form.companyName}
            onChange={(e) => setForm((f) => ({ ...f, companyName: e.target.value }))}
            className="w-full bg-midnight-dark border border-midnight-light rounded-lg px-4 py-3 text-midnight-lightest placeholder:text-midnight-light focus:border-fire focus:outline-none"
          />
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={form.consentRgpd}
              onChange={(e) => setForm((f) => ({ ...f, consentRgpd: e.target.checked }))}
              className="mt-1 w-5 h-5 accent-fire"
            />
            <span className="text-sm text-midnight-lighter">
              J'accepte que Grow Up Consulting utilise mes données pour m'envoyer mon rapport et me recontacter.{" "}
              <a href="/politique-de-confidentialite" className="text-fire underline" target="_blank">
                Politique de confidentialité
              </a>
            </span>
          </label>
          <button
            onClick={handleSubmit}
            disabled={!isValid || status === "sending"}
            className="w-full bg-fire hover:bg-fire-dark disabled:opacity-30 disabled:cursor-not-allowed text-white font-bold py-4 rounded-lg transition-colors cursor-pointer"
          >
            {status === "sending" ? "Envoi en cours..." : "Recevoir mon rapport"}
          </button>
          {status === "error" && (
            <p className="text-red-400 text-sm text-center">
              Une erreur est survenue. Veuillez réessayer.
            </p>
          )}
        </div>
        <div className="text-center mt-8 pt-8 border-t border-midnight-dark">
          <p className="text-midnight-lighter text-sm mb-3">Ou passez directement à l'action</p>
          <a
            href="https://calendly.com/growup-consulting/audit-clear-up"
            target="_blank"
            rel="noopener noreferrer"
            className="text-fire font-semibold hover:underline"
          >
            Réservez votre Audit CLEAR UP (30 min offertes) →
          </a>
        </div>
      </div>
    </motion.div>
  );
}
```

- [ ] **Step 3: Wire into App.tsx**

Update `src/App.tsx` — final version:

```tsx
import { useAuditState } from "./hooks/useAuditState";
import { Landing } from "./components/Landing";
import { Profiling } from "./components/Profiling";
import { ProcessPicker } from "./components/ProcessPicker";
import { ProcessQuestions } from "./components/questions";
import { Results } from "./components/Results";
import { LeadCapture } from "./components/LeadCapture";

export default function App() {
  const audit = useAuditState();

  return (
    <div className="min-h-screen bg-midnight-darkest">
      {audit.state.step === 0 && <Landing onStart={audit.start} />}
      {audit.state.step === 1 && <Profiling onSubmit={audit.setProfile} />}
      {audit.state.step === 2 && <ProcessPicker onSelect={audit.selectProcess} />}
      {audit.state.step === 3 && audit.state.selectedProcess && (
        <ProcessQuestions processId={audit.state.selectedProcess} onSubmit={audit.submitAnswers} />
      )}
      {audit.state.step === 4 && audit.state.result && audit.state.selectedProcess && (
        <Results result={audit.state.result} processId={audit.state.selectedProcess} onShowLeadForm={audit.showLeadForm} />
      )}
      {audit.state.step === 5 && <LeadCapture auditState={audit.state} />}
    </div>
  );
}
```

- [ ] **Step 4: Verify full flow end-to-end**

Open dev server. Go through all 5 screens. On the last screen, fill form and submit. Without Supabase configured, it should log the payload to console and show the success screen with Calendly link.

- [ ] **Step 5: Commit**

```bash
git add GrowUp_Lead_magnet/src/components/LeadCapture.tsx GrowUp_Lead_magnet/src/lib/supabase.ts GrowUp_Lead_magnet/src/App.tsx
git commit -m "feat: add LeadCapture screen (screen 5) with Supabase integration"
```

---

## Task 11: Supabase schema setup

**Files:**
- Create: `GrowUp_Lead_magnet/supabase/schema.sql`

- [ ] **Step 1: Create SQL schema file**

Create `supabase/schema.sql`:

```sql
-- Audit Flash — Lead Magnet #1
-- Run this on the dedicated Supabase instance via SQL Editor

CREATE TABLE IF NOT EXISTS audit_leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT now(),

  -- Profil
  first_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company_name TEXT NOT NULL,
  sector TEXT NOT NULL,
  team_size INTEGER NOT NULL,
  revenue_range TEXT NOT NULL,

  -- Audit
  selected_process TEXT NOT NULL,
  answers JSONB NOT NULL,

  -- Resultats calcules
  annual_cost NUMERIC NOT NULL,
  cost_breakdown JSONB NOT NULL,
  radar_scores JSONB NOT NULL,
  suggested_stack JSONB NOT NULL,
  automation_monthly_cost NUMERIC NOT NULL,
  roi_weeks INTEGER NOT NULL,

  -- Tracking
  pdf_sent BOOLEAN DEFAULT FALSE,
  pdf_sent_at TIMESTAMPTZ,
  calendly_clicked BOOLEAN DEFAULT FALSE,
  source TEXT,
  utm_campaign TEXT,
  utm_medium TEXT,

  -- RGPD
  consent_rgpd BOOLEAN NOT NULL DEFAULT FALSE,
  consent_date TIMESTAMPTZ DEFAULT now(),
  data_deletion_date TIMESTAMPTZ DEFAULT (now() + INTERVAL '12 months')
);

CREATE INDEX IF NOT EXISTS idx_audit_leads_email ON audit_leads(email);
CREATE INDEX IF NOT EXISTS idx_audit_leads_created_at ON audit_leads(created_at);
CREATE INDEX IF NOT EXISTS idx_audit_leads_sector ON audit_leads(sector);

ALTER TABLE audit_leads ENABLE ROW LEVEL SECURITY;

-- Anonymous users can only insert (with consent)
CREATE POLICY "Allow anonymous insert"
  ON audit_leads FOR INSERT
  TO anon
  WITH CHECK (consent_rgpd = TRUE);

-- Service role has full access (for n8n workflow)
CREATE POLICY "Service role full access"
  ON audit_leads FOR ALL
  TO service_role
  USING (TRUE);
```

- [ ] **Step 2: Commit**

```bash
git add GrowUp_Lead_magnet/supabase/
git commit -m "feat: add Supabase schema for audit_leads table"
```

---

## Task 12: Privacy policy & legal pages

**Files:**
- Create: `src/components/PrivacyPolicy.tsx`
- Create: `src/components/LegalNotice.tsx`
- Modify: `src/App.tsx` (add hash-based routing for legal pages)

- [ ] **Step 1: Create PrivacyPolicy component**

Create `src/components/PrivacyPolicy.tsx`:

```tsx
export function PrivacyPolicy() {
  return (
    <div className="min-h-screen px-6 py-12 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Politique de confidentialité</h1>
      <div className="space-y-6 text-midnight-lighter leading-relaxed">
        <section>
          <h2 className="text-xl font-bold text-midnight-lightest mb-2">Responsable du traitement</h2>
          <p>Grow Up Consulting — Christopher Da Silva<br />
          Email : contact@growup-consulting.fr</p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-midnight-lightest mb-2">Données collectées</h2>
          <p>Dans le cadre de l'outil Audit Flash, nous collectons :</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Prénom, adresse email, téléphone (optionnel), nom de l'entreprise</li>
            <li>Secteur d'activité, taille d'équipe, tranche de CA</li>
            <li>Réponses au questionnaire et résultats calculés</li>
          </ul>
        </section>
        <section>
          <h2 className="text-xl font-bold text-midnight-lightest mb-2">Finalité</h2>
          <p>Vos données sont utilisées pour :</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Vous envoyer votre rapport d'audit personnalisé</li>
            <li>Vous recontacter dans le cadre de nos offres de conseil</li>
          </ul>
        </section>
        <section>
          <h2 className="text-xl font-bold text-midnight-lightest mb-2">Base légale</h2>
          <p>Consentement explicite (article 6.1.a du RGPD).</p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-midnight-lightest mb-2">Durée de conservation</h2>
          <p>12 mois à compter de la soumission. Suppression automatique au-delà.</p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-midnight-lightest mb-2">Sous-traitants</h2>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Supabase Inc. — hébergement base de données (serveurs EU)</li>
            <li>Brevo (Sendinblue) — envoi d'emails (France)</li>
            <li>Notion Labs — CRM interne (USA, clauses contractuelles types)</li>
          </ul>
        </section>
        <section>
          <h2 className="text-xl font-bold text-midnight-lightest mb-2">Vos droits</h2>
          <p>Vous disposez d'un droit d'accès, de rectification et de suppression de vos données.
          Pour exercer ces droits, contactez-nous à contact@growup-consulting.fr. Délai de réponse : 30 jours maximum.</p>
        </section>
      </div>
      <div className="mt-10">
        <a href="/" className="text-fire hover:underline">← Retour à l'audit</a>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Add hash routing to App.tsx**

Update `src/App.tsx` to handle `#privacy` and `#legal`:

```tsx
import { useState, useEffect } from "react";
import { useAuditState } from "./hooks/useAuditState";
import { Landing } from "./components/Landing";
import { Profiling } from "./components/Profiling";
import { ProcessPicker } from "./components/ProcessPicker";
import { ProcessQuestions } from "./components/questions";
import { Results } from "./components/Results";
import { LeadCapture } from "./components/LeadCapture";
import { PrivacyPolicy } from "./components/PrivacyPolicy";

export default function App() {
  const audit = useAuditState();
  const [hash, setHash] = useState(window.location.hash);

  useEffect(() => {
    const onHashChange = () => setHash(window.location.hash);
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  if (hash === "#privacy") return <PrivacyPolicy />;

  return (
    <div className="min-h-screen bg-midnight-darkest">
      {audit.state.step === 0 && <Landing onStart={audit.start} />}
      {audit.state.step === 1 && <Profiling onSubmit={audit.setProfile} />}
      {audit.state.step === 2 && <ProcessPicker onSelect={audit.selectProcess} />}
      {audit.state.step === 3 && audit.state.selectedProcess && (
        <ProcessQuestions processId={audit.state.selectedProcess} onSubmit={audit.submitAnswers} />
      )}
      {audit.state.step === 4 && audit.state.result && audit.state.selectedProcess && (
        <Results result={audit.state.result} processId={audit.state.selectedProcess} onShowLeadForm={audit.showLeadForm} />
      )}
      {audit.state.step === 5 && <LeadCapture auditState={audit.state} />}
    </div>
  );
}
```

- [ ] **Step 3: Update privacy link in LeadCapture**

In `src/components/LeadCapture.tsx`, change the privacy link from `/politique-de-confidentialite` to `#privacy`:

```tsx
<a href="#privacy" className="text-fire underline" target="_blank">
```

- [ ] **Step 4: Commit**

```bash
git add GrowUp_Lead_magnet/src/components/PrivacyPolicy.tsx GrowUp_Lead_magnet/src/components/LeadCapture.tsx GrowUp_Lead_magnet/src/App.tsx
git commit -m "feat: add privacy policy page and hash-based routing"
```

---

## Task 13: Run all tests & final verification

- [ ] **Step 1: Run full test suite**

```bash
cd "/Users/growupconsulting/Documents/Grow Up Consulting/growup-hub/GrowUp_Lead_magnet"
npx vitest run
```

Expected: All calculation tests and state machine tests PASS.

- [ ] **Step 2: Run TypeScript check**

```bash
npx tsc --noEmit
```

Expected: No type errors.

- [ ] **Step 3: Run build**

```bash
npm run build
```

Expected: Build succeeds. dist/ directory is generated.

- [ ] **Step 4: Visual QA — go through each of the 6 process paths**

Start dev server. For each of the 6 processes, complete the full flow from Landing to LeadCapture. Verify:
- Animations are smooth
- Numbers make sense
- Radar chart renders
- Form submission works (console.log without Supabase)

- [ ] **Step 5: Commit any fixes**

If any issues found, fix and commit.

---

## Task 14: Deployment configuration

**Files:**
- Create: `GrowUp_Lead_magnet/nginx.conf`

- [ ] **Step 1: Create Nginx config for SPA**

Create `nginx.conf`:

```nginx
server {
    listen 80;
    server_name audit.growup-consulting.fr;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl;
    server_name audit.growup-consulting.fr;

    # SSL certs managed by Let's Encrypt / certbot
    ssl_certificate /etc/letsencrypt/live/audit.growup-consulting.fr/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/audit.growup-consulting.fr/privkey.pem;

    root /var/www/audit-flash/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

- [ ] **Step 2: Commit**

```bash
git add GrowUp_Lead_magnet/nginx.conf
git commit -m "feat: add Nginx config for audit.growup-consulting.fr deployment"
```
