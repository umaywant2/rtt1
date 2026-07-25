/**
 * ------------------------------------------------------------
 * RTT/1 — Client Router Tests
 * Module: API.Route.Client.Test
 * Coherence: Declared
 * ------------------------------------------------------------
 */

import { describe, it, expect } from "vitest";
import {
  clientAnalyze,
  clientReport,
  clientMeta,
  routeClient
} from "./route.client.js";

describe("RTT/1 Client Router", () => {
  it("clientAnalyze returns raw analysis output", async () => {
    const result = await clientAnalyze({ text: "hello" });

    expect(result).toBeDefined();
    expect(typeof result).toBe("object");
    expect(result).toHaveProperty("clarity_surface");
  });

  it("clientReport returns full RTT/1 report object", async () => {
    const result = await clientReport({ text: "hello" });

    expect(result).toBeDefined();
    expect(result).toHaveProperty("meta");
    expect(result).toHaveProperty("substrate");
    expect(result).toHaveProperty("diagnostics");
    expect(result).toHaveProperty("payload");
  });

  it("clientMeta returns client metadata", () => {
    const meta = clientMeta();

    expect(meta).toBeDefined();
    expect(meta).toHaveProperty("rtt", 1);
    expect(meta).toHaveProperty("module", "API.Route.Client");
    expect(meta).toHaveProperty("environment", "browser");
  });

  it("routeClient dispatches to analyze", async () => {
    const result = await routeClient("analyze", { text: "test" });

    expect(result).toBeDefined();
    expect(result).toHaveProperty("clarity_surface");
  });

  it("routeClient dispatches to report", async () => {
    const result = await routeClient("report", { text: "test" });

    expect(result).toBeDefined();
    expect(result).toHaveProperty("meta");
    expect(result.meta).toHaveProperty("rtt", 1);
  });

  it("routeClient dispatches to meta", () => {
    const result = routeClient("meta");

    expect(result).toBeDefined();
    expect(result).toHaveProperty("endpoints");
  });

  it("routeClient returns error for unknown route", async () => {
    const result = await routeClient("unknown");

    expect(result).toHaveProperty("error");
  });
});

