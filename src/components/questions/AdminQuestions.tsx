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
