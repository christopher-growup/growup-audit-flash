import { useState, useCallback } from "react";
import type { AuditState, Sector, RevenueRange, ProcessId, ProcessAnswers } from "../types/audit";
import { calculateProcess } from "../lib/calculations";

const initialState: AuditState = {
  step: 0,
  sector: null,
  teamSize: 50,
  avgGrossSalary: 3000,
  revenueRange: null,
  selectedProcess: null,
  answers: null,
  result: null,
};

export function useAuditState() {
  const [state, setState] = useState<AuditState>(initialState);

  const start = useCallback(() => {
    setState((s) => ({ ...s, step: 1 }));
  }, []);

  const setProfile = useCallback(
    (sector: Sector, teamSize: number, avgGrossSalary: number, revenueRange: RevenueRange) => {
      setState((s) => ({ ...s, sector, teamSize, avgGrossSalary, revenueRange, step: 2 }));
    },
    []
  );

  const selectProcess = useCallback((processId: ProcessId) => {
    setState((s) => ({ ...s, selectedProcess: processId, step: 3 }));
  }, []);

  const submitAnswers = useCallback((answers: ProcessAnswers) => {
    setState((s) => {
      const result = calculateProcess(
        s.selectedProcess!,
        answers,
        s.sector!,
        s.revenueRange!,
        s.avgGrossSalary
      );
      return { ...s, answers, result, step: 4 };
    });
  }, []);

  const reset = useCallback(() => {
    setState(initialState);
  }, []);

  return { state, start, setProfile, selectProcess, submitAnswers, reset };
}
