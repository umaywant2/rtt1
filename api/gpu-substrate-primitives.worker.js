importScripts("/src/gpu/gpu-substrate-primitives.js");

self.onmessage = (event) => {
  try {
    const result = GpuSubstratePrimitives.build(event.data.substrate);

    self.postMessage({
      ok: true,
      result
    });
  } catch (error) {
    self.postMessage({
      ok: false,
      error: error.message || "GS1-001: Invalid substrate input"
    });
  }
};
