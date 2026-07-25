/* ============================================================
   RTT/1 — Vue 3 Composition API Component
   File: assets/js/rtt1.vue.js
   Session: rtt=1 | coherence=declared | drift=bounded
   ============================================================ */

import { ref, reactive, computed, onMounted } from "vue";

/* ------------------------------------------------------------
   Utility
------------------------------------------------------------ */
async function fetchJSON(path) {
  const res = await fetch(path);
  if (!res.ok) throw new Error(`Failed to load: ${path}`);
  return await res.json();
}

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
   Vue Component Definition
------------------------------------------------------------ */
export default {
  name: "RTT1Vue",

  setup() {
    const loading = ref(true);
    const snapshots = reactive({});
    const pipeline = ref(null);

    const files = [
      "clarity_surface",
      "load_bearing",
      "contradiction_scan",
      "structural_critique",
      "diagnostic_surface",
      "full_pipeline"
    ];

    const openPanels = reactive({
      snapshots: true,
      diff: true
    });

    function togglePanel(name) {
      openPanels[name] = !openPanels[name];
    }

    onMounted(async () => {
      const out = {};
      for (const f of files) {
        try {
          out[f] = await fetchJSON(`../mock-snapshots/${f}.snapshot.json`);
        } catch (err) {
          out[f] = { error: err.message };
        }
      }
      Object.assign(snapshots, out);
      loading.value = false;

      try {
        pipeline.value = await fetchJSON(
          "../mock-snapshots/full_pipeline.snapshot.json"
        );
      } catch {
        pipeline.value = null;
      }
    });

    const diffs = computed(() =>
      pipeline.value ? diffJSON(pipeline.value, pipeline.value) : []
    );

    return {
      loading,
      snapshots,
      pipeline,
      files,
      openPanels,
      togglePanel,
      diffs
    };
  },

  /* ------------------------------------------------------------
     Render Function (no .vue SFC needed)
  ------------------------------------------------------------ */
  render() {
    return (
      <div class="rtt-shell">
        <header class="rtt-shell__header">
          <div class="rtt-shell__title">RTT/1 Vue Viewer</div>
          <div class="rtt-shell__session">rtt=1 · coherence=declared</div>
        </header>

        <main class="rtt-shell__main">
          {/* Snapshots Panel */}
          <div class="rtt-panel">
            <div
              class="rtt-panel__header"
              onClick={() => this.togglePanel("snapshots")}
            >
              <div class="rtt-panel__title">Snapshots</div>
              <div class="rtt-panel__badge">RTT/1</div>
            </div>

            {this.openPanels.snapshots && (
              <div>
                {this.loading ? (
                  <div>Loading snapshots…</div>
                ) : (
                  <div class="rtt-snapshots-grid">
                    {this.files.map((f) => (
                      <div class="rtt-snapshot-card" key={f}>
                        <div class="rtt-snapshot-card__name">{f}</div>
                        <div class="rtt-snapshot-card__file">
                          {f}.snapshot.json
                        </div>
                        <span class="rtt-status-dot"></span>
                        <pre class="rtt-diff">
                          {JSON.stringify(this.snapshots[f], null, 2)}
                        </pre>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Diff Viewer Panel */}
          {this.pipeline && (
            <div class="rtt-panel">
              <div
                class="rtt-panel__header"
                onClick={() => this.togglePanel("diff")}
              >
                <div class="rtt-panel__title">Diff Viewer</div>
                <div class="rtt-panel__badge">
                  {this.diffs.length} changes
                </div>
              </div>

              {this.openPanels.diff && (
                <pre class="rtt-diff">
                  {this.diffs.map((d) => (
                    <div
                      class={`rtt-diff__line rtt-diff__line--${d.type}`}
                      key={d.path}
                    >
                      {d.type.toUpperCase()} {d.path}:{" "}
                      {JSON.stringify(d.before)} → {JSON.stringify(d.after)}
                    </div>
                  ))}
                </pre>
              )}
            </div>
          )}
        </main>

        <footer class="rtt-shell__footer">
          TriadicFrameworks · RTT/1 Vue Edition
        </footer>
      </div>
    );
  }
};

