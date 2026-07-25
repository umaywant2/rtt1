/**
 * RTT/1 — Diagnostic Router (Client)
 * Module: Diagnostics.Router.Client
 * Version: 1.0.0-alpha
 */

import { diagnosticClient } from "./diagnostic-client.js";
import { diagnosticGraph } from "./diagnostic.graph.js";

export async function diagnosticRouterClient(message = {}) {
  const { route, payload } = message;

  switch (route) {
    case "diagnostics":
      return diagnosticClient(payload);

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

