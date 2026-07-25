/**
 * ------------------------------------------------------------
 * RTT/1 — Report Generator
 * Module: Analyzer.Report
 * Version: 1.0.0-alpha
 * Coherence: Declared
 * Purpose:
 *   Convert raw analysis output into a structured RTT/1 report
 *   suitable for UI modules, workers, pipelines, and diagnostics.
 * ------------------------------------------------------------
 */

export function buildReport({
  module = "unknown",
  input = {},
  analysis = {},
  diagnostics = {},
  timestamp = Date.now()
}) {
  return {
    meta: {
      module,
      timestamp,
      rtt: 1,
      coherence: analysis.coherence ?? null,
      drift: analysis.drift ?? null
    },

    substrate: {
      summary: analysis.substrate?.summary ?? null,
      signals: analysis.substrate?.signals ?? [],
      operators: analysis.substrate?.operators ?? []
    },

    diagnostics: {
      issues: diagnostics.issues ?? [],
      warnings: diagnostics.warnings ?? [],
      stats: diagnostics.stats ?? {}
    },

    payload: {
      input,
      analysis
    }
  };
}

/**
 * ------------------------------------------------------------
 * Convenience wrapper:
 *   buildReportFromAnalysis(input, analyze(input))
 * ------------------------------------------------------------
 */
export function buildReportFromAnalysis(input, analyzeFn) {
  const analysis = analyzeFn(input);

  return buildReport({
    module: analysis.module ?? "unknown",
    input,
    analysis,
    diagnostics: analysis.diagnostics ?? {}
  });
}

