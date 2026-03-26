import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useAuditState } from "../useAuditState";

describe("useAuditState", () => {
  it("starts at step 0", () => {
    const { result } = renderHook(() => useAuditState());
    expect(result.current.state.step).toBe(0);
  });

  it("advances to step 1 on start", () => {
    const { result } = renderHook(() => useAuditState());
    act(() => result.current.start());
    expect(result.current.state.step).toBe(1);
  });

  it("sets profile with salary and advances to step 2", () => {
    const { result } = renderHook(() => useAuditState());
    act(() => result.current.start());
    act(() =>
      result.current.setProfile("services_conseil", 50, 3500, "1-3M")
    );
    expect(result.current.state.step).toBe(2);
    expect(result.current.state.sector).toBe("services_conseil");
    expect(result.current.state.teamSize).toBe(50);
    expect(result.current.state.avgGrossSalary).toBe(3500);
    expect(result.current.state.revenueRange).toBe("1-3M");
  });

  it("sets process and advances to step 3", () => {
    const { result } = renderHook(() => useAuditState());
    act(() => result.current.start());
    act(() => result.current.setProfile("agence", 20, 3000, "500K-1M"));
    act(() => result.current.selectProcess("commercial"));
    expect(result.current.state.step).toBe(3);
    expect(result.current.state.selectedProcess).toBe("commercial");
  });

  it("submits answers, calculates result with salary scaling, advances to step 4", () => {
    const { result } = renderHook(() => useAuditState());
    act(() => result.current.start());
    // 3000€ brut → chargé horaire = 3000*12*1.45/1607 ≈ 32.55€/h → ratio ≈ 0.8137
    act(() => result.current.setProfile("services_conseil", 30, 3000, "1-3M"));
    act(() => result.current.selectProcess("admin"));
    act(() =>
      result.current.submitAnswers({
        nbPersonnes: 3,
        heuresJour: 2,
        typeTaches: "saisie",
        outilsPrincipaux: "excel",
      })
    );
    expect(result.current.state.step).toBe(4);
    expect(result.current.state.result).not.toBeNull();
    // Base: 3*2*220*40 = 52800, scaled: 52800 * (32.55/40) ≈ 42966
    const cost = result.current.state.result!.annualCost;
    expect(cost).toBeGreaterThan(42000);
    expect(cost).toBeLessThan(44000);
  });
});
