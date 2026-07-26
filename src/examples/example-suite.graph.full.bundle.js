/**
 * RTT/1 — Example Suite Graph (Full Bundle)
 * Includes: nodes, edges, clarity_surface, clarity_scan
 */

import { exampleGraph, exampleClarity } from "./example-bundle.js";

export function exampleSuiteGraphFull() {
  return {
    engine: "rtt1",
    version: "1.0.0-alpha",
    session: {
      rtt: 1,
      coherence: "declared",
      drift: "bounded",
      paradox: "structural"
    },

    nodes: exampleGraph.nodes.map((node, index) => ({
      id: node.id,
      label: node.label ?? `Node ${index + 1}`,
      payload: node.payload,
      clarity_surface: exampleClarity.clarity_surface,
      clarity_scan: exampleClarity.clarity_scan
    })),

    edges: exampleGraph.edges,

    geometry: {
      shape: "linear",
      anchors: ["clarity_surface", "clarity_scan"]
    }
  };
}

