/**
 * ------------------------------------------------------------
 * RTT/1 — API Route Tests
 * Module: API.Route.Test
 * Coherence: Declared
 * ------------------------------------------------------------
 */

import { describe, it, expect } from "vitest";
import { route, routeAnalyze, routeReport, routeMeta } from "./route.js";
import { analyze } from "./analyze.js";

describe("RTT/1 API Router", () => {
  it("routeAnalyze returns raw analysis output", async () => {
    const input = { payload: { text: "hello" } };
    const result = await routeAnalyze(input);

    expect(result).toBeDefined();
    expect(typeof result).toBe("object");
    expect(result).toHaveProperty("clarity_surface");
  });

  it("routeReport returns full RTT/1 report object", async () => {
    const input = { payload: { text: "hello" } };
    const result = await routeReport(input);

    expect(result).toBeDefined();
    expect(result).toHaveProperty("meta");
    expect(result).toHaveProperty("substrate");
    expect(result).toHaveProperty("diagnostics");
    expect(result).toHaveProperty("payload");
  });

  it("routeMeta returns API metadata", () => {
    const meta = routeMeta();

    expect(meta).toBeDefined();
    expect(meta).toHaveProperty("rtt", 1);
    expect(meta).toHaveProperty("module", "API.Route");
    expect(meta).toHaveProperty("endpoints");
  });

  it("route() dispatches to analyze", async () => {
    const result = await route("analyze", { payload: { text: "test" } });

    expect(result).toBeDefined();
    expect(result).toHaveProperty("clarity_surface");
  });

  it("route() dispatches to report", async () => {
    const result = await route("report", { payload: { text: "test" } });

    expect(result).toBeDefined();
    expect(result).toHaveProperty("meta");
    expect(result.meta).toHaveProperty("rtt", 1);
  });

  it("route() dispatches to meta", () => {
    const result = route("meta");

    expect(result).toBeDefined();
    expect(result).toHaveProperty("endpoints");
  });

  it("route() returns error for unknown route", async () => {
    const result = await route("unknown");

    expect(result).toHaveProperty("error");
  });
});

