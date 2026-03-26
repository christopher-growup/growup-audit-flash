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
    expect(result.annualCost).toBeGreaterThan(10000);
    expect(result.annualCost).toBeLessThan(11000);
    expect(result.costBreakdown).toHaveLength(2);
    expect(result.costBreakdown[0].label).toContain("temps");
    expect(result.costBreakdown[1].label).toContain("résorerie");
  });
});

describe("calculateReporting", () => {
  it("calculates annual cost for weekly reporting with many sources", () => {
    const result = calculateReporting(
      { frequence: "hebdo", nbSources: "6+", tempsParReporting: 4, quiCompile: "dirigeant" },
      "services_conseil",
      "1-3M"
    );
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
    // Saisie: 200*(15/60)*12*40 = 24000
    // Erreurs: 200*0.2*3500*12*0.02 = 33600
    // Total ≈ 57600
    expect(result.annualCost).toBeGreaterThan(50000);
    expect(result.annualCost).toBeLessThan(65000);
  });
});

describe("calculateCommercial", () => {
  it("calculates realistic loss with conversion rate and margin", () => {
    const result = calculateCommercial(
      { nbLeads: 50, tempsContact: "> 48h", tauxConversion: "< 5%", outilCrm: "aucun" },
      "agence",
      "1-3M"
    );
    // Leads perdus: 50*0.78 = 39/mois
    // Marge manquée: 39*0.03*8000*0.25*12 = 28080
    // Suivi: 50*1.0*40*12 = 24000
    // Total ≈ 52080
    expect(result.annualCost).toBeGreaterThan(40000);
    expect(result.annualCost).toBeLessThan(60000);
  });
});

describe("calculateOnboarding", () => {
  it("calculates for growing company", () => {
    const result = calculateOnboarding(
      { nbRecrutements: 20, dureeOnboarding: "1_mois", nbEtapes: "5-15", quiCoordonne: "manager" },
      "services_conseil",
      "3-10M"
    );
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
    // 5 * 2 * 220 * 40 = 88000 (base, avant scaling salarial)
    expect(result.annualCost).toBe(88000);
    expect(result.costBreakdown).toHaveLength(1);
  });
});

describe("calculateProcess (dispatcher with salary scaling)", () => {
  it("scales cost based on salary", () => {
    // Avec salaire par défaut (3000€ brut), ratio ≈ 0.8137
    const result = calculateProcess(
      "admin",
      { nbPersonnes: 3, heuresJour: 1, typeTaches: "saisie", outilsPrincipaux: "excel" },
      "autre",
      "<500K",
      3000
    );
    // Base: 3*1*220*40 = 26400, scaled: 26400 * 0.8137 ≈ 21482
    expect(result.annualCost).toBeGreaterThan(21000);
    expect(result.annualCost).toBeLessThan(22000);
  });

  it("scales higher with higher salary", () => {
    const result = calculateProcess(
      "admin",
      { nbPersonnes: 3, heuresJour: 1, typeTaches: "saisie", outilsPrincipaux: "excel" },
      "autre",
      "<500K",
      5000
    );
    // 5000€ brut → chargé horaire = 5000*12*1.45/1607 ≈ 54.26€/h → ratio ≈ 1.356
    // Base: 26400 * 1.356 ≈ 35810
    expect(result.annualCost).toBeGreaterThan(35000);
    expect(result.annualCost).toBeLessThan(37000);
  });
});
