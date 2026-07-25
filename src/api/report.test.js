/**
 * ------------------------------------------------------------
 * RTT/1 — Report Generator Tests
 * Module: Analyzer.Report.Test
 * Coherence: Declared
 * ------------------------------------------------------------
 */

import { describe, it, expect } from "vitest";
import { buildWorkerReport } from "./report.worker.js";

describe("RTT/1 Worker Report Generator", () => {
  it("generates a full RTT/1 report object", () => {
    const input = { text: "hello world this is RTT1" };
    const report = buildWorkerReport(input);

    expect(report).toHaveProperty("meta");
    expect(report).toHaveProperty("substrate");
    expect(report).toHaveProperty("diagnostics");
    expect(report).toHaveProperty("payload");

    expect(report.meta).toHaveProperty("rtt", 1);
    expect(report.payload.input).toEqual(input);
  });

  it("propagates coherence and drift from analysis", () => {
    const input = { text: "error condition triggered" };
    const report = buildWorkerReport(input);

    expect(report.meta.coherence).toBeDefined();
    expect(report.meta.drift).toBe("high");
  });

  it("includes substrate signals and operators", () => {
    const input = { text: "alpha beta gamma delta epsilon" };
    const report = buildWorkerReport(input);

    expect(report.substrate.signals.length).toBeGreaterThan(0);
    expect(report.substrate.operators.length).toBeGreaterThan(0);
  });
});

