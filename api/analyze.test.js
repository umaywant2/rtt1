/* ============================================================
   RTT/1 — Front-End Integration Tests
   File: api/analyze.test.js
   Tests the front-end API wrapper (api/analyze.js)
   Session: rtt=1 | coherence=declared | drift=bounded
   ============================================================ */

import { rtt1 } from "../rtt1.js";
import mock from "../rtt1.mock.json" assert { type: "json" };
import analyze from "./analyze.js";   // front-end API wrapper

/**
 * Utility: shallow structural check
 */
function hasKeys(obj, keys) {
  return keys.every((k) => Object.prototype.hasOwnProperty.call(obj, k));
}

/**
 * Test 1 — API wrapper returns RTT/1 output structure
 */
async function test_basic_structure() {
  const input = "Test input for RTT/1 front-end integration.";

  const result = await analyze(input);

  const ok =
    hasKeys(result, ["clarity_surface"]) &&
    hasKeys(result, ["load_bearing"]) &&
    hasKeys(result, ["contradiction_scan"]) &&
    hasKeys(result, ["structural_critique"]) &&
    hasKeys(result, ["diagnostic_table"]);

  if (ok) {
    console.log("✔ PASS — basic structure");
  } else {
    console.log("✖ FAIL — basic structure");
    console.log(result);
  }
}

/**
 * Test 2 — API wrapper passes input correctly to RTT/1
 */
async function test_input_passthrough() {
  const input = "A structure with two opposing attributes.";

  const result = await analyze(input);

  if (result.clarity_surface.summary) {
    console.log("✔ PASS — input passthrough");
  } else {
    console.log("✖ FAIL — input passthrough");
  }
}

/**
 * Test 3 — API wrapper returns deterministic mock output when mocked
 */
async function test_mock_mode() {
  const result = mock.mock;

  const ok =
    result.clarity_surface &&
    result.load_bearing &&
    result.contradiction_scan &&
    result.structural_critique &&
    result.diagnostic_table;

  if (ok) {
    console.log("✔ PASS — mock mode");
  } else {
    console.log("✖ FAIL — mock mode");
  }
}

/**
 * Test 4 — API wrapper integrates with RTT/1 router
 */
async function test_router_integration() {
  const input = "Router integration test.";

  const routed = rtt1.run(input);
  const apiOut = await analyze(input);

  const ok =
    typeof routed === "object" &&
    typeof apiOut === "object" &&
    hasKeys(apiOut, ["clarity_surface"]);

  if (ok) {
    console.log("✔ PASS — router integration");
  } else {
    console.log("✖ FAIL — router integration");
  }
}

/**
 * Execute all tests
 */
async function run() {
  console.log("=== RTT/1 — Front-End Integration Tests ===\n");

  await test_basic_structure();
  await test_input_passthrough();
  await test_mock_mode();
  await test_router_integration();

  console.log("\n=== Test Suite Complete ===");
}

run();

