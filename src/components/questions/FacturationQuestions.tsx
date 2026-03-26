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
