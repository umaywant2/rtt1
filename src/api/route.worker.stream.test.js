/**
 * ------------------------------------------------------------
 * RTT/1 — Worker Streaming Router Tests
 * Module: API.Route.Worker.Stream.Test
 * Coherence: Declared
 * ------------------------------------------------------------
 */

import { describe, it, expect } from "vitest";
import StreamWorker from "./route.worker.stream.js?worker";

describe("RTT/1 Worker Streaming Router", () => {
  it("streams partial analysis results for each chunk", async () => {
    const worker = new StreamWorker();

    const partials = [];
    const final = await new Promise((resolve) => {
      worker.onmessage = (e) => {
        const msg = e.data;

        if (msg.partial) {
          partials.push(msg.partial);
        }

        if (msg.result) {
          resolve(msg);
        }
      };

      worker.postMessage({
        route: "stream-analyze",
        payload: {
          chunks: [
            { text: "chunk A" },
            { text: "chunk B" },
            { text: "chunk C" }
          ]
        }
      });
    });

    expect(partials.length).toBe(3);
    partials.forEach((p) => {
      expect(p).toHaveProperty("clarity_surface");
    });

    expect(final.ok).toBe(true);
    expect(final.route).toBe("stream-analyze");
    expect(final.result).toHaveProperty("substrate");

    worker.terminate();
  });

  it("returns error for unknown streaming route", async () => {
    const worker = new StreamWorker();

    const result = await new Promise((resolve) => {
      worker.onmessage = (e) => resolve(e.data);
      worker.postMessage({ route: "unknown-stream-route" });
    });

    expect(result.ok).toBe(true);
    expect(result.result).toHaveProperty("error");

    worker.terminate();
  });
});

