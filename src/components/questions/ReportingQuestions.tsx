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
