/* ============================================================
   RTT/1 — Snapshot Viewer Edition
   File: assets/js/rtt1.viewer.js
   ============================================================ */

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
  file.textContent = `Loaded: ${name}.snapshot.json`;

  const pre = document.createElement("pre");
  pre.className = "rtt-diff";
  pre.textContent = JSON.stringify(data, null, 2);

  container.appendChild(title);
  container.appendChild(file);
  container.appendChild(pre);

  document.querySelector("#rtt-viewer").appendChild(container);
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

document.readyState === "loading"
  ? document.addEventListener("DOMContentLoaded", initViewer)
  : initViewer();
