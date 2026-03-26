import { useState } from "react";
import type { OnboardingAnswers } from "../../types/audit";
import { Slider } from "../ui/Slider";
import { ChoiceGroup } from "../ui/ChoiceGroup";

type Props = { onSubmit: (answers: OnboardingAnswers) => void };

export function OnboardingQuestions({ onSubmit }: Props) {
  const [nbRecrutements, setNbRecrutements] = useState(5);
  const [dureeOnboarding, setDureeOnboarding] = useState<OnboardingAnswers["dureeOnboarding"] | "">("");
  const [nbEtapes, setNbEtapes] = useState<OnboardingAnswers["nbEtapes"] | "">("");
  const [quiCoordonne, setQuiCoordonne] = useState<OnboardingAnswers["quiCoordonne"] | "">("");

  const isValid = dureeOnboarding !== "" && nbEtapes !== "" && quiCoordonne !== "";

  return (
    <div className="space-y-8">
      <Slider min={1} max={50} value={nbRecrutements} onChange={setNbRecrutements} label="Nombre de recrutements par an" />
      <ChoiceGroup label="Durée moyenne d'onboarding" options={[
        { value: "1_sem", label: "1 semaine" }, { value: "2_sem", label: "2 semaines" },
        { value: "1_mois", label: "1 mois" }, { value: "> 1_mois", label: "> 1 mois" },
      ]} value={dureeOnboarding} onChange={setDureeOnboarding} />
      <ChoiceGroup label="Nombre d'étapes / documents à traiter" options={[
        { value: "< 5", label: "Moins de 5" }, { value: "5-15", label: "5 à 15" }, { value: "> 15", label: "Plus de 15" },
      ]} value={nbEtapes} onChange={setNbEtapes} columns={3} />
      <ChoiceGroup label="Qui coordonne ?" options={[
        { value: "rh", label: "RH" }, { value: "manager", label: "Manager" },
        { value: "nouveau", label: "Le nouveau lui-même" }, { value: "pas_de_process", label: "Pas de process" },
      ]} value={quiCoordonne} onChange={setQuiCoordonne} />
      <div className="text-center pt-4">
        <button onClick={() => onSubmit({ nbRecrutements, dureeOnboarding: dureeOnboarding as OnboardingAnswers["dureeOnboarding"], nbEtapes: nbEtapes as OnboardingAnswers["nbEtapes"], quiCoordonne: quiCoordonne as OnboardingAnswers["quiCoordonne"] })} disabled={!isValid}
          className="bg-fire hover:bg-fire-dark disabled:opacity-30 disabled:cursor-not-allowed text-white font-bold px-10 py-4 rounded-lg transition-colors cursor-pointer">
          Voir mes résultats
        </button>
      </div>
    </div>
  );
}
