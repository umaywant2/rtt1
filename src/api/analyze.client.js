/**
 * ------------------------------------------------------------
 * RTT/1 — Browser Analyzer
 * Module: Analyzer.Core.Client
 * Version: 1.0.0-alpha
 * Coherence: Declared
 * Purpose:
 *   Perform RTT/1 substrate analysis in browser environments.
 *   Lightweight wrapper around the canonical analyzer.
 * ------------------------------------------------------------
 */

import { analyze } from "./analyze.js";

/**
 * Browser-optimized analyzer wrapper.
 */
export function analyzeClient(input = {}) {
  try {
    return analyze(input);
  } catch (err) {
    return {
      module: "Analyzer.Core.Client",
      rtt: 1,
      coherence: null,
      drift: "error",
      substrate: null,
      diagnostics: {
        issues: [`Client analyzer error: ${err.message}`],
        warnings: [],
        stats: {
          timestamp: Date.now(),
          length: 0
        }
      }
    };
  }
}

