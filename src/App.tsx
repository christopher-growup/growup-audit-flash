import { useState, useEffect } from "react";
import { useAuditState } from "./hooks/useAuditState";
import { Landing } from "./components/Landing";
import { Profiling } from "./components/Profiling";
import { ProcessPicker } from "./components/ProcessPicker";
import { ProcessQuestions } from "./components/questions";
import { Results } from "./components/Results";
import { PrivacyPolicy } from "./components/PrivacyPolicy";

export default function App() {
  const audit = useAuditState();
  const [hash, setHash] = useState(window.location.hash);

  useEffect(() => {
    const onHashChange = () => setHash(window.location.hash);
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  if (hash === "#privacy") return <PrivacyPolicy />;

  return (
    <div className="min-h-screen bg-midnight-darkest">
      {audit.state.step === 0 && <Landing onStart={audit.start} />}
      {audit.state.step === 1 && <Profiling onSubmit={audit.setProfile} />}
      {audit.state.step === 2 && <ProcessPicker onSelect={audit.selectProcess} />}
      {audit.state.step === 3 && audit.state.selectedProcess && (
        <ProcessQuestions processId={audit.state.selectedProcess} onSubmit={audit.submitAnswers} />
      )}
      {audit.state.step === 4 && audit.state.result && audit.state.selectedProcess && (
        <Results result={audit.state.result} processId={audit.state.selectedProcess} auditState={audit.state} />
      )}
    </div>
  );
}
