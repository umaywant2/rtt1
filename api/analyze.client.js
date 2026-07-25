/* ============================================================
   RTT/1 — Browser-Optimized Front-End Wrapper
   File: api/analyze.client.js
   Session: rtt=1 | coherence=declared | drift=bounded
   ============================================================ */

import { rtt1 } from "../rtt1.js";
import mock from "../rtt1.mock.json" assert { type: "json" };

/**
 * analyzeClient(input, options)
 * Browser-facing wrapper for RTT/1 structural engine.
 *
 * Options:
 *   - mock: true  → return deterministic mock output (CI/demo mode)
 *   - debug: true → include input + session metadata
 */
export default async function analyzeClient(input, options = {}) {
  const { mock: useMock = false, debug = false } = options;

  // Mock / demo mode (no engine execution)
  if (useMock) {
    return mock.mock;
  }

  // Run RTT/1 engine directly in the browser bundle
  const output = rtt1.run(input);

  if (debug) {
    return {
      input,
      engine: "rtt1",
      session: rtt1.session,
      output
    };
  }

  return output;
}

