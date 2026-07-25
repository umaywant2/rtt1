<script>
  import { onMount } from "svelte";

  /* ------------------------------------------------------------
     Worker Source (inline)
  ------------------------------------------------------------ */
  const workerSource = `
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

    self.onmessage = (ev) => {
      const { a, b } = ev.data;
      try {
        const diffs = diffJSON(a, b);
        self.postMessage({ ok: true, diffs });
      } catch (err) {
        self.postMessage({ ok: false, error: err.message });
      }
    };
  `;

  const workerBlob = new Blob([workerSource], { type: "application/javascript" });
  const workerURL = URL.createObjectURL(workerBlob);
  const diffWorker = new Worker(workerURL);

  /* ------------------------------------------------------------
     Component State
  ------------------------------------------------------------ */
  let a = null;
  let b = null;
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

  /* ------------------------------------------------------------
     Load snapshots + run worker diff
  ------------------------------------------------------------ */
  onMount(async () => {
    try {
      a = await fetchJSON(sourceA);
      b = await fetchJSON(sourceB);

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
    0% { transform: scale(1); opacity: 0.8; }
    50% { transform: scale(1.25); opacity: 1; }
    100% { transform: scale(1); opacity: 0.8; }
  }

  .diff-viewer { padding: 16px; }
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

<div class="diff-viewer">
  {#if loading}
    <div>Loading RTT/1 diff…</div>
  {:else if error}
    <div class="badge">Error: {error}</div>
  {:else}
    <div class="badge">{diffs.length} changes detected</div>
    <pre class="diff">
      {#each diffs as d}
        <div class="line-{d.type}">
          {d.type.toUpperCase()} {d.path}: {JSON.stringify(d.before)} → {JSON.stringify(d.after)}
        </div>
      {/each}
    </pre>
  {/if}
</div>

