/**
 * ------------------------------------------------------------
 * RTT/1 — Graph Worker Router Tests
 * Module: API.Route.Worker.Graph.Test
 * Coherence: Declared
 * ------------------------------------------------------------
 */

import { describe, it, expect } from "vitest";
import GraphWorker from "./route.worker.graph.js?worker";

describe("RTT/1 Graph Worker Router", () => {
  it("analyzes each node in the graph and emits partials", async () => {
    const worker = new GraphWorker();

    const partials = [];
    const final = await new Promise((resolve) => {
      worker.onmessage = (e) => {
        const msg = e.data;

        if (msg.partial) partials.push(msg.partial);
        if (msg.result) resolve(msg);
      };

      worker.postMessage({
        route: "graph-analyze",
        payload: {
          graph: {
            nodes: [
              { id: "A", payload: { text: "alpha" } },
              { id: "B", payload: { text: "beta" } }
            ],
            edges: [{ from: "A", to: "B" }]
          }
        }
      });
    });

    expect(partials.length).toBe(2);
    partials.forEach((p) => {
      expect(p).toHaveProperty("analysis");
      expect(p).toHaveProperty("report");
    });

    expect(final.ok).toBe(true);
    expect(final.route).toBe("graph-analyze");
    expect(final.result.nodes.length).toBe(2);

    worker.terminate();
  });

  it("generates reports per node", async () => {
    const worker = new GraphWorker();

    const final = await new Promise((resolve) => {
      worker.onmessage = (e) => resolve(e.data);

      worker.postMessage({
        route: "graph-report",
        payload: {
          graph: {
            nodes: [
              { id: "X", payload: { text: "hello" } }
            ],
            edges: []
          }
        }
      });
    });

    expect(final.ok).toBe(true);
    expect(final.result.nodes[0]).toHaveProperty("report");

    worker.terminate();
  });

  it("returns error for unknown graph route", async () => {
    const worker = new GraphWorker();

    const result = await new Promise((resolve) => {
      worker.onmessage = (e) => resolve(e.data);
      worker.postMessage({ route: "unknown-route" });
    });

    expect(result.result).toHaveProperty("error");

    worker.terminate();
  });
});

