/**
 * ------------------------------------------------------------
 * RTT/1 — Client Router
 * Module: API.Route.Client
 * Version: 1.0.0-alpha
 * Coherence: Declared
 * Purpose:
 *   Provide a browser-friendly API surface for RTT/1 analysis
 *   and reporting without requiring server infrastructure.
 * ------------------------------------------------------------
 */

import { analyze } from "./analyze.js";
import { buildReport, buildReportFromAnalysis } from "./report.js";

/**
 * ------------------------------------------------------------
 * Client: analyze(payload)
 * ------------------------------------------------------------
 */
export async function clientAnalyze(payload = {}) {
  // Browser-safe: no req object, no server assumptions
  return analyze(payload);
}

/**
 * ------------------------------------------------------------
 * Client: report(payload)
 * ------------------------------------------------------------
 */
export async function clientReport(payload = {}) {
  return buildReportFromAnalysis(payload, analyze);
}

/**
 * ------------------------------------------------------------
 * Client: meta()
 * ------------------------------------------------------------
 */
export function clientMeta() {
  return {
    rtt: 1,
    module: "API.Route.Client",
    version: "1.0.0-alpha",
    environment: "browser",
    endpoints: ["analyze", "report", "meta"]
  };
}

/**
 * ------------------------------------------------------------
 * Unified client router
 * ------------------------------------------------------------
 */
export async function routeClient(name, payload = {}) {
  switch (name) {
    case "analyze":
      return clientAnalyze(payload);
    case "report":
      return clientReport(payload);
    case "meta":
      return clientMeta();
    default:
      return { error: `Unknown client route: ${name}` };
  }
}

