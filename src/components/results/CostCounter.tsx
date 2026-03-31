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
        On estime que votre processus de{" "}
        <span className="text-fire font-semibold">{processTitle.toLowerCase()}</span> vous coûte
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
      <p className="text-xs text-midnight-light mt-6 max-w-lg mx-auto">
        * Estimation indicative basée sur vos paramètres et les benchmarks de notre secteur.
        L'Audit CLEAR UP permet d'affiner ce diagnostic avec vos données réelles.
      </p>
    </motion.div>
  );
}
