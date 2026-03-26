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
          <p className="text-midnight-lighter text-sm mb-1">Licences logicielles (Make, n8n, etc.)</p>
          <p className="text-2xl font-bold font-mono text-green-400">
            ~{automationMonthlyCost} €<span className="text-sm text-midnight-lighter"> / mois</span>
          </p>
        </div>
        <div className="bg-midnight-dark rounded-xl p-6">
          <p className="text-midnight-lighter text-sm mb-1">Ingénierie &amp; Déploiement (Grow Up)</p>
          <p className="text-base font-semibold text-fire">
            Amorti en moins de {roiWeeks} semaines grâce aux pertes stoppées.
          </p>
        </div>
      </div>
    </div>
  );
}
