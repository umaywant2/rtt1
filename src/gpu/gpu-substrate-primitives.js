/**
 * RTT/1 — GPU Substrate Primitives
 * --------------------------------
 * Converts OpenGPU substrate nodes/edges into RTT/1 primitive clarity objects.
 */

export const GpuSubstratePrimitives = {
  version: "2026.1",

  build(substrate) {
    if (!substrate || !substrate.nodes || !substrate.edges) {
      throw new Error("GS1-001: Invalid substrate input");
    }

    return {
      engine: "RTT/1",
      operator: "gpu-substrate-primitives",
      version: this.version,

      primitives: substrate.nodes.map(n => ({
        id: n.id,
        label: n.label,
        tier: n.tier
      })),

      relationships: substrate.edges.map(e => ({
        from: e.from,
        to: e.to,
        weight: e.weight
      }))
    };
  }
};

