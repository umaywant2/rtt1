<script>
  import { onMount } from "svelte";

  /* ------------------------------------------------------------
     Utility: Load JSON
  ------------------------------------------------------------ */
  async function fetchJSON(path) {
    const res = await fetch(path);
    if (!res.ok) throw new Error("Failed to load: " + path);
    return await res.json();
  }

  /* ------------------------------------------------------------
     Graph Builder
  ------------------------------------------------------------ */
  function buildGraph(obj, root = "root") {
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
          const child = path ? `${path}.${k}` : `${root}.${k}`;
          edges.push({ from: id, to: child });
          visit(value[k], child);
        }
      }
    }

    visit(obj, root);
    return { nodes, edges };
  }

  /* ------------------------------------------------------------
     Component State
  ------------------------------------------------------------ */
  const files = [
    "clarity_surface",
    "load_bearing",
    "contradiction_scan",
    "structural_critique",
    "diagnostic_surface",
    "full_pipeline"
  ];

  let graphs = {};
  let loading = true;
  let error = null;

  /* ------------------------------------------------------------
     Load + build graphs
  ------------------------------------------------------------ */
  onMount(async () => {
    try {
      const out = {};
      for (const f of files) {
        try {
          const json = await fetchJSON(`../mock-snapshots/${f}.snapshot.json`);
          out[f] = buildGraph(json, f);
        } catch (err) {
          out[f] = { error: err.message };
        }
      }
      graphs = out;
    } catch (err) {
      error = err.message;
    }
    loading = false;
  });
</script>

<style>
  .graph-viewer { padding: 16px; }

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 16px;
  }

  .card {
    background: #020617;
    border-radius: 8px;
    border: 1px solid #374151;
    padding: 12px;
  }

  .title {
    font-size: 14px;
    font-weight: 600;
    color: var(--rtt-text);
    margin-bottom: 8px;
  }

  .node {
    font-family: "JetBrains Mono", monospace;
    font-size: 11px;
    padding: 6px;
    border-left: 2px solid #374151;
    margin-bottom: 4px;
    color: var(--rtt-text-muted);
  }

  .node-object { border-color: #60a5fa; }
  .node-array { border-color: #34d399; }
  .node-value { border-color: #fcd34d; }
</style>

<div class="graph-viewer">
  {#if loading}
    <div>Loading RTT/1 graph snapshots…</div>
  {:else if error}
    <div>Error: {error}</div>
  {:else}
    <div class="grid">
      {#each Object.keys(graphs) as f}
        <div class="card">
          <div class="title">{f}.snapshot.json</div>

          {#if graphs[f].error}
            <div>Error: {graphs[f].error}</div>
          {:else}
            {#each Object.values(graphs[f].nodes) as node}
              <div class="node node-{node.type}">
                {node.id}: {JSON.stringify(node.value)}
              </div>
            {/each}
          {/if}
        </div>
      {/each}
    </div>
  {/if}
</div>

