/**
 * RTT/1 — Example Suite Graph (Singularity Bundle)
 * Final irreversible tier: includes nodes, edges, clarity_surface,
 * clarity_scan, session metadata, geometry, regime, meta, and
 * singularity markers.
 */

import { exampleGraph, exampleClarity } from "./example-bundle.js";

export function exampleSuiteGraphSingularity() {
  return {
    engine: "rtt1",
    version: "1.0.0-alpha",

    session: {
      rtt: 1,
      coherence: "declared",
      drift: "bounded",
      paradox: "structural",
      singularity: true
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
      regime: "singularity",
      collapse: "none"
    },

    meta: {
      tier: "singularity",
      strictness: "irreversible",
      completeness: "total",
      finality: "absolute"
    }
  };
}

