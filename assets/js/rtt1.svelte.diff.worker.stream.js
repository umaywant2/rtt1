<script>
  import { onMount } from "svelte";

  /* ------------------------------------------------------------
     Worker Source (streaming diff)
  ------------------------------------------------------------ */
  const workerSource = `
    const CHUNK = 500;

    function isObj(v) {
      return v && typeof v === "object" && !Array.isArray(v);
    }

    async function streamDiff(a, b) {
      const diffs = [];
      const queue = [{ a, b, path: "root" }];
      let processed = 0;

      while (queue.length > 0) {
        const { a: av, b: bv, path } = queue.shift();

        const aExists = av !== undefined;
        const bExists = bv !== undefined;

        if (!aExists && bExists) {
          diffs.push({ path, type: "add", before: undefined, after: bv });
        } else if (aExists && !bExists) {
          diffs.push({ path, type: "remove", before: av, after: undefined });
        } else if (aExists && bExists) {
          const bothObj = isObj(av) && isObj(bv);
          const bothArr = Array.isArray(av) && Array.isArray(bv);

          if (bothObj) {
            const keys = new Set([...Object.keys(av), ...Object.keys(bv)]);
            keys.forEach(k => queue.push({ a: av[k], b: bv[k], path: path + "." + k }));
          } else if (bothArr) {
            const len = Math.max(av.length, bv.length);
            for (let i = 0; i < len; i++) {
              queue.push({ a: av[i], b: bv[i], path: path + "." + i });
            }
          } else if (av !== bv) {
            diffs.push({ path, type: "change", before: av, after: bv });
          }
        }

        processed++;
        if (processed % CHUNK === 0) {
          await new Promise(r => setTimeout(r, 0));
        }
      }

      return diffs;
    }

    self.onmessage = async (ev) => {
      const { a, b } = ev.data;
      try {
        const diffs = await streamDiff(a, b);
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
     Load + stream diff
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
    0% { transform: scale(1); opacity: .8; }
    50% { transform: scale(1.25); opacity: 1; }
    100% { transform: scale(1); opacity: .8; }
  }

  .stream-viewer { padding: 16px; }
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

<div class="stream-viewer">
  {#if loading}
    <div>Streaming RTT/1 diff…</div>
  {:else if error}
    <div class="badge">Error: {error}</div>
  {:else}
    <div class="badge">{diffs.length} streamed changes detected</div>
    <pre class="diff">
      {#each diffs as d}
        <div class="line-{d.type}">
          {d.type.toUpperCase()} {d.path}: {JSON.stringify(d.before)} → {JSON.stringify(d.after)}
        </div>
      {/each}
    </pre>
  {/if}
</div>

