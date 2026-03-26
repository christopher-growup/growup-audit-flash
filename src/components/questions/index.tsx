import { motion } from "framer-motion";
import type { ProcessId, ProcessAnswers } from "../../types/audit";
import { PROCESSES } from "../../lib/constants";
import { RelancesQuestions } from "./RelancesQuestions";
import { ReportingQuestions } from "./ReportingQuestions";
import { FacturationQuestions } from "./FacturationQuestions";
import { CommercialQuestions } from "./CommercialQuestions";
import { OnboardingQuestions } from "./OnboardingQuestions";
import { AdminQuestions } from "./AdminQuestions";

const QUESTION_COMPONENTS: Record<ProcessId, React.ComponentType<{ onSubmit: (a: any) => void }>> = {
  relances: RelancesQuestions,
  reporting: ReportingQuestions,
  facturation: FacturationQuestions,
  commercial: CommercialQuestions,
  onboarding: OnboardingQuestions,
  admin: AdminQuestions,
};

type Props = {
  processId: ProcessId;
  onSubmit: (answers: ProcessAnswers) => void;
};

export function ProcessQuestions({ processId, onSubmit }: Props) {
  const QuestionComponent = QUESTION_COMPONENTS[processId];
  const processTitle = PROCESSES.find((p) => p.id === processId)?.title ?? "";

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen flex items-center justify-center px-6 py-12"
    >
      <div className="w-full max-w-xl">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">
          {processTitle}
        </h2>
        <p className="text-midnight-lighter text-center mb-10">
          Quelques questions pour estimer le coût de ce processus
        </p>
        <QuestionComponent onSubmit={onSubmit} />
      </div>
    </motion.div>
  );
}
