/* ============================================================
   RTT/1 — Unified Bundle Runtime
   File: assets/js/rtt1.bundle.js
   Modes: standard | diagnostic | viewer | min
   ============================================================ */

const RTT1 = (() => {
  /* ------------------------------------------------------------
     Utility
  ------------------------------------------------------------ */
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  /* ------------------------------------------------------------
     Shared Behaviors (used by all modes)
  ------------------------------------------------------------ */
  function animateStatusDots() {
    $$(".rtt-status-dot").forEach((dot) => {
      dot.animate(
        [
          { transform: "scale(1)", opacity: 0.8 },
          { transform: "scale(1.25)", opacity: 1 },
          { transform: "scale(1)", opacity: 0.8 }
        ],
        { duration: 1800, iterations: Infinity, easing: "ease-in-out" }
      );
    });
  }

  function initPanelToggles() {
    $$(".rtt-panel").forEach((panel) => {
      const header = $(".rtt-panel__header", panel);
      if (!header) return;
      header.addEventListener("click", () => {
        panel.classList.toggle("rtt-panel--collapsed");
      });
    });
  }

  function initDiffViewer() {
    $$(".rtt-diff__line").forEach((line) => {
      line.addEventListener("mouseenter", () => {
        line.style.background = "rgba(255,255,255,0.05)";
      });
      line.addEventListener("mouseleave", () => {
        line.style.background = "transparent";
      });
    });
  }

  function initSnapshotHover() {
    $$(".rtt-snapshot-card").forEach((card) => {
      card.addEventListener("mouseenter", () => {
        card.style.transform = "translateY(-3px)";
        card.style.boxShadow = "0 12px 28px rgba(0,0,0,0.45)";
      });
      card.addEventListener("mouseleave", () => {
        card.style.transform = "translateY(0)";
        card.style.boxShadow = "var(--rtt-shadow-soft)";
      });
    });
  }

  function animateSessionChips() {
    $$(".rtt-chip").forEach((chip) => {
      chip.animate(
        [{ opacity: 0.7 }, { opacity: 1 }, { opacity: 0.7 }],
        { duration: 2600, iterations: Infinity, easing: "ease-in-out" }
      );
    });
  }

  /* ------------------------------------------------------------
     Mode: Diagnostic
  ------------------------------------------------------------ */
  const diagLog = (...msg) => console.log("[RTT1 DIAG]", ...msg);

  function wrap(fn, name) {
    return (...args) => {
      diagLog(`→ ${name}()`, args);
      const result = fn(...args);
      diagLog(`← ${name}()`);
      return result;
    };
  }

  function initDiagnostic() {
    diagLog("Initializing RTT/1 diagnostic mode...");
    wrap(animateStatusDots, "animateStatusDots")();
    wrap(initPanelToggles, "initPanelToggles")();
    wrap(initDiffViewer, "initDiffViewer")();
    wrap(initSnapshotHover, "initSnapshotHover")();
    wrap(animateSessionChips, "animateSessionChips")();
    diagLog("Diagnostic mode initialized.");
  }

  /* ------------------------------------------------------------
     Mode: Snapshot Viewer
  ------------------------------------------------------------ */
  async function loadSnapshot(path) {
    const res = await fetch(path);
    if (!res.ok) throw new Error(`Failed to load snapshot: ${path}`);
    return await res.json();
  }

  function renderSnapshot(name, data) {
    const container = document.createElement("div");
    container.className = "rtt-snapshot-card";

    const title = document.createElement("div");
    title.className = "rtt-snapshot-card__name";
    title.textContent = name;

    const file = document.createElement("div");
    file.className = "rtt-snapshot-card__file";
    file.textContent = `${name}.snapshot.json`;

    const pre = document.createElement("pre");
    pre.className = "rtt-diff";
    pre.textContent = JSON.stringify(data, null, 2);

    container.appendChild(title);
    container.appendChild(file);
    container.appendChild(pre);

    $("#rtt-viewer").appendChild(container);
  }

  async function initViewer() {
    const snapshots = [
      "clarity_surface",
      "load_bearing",
      "contradiction_scan",
      "structural_critique",
      "diagnostic_surface",
      "full_pipeline"
    ];

    for (const snap of snapshots) {
      try {
        const data = await loadSnapshot(`../mock-snapshots/${snap}.snapshot.json`);
        renderSnapshot(snap, data);
      } catch (err) {
        console.error("Viewer error:", err);
      }
    }
  }

  /* ------------------------------------------------------------
     Mode: Minified (internal)
  ------------------------------------------------------------ */
  function initMinified() {
    // Lightweight version: only status dots + hover
    animateStatusDots();
    initSnapshotHover();
  }

  /* ------------------------------------------------------------
     Mode: Standard
  ------------------------------------------------------------ */
  function initStandard() {
    animateStatusDots();
    initPanelToggles();
    initDiffViewer();
    initSnapshotHover();
    animateSessionChips();
  }

  /* ------------------------------------------------------------
     Runtime Switch
  ------------------------------------------------------------ */
  function init(mode = "standard") {
    const modes = {
      standard: initStandard,
      diagnostic: initDiagnostic,
      viewer: initViewer,
      min: initMinified
    };

    const fn = modes[mode];
    if (!fn) {
      console.error(`RTT1: Unknown mode "${mode}"`);
      return;
    }

    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fn);
    } else {
      fn();
    }
  }

  return { init };
})();

/* ------------------------------------------------------------
   Default Mode
   RTT1.init("standard");     // default
   RTT1.init("diagnostic");
   RTT1.init("viewer");
   RTT1.init("min");
------------------------------------------------------------ */
RTT1.init("standard");

