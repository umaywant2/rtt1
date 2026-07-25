/**
 * ------------------------------------------------------------
 * RTT/1 — Worker Streaming Router
 * Module: API.Route.Worker.Stream
 * Version: 1.0.0-alpha
 * Coherence: Declared
 * Purpose:
 *   Provide streaming analysis for massive payloads using
 *   incremental chunk processing inside a Web Worker.
 * ------------------------------------------------------------
 */

import { analyze } from "./analyze.js";

/**
 * ------------------------------------------------------------
 * Chunked streaming analysis
 * ------------------------------------------------------------
 */
async function streamAnalyze(chunks = []) {
  const partial = [];
  let combined = {};

  for (const chunk of chunks) {
    const result = await analyze(chunk);
    partial.push(result);

    // Merge substrate signals incrementally
    combined = {
      ...combined,
      substrate: {
        signals: [
          ...(combined.substrate?.signals ?? []),
          ...(result.substrate?.signals ?? [])
        ],
        operators: [
          ...(combined.substrate?.operators ?? []),
          ...(result.substrate?.operators ?? [])
        ]
      }
    };

    // Emit partial result
    self.postMessage({
      ok: true,
      route: "stream-analyze",
      partial: result
    });
  }

  return combined;
}

/**
 * ------------------------------------------------------------
 * Worker message router (streaming)
 * ------------------------------------------------------------
 */
self.onmessage = async (event) => {
  const { route, payload } = event.data;

  try {
    let result;

    switch (route) {
      case "stream-analyze":
        result = await streamAnalyze(payload.chunks ?? []);
        break;

      default:
        result = { error: `Unknown streaming route: ${route}` };
        break;
    }

    self.postMessage({
      ok: true,
      route,
      result
    });
  } catch (err) {
    self.postMessage({
      ok: false,
      route,
      error: err.message || String(err)
    });
  }
};

