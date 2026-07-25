/**
 * ------------------------------------------------------------
 * RTT/1 — Worker Analyzer Wrapper
 * Module: Analyzer.Core.Worker
 * Version: 1.0.0-alpha
 * Coherence: Declared
 * Purpose:
 *   Provide a worker-safe wrapper around analyze() for use in
 *   worker routers (route.worker.js, stream.graph.js, etc.).
 * ------------------------------------------------------------
 */

import { analyze } from "./analyze.js";

export function analyzeWorker(input = {}) {
  try {
    return analyze(input);
  } catch (err) {
    return {
      module: "Analyzer.Core.Worker",
      rtt: 1,
      coherence: null,
      drift: "error",
      substrate: null,
      diagnostics: {
        issues: [`Worker analyzer error: ${err.message}`],
        warnings: [],
        stats: { timestamp: Date.now(), length: 0 }
      }
    };
  }
}

