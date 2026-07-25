/* ============================================================
   RTT/1 — Front-End API Wrapper
   File: api/analyze.js
   Session: rtt=1 | coherence=declared | drift=bounded
   ============================================================ */

import { rtt1 } from "../rtt1.js";
import mock from "../rtt1.mock.json" assert { type: "json" };

/**
 * analyze(input, options)
 * Front-end wrapper for RTT/1 structural engine.
 *
 * Options:
 *   - mock: true  → return deterministic mock output (CI mode)
 *   - debug: true → return router output + raw input
 */
export default async function analyze(input, options = {}) {
  const { mock: useMock = false, debug = false } = options;

  // CI / deterministic mode
  if (useMock) {
    return mock.mock;
  }

  // Run RTT/1 engine
  const output = rtt1.run(input);

  // Debug mode returns additional metadata
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
