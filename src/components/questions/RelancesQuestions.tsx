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
