import { useState } from "react";
import { motion } from "framer-motion";
import type { Sector, RevenueRange } from "../types/audit";
import { SECTORS, REVENUE_RANGES } from "../lib/constants";
import { Slider } from "./ui/Slider";

type ProfilingProps = {
  onSubmit: (sector: Sector, teamSize: number, avgGrossSalary: number, revenueRange: RevenueRange) => void;
};

export function Profiling({ onSubmit }: ProfilingProps) {
  const [sector, setSector] = useState<Sector | "">("");
  const [teamSize, setTeamSize] = useState(25);
  const [avgGrossSalary, setAvgGrossSalary] = useState(3000);
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
          min={1}
          max={250}
          step={1}
          value={teamSize}
          onChange={setTeamSize}
          label="Taille de l'équipe"
          unit="collaborateurs"
        />

        {/* Average gross salary */}
        <Slider
          min={1500}
          max={8000}
          step={100}
          value={avgGrossSalary}
          onChange={setAvgGrossSalary}
          label="Salaire brut moyen mensuel"
          unit="€"
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
            onClick={() => onSubmit(sector as Sector, teamSize, avgGrossSalary, revenueRange as RevenueRange)}
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
