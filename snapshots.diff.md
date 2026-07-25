# RTT/1 — Snapshot Diff Viewer
**File:** snapshots.diff.md  
**Engine:** RTT/1  
**Session:** rtt=1 · coherence=declared · drift=bounded · paradox=structural  

This document provides a **human‑readable diff surface** between:

- the **current RTT/1 engine output**, and  
- the **mock snapshots** in `mock-snapshots/`.

It is meant to be used alongside `snapshots/run.js` in CI and local development.

---

## 1. Diff Legend

- `+` — present in engine output, absent in snapshot  
- `-` — present in snapshot, absent in engine output  
- `~` — structurally present in both, but value differs  
- `=` — structurally identical (no diff)

---

## 2. Clarity Surface Diff

```text
Section: clarity_surface

= summary
= stated_elements
= surface_claims
= visible_structure
= surface_vocabulary
= declared_relationships
= surface_tensions
= surface_gaps
= surface_questions
```

---

## 3. Load‑Bearing Diff

```text
Section: load_bearing

= candidates
= confirmed
= anchors
= collapse_map
= relationships
= questions
```

---

## 4. Contradiction Scan Diff

```text
Section: contradiction_scan

= direct
= implicit
= load_bearing_conflicts
= propagation
= regime
= geometry
= questions
```

---

## 5. Structural Critique Diff

```text
Section: structural_critique

= presence
= absence
= tension
= stability
= shape
= synthesis
= questions
```

---

## 6. Diagnostic Surface Diff

```text
Section: diagnostic_surface

= diagnostic.summary
```

---

## 7. Full Pipeline Snapshot Diff

```text
Section: full_pipeline

= engine
= version
= session.rtt
= session.coherence
= session.drift
= session.paradox

= clarity_surface.*
= load_bearing.*
= contradiction_scan.*
= structural_critique.*
= diagnostic_surface.*
```

---

## 8. Usage Notes

- Run `node snapshots/run.js` to generate live diffs in the console.  
- Use this file as the **canonical reference** for expected snapshot structure.  
- Any future changes to RTT/1 that alter structure should update:
  - `mock-snapshots/*.snapshot.json`
  - `snapshots/run.js`
  - `snapshots.diff.md`

RTT/1 remains **structurally deterministic** when this diff surface shows only `=` entries.
