/**
 * ------------------------------------------------------------
 * RTT/1 — Client Router (Worker Edition)
 * Module: API.Route.Client.Worker
 * Version: 1.0.0-alpha
 * Coherence: Declared
 * Purpose:
 *   Provide a browser-friendly API surface for RTT/1 analysis
 *   and reporting, executed inside a Web Worker to keep the UI
 *   thread responsive.
 * ------------------------------------------------------------
 */

import { analyze } from "./analyze.js";
import { buildReportFromAnalysis } from "./report.js";

/**
 * ------------------------------------------------------------
 * Worker-safe route handlers
 * ------------------------------------------------------------
 */
async function handleAnalyze(payload = {}) {
  return analyze(payload);
}

async function handleReport(payload = {}) {
  return buildReportFromAnalysis(payload, analyze);
}

function handleMeta() {
  return {
    rtt: 1,
    module: "API.Route.Client.Worker",
    version: "1.0.0-alpha",
    environment: "worker",
    endpoints: ["analyze", "report", "meta"]
  };
}

/**
 * ------------------------------------------------------------
 * Worker message router
 * ------------------------------------------------------------
 */
self.onmessage = async (event) => {
  const { route, payload } = event.data;

  try {
    let result;

    switch (route) {
      case "analyze":
        result = await handleAnalyze(payload);
        break;

      case "report":
        result = await handleReport(payload);
        break;

      case "meta":
        result = handleMeta();
        break;

      default:
        result = { error: `Unknown client worker route: ${route}` };
        break;
    }

    self.postMessage({ ok: true, route, result });
  } catch (err) {
    self.postMessage({
      ok: false,
      route,
      error: err.message || String(err)
    });
  }
};

