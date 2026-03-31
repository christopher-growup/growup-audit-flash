import { useState } from "react";
import { motion } from "framer-motion";
import type { AuditResult, ProcessId, AuditState, LeadFormData } from "../types/audit";
import { CostCounter } from "./results/CostCounter";
import { MaturityRadar } from "./results/RadarChart";
import { SolutionStack } from "./results/SolutionStack";
import { PROCESSES, SECTORS, REVENUE_RANGES } from "../lib/constants";
import { submitLead } from "../lib/submitLead";

type LockedMessage = {
  badge: string | null;
  badgeClass: string;
  title: React.ReactNode;
  subtitle: string;
};

function getLockedMessage(annualCost: number, processLabel: string): LockedMessage {
  const label = <span className="text-fire">{processLabel}</span>;

  // Moins de 5 000 € — pas d'alarme, juste de l'optimisation
  if (annualCost < 5_000) {
    return {
      badge: null,
      badgeClass: "",
      title: <>Ce processus n'est pas votre plus gros levier — mais il reste des gains à saisir.</>,
      subtitle:
        "On a quand même identifié des pertes de temps évitables sur votre processus de " +
        processLabel +
        ". Voici le détail.",
    };
  }

  // 5 000 – 20 000 € — coût réel mais pas alarmant
  if (annualCost < 20_000) {
    return {
      badge: "À optimiser",
      badgeClass: "text-yellow-400",
      title: <>Votre processus de {label} vous coûte plus cher qu'il ne devrait.</>,
      subtitle:
        "Pas d'urgence absolue, mais ce que vous laissez sur la table chaque année mérite d'être regardé de près.",
    };
  }

  // 20 000 – 60 000 € — fuite significative
  if (annualCost < 60_000) {
    return {
      badge: "Point d'attention",
      badgeClass: "text-orange-400",
      title: (
        <>On a identifié une fuite opérationnelle réelle sur votre processus de {label}.</>
      ),
      subtitle:
        "Le coût annuel est au-dessus de la moyenne de votre secteur. Voici ce qui se passe concrètement chez vous.",
    };
  }

  // 60 000 – 150 000 € — perte sérieuse, à l'échelle d'un recrutement
  if (annualCost < 150_000) {
    return {
      badge: "Signal fort",
      badgeClass: "text-red-400",
      title: (
        <>
          Ce processus vous coûte chaque année l'équivalent d'un recrutement à temps plein.
        </>
      ),
      subtitle:
        "Les pertes identifiées sur votre processus de " +
        processLabel +
        " sont significativement au-dessus des benchmarks de votre secteur.",
    };
  }

  // > 150 000 € — situation critique
  return {
    badge: "Diagnostic sérieux",
    badgeClass: "text-red-500",
    title: (
      <>
        Les pertes identifiées sur ce processus dépassent ce que la plupart des dirigeants
        imaginent.
      </>
    ),
    subtitle:
      "Ce n'est pas une estimation théorique — c'est le résultat de votre propre situation sur le processus de " +
      processLabel +
      ".",
  };
}

type Props = {
  result: AuditResult;
  processId: ProcessId;
  auditState: AuditState;
};

