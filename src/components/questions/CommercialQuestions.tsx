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
