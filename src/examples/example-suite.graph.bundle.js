import { exampleGraph, exampleClarity } from "./example-bundle.js";

export function exampleSuiteGraph() {
  return {
    nodes: exampleGraph.nodes.map((node, index) => ({
      id: node.id,
      label: node.label ?? `Node ${index + 1}`,
      payload: node.payload,
      clarity_surface: exampleClarity.clarity_surface,
      clarity_scan: exampleClarity.clarity_scan
    })),
    edges: exampleGraph.edges
  };
}

