<script>
  import { onMount } from "svelte";

  /* ============================================================
     Shared Utility
  ============================================================ */
  async function fetchJSON(path) {
    const res = await fetch(path);
    if (!res.ok) throw new Error(`Failed to load: ${path}`);
    return await res.json();
  }

  /* ============================================================
     SnapshotViewer Component
  ============================================================ */
  export let snapshotFiles = [
    "clarity_surface",
    "load_bearing",
    "contradiction_scan",
    "structural_critique",
    "diagnostic_surface",
    "full_pipeline"
  ];

  let snapshots = {};
  let loadingSnapshots = true;

  onMount(async () => {
    const out = {};
    for (const f of snapshotFiles) {
      try {
        out[f] = await fetchJSON(`../mock-snapshots/${f}.snapshot.json`);
      } catch (err) {
        out[f] = { error: err.message };
      }
    }
    snapshots = out;
    loadingSnapshots = false;
  });

  /* ============================================================
     DiffViewer Component
  ============================================================ */
  export let diffSourceA =
    "../mock-snapshots/full_pipeline.snapshot.json";
  export let diffSourceB =
    "../mock-snapshots/full_pipeline.snapshot.json";

  let a = null;
  let b = null;
  let diffs = [];
  let loadingDiff = true;

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

  onMount(async () => {
    try {
      a = await fetchJSON(diffSourceA);
      b = await fetchJSON(diffSourceB);
      diffs = diffJSON(a, b);
    } catch (err) {
      diffs = [{ path: "error", type: "change", before: null, after: err.message }];
    }
    loadingDiff = false;
  });

  /* ============================================================
     Panel State
  ============================================================ */
  let open = {
    snapshots: true,
    diff: true
  };

  function toggle(name) {
    open[name] = !open[name];
  }
</script>

<style>
  @keyframes rttPulse {
    0% { transform: scale(1); opacity: 0.8; }
    50% { transform: scale(1.25); opacity: 1; }
    100% { transform: scale(1); opacity: 0.8; }
  }

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
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 12px;
  }

  .card {
    background: linear-gradient(135deg, #020617, #111827);
    border-radius: var(--rtt-radius-md);
    border: 1px solid var(--rtt-border-soft);
    padding: 12px;
  }

  .name {
    font-size: 12px;
    font-weight: 600;
    color: var(--rtt-text);
  }

  .file {
    font-size: 11px;
    color: var(--rtt-text-muted);
  }

  .dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--rtt-success);
    animation: rttPulse 1.8s ease-in-out infinite;
    display: inline-block;
    margin-top: 6px;
  }

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
</style>

<!-- ============================================================
     Unified RTT/1 Svelte Bundle App
============================================================ -->

<div class="rtt-shell">
  <header class="rtt-shell__header">
    <div class="rtt-shell__title">RTT/1 Svelte Bundle</div>
    <div class="rtt-shell__session">rtt=1 · coherence=declared</div>
  </header>

  <main class="rtt-shell__main">
    <!-- Snapshot Viewer Panel -->
    <div class="panel">
      <div class="panel-header" on:click={() => toggle("snapshots")}>
        <div class="panel-title">Snapshots</div>
        <div class="panel-badge">RTT/1</div>
      </div>

      {#if open.snapshots}
        {#if loadingSnapshots}
          <div>Loading snapshots…</div>
        {:else}
          <div class="grid">
            {#each snapshotFiles as f}
              <div class="card">
                <div class="name">{f}</div>
                <div class="file">{f}.snapshot.json</div>
                <div class="dot"></div>
                <pre>{JSON.stringify(snapshots[f], null, 2)}</pre>
              </div>
            {/each}
          </div>
        {/if}
      {/if}
    </div>

    <!-- Diff Viewer Panel -->
    <div class="panel">
      <div class="panel-header" on:click={() => toggle("diff")}>
        <div class="panel-title">Diff Viewer</div>
        <div class="panel-badge">{diffs.length} changes</div>
      </div>

      {#if open.diff}
        {#if loadingDiff}
          <div>Loading diff…</div>
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
  </main>

  <footer class="rtt-shell__footer">
    TriadicFrameworks · RTT/1 Svelte Bundle Edition
  </footer>
</div>

