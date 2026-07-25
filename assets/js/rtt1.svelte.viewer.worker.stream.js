<script>
  import { onMount } from "svelte";

  /* ------------------------------------------------------------
     Worker Source (streaming loader)
  ------------------------------------------------------------ */
  const workerSource = `
    const CHUNK = 500;

    async function loadJSON(path) {
      const res = await fetch(path);
      if (!res.ok) throw new Error("Failed to load: " + path);
      return await res.json();
    }

    async function streamSnapshot(path) {
      const json = await loadJSON(path);
      const keys = Object.keys(json);
      const out = {};
      let processed = 0;

      for (const k of keys) {
        out[k] = json[k];
        processed++;

        if (processed % CHUNK === 0) {
          await new Promise(r => setTimeout(r, 0));
          self.postMessage({ partial: true, key: k, value: json[k] });
        }
      }

      return out;
    }

    self.onmessage = async (ev) => {
      const { files } = ev.data;
      const result = {};

      for (const f of files) {
        const path = "../mock-snapshots/" + f + ".snapshot.json";
        try {
          const full = await streamSnapshot(path);
          result[f] = full;
        } catch (err) {
          result[f] = { error: err.message };
        }
      }

      self.postMessage({ partial: false, done: true, result });
    };
  `;

  const blob = new Blob([workerSource], { type: "application/javascript" });
  const workerURL = URL.createObjectURL(blob);
  const streamWorker = new Worker(workerURL);

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

  let snapshots = {};
  let loading = true;

  /* ------------------------------------------------------------
     Streaming Loader
  ------------------------------------------------------------ */
  onMount(() => {
    streamWorker.postMessage({ files });

    streamWorker.onmessage = (ev) => {
      const msg = ev.data;

      if (msg.partial) {
        // incremental update
        const { key, value } = msg;
        // find which snapshot this belongs to
        for (const f of files) {
          if (!snapshots[f]) snapshots[f] = {};
          snapshots[f][key] = value;
        }
      }

      if (msg.done) {
        snapshots = msg.result;
        loading = false;
      }
    };
  });
</script>

<style>
  @keyframes rttPulse {
    0% { transform: scale(1); opacity: .8; }
    50% { transform: scale(1.25); opacity: 1; }
    100% { transform: scale(1); opacity: .8; }
  }

  .viewer { padding: 16px; }

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 16px;
  }

  .card {
    background: #020617;
    border-radius: 8px;
    border: 1px solid #374151;
    padding: 12px;
  }

  .name {
    font-size: 14px;
    font-weight: 600;
    color: var(--rtt-text);
    margin-bottom: 6px;
  }

  .file {
    font-size: 11px;
    color: var(--rtt-text-muted);
    margin-bottom: 6px;
  }

  .dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--rtt-success);
    animation: rttPulse 1.8s ease-in-out infinite;
    display: inline-block;
    margin-bottom: 8px;
  }

  pre {
    font-family: "JetBrains Mono", monospace;
    font-size: 11px;
    background: #020617;
    border-radius: 6px;
    border: 1px solid #1f2937;
    padding: 10px;
    overflow: auto;
    max-height: 300px;
  }
</style>

<div class="viewer">
  {#if loading}
    <div>Streaming RTT/1 snapshots…</div>
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

