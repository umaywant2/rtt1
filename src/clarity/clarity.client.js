/**
 * ------------------------------------------------------------
 * RTT/1 — Clarity Client
 * Module: Clarity.Client
 * Version: 1.0.0-alpha
 * Coherence: Declared
 * Purpose:
 *   Extract clarity-surface + clarity-scan in browser environments.
 *   Lightweight version of clarity.worker.js.
 * ------------------------------------------------------------
 */

import { analyzeClient } from "../api/analyze.client.js";

function extractSurface(input) {
  const analysis = analyzeClient(input);

  return {
    summary: analysis.substrate?.summary ?? null,
    signals: analysis.substrate?.signals ?? [],
    operators: analysis.substrate?.operators ?? [],
    coherence: analysis.coherence ?? "declared",
    drift: analysis.drift ?? "bounded",
    paradox: "structural"
  };
}

function extractScan(surface) {
  return {
    anchors: surface.signals.filter(s => s.length > 6),
    tensions: [],
    gaps: [],
    load_bearing: surface.operators.slice(0, 3),
    stability: surface.signals.length > 3 ? "stable" : "weak"
  };
}

export function clarityClient(input = {}) {
  const clarity_surface = extractSurface(input);
  const clarity_scan = extractScan(clarity_surface);

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

