/* ============================================================
   RTT/1 — Snapshot Schema Validator
   File: mock-snapshots/schema.test.js
   Session: rtt=1 | coherence=declared | drift=bounded
   ============================================================ */

import Ajv from "ajv";
import addFormats from "ajv-formats";

// Load schema
import schema from "./schema.json" assert { type: "json" };

// Load snapshots
import clarity from "./clarity_surface.snapshot.json" assert { type: "json" };
import load from "./load_bearing.snapshot.json" assert { type: "json" };
import contradiction from "./contradiction_scan.snapshot.json" assert { type: "json" };
import critique from "./structural_critique.snapshot.json" assert { type: "json" };
import diagnostic from "./diagnostic_surface.snapshot.json" assert { type: "json" };
import full from "./full_pipeline.snapshot.json" assert { type: "json" };

// AJV setup
const ajv = new Ajv({ allErrors: true, strict: false });
addFormats(ajv);

const validate = ajv.compile(schema);

/**
 * Run a validation test for a snapshot
 */
function testSnapshot(name, data) {
  const valid = validate(data);

  if (valid) {
    console.log(`✔ PASS — ${name}`);
  } else {
    console.log(`✖ FAIL — ${name}`);
    console.log("Errors:");
    for (const err of validate.errors) {
      console.log(`  - ${err.instancePath} ${err.message}`);
    }
  }
}

/**
 * Execute all schema validation tests
 */
function run() {
  console.log("=== RTT/1 — Snapshot Schema Validation ===\n");

  testSnapshot("clarity_surface.snapshot.json", clarity);
  testSnapshot("load_bearing.snapshot.json", load);
  testSnapshot("contradiction_scan.snapshot.json", contradiction);
  testSnapshot("structural_critique.snapshot.json", critique);
  testSnapshot("diagnostic_surface.snapshot.json", diagnostic);
  testSnapshot("full_pipeline.snapshot.json", full);

  console.log("\n=== Schema Validation Complete ===");
}

run();

