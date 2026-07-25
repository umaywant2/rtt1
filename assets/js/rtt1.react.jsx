/* ============================================================
   RTT/1 — React Component Suite
   File: assets/js/rtt1.react.jsx
   Session: rtt=1 | coherence=declared | drift=bounded
   ============================================================ */

import React, { useState, useEffect } from "react";

/* ------------------------------------------------------------
   Utility
------------------------------------------------------------ */
const fetchJSON = async (path) => {
  const res = await fetch(path);
  if (!res.ok) throw new Error(`Failed to load: ${path}`);
  return await res.json();
};

/* ------------------------------------------------------------
   Status Dot (animated)
------------------------------------------------------------ */
const StatusDot = () => (
  <span
    className="rtt-status-dot"
    style={{
      display: "inline-block",
      width: 8,
      height: 8,
      borderRadius: "50%",
      background: "var(--rtt-success)",
      animation: "rttPulse 1.8s ease-in-out infinite"
    }}
  />
);

/* ------------------------------------------------------------
   Snapshot Card
------------------------------------------------------------ */
const SnapshotCard = ({ name, file, data }) => {
  return (
    <div className="rtt-snapshot-card">
      <div className="rtt-snapshot-card__name">{name}</div>
      <div className="rtt-snapshot-card__file">{file}</div>
      <div className="rtt-snapshot-card__status">
        <StatusDot />
        <span>healthy</span>
      </div>
      <pre className="rtt-diff">
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
};

/* ------------------------------------------------------------
   Collapsible Panel
------------------------------------------------------------ */
const Panel = ({ title, badge, children }) => {
  const [open, setOpen] = useState(true);

  return (
    <div className={`rtt-panel ${open ? "" : "rtt-panel--collapsed"}`}>
      <div className="rtt-panel__header" onClick={() => setOpen(!open)}>
        <div className="rtt-panel__title">{title}</div>
        {badge && <div className="rtt-panel__badge">{badge}</div>}
      </div>
      {open && <div className="rtt-panel__body">{children}</div>}
    </div>
  );
};

/* ------------------------------------------------------------
   Snapshot Viewer (loads all RTT/1 snapshots)
------------------------------------------------------------ */
const SnapshotViewer = () => {
  const [snapshots, setSnapshots] = useState({});
  const [loading, setLoading] = useState(true);

  const files = [
    "clarity_surface",
    "load_bearing",
    "contradiction_scan",
    "structural_critique",
    "diagnostic_surface",
    "full_pipeline"
  ];

  useEffect(() => {
    let mounted = true;

    async function loadAll() {
      const out = {};
      for (const f of files) {
        try {
          out[f] = await fetchJSON(`../mock-snapshots/${f}.snapshot.json`);
        } catch (err) {
          out[f] = { error: err.message };
        }
      }
      if (mounted) {
        setSnapshots(out);
        setLoading(false);
      }
    }

    loadAll();
    return () => (mounted = false);
  }, []);

  if (loading) {
    return <div className="rtt-loading">Loading snapshots…</div>;
  }

  return (
    <div className="rtt-snapshots-grid">
      {files.map((f) => (
        <SnapshotCard
          key={f}
          name={f}
          file={`${f}.snapshot.json`}
          data={snapshots[f]}
        />
      ))}
    </div>
  );
};

/* ------------------------------------------------------------
   Diff Viewer (simple structural diff)
------------------------------------------------------------ */
const diffJSON = (a, b) => {
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
};

const DiffViewer = ({ a, b }) => {
  const diffs = diffJSON(a, b);

  return (
    <Panel title="Diff Viewer" badge={`${diffs.length} changes`}>
      <pre className="rtt-diff">
        {diffs.map((d, i) => (
          <div key={i} className={`rtt-diff__line rtt-diff__line--${d.type}`}>
            {d.type.toUpperCase()} {d.path}: {JSON.stringify(d.before)} →{" "}
            {JSON.stringify(d.after)}
          </div>
        ))}
      </pre>
    </Panel>
  );
};

/* ------------------------------------------------------------
   Main RTT/1 React Shell
------------------------------------------------------------ */
export default function RTT1ReactApp() {
  const [pipeline, setPipeline] = useState(null);

  useEffect(() => {
    fetchJSON("../mock-snapshots/full_pipeline.snapshot.json")
      .then(setPipeline)
      .catch(() => setPipeline(null));
  }, []);

  return (
    <div className="rtt-shell">
      <header className="rtt-shell__header">
        <div className="rtt-shell__title">RTT/1 React Viewer</div>
        <div className="rtt-shell__session">rtt=1 · coherence=declared</div>
      </header>

      <main className="rtt-shell__main">
        <Panel title="Snapshots" badge="RTT/1">
          <SnapshotViewer />
        </Panel>

        {pipeline && (
          <DiffViewer a={pipeline} b={pipeline} />
        )}
      </main>

      <footer className="rtt-shell__footer">
        TriadicFrameworks · RTT/1 React Edition
      </footer>
    </div>
  );
}

/* ------------------------------------------------------------
   CSS Animations (inline for convenience)
------------------------------------------------------------ */
const style = document.createElement("style");
style.textContent = `
@keyframes rttPulse {
  0% { transform: scale(1); opacity: 0.8; }
  50% { transform: scale(1.25); opacity: 1; }
  100% { transform: scale(1); opacity: 0.8; }
}
`;
document.head.appendChild(style);

