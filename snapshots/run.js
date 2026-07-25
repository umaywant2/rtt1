/* ============================================================
   RTT/1 — Snapshot Runner
   File: snapshots/run.js
   Session: rtt=1 | coherence=declared | drift=bounded
   ============================================================ */

import { rtt1 } from "../rtt1.js";

// Snapshot imports
import claritySnap from "./clarity_surface.snapshot.json" assert { type: "json" };
import loadSnap from "./load_bearing.snapshot.json" assert { type: "json" };
import contradictionSnap from "./contradiction_scan.snapshot.json" assert { type: "json" };
import critiqueSnap from "./structural_critique.snapshot.json" assert { type: "json" };
import diagnosticSnap from "./diagnostic_surface.snapshot.json" assert { type: "json" };
import fullSnap from "./full_pipeline.snapshot.json" assert { type: "json" };

/**
 * Deep comparison helper
 */
function compare(expected, actual, path = "") {
  const errors = [];

  for (const key of Object.keys(expected)) {
    const fullPath = path ? `${path}.${key}` : key;

    if (!(key in actual)) {
      errors.push(`Missing key: ${fullPath}`);
      continue;
    }

    const exp = expected[key];
    const act = actual[key];

    if (typeof exp === "object" && exp !== null) {
      errors.push(...compare(exp, act, fullPath));
    }
  }

  return errors;
}

/**
 * Run a single snapshot test
 */
function runSnapshot(name, snapshot, actual) {
  const errors = compare(snapshot, actual);

  if (errors.length === 0) {
    console.log(`✔ PASS — ${name}`);
  } else {
    console.log(`✖ FAIL — ${name}`);
    errors.forEach((e) => console.log("  - " + e));
  }
}

/**
 * Execute all snapshot tests
 */
function run() {
  console.log("=== RTT/1 — Snapshot Runner ===\n");

  const input = "Mock input for RTT/1 snapshot testing.";
  const output = rtt1.run(input);

  runSnapshot("clarity_surface", claritySnap.clarity_surface, output.clarity_surface);
  runSnapshot("load_bearing", loadSnap.load_bearing, output.load_bearing);
  runSnapshot("contradiction_scan", contradictionSnap.contradiction_scan, output.contradiction_scan);
  runSnapshot("structural_critique", critiqueSnap.structural_critique, output.structural_critique);
  runSnapshot("diagnostic_surface", diagnosticSnap.diagnostic_surface, output.diagnostic_surface);

  console.log("\nFull pipeline snapshot:");
  runSnapshot("full_pipeline", fullSnap, {
    engine: "rtt1",
    version: "1.0.0",
    session: rtt1.session,
    ...output
  });

  console.log("\n=== Snapshot Runner Complete ===");
}

run();