export function Results({ result, processId, auditState }: Props) {
  // TODO: remettre à false quand le webhook n8n est configuré
  const [unlocked, setUnlocked] = useState(true);
  const [form, setForm] = useState<LeadFormData>({
    firstName: "",
    email: "",
    phone: "",
    companyName: "",
    consentRgpd: false,
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const potentialAdditionalCost = Math.round(result.annualCost * 3.5);
  const processLabel = PROCESSES.find((p) => p.id === processId)?.title ?? processId;

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
      firstName: form.firstName.trim(),
      email: form.email.trim().toLowerCase(),
      phone: form.phone.trim() || null,
      companyName: form.companyName.trim(),
      sector: auditState.sector,
      teamSize: auditState.teamSize,
      avgGrossSalary: auditState.avgGrossSalary,
      revenueRange: auditState.revenueRange,
      selectedProcess: auditState.selectedProcess,
      answers: auditState.answers,
      result: {
        annualCost: auditState.result!.annualCost,
        costBreakdown: auditState.result!.costBreakdown,
        radarScores: auditState.result!.radarScores,
        suggestedStack: auditState.result!.suggestedStack,
        automationMonthlyCost: auditState.result!.automationMonthlyCost,
        roiWeeks: auditState.result!.roiWeeks,
      },
      consentRgpd: true,
      source: "audit-flash",
      utmCampaign: params.get("utm_campaign") || null,
      utmMedium: params.get("utm_medium") || null,
    };

    try {
      const { ok } = await submitLead(payload);
      if (ok) {
        setStatus("sent");
        setUnlocked(true);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen px-6 py-12 max-w-4xl mx-auto"
    >
      {!unlocked ? (
        /* ── Locked: teaser + blurred cost + email form ── */
        <div className="flex flex-col items-center">
          <div className="text-center mb-10">
            {(() => {
              const msg = getLockedMessage(result.annualCost, processLabel);
              return (
                <>
                  {msg.badge && (
                    <p
                      className={`font-bold text-sm uppercase tracking-widest mb-4 ${msg.badgeClass}`}
                    >
                      {msg.badge}
                    </p>
                  )}
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">{msg.title}</h2>
                  <p className="text-midnight-lighter text-lg">{msg.subtitle}</p>
                </>
              );
            })()}
          </div>

          {/* Blurred cost teaser */}
          <div className="w-full max-w-md text-center mb-10">
            <p className="text-midnight-lighter text-sm mb-2">Coût annuel estimé de vos pertes</p>
            <p
              className="text-5xl font-bold font-mono text-fire-light select-none"
              style={{ filter: "blur(12px)" }}
            >
              {new Intl.NumberFormat("fr-FR").format(result.annualCost)} €
            </p>
          </div>

          {/* Email capture form */}
          <div className="w-full max-w-md">
            <h3 className="text-xl font-bold text-center mb-2">
              Débloquez votre rapport complet
            </h3>
            <p className="text-midnight-lighter text-center mb-6 text-sm">
              Recevez le détail de vos pertes, le radar de maturité et le plan d'action.
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
                  <a href="#privacy" className="text-fire underline" target="_blank">
                    Politique de confidentialité
                  </a>
                </span>
              </label>
              <button
                onClick={handleSubmit}
                disabled={!isValid || status === "sending"}
                className="w-full bg-fire hover:bg-fire-dark disabled:opacity-30 disabled:cursor-not-allowed text-white font-bold py-4 rounded-lg transition-colors cursor-pointer"
              >
                {status === "sending" ? "Envoi en cours..." : "Débloquer mes résultats"}
              </button>
              {status === "error" && (
                <p className="text-red-400 text-sm text-center">
                  Une erreur est survenue. Veuillez réessayer.
                </p>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* ── Unlocked: recap + full results ── */
        <>
          {/* Récap des paramètres saisis */}
          <div className="mb-10 bg-midnight-dark rounded-xl p-6 max-w-2xl mx-auto">
            <h3 className="text-lg font-bold mb-4">Récapitulatif de votre audit</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-midnight-lighter">Secteur</span>
                <p className="font-medium">{SECTORS.find((s) => s.value === auditState.sector)?.label}</p>
              </div>
              <div>
                <span className="text-midnight-lighter">Taille d'équipe</span>
                <p className="font-medium">{auditState.teamSize} collaborateurs</p>
              </div>
              <div>
                <span className="text-midnight-lighter">Salaire brut moyen</span>
                <p className="font-medium">{new Intl.NumberFormat("fr-FR").format(auditState.avgGrossSalary)} €/mois</p>
              </div>
              <div>
                <span className="text-midnight-lighter">CA annuel</span>
                <p className="font-medium">{REVENUE_RANGES.find((r) => r.value === auditState.revenueRange)?.label}</p>
              </div>
              <div className="col-span-2">
                <span className="text-midnight-lighter">Processus analysé</span>
                <p className="font-medium text-fire">{processLabel}</p>
              </div>
            </div>
          </div>

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
            <a
              href="https://calendly.com/growup-consulting/audit-clear-up"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-fire hover:bg-fire-dark text-white font-bold text-lg px-10 py-4 rounded-lg transition-colors"
            >
              Réservez votre Audit CLEAR UP (30 min offertes)
            </a>
          </div>
        </>
      )}
    </motion.div>
  );
}
