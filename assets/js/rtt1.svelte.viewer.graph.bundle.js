<!-- assets/js/rtt1.svelte.viewer.graph.bundle.js -->
<script>
  import { onMount } from "svelte";

  async function fetchJSON(path) {
    const res = await fetch(path);
    if (!res.ok) throw new Error("Failed to load: " + path);
    return await res.json();
  }

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

  const snapshotFiles = [
    "clarity_surface",
    "load_bearing",
    "contradiction_scan",
    "structural_critique",
    "diagnostic_surface",
    "full_pipeline"
  ];

  let graphs = {};
  let loadingGraphs = true;

  export let sourceA = "../mock-snapshots/full_pipeline.snapshot.json";
  export let sourceB = "../mock-snapshots/full_pipeline.snapshot.json";

  let diffs = [];
  let loadingDiff = true;
  let errorDiff = null;

  function diffJSON(a, b) {
    const out = [];
    const keys = new Set([...Object.keys(a || {}), ...Object.keys(b || {})]);
    for (const k of keys) {
      const av = a?.[k];
      const bv = b?.[k];
      if (av === undefined && bv !== undefined) {
        out.push({ path: k, type: "add", before: undefined, after: bv });
      } else if (av !== undefined && bv === undefined) {
        out.push({ path: k, type: "remove", before: av, after: undefined });
      } else if (JSON.stringify(av) !== JSON.stringify(bv)) {
        out.push({ path: k, type: "change", before: av, after: bv });
      }
    }
    return out;
  }

  let diagnostics = { adds: 0, removes: 0, changes: 0 };

  function computeDiagnostics(d) {
    const out = { adds: 0, removes: 0, changes: 0 };
    for (const x of d) {
      if (x.type === "add") out.adds++;
      else if (x.type === "remove") out.removes++;
      else if (x.type === "change") out.changes++;
    }
    diagnostics = out;
  }

  onMount(async () => {
    const g = {};
    for (const f of snapshotFiles) {
      try {
        const json = await fetchJSON(`../mock-snapshots/${f}.snapshot.json`);
        g[f] = buildGraph(json, f);
      } catch (err) {
        g[f] = { error: err.message };
      }
    }
    graphs = g;
    loadingGraphs = false;

    try {
      const a = await fetchJSON(sourceA);
      const b = await fetchJSON(sourceB);
      diffs = diffJSON(a, b);
      computeDiagnostics(diffs);
    } catch (err) {
      errorDiff = err.message;
      diffs = [];
    }
    loadingDiff = false;
  });

  let open = {
    graphs: true,
    diff: true,
    diagnostics: true
  };

  function toggle(name) {
    open[name] = !open[name];
  }
</script>

<style>
  .panel {
    border: 1px solid var(--rtt-border);
    border-radius: var(--rtt-radius-md);
    padding: 12px;
    margin-bottom: 16px;
    background: var(--rtt-bg-alt);
  }
  .panel-header {
    display: flex;
    justify-content: space-between;
    cursor: pointer;
    padding-bottom: 6px;
  }
  .panel-title {
    font-size: 13px;
    font-weight: 600;
    text-transform: uppercase;
    color: var(--rtt-text-soft);
  }
  .panel-badge {
    font-size: 11px;
    padding: 2px 8px;
    border-radius: 999px;
    border: 1px solid var(--rtt-border-soft);
    color: var(--rtt-text-muted);
  }
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
  pre {
    font-family: "JetBrains Mono", monospace;
    font-size: 11px;
    background: #020617;
    border-radius: 6px;
    border: 1px solid #1f2937;
    padding: 10px;
    margin-top: 8px;
    overflow: auto;
  }
  .line-add { color: #bbf7d0; }
  .line-remove { color: #fecaca; }
  .line-change { color: #fcd34d; }
  .diag-grid {
    display: flex;
    gap: 10px;
    font-size: 12px;
  }
  .diag-item {
    padding: 6px 10px;
    border-radius: 999px;
    border: 1px solid var(--rtt-border-soft);
    background: #020617;
  }
</style>

<div class="rtt-shell">
  <header class="rtt-shell__header">
    <div class="rtt-shell__title">RTT/1 Svelte Graph Viewer Bundle</div>
    <div class="rtt-shell__session">rtt=1 · coherence=declared</div>
  </header>

  <main class="rtt-shell__main">
    <div class="panel">
      <div class="panel-header" on:click={() => toggle("graphs")}>
        <div class="panel-title">Graph Snapshots</div>
        <div class="panel-badge">RTT/1</div>
      </div>
      {#if open.graphs}
        {#if loadingGraphs}
          <div>Loading graph snapshots…</div>
        {:else}
          <div class="grid">
            {#each snapshotFiles as f}
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
      {/if}
    </div>

    <div class="panel">
      <div class="panel-header" on:click={() => toggle("diff")}>
        <div class="panel-title">Diff Viewer</div>
        <div class="panel-badge">
          {#if errorDiff}
            error
          {:else}
            {diffs.length} changes
          {/if}
        </div>
      </div>
      {#if open.diff}
        {#if loadingDiff}
          <div>Loading diff…</div>
        {:else if errorDiff}
          <div>Error: {errorDiff}</div>
        {:else}
          <pre>
            {#each diffs as d}
              <div class="line-{d.type}">
                {d.type.toUpperCase()} {d.path}: {JSON.stringify(d.before)} → {JSON.stringify(d.after)}
              </div>
            {/each}
          </pre>
        {/if}
      {/if}
    </div>

    <div class="panel">
      <div class="panel-header" on:click={() => toggle("diagnostics")}>
        <div class="panel-title">Diagnostics</div>
        <div class="panel-badge">summary</div>
      </div>
      {#if open.diagnostics}
        <div class="diag-grid">
          <div class="diag-item">adds: {diagnostics.adds}</div>
          <div class="diag-item">removes: {diagnostics.removes}</div>
          <div class="diag-item">changes: {diagnostics.changes}</div>
        </div>
      {/if}
    </div>
  </main>

  <footer class="rtt-shell__footer">
    TriadicFrameworks · RTT/1 Svelte Graph Viewer Bundle Edition
  </footer>
</div>

