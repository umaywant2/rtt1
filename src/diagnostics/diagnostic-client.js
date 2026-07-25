/**
 * RTT/1 — Diagnostic Client
 * Module: Diagnostics.Client
 * Version: 1.0.0-alpha
 */

import { diagnosticEngine } from "./diagnostic-engine.js";

export function diagnosticClient(input = {}) {
  try {
    return diagnosticEngine(input);
  } catch (err) {
    return {
      issues: [`Client diagnostic error: ${err.message}`],
      warnings: [],
      stats: {
        timestamp: Date.now(),
        length: 0
      }
    };
  }
}
