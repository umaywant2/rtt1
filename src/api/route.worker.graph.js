/**
 * ------------------------------------------------------------
 * RTT/1 — Graph-Based Worker Router
 * Module: API.Route.Worker.Graph
 * Version: 1.0.0-alpha
 * Coherence: Declared
 * Purpose:
 *   Provide graph-aware routing inside a Web Worker. This router
 *   processes node-based payloads, runs RTT/1 analysis per node,
 *   and emits graph-shaped results suitable for UI visualization.
 * ------------------------------------------------------------
 */

import { analyze } from "./analyze.js";
import { buildReportFromAnalysis } from "./report.js";

/**
 * ------------------------------------------------------------
 * Graph utilities
 * ------------------------------------------------------------
 */
function normalizeGraph(graph = {}) {
  return {
    nodes: Array.isArray(graph.nodes) ? graph.nodes : [],
    edges: Array.isArray(graph.edges) ? graph.edges : []
  };
}

async function analyzeNode(node) {
  const analysis = await analyze(node.payload ?? {});
  return {
    id: node.id,
    label: node.label ?? null,
    analysis,
    report: buildReportFromAnalysis(node.payload ?? {}, analyze)
  };
}

/**
 * ------------------------------------------------------------
 * Graph route: analyze each node and return graph-shaped output
 * ------------------------------------------------------------
 */
async function handleGraphAnalyze(graph = {}) {
  const g = normalizeGraph(graph);

  const results = [];
  for (const node of g.nodes) {
    const result = await analyzeNode(node);
    results.push(result);

    // Emit partial node result for live graph UIs
    self.postMessage({
      ok: true,
      route: "graph-analyze",
      partial: result
    });
  }

  return {
    nodes: results,
    edges: g.edges
  };
}

/**
 * ------------------------------------------------------------
 * Graph route: full report per node
 * ------------------------------------------------------------
 */
async function handleGraphReport(graph = {}) {
  const g = normalizeGraph(graph);

  const reports = [];
  for (const node of g.nodes) {
    const analysis = await analyze(node.payload ?? {});
    const report = buildReportFromAnalysis(node.payload ?? {}, analyze);

    reports.push({
      id: node.id,
      label: node.label ?? null,
      report
    });

    // Emit partial report for streaming UIs
    self.postMessage({
      ok: true,
      route: "graph-report",
      partial: report
    });
  }

  return {
    nodes: reports,
    edges: g.edges
  };
}

/**
 * ------------------------------------------------------------
 * Metadata
 * ------------------------------------------------------------
 */
function handleMeta() {
  return {
    rtt: 1,
    module: "API.Route.Worker.Graph",
    version: "1.0.0-alpha",
    environment: "worker",
    endpoints: ["graph-analyze", "graph-report", "meta"]
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
      case "graph-analyze":
        result = await handleGraphAnalyze(payload.graph ?? {});
        break;

      case "graph-report":
        result = await handleGraphReport(payload.graph ?? {});
        break;

      case "meta":
        result = handleMeta();
        break;

      default:
        result = { error: `Unknown graph worker route: ${route}` };
        break;
    }

    self.postMessage({
      ok: true,
      route,
      result
    });
  } catch (err) {
    self.postMessage({
      ok: false,
      route,
      error: err.message || String(err)
    });
  }
};

