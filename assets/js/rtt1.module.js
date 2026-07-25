/* ============================================================
   RTT/1 — ES Module Version
   File: assets/js/rtt1.module.js
   ============================================================ */

export function animateStatusDots() {
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

export function initPanelToggles() {
  document.querySelectorAll(".rtt-panel").forEach((panel) => {
    const header = panel.querySelector(".rtt-panel__header");
    if (!header) return;
    header.addEventListener("click", () => {
      panel.classList.toggle("rtt-panel--collapsed");
    });
  });
}

export function initDiffViewer() {
  document.querySelectorAll(".rtt-diff__line").forEach((line) => {
    line.addEventListener("mouseenter", () => {
      line.style.background = "rgba(255,255,255,0.05)";
    });
    line.addEventListener("mouseleave", () => {
      line.style.background = "transparent";
    });
  });
}

export function initSnapshotHover() {
  document.querySelectorAll(".rtt-snapshot-card").forEach((card) => {
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

export function animateSessionChips() {
  document.querySelectorAll(".rtt-chip").forEach((chip) => {
    chip.animate(
      [{ opacity: 0.7 }, { opacity: 1 }, { opacity: 0.7 }],
      { duration: 2600, iterations: Infinity, easing: "ease-in-out" }
    );
  });
}

export function initRTT1() {
  animateStatusDots();
  initPanelToggles();
  initDiffViewer();
  initSnapshotHover();
  animateSessionChips();
}
