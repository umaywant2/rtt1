/**
 * ------------------------------------------------------------
 * RTT/1 — Offloaded Report Generator (Worker Edition)
 * Module: Analyzer.Report.Worker
 * Version: 1.0.0-alpha
 * Coherence: Declared
 * Purpose:
 *   Generate RTT/1 reports inside a worker context.
 *   Wraps analyze() and produces a stable RTT/1 report object.
 * ------------------------------------------------------------
 */

import { analyze } from "./analyze.js";

export function buildWorkerReport(input = {}) {
  const analysis = analyze(input);

  return {
    meta: {
      module: "Analyzer.Report.Worker",
      timestamp: Date.now(),
      rtt: 1,
      coherence: analysis.coherence,
      drift: analysis.drift
    },

    substrate: {
      summary: analysis.substrate.summary,
      signals: analysis.substrate.signals,
      operators: analysis.substrate.operators
    },

    diagnostics: analysis.diagnostics,

    payload: {
      input,
      analysis
    }
  };
}

/**
 * Convenience wrapper for worker pipelines.
 */
export function buildWorkerReportFromAnalysis(input, analyzeFn = analyze) {
  const analysis = analyzeFn(input);

  return {
    meta: {
      module: "Analyzer.Report.Worker",
      timestamp: Date.now(),
      rtt: 1,
      coherence: analysis.coherence,
      drift: analysis.drift
    },

    substrate: analysis.substrate,
    diagnostics: analysis.diagnostics,

    payload: {
      input,
      analysis
    }
  };
}
