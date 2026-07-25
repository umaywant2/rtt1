/**
 * RTT/1 — Example Graph Generator
 * Module: Examples.Graph
 * Version: 1.0.0-alpha
 */

import { exampleGraph } from "./example-bundle.js";
import { exampleClarity } from "./example-bundle.js";

export function exampleSuiteGraph() {
  const nodes = exampleGraph.nodes.map((node, index) => ({
    id: node.id,
    label: node.label ?? `Node ${index + 1}`,
    payload: node.payload,
    clarity_surface: exampleClarity.clarity_surface,
    clarity_scan: exampleClarity.clarity_scan
  }));

  return {
    nodes,
    edges: exampleGraph.edges
  };
}

