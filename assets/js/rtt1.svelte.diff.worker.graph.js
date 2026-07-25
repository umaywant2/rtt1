<script>
  import { onMount } from "svelte";

  /* ------------------------------------------------------------
     Worker source: graph-based diff
  ------------------------------------------------------------ */
  const workerSource = `
    function buildGraph(obj, root) {
      const nodes = {};
      const edges = [];

      function visit(value, path) {
        const id = path || root;
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
            ? value.map((_, i) => i)
            : Object.keys(value);

          for (const k of keys) {
            const child = path ? path + "." + k : root + "." + k;
            edges.push({ from: id, to: child });
            visit(value[k], child);
          }
        }
      }

      visit(obj, root);
      return { nodes, edges };
    }

    function diffGraphs(graphA, graphB) {
      const diffs = [];
      const nodesA = graphA.nodes;
      const nodesB = graphB.nodes;
      const allIds = new Set([...Object.keys(nodesA), ...Object.keys(nodesB)]);

      for (const id of allIds) {
        const na = nodesA[id];
        const nb = nodesB[id];

        if (!na && nb) {
          diffs.push({ path: id, type: "add", before: undefined, after: nb.value });
          continue;
        }

        if (na && !nb) {
          diffs.push({ path: id, type: "remove", before: na.value, after: undefined });
          continue;
        }

        if (na && nb) {
          const va = na.value;
          const vb = nb.value;

          const bothObj =
            va && typeof va === "object" && !Array.isArray(va) &&
            vb && typeof vb === "object" && !Array.isArray(vb);

          const bothArr = Array.isArray(va) && Array.isArray(vb);

          if (bothObj || bothArr) {
            if (JSON.stringify(va) !== JSON.stringify(vb)) {
              diffs.push({ path: id, type: "change", before: va, after: vb });
            }
          } else if (va !== vb) {
            diffs.push({ path: id, type: "change", before: va, after: vb });
          }
        }
      }

      return diffs;
    }

    self.onmessage = (ev) => {
      const { a, b } = ev.data;
      try {
        const graphA = buildGraph(a, "A");
        const graphB = buildGraph(b, "B");
        const diffs = diffGraphs(graphA, graphB);
        self.postMessage({ ok: true, diffs });
      } catch (err) {
        self.postMessage({ ok: false, error: err.message });
      }
    };
  `;

  const blob = new Blob([workerSource], { type: "application/javascript" });
  const workerURL = URL.createObjectURL(blob);
  const diffWorker = new Worker(workerURL);

  /* ------------------------------------------------------------
     Component state
  ------------------------------------------------------------ */
  let diffs = [];
  let loading = true;
  let error = null;

  export let sourceA = "../mock-snapshots/full_pipeline.snapshot.json";
  export let sourceB = "../mock-snapshots/full_pipeline.snapshot.json";

  async function fetchJSON(path) {
    const res = await fetch(path);
    if (!res.ok) throw new Error("Failed to load: " + path);
    return await res.json();
  }

  onMount(async () => {
    try {
      const a = await fetchJSON(sourceA);
      const b = await fetchJSON(sourceB);

      diffWorker.postMessage({ a, b });

      diffWorker.onmessage = (ev) => {
        const { ok, diffs: d, error: err } = ev.data;
        if (!ok) {
          error = err;
          diffs = [];
        } else {
          diffs = d;
        }
        loading = false;
      };
    } catch (err) {
      error = err.message;
      loading = false;
    }
  });
</script>

<style>
  @keyframes rttPulse {
    0% { transform: scale(1); opacity: .8; }
    50% { transform: scale(1.25); opacity: 1; }
    100% { transform: scale(1); opacity: .8; }
  }

  .diffmap-worker {
    padding: 16px;
  }

  .badge {
    font-size: 12px;
    padding: 4px 10px;
    border-radius: 999px;
    border: 1px solid var(--rtt-border-soft);
    color: var(--rtt-text-muted);
    display: inline-block;
    margin-bottom: 12px;
  }

  .diff {
    font-family: "JetBrains Mono", monospace;
    font-size: 11px;
    background: #020617;
    border-radius: 6px;
    border: 1px solid #1f2937;
    padding: 10px;
    overflow: auto;
  }

  .line-add { color: #bbf7d0; }
  .line-remove { color: #fecaca; }
  .line-change { color: #fcd34d; }
</style>

<div class="diffmap-worker">
  {#if loading}
    <div>Loading RTT/1 graph diff (worker)…</div>
  {:else if error}
    <div class="badge">Error: {error}</div>
  {:else}
    <div class="badge">{diffs.length} graph‑level changes detected (worker)</div>
    <pre class="diff">
      {#each diffs as d}
        <div class="line-{d.type}">
          {d.type.toUpperCase()} {d.path}: {JSON.stringify(d.before)} → {JSON.stringify(d.after)}
        </div>
      {/each}
    </pre>
  {/if}
</div>

