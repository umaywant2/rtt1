/* ============================================================
   RTT/1 — Automated Pipeline Test Runner
   Uses: rtt1.js router + rtt1.test.json harness
   Session: rtt=1 | coherence=declared | drift=bounded
   ============================================================ */

import { rtt1 } from "./rtt1.js";
import tests from "./rtt1.test.json" assert { type: "json" };

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

    if (Array.isArray(exp)) {
      if (!Array.isArray(act)) {
        errors.push(`Type mismatch at ${fullPath}: expected array`);
        continue;
      }
    }

    if (typeof exp === "object" && exp !== null) {
      errors.push(...compare(exp, act, fullPath));
    } else {
      // Primitive comparison (non‑strict)
      if (typeof act !== typeof exp) {
        errors.push(`Type mismatch at ${fullPath}: expected ${typeof exp}, got ${typeof act}`);
      }
    }
  }

  return errors;
}

/**
 * Execute all RTT/1 tests
 */
function runTests() {
  console.log("=== RTT/1 Structural Engine — Test Runner ===\n");

  tests.tests.forEach((test) => {
    console.log(`Running test: ${test.id}`);
    console.log(`Description: ${test.description}`);

    const output = rtt1.run(test.input);

    const errors = compare(test.expected, output);

    if (errors.length === 0) {
      console.log(`✔ PASS — ${test.id}\n`);
    } else {
      console.log(`✖ FAIL — ${test.id}`);
      console.log("Errors:");
      errors.forEach((e) => console.log("  - " + e));
      console.log();
    }
  });

  console.log("=== Test Runner Complete ===");
}

runTests();

