/**
 * RTT/1 — Graph Diagnostics
 * Module: Diagnostics.Graph
 * Version: 1.0.0-alpha
 */

import { diagnosticWorker } from "./diagnostic-worker.js";

function normalizeGraph(graph = {}) {
  return {
    nodes: Array.isArray(graph.nodes) ? graph.nodes : [],
    edges: Array.isArray(graph.edges) ? graph.edges : []
  };
}

async function analyzeNode(node) {
  const payload = node.payload ?? {};
  const diagnostics = diagnosticWorker(payload);

  return {
    id: node.id,
    label: node.label ?? null,
    diagnostics
  };
}

export async function diagnosticGraph(graph = {}) {
  const g = normalizeGraph(graph);
  const nodes = [];

  for (const node of g.nodes) {
    nodes.push(await analyzeNode(node));
  }

  return {
    nodes,
    edges: g.edges
  };
}

