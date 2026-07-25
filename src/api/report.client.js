{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "RTT/1 Report Schema",
  "description": "Canonical RTT/1 report object produced by report.js and report.worker.js.",
  "type": "object",

  "properties": {
    "meta": {
      "type": "object",
      "required": ["module", "timestamp", "rtt", "coherence", "drift"],
      "properties": {
        "module": { "type": "string" },
        "timestamp": { "type": "number" },
        "rtt": { "type": "number" },
        "coherence": { "type": ["number", "null"] },
        "drift": { "type": ["string", "null"] }
      }
    },

    "substrate": {
      "type": "object",
      "required": ["summary", "signals", "operators"],
      "properties": {
        "summary": { "type": ["string", "null"] },
        "signals": {
          "type": "array",
          "items": { "type": "string" }
        },
        "operators": {
          "type": "array",
          "items": { "type": "string" }
        }
      }
    },

    "diagnostics": {
      "type": "object",
      "required": ["issues", "warnings", "stats"],
      "properties": {
        "issues": {
          "type": "array",
          "items": { "type": "string" }
        },
        "warnings": {
          "type": "array",
          "items": { "type": "string" }
        },
        "stats": {
          "type": "object",
          "properties": {
            "timestamp": { "type": "number" },
            "length": { "type": "number" }
          }
        }
      }
    },

    "payload": {
      "type": "object",
      "required": ["input", "analysis"],
      "properties": {
        "input": { "type": "object" },
        "analysis": { "$ref": "#/definitions/AnalysisOutput" }
      }
    }
  },

  "required": ["meta", "substrate", "diagnostics", "payload"],

  "definitions": {
    "AnalysisOutput": {
      "type": "object",
      "properties": {
        "module": { "type": "string" },
        "rtt": { "type": "number" },
        "coherence": { "type": ["number", "null"] },
        "drift": { "type": ["string", "null"] },
        "substrate": {
          "type": ["object", "null"],
          "properties": {
            "summary": { "type": ["string", "null"] },
            "signals": { "type": "array", "items": { "type": "string" } },
            "operators": { "type": "array", "items": { "type": "string" } }
          }
        },
        "diagnostics": {
          "type": "object",
          "properties": {
            "issues": { "type": "array", "items": { "type": "string" } },
            "warnings": { "type": "array", "items": { "type": "string" } },
            "stats": { "type": "object" }
          }
        }
      }
    }
  }
}

