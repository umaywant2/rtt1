/* ============================================================
   RTT/1 — Web Worker Diff Engine
   File: assets/js/rtt1.worker.js
   Session: rtt=1 | coherence=declared | drift=bounded
   ============================================================ */

/**
 * Deep structural diff between two JSON objects.
 * Returns a list of diff entries:
 *   { path, type: "add" | "remove" | "change", before, after }
 */
function diffJSON(a, b, path = "") {
  const diffs = [];

  const isObj = (v) => v && typeof v === "object" && !Array.isArray(v);

  // Keys in both objects
  const keys = new Set([...Object.keys(a || {}), ...Object.keys(b || {})]);

  for (const key of keys) {
    const fullPath = path ? `${path}.${key}` : key;
    const av = a?.[key];
    const bv = b?.[key];

    // Added
    if (av === undefined && bv !== undefined) {
      diffs.push({
        path: fullPath,
        type: "add",
        before: undefined,
        after: bv
      });
      continue;
    }

    // Removed
    if (av !== undefined && bv === undefined) {
      diffs.push({
        path: fullPath,
        type: "remove",
        before: av,
        after: undefined
      });
      continue;
    }

    // Both exist — compare
    if (isObj(av) && isObj(bv)) {
      diffs.push(...diffJSON(av, bv, fullPath));
      continue;
    }

    // Arrays — compare structurally
    if (Array.isArray(av) && Array.isArray(bv)) {
      if (JSON.stringify(av) !== JSON.stringify(bv)) {
        diffs.push({
          path: fullPath,
          type: "change",
          before: av,
          after: bv
        });
      }
      continue;
    }

    // Primitive change
    if (av !== bv) {
      diffs.push({
        path: fullPath,
        type: "change",
        before: av,
        after: bv
      });
    }
  }

  return diffs;
}

/**
 * Generate a patch object from diffs.
 * Useful for applying changes or visualizing structural drift.
 */
function generatePatch(diffs) {
  const patch = {};
  for (const d of diffs) {
    patch[d.path] = { type: d.type, before: d.before, after: d.after };
  }
  return patch;
}

/**
 * Worker message handler
 */
self.onmessage = async (event) => {
  const { type, a, b } = event.data;

  try {
    if (type === "diff") {
      const diffs = diffJSON(a, b);
      const patch = generatePatch(diffs);

      self.postMessage({
        ok: true,
        mode: "diff",
        diffs,
        patch,
        count: diffs.length
      });
      return;
    }

    if (type === "snapshot-diff") {
      const { snapshotA, snapshotB } = event.data;

      const diffs = diffJSON(snapshotA, snapshotB);
      const patch = generatePatch(diffs);

      self.postMessage({
        ok: true,
        mode: "snapshot-diff",
        diffs,
        patch,
        count: diffs.length
      });
      return;
    }

    self.postMessage({
      ok: false,
      error: `Unknown worker command: ${type}`
    });
  } catch (err) {
    self.postMessage({
      ok: false,
      error: err.message || String(err)
    });
  }
};

