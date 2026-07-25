/* ============================================================
   RTT/1 — Graph-Based Diff Engine (Web Worker)
   File: assets/js/rtt1.worker.diffmap.js
   Session: rtt=1 | coherence=declared | drift=bounded
   ============================================================ */

/**
 * Build a node graph from a JSON object.
 * Each node is keyed by a path (e.g., "root.layer.key").
 */
function buildGraph(obj, rootLabel = "root") {
  const nodes = {};
  const edges = [];

  function visit(value, path) {
    const id = path || rootLabel;

    nodes[id] = {
      id,
      type: Array.isArray(value)
        ? "array"
        : value && typeof value === "object"
        ? "object"
        : "value",
      value
    };

    if (value && typeof value === "object") {
      const keys = Array.isArray(value)
        ? value.map((_, idx) => idx)
        : Object.keys(value);

      for (const key of keys) {
        const childPath = path ? `${path}.${key}` : `${rootLabel}.${key}`;
        edges.push({ from: id, to: childPath });

        visit(value[key], childPath);
      }
    }
  }

  visit(obj, rootLabel);
  return { nodes, edges };
}

/**
 * Compare two graphs and produce structural diffs.
 * Diff entries:
 *   { path, type: "add" | "remove" | "change", before, after }
 */
function diffGraphs(graphA, graphB) {
  const diffs = [];
  const nodesA = graphA.nodes;
  const nodesB = graphB.nodes;

  const allIds = new Set([...Object.keys(nodesA), ...Object.keys(nodesB)]);

  for (const id of allIds) {
    const na = nodesA[id];
    const nb = nodesB[id];

    // Added node
    if (!na && nb) {
      diffs.push({
        path: id,
        type: "add",
        before: undefined,
        after: nb.value
      });
      continue;
    }

    // Removed node
    if (na && !nb) {
      diffs.push({
        path: id,
        type: "remove",
        before: na.value,
        after: undefined
      });
      continue;
    }

    // Both exist — compare values
    if (na && nb) {
      const va = na.value;
      const vb = nb.value;

      const isObj =
        va && typeof va === "object" && !Array.isArray(va) &&
        vb && typeof vb === "object" && !Array.isArray(vb);

      if (isObj || (Array.isArray(va) && Array.isArray(vb))) {
        // For complex structures, compare via JSON string
        if (JSON.stringify(va) !== JSON.stringify(vb)) {
          diffs.push({
            path: id,
            type: "change",
            before: va,
            after: vb
          });
        }
      } else if (va !== vb) {
        diffs.push({
          path: id,
          type: "change",
          before: va,
          after: vb
        });
      }
    }
  }

  return diffs;
}

/**
 * Generate a graph-oriented patch from diffs.
 */
function generateGraphPatch(diffs) {
  const patch = {};
  for (const d of diffs) {
    patch[d.path] = {
      type: d.type,
      before: d.before,
      after: d.after
    };
  }
  return patch;
}

/**
 * Worker message handler
 */
self.onmessage = (event) => {
  const { type, a, b, snapshotA, snapshotB } = event.data;

  try {
    if (type === "graph-diff") {
      const graphA = buildGraph(a, "rootA");
      const graphB = buildGraph(b, "rootB");

      const diffs = diffGraphs(graphA, graphB);
      const patch = generateGraphPatch(diffs);

      self.postMessage({
        ok: true,
        mode: "graph-diff",
        diffs,
        patch,
        count: diffs.length,
        graphA,
        graphB
      });
      return;
    }

    if (type === "snapshot-graph-diff") {
      const graphA = buildGraph(snapshotA, "snapshotA");
      const graphB = buildGraph(snapshotB, "snapshotB");

      const diffs = diffGraphs(graphA, graphB);
      const patch = generateGraphPatch(diffs);

      self.postMessage({
        ok: true,
        mode: "snapshot-graph-diff",
        diffs,
        patch,
        count: diffs.length,
        graphA,
        graphB
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

