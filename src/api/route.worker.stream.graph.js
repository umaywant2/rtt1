/**
 * ------------------------------------------------------------
 * RTT/1 — Hybrid Graph + Streaming Worker Router (Annotated)
 * Module: API.Route.Worker.StreamGraph
 * Version: 1.0.0-alpha
 * Coherence: Declared
 * Purpose:
 *   Combine graph-based routing with chunked streaming analysis.
 *   Each graph node may contain chunk arrays for incremental
 *   RTT/1 substrate extraction.
 * ------------------------------------------------------------
 */

import { analyze } from "./analyze.js";
import { buildReportFromAnalysis } from "./report.js";

/**
 * Normalize graph structure:
 * - Ensure nodes is an array
 * - Ensure edges is an array
 */
function normalizeGraph(graph = {}) {
  return {
    nodes: Array.isArray(graph.nodes) ? graph.nodes : [],
    edges: Array.isArray(graph.edges) ? graph.edges : []
  };
}

/**
 * Stream chunks:
 * - Analyze each chunk
 * - Merge substrate signals/operators incrementally
 * - Emit partial results for UI streaming
 */
async function streamChunks(chunks = []) {
  const combined = { substrate: { signals: [], operators: [] } };

  for (const chunk of chunks) {
    const result = await analyze(chunk);

    combined.substrate.signals.push(...(result.substrate?.signals ?? []));
    combined.substrate.operators.push(...(result.substrate?.operators ?? []));

    self.postMessage({
      ok: true,
      route: "stream-chunk",
      partial: result
    });
  }

  return combined;
}

/**
 * Analyze a single graph node:
 * - If node contains chunks → stream them
 * - Otherwise → normal analysis
 */
async function analyzeNode(node) {
  const payload = node.payload ?? {};

  if (Array.isArray(payload.chunks)) {
    const streamed = await streamChunks(payload.chunks);
    return {
      id: node.id,
      label: node.label ?? null,
      streamed,
      report: buildReportFromAnalysis(payload, analyze)
    };
  }

  const analysis = await analyze(payload);
  return {
    id: node.id,
    label: node.label ?? null,
    analysis,
    report: buildReportFromAnalysis(payload, analyze)
  };
}

/**
 * Graph analysis:
 * - Process each node
 * - Emit partial node results
 * - Return graph-shaped hybrid output
 */
async function handleGraphAnalyze(graph = {}) {
  const g = normalizeGraph(graph);
  const results = [];

  for (const node of g.nodes) {
    const result = await analyzeNode(node);
    results.push(result);

    self.postMessage({
      ok: true,
      route: "graph-analyze",
      partial: result
    });
  }

  return { nodes: results, edges: g.edges };
}

/**
 * Graph report:
 * - Generate full RTT/1 report per node
 * - Emit partial report results
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

    self.postMessage({
      ok: true,
      route: "graph-report",
      partial: report
    });
  }

  return { nodes: reports, edges: g.edges };
}

/**
 * Metadata block:
 * - Canon RTT/1 metadata
 * - Lists all hybrid endpoints
 */
function handleMeta() {
  return {
    rtt: 1,
    module: "API.Route.Worker.StreamGraph",
    version: "1.0.0-alpha",
    environment: "worker",
    endpoints: [
      "graph-analyze",
      "graph-report",
      "stream-chunk",
      "meta"
    ]
  };
}

/**
 * Worker router:
 * - Dispatch hybrid routes
 * - Emit unified envelopes
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

      case "stream-chunk":
        result = await streamChunks(payload.chunks ?? []);
        break;

      case "meta":
        result = handleMeta();
        break;

      default:
        result = { error: `Unknown hybrid route: ${route}` };
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
