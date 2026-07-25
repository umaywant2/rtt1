/**
 * ------------------------------------------------------------
 * RTT/1 — Hybrid Graph + Streaming Worker Router Tests
 * Module: API.Route.Worker.StreamGraph.Test
 * Coherence: Declared
 * ------------------------------------------------------------
 */

import { describe, it, expect } from "vitest";
import StreamGraphWorker from "./route.worker.stream.graph.js?worker";

describe("RTT/1 Hybrid Graph + Streaming Worker Router", () => {
  it("streams chunk analysis for nodes containing chunk arrays", async () => {
    const worker = new StreamGraphWorker();

    const partialChunks = [];
    const final = await new Promise((resolve) => {
      worker.onmessage = (e) => {
        const msg = e.data;

        if (msg.route === "stream-chunk" && msg.partial) {
          partialChunks.push(msg.partial);
        }

        if (msg.result) resolve(msg);
      };

      worker.postMessage({
        route: "graph-analyze",
        payload: {
          graph: {
            nodes: [
              {
                id: "A",
                payload: {
                  chunks: [
                    { text: "chunk 1" },
                    { text: "chunk 2" }
                  ]
                }
              }
            ],
            edges: []
          }
        }
      });
    });

    expect(partialChunks.length).toBe(2);
    partialChunks.forEach((p) => {
      expect(p).toHaveProperty("substrate");
    });

    expect(final.ok).toBe(true);
    expect(final.result.nodes.length).toBe(1);
    expect(final.result.nodes[0]).toHaveProperty("streamed");

    worker.terminate();
  });

  it("runs normal graph analysis for nodes without chunks", async () => {
    const worker = new StreamGraphWorker();

    const final = await new Promise((resolve) => {
      worker.onmessage = (e) => resolve(e.data);

      worker.postMessage({
        route: "graph-analyze",
        payload: {
          graph: {
            nodes: [
              { id: "B", payload: { text: "plain node" } }
            ],
            edges: []
          }
        }
      });
    });

    expect(final.ok).toBe(true);
    expect(final.result.nodes[0]).toHaveProperty("analysis");

    worker.terminate();
  });

  it("returns error for unknown hybrid route", async () => {
    const worker = new StreamGraphWorker();

    const result = await new Promise((resolve) => {
      worker.onmessage = (e) => resolve(e.data);
      worker.postMessage({ route: "unknown-route" });
    });

    expect(result.result).toHaveProperty("error");

    worker.terminate();
  });
});

