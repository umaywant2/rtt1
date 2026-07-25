<script>
  /* ============================================================
     RTT/1 — Svelte Component Suite
     File: assets/js/rtt1.svelte.js
     Session: rtt=1 | coherence=declared | drift=bounded
     ============================================================ */

  import { onMount } from "svelte";

  /* ------------------------------------------------------------
     Utility
  ------------------------------------------------------------ */
  async function fetchJSON(path) {
    const res = await fetch(path);
    if (!res.ok) throw new Error(`Failed to load: ${path}`);
    return await res.json();
  }

  /* ------------------------------------------------------------
     Component State
  ------------------------------------------------------------ */
  let snapshots = {};
  let pipeline = null;
  let loading = true;

  const files = [
    "clarity_surface",
    "load_bearing",
    "contradiction_scan",
    "structural_critique",
    "diagnostic_surface",
    "full_pipeline"
  ];

  /* ------------------------------------------------------------
     Load snapshots
  ------------------------------------------------------------ */
  onMount(async () => {
    const out = {};
    for (const f of files) {
      try {
        out[f] = await fetchJSON(`../mock-snapshots/${f}.snapshot.json`);
      } catch (err) {
        out[f] = { error: err.message };
      }
    }
    snapshots = out;
    loading = false;

    try {
      pipeline = await fetchJSON("../mock-snapshots/full_pipeline.snapshot.json");
    } catch {
      pipeline = null;
    }
  });

  /* ------------------------------------------------------------
     Diff Engine (simple structural diff)
  ------------------------------------------------------------ */
  function diffJSON(a, b) {
    const diffs = [];
    const keys = new Set([...Object.keys(a || {}), ...Object.keys(b || {})]);

    for (const k of keys) {
      const av = a?.[k];
      const bv = b?.[k];

      if (av === undefined && bv !== undefined) {
        diffs.push({ path: k, type: "add", before: undefined, after: bv });
      } else if (av !== undefined && bv === undefined) {
        diffs.push({ path: k, type: "remove", before: av, after: undefined });
      } else if (JSON.stringify(av) !== JSON.stringify(bv)) {
        diffs.push({ path: k, type: "change", before: av, after: bv });
      }
    }

    return diffs;
  }

  /* ------------------------------------------------------------
     Panel State
  ------------------------------------------------------------ */
  let openPanels = {};

  function togglePanel(name) {
    openPanels = { ...openPanels, [name]: !openPanels[name] };
  }
</script>

<style>
  @keyframes rttPulse {
    0% { transform: scale(1); opacity: 0.8; }
    50% { transform: scale(1.25); opacity: 1; }
    100% { transform: scale(1); opacity: 0.8; }
  }

  .status-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--rtt-success);
    animation: rttPulse 1.8s ease-in-out infinite;
    display: inline-block;
  }

  .panel {
    border: 1px solid var(--rtt-border);
    border-radius: var(--rtt-radius-md);
    padding: 12px;
    margin-bottom: 12px;
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

  .snapshot-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 10px;
  }

  .snapshot-card {
    background: linear-gradient(135deg, #020617, #111827);
    border-radius: var(--rtt-radius-md);
    border: 1px solid var(--rtt-border-soft);
    padding: 10px 12px;
  }

  .snapshot-name {
    font-size: 12px;
    font-weight: 600;
    color: var(--rtt-text);
  }

  .snapshot-file {
    font-size: 11px;
    color: var(--rtt-text-muted);
  }

  .diff {
    font-family: "JetBrains Mono", monospace;
    font-size: 11px;
    background: #020617;
    border-radius: var(--rtt-radius-md);
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
     Main Svelte Component Layout
============================================================ -->

<div class="rtt-shell">
  <header class="rtt-shell__header">
    <div class="rtt-shell__title">RTT/1 Svelte Viewer</div>
    <div class="rtt-shell__session">rtt=1 · coherence=declared</div>
  </header>

  <main class="rtt-shell__main">
    <!-- Snapshots Panel -->
    <div class="panel">
      <div class="panel-header" on:click={() => togglePanel("snapshots")}>
        <div class="panel-title">Snapshots</div>
        <div class="panel-badge">RTT/1</div>
      </div>

      {#if openPanels.snapshots !== false}
        {#if loading}
          <div>Loading snapshots…</div>
        {:else}
          <div class="snapshot-grid">
            {#each files as f}
              <div class="snapshot-card">
                <div class="snapshot-name">{f}</div>
                <div class="snapshot-file">{f}.snapshot.json</div>
                <div class="status-dot"></div>
                <pre class="diff">{JSON.stringify(snapshots[f], null, 2)}</pre>
              </div>
            {/each}
          </div>
        {/if}
      {/if}
    </div>

    <!-- Diff Viewer Panel -->
    {#if pipeline}
      <div class="panel">
        <div class="panel-header" on:click={() => togglePanel("diff")}>
          <div class="panel-title">Diff Viewer</div>
          <div class="panel-badge">0 changes</div>
        </div>

        {#if openPanels.diff !== false}
          <pre class="diff">
            {#each diffJSON(pipeline, pipeline) as d}
              <div class="line-{d.type}">
                {d.type.toUpperCase()} {d.path}: {JSON.stringify(d.before)} → {JSON.stringify(d.after)}
              </div>
            {/each}
          </pre>
        {/if}
      </div>
    {/if}
  </main>

  <footer class="rtt-shell__footer">
    TriadicFrameworks · RTT/1 Svelte Edition
  </footer>
</div>

