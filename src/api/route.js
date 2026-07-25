/**
 * ------------------------------------------------------------
 * RTT/1 — API Router
 * Module: API.Route
 * Version: 1.0.0-alpha
 * Coherence: Declared
 * Purpose:
 *   Define the public API surface for RTT/1 analysis and reporting.
 * ------------------------------------------------------------
 */

import { analyze } from "./analyze.js";
import { buildReport, buildReportFromAnalysis } from "./report.js";

/**
 * ------------------------------------------------------------
 * Route: /analyze
 * Input: { payload }
 * Output: raw analysis object
 * ------------------------------------------------------------
 */
export async function routeAnalyze(req) {
  const input = req?.payload ?? {};
  return analyze(input);
}

/**
 * ------------------------------------------------------------
 * Route: /report
 * Input: { payload }
 * Output: full RTT/1 report object
 * ------------------------------------------------------------
 */
export async function routeReport(req) {
  const input = req?.payload ?? {};
  return buildReportFromAnalysis(input, analyze);
}

/**
 * ------------------------------------------------------------
 * Route: /meta
 * Input: none
 * Output: RTT/1 API metadata
 * ------------------------------------------------------------
 */
export function routeMeta() {
  return {
    rtt: 1,
    module: "API.Route",
    version: "1.0.0-alpha",
    endpoints: ["analyze", "report", "meta"]
  };
}

/**
 * ------------------------------------------------------------
 * Unified router
 * ------------------------------------------------------------
 */
export async function route(name, req = {}) {
  switch (name) {
    case "analyze":
      return routeAnalyze(req);
    case "report":
      return routeReport(req);
    case "meta":
      return routeMeta();
    default:
      return { error: `Unknown route: ${name}` };
  }
}

