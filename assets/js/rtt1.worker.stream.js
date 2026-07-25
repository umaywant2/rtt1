/* ============================================================
   RTT/1 — Streaming JSON Diff Engine (Web Worker)
   File: assets/js/rtt1.worker.stream.js
   Session: rtt=1 | coherence=declared | drift=bounded
   ============================================================ */

/**
 * Streaming diff engine for massive JSON snapshots.
 * Uses a queue-based BFS traversal to avoid recursion.
 * Yields control every N steps to keep the worker responsive.
 */

const CHUNK_SIZE = 500; // number of nodes processed per yield

function isObj(v) {
  return v && typeof v === "object" && !Array.isArray(v);
}

function enqueueChildren(queue, value, path) {
  if (Array.isArray(value)) {
    value.forEach((v, i) => queue.push({ a: v, b: undefined, path: `${path}.${i}` }));
  } else if (isObj(value)) {
    Object.keys(value).forEach((k) =>
      queue.push({ a: value[k], b: undefined, path: `${path}.${k}` })
    );
  }
}

async function streamDiff(a, b) {
  const diffs = [];
  const queue = [{ a, b, path: "root" }];

  let processed = 0;

  while (queue.length > 0) {
    const { a: av, b: bv, path } = queue.shift();

    const aExists = av !== undefined;
    const bExists = bv !== undefined;

    // Added
    if (!aExists && bExists) {
      diffs.push({ path, type: "add", before: undefined, after: bv });
    }

    // Removed
    else if (aExists && !bExists) {
      diffs.push({ path, type: "remove", before: av, after: undefined });
    }

    // Both exist
    else if (aExists && bExists) {
      const bothObj = isObj(av) && isObj(bv);
      const bothArr = Array.isArray(av) && Array.isArray(bv);

      if (bothObj) {
        const keys = new Set([...Object.keys(av), ...Object.keys(bv)]);
        keys.forEach((k) =>
          queue.push({ a: av[k], b: bv[k], path: `${path}.${k}` })
        );
      } else if (bothArr) {
        const len = Math.max(av.length, bv.length);
        for (let i = 0; i < len; i++) {
          queue.push({ a: av[i], b: bv[i], path: `${path}.${i}` });
        }
      } else if (av !== bv) {
        diffs.push({ path, type: "change", before: av, after: bv });
      }
    }

    processed++;

    // Yield control every CHUNK_SIZE nodes
    if (processed % CHUNK_SIZE === 0) {
      await new Promise((resolve) => setTimeout(resolve, 0));
    }
  }

  return diffs;
}

function generatePatch(diffs) {
  const patch = {};
  diffs.forEach((d) => {
    patch[d.path] = { type: d.type, before: d.before, after: d.after };
  });
  return patch;
}

/**
 * Worker message handler
 */
self.onmessage = async (event) => {
  const { type, a, b, snapshotA, snapshotB } = event.data;

  try {
    if (type === "stream-diff") {
      const diffs = await streamDiff(a, b);
      const patch = generatePatch(diffs);

      self.postMessage({
        ok: true,
        mode: "stream-diff",
        diffs,
        patch,
        count: diffs.length
      });
      return;
    }

    if (type === "snapshot-stream-diff") {
      const diffs = await streamDiff(snapshotA, snapshotB);
      const patch = generatePatch(diffs);

      self.postMessage({
        ok: true,
        mode: "snapshot-stream-diff",
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

