<script>
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
  });
</script>

<style>
  @keyframes rttPulse {
    0% { transform: scale(1); opacity: 0.8; }
    50% { transform: scale(1.25); opacity: 1; }
    100% { transform: scale(1); opacity: 0.8; }
  }

  .viewer {
    padding: 16px;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 12px;
  }

  .card {
    background: linear-gradient(135deg, #020617, #111827);
    border-radius: 8px;
    border: 1px solid #374151;
    padding: 12px;
  }

  .name {
    font-size: 13px;
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
</style>

<div class="viewer">
  {#if loading}
    <div>Loading RTT/1 snapshots…</div>
  {:else}
    <div class="grid">
      {#each files as f}
        <div class="card">
          <div class="name">{f}</div>
          <div class="file">{f}.snapshot.json</div>
          <div class="dot"></div>
          <pre>{JSON.stringify(snapshots[f], null, 2)}</pre>
        </div>
      {/each}
    </div>
  {/if}
</div>

