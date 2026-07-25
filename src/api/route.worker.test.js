/**
 * ------------------------------------------------------------
 * RTT/1 — Worker Router Tests
 * Module: API.Route.Worker.Test
 * Coherence: Declared
 * ------------------------------------------------------------
 */

import { describe, it, expect } from "vitest";

// Worker entrypoint
import WorkerRouter from "./route.worker.js?worker";

describe("RTT/1 Worker Router", () => {
  it("dispatches analyze route and returns raw analysis output", async () => {
    const worker = new WorkerRouter();

    const result = await new Promise((resolve) => {
      worker.onmessage = (e) => resolve(e.data);
      worker.postMessage({ route: "analyze", payload: { text: "hello" } });
    });

    expect(result.ok).toBe(true);
    expect(result.route).toBe("analyze");
    expect(result.result).toHaveProperty("clarity_surface");

    worker.terminate();
  });

  it("dispatches report route and returns full RTT/1 report object", async () => {
    const worker = new WorkerRouter();

    const result = await new Promise((resolve) => {
      worker.onmessage = (e) => resolve(e.data);
      worker.postMessage({ route: "report", payload: { text: "hello" } });
    });

    expect(result.ok).toBe(true);
    expect(result.route).toBe("report");
    expect(result.result).toHaveProperty("meta");
    expect(result.result).toHaveProperty("substrate");
    expect(result.result).toHaveProperty("diagnostics");
    expect(result.result).toHaveProperty("payload");

    worker.terminate();
  });

  it("dispatches meta route and returns worker metadata", async () => {
    const worker = new WorkerRouter();

    const result = await new Promise((resolve) => {
      worker.onmessage = (e) => resolve(e.data);
      worker.postMessage({ route: "meta" });
    });

    expect(result.ok).toBe(true);
    expect(result.route).toBe("meta");
    expect(result.result).toHaveProperty("rtt", 1);
    expect(result.result).toHaveProperty("module", "API.Route.Worker");
    expect(result.result).toHaveProperty("environment", "worker");

    worker.terminate();
  });

  it("returns error for unknown route", async () => {
    const worker = new WorkerRouter();

    const result = await new Promise((resolve) => {
      worker.onmessage = (e) => resolve(e.data);
      worker.postMessage({ route: "unknown" });
    });

    expect(result.ok).toBe(true);
    expect(result.route).toBe("unknown");
    expect(result.result).toHaveProperty("error");

    worker.terminate();
  });
});

