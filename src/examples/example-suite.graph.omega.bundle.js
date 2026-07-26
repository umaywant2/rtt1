/**
 * RTT/1 — Example Suite Graph (Omega Bundle)
 * Final strictness tier: includes nodes, edges, clarity_surface,
 * clarity_scan, session metadata, geometry, regime, and omega meta.
 */

import { exampleGraph, exampleClarity } from "./example-bundle.js";

export function exampleSuiteGraphOmega() {
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
      anchors: ["clarity_surface", "clarity_scan"],
      regime: "omega"
    },

    meta: {
      tier: "omega",
      strictness: "final",
      completeness: "total"
    }
  };
}

