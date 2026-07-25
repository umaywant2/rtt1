/* ============================================================
   RTT/1 — Diagnostic Mode
   File: assets/js/rtt1.diagnostic.js
   ============================================================ */

const log = (...msg) => console.log("[RTT1]", ...msg);

function wrap(fn, name) {
  return (...args) => {
    log(`→ ${name}() called`, args);
    const result = fn(...args);
    log(`← ${name}() finished`);
    return result;
  };
}

function animateStatusDots() {
  document.querySelectorAll(".rtt-status-dot").forEach((dot) => {
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
  document.querySelectorAll(".rtt-panel").forEach((panel) => {
    const header = panel.querySelector(".rtt-panel__header");
    if (!header) return;
    header.addEventListener("click", () => {
      log("Panel toggled:", panel);
      panel.classList.toggle("rtt-panel--collapsed");
    });
  });
}

function initDiffViewer() {
  document.querySelectorAll(".rtt-diff__line").forEach((line) => {
    line.addEventListener("mouseenter", () => {
      log("Diff line hover:", line.textContent);
      line.style.background = "rgba(255,255,255,0.05)";
    });
    line.addEventListener("mouseleave", () => {
      line.style.background = "transparent";
    });
  });
}

function initSnapshotHover() {
  document.querySelectorAll(".rtt-snapshot-card").forEach((card) => {
    card.addEventListener("mouseenter", () => {
      log("Snapshot hover:", card);
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
  document.querySelectorAll(".rtt-chip").forEach((chip) => {
    chip.animate(
      [{ opacity: 0.7 }, { opacity: 1 }, { opacity: 0.7 }],
      { duration: 2600, iterations: Infinity, easing: "ease-in-out" }
    );
  });
}

function initRTT1() {
  log("Initializing RTT/1 diagnostic mode...");
  wrap(animateStatusDots, "animateStatusDots")();
  wrap(initPanelToggles, "initPanelToggles")();
  wrap(initDiffViewer, "initDiffViewer")();
  wrap(initSnapshotHover, "initSnapshotHover")();
  wrap(animateSessionChips, "animateSessionChips")();
  log("RTT/1 diagnostic mode initialized.");
}

document.readyState === "loading"
  ? document.addEventListener("DOMContentLoaded", initRTT1)
  : initRTT1();
