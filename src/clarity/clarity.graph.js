/**
 * RTT/1 — Graph-Aware Clarity Extractor
 * Module: Clarity.Graph
 * Version: 1.0.0-alpha
 */

import { clarityWorker } from "./clarity.worker.js";

function normalizeGraph(graph = {}) {
  return {
    nodes: Array.isArray(graph.nodes) ? graph.nodes : [],
    edges: Array.isArray(graph.edges) ? graph.edges : []
  };
}

async function analyzeNode(node) {
  const input = node.payload ?? {};
  const clarity = clarityWorker(input);

  return {
    id: node.id,
    label: node.label ?? null,
    clarity_surface: clarity.clarity_surface,
    clarity_scan: clarity.clarity_scan,
    diagnostics: clarity.diagnostics
  };
}

export async function clarityGraph(graph = {}) {
  const g = normalizeGraph(graph);
  const nodes = [];

  for (const node of g.nodes) {
    const result = await analyzeNode(node);
    nodes.push(result);
  }

  return {
    nodes,
    edges: g.edges
  };
}

