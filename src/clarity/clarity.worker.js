/**
 * ------------------------------------------------------------
 * RTT/1 — Clarity Worker
 * Module: Clarity.Worker
 * Version: 1.0.0-alpha
 * Coherence: Declared
 * Purpose:
 *   Extract clarity-surface + clarity-scan inside a Worker context.
 *   This module is used by graph routers, streaming routers,
 *   and hybrid clarity pipelines.
 * ------------------------------------------------------------
 */

import { analyze } from "../api/analyze.js";

function extractClaritySurface(input = {}) {
  const analysis = analyze(input);

  return {
    summary: analysis.substrate?.summary ?? null,
    signals: analysis.substrate?.signals ?? [],
    operators: analysis.substrate?.operators ?? [],
    coherence: analysis.coherence ?? "declared",
    drift: analysis.drift ?? "bounded",
    paradox: "structural"
  };
}

function extractClarityScan(surface) {
  return {
    anchors: surface.signals.filter(s => s.length > 6),
    tensions: [],
    gaps: [],
    load_bearing: surface.operators.slice(0, 3),
    stability: surface.signals.length > 3 ? "stable" : "weak"
  };
}

export function clarityWorker(input = {}) {
  const clarity_surface = extractClaritySurface(input);
  const clarity_scan = extractClarityScan(clarity_surface);

  return {
    clarity_surface,
    clarity_scan,
    diagnostics: {
      issues: [],
      warnings: [],
      stats: {
        timestamp: Date.now(),
        length: typeof input.text === "string" ? input.text.length : 0
      }
    }
  };
}

