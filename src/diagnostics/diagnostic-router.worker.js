/**
 * RTT/1 — Diagnostic Router (Worker)
 * Module: Diagnostics.Router.Worker
 * Version: 1.0.0-alpha
 */

import { diagnosticWorker } from "./diagnostic-worker.js";
import { diagnosticGraph } from "./diagnostic.graph.js";

export async function diagnosticRouterWorker(message = {}) {
  const { route, payload } = message;

  switch (route) {
    case "diagnostics":
      return diagnosticWorker(payload);

    case "diagnostics.graph":
      return await diagnosticGraph(payload);

    default:
      return {
        issues: [`Unknown diagnostic route: ${route}`],
        warnings: [],
        stats: {
          timestamp: Date.now(),
          length: 0
        }
      };
  }
}
