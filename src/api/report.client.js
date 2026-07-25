/**
 * ------------------------------------------------------------
 * RTT/1 — Browser Report Generator (Annotated)
 * Module: Analyzer.Report.Client
 * Version: 1.0.0-alpha
 * Coherence: Declared
 * Purpose:
 *   Generate RTT/1 reports in browser environments.
 *   Wraps analyzeClient() or analyze() and produces canonical
 *   RTT/1 report objects for UI pipelines.
 * ------------------------------------------------------------
 */

import { analyzeClient } from "./analyze.client.js";

/**
 * Build a full RTT/1 report using the browser analyzer.
 */
export function buildClientReport(input = {}) {
  const analysis = analyzeClient(input);

  return {
    meta: {
      module: "Analyzer.Report.Client",
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
