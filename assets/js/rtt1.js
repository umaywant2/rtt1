/* ============================================================
   RTT/1 — Front-End Interaction Layer
   File: assets/js/rtt1.js
   Session: rtt=1 | coherence=declared | drift=bounded
   ============================================================ */

(function () {
  "use strict";

  /* ------------------------------------------------------------
     Utility: Safe DOM lookup
  ------------------------------------------------------------ */
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  /* ------------------------------------------------------------
     Snapshot Card: Status Dot Animation
  ------------------------------------------------------------ */
  function animateStatusDots() {
    $$(".rtt-status-dot").forEach((dot) => {
      dot.animate(
        [
          { transform: "scale(1)", opacity: 0.8 },
          { transform: "scale(1.25)", opacity: 1 },
          { transform: "scale(1)", opacity: 0.8 }
        ],
        {
          duration: 1800,
          iterations: Infinity,
          easing: "ease-in-out"
        }
      );
    });
  }

  /* ------------------------------------------------------------
     Panels: Expand / Collapse
  ------------------------------------------------------------ */
  function initPanelToggles() {
    $$(".rtt-panel").forEach((panel) => {
      const header = $(".rtt-panel__header", panel);
      if (!header) return;

      header.addEventListener("click", () => {
        panel.classList.toggle("rtt-panel--collapsed");
      });
    });
  }

  /* ------------------------------------------------------------
     Diff Viewer: Line Highlighting
  ------------------------------------------------------------ */
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

  /* ------------------------------------------------------------
     Snapshot Grid: Hover Lift
  ------------------------------------------------------------ */
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

  /* ------------------------------------------------------------
     Session Chips: Pulse Animation
  ------------------------------------------------------------ */
  function animateSessionChips() {
    $$(".rtt-chip").forEach((chip) => {
      chip.animate(
        [
          { opacity: 0.7 },
          { opacity: 1 },
          { opacity: 0.7 }
        ],
        {
          duration: 2600,
          iterations: Infinity,
          easing: "ease-in-out"
        }
      );
    });
  }

  /* ------------------------------------------------------------
     Initialize all RTT/1 UI behaviors
  ------------------------------------------------------------ */
  function initRTT1() {
    animateStatusDots();
    initPanelToggles();
    initDiffViewer();
    initSnapshotHover();
    animateSessionChips();
  }

  /* ------------------------------------------------------------
     DOM Ready
  ------------------------------------------------------------ */
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initRTT1);
  } else {
    initRTT1();
  }
})();

