# RTT/1 — Mock Snapshot Suite  
**Directory:** `mock-snapshots/`  
**Mode:** S‑Mode (Synthetic Mode)  
**Session:** rtt=1 · coherence=declared · drift=bounded · paradox=structural  

The **mock snapshot suite** provides a deterministic, drift‑bounded reference surface for validating the RTT/1 engine.  
Snapshots do not represent real analysis; instead, they encode **canonical structural geometry** used for:

- CI reproducibility  
- regression detection  
- front‑end stability  
- schema validation  
- pipeline topology checks  

This document is the **full Docsbook edition**, offering deep structural context, topology, diagnostics, and canonical alignment.

---

## 1. Purpose of the Snapshot Suite

The RTT/1 engine produces a multi‑layer structural output.  
To ensure stability across updates, the engine is tested against **synthetic snapshots** that mirror the canonical shape of each layer.

Snapshots ensure:

- deterministic output  
- stable geometry  
- predictable front‑end rendering  
- CI‑safe comparisons  
- drift‑bounded evolution  

Snapshots are **structural**, not semantic.  
They validate **shape**, not meaning.

---

## 2. Snapshot Inventory

The suite contains one snapshot per RTT/1 layer, plus a full pipeline snapshot:

| Layer | Snapshot File | Description |
|-------|---------------|-------------|
| Clarity Surface | `clarity_surface.snapshot.json` | Surface geometry (claims, vocabulary, structure) |
| Load‑Bearing | `load_bearing.snapshot.json` | Anchor geometry (candidates, confirmed anchors, collapse maps) |
| Contradiction Scan | `contradiction_scan.snapshot.json` | Conflict geometry (direct, implicit, propagation, regime) |
| Structural Critique | `structural_critique.snapshot.json` | Stability geometry (presence, absence, tension, shape, synthesis) |
| Diagnostic Surface | `diagnostic_surface.snapshot.json` | Diagnostic geometry (summary only) |
| Full Pipeline | `full_pipeline.snapshot.json` | Aggregated RTT/1 pipeline output |

All snapshots are **complete**, **canon‑aligned**, and **drift‑bounded**.

---

## 3. Structural Topology

The RTT/1 pipeline flows through five layers:

```
Clarity Surface
      ↓
Load‑Bearing
      ↓
Contradiction Scan
      ↓
Structural Critique
      ↓
Diagnostic Surface
```

The **full pipeline snapshot** sits at the center of the topology:

```
          full_pipeline.snapshot.json
                 /    |    \
                /     |     \
               /      |      \
   clarity_surface   load_bearing   contradiction_scan
               \      |      /
                \     |     /
                 structural_critique
                        ↓
                 diagnostic_surface
```

This topology is encoded in:

- `topology.md`  
- `topology.svg`  
- `topology.json`  

---

## 4. Schema & Validation

The snapshot suite is validated using:

- `schema.json` — JSON Schema defining canonical RTT/1 geometry  
- `schema.test.js` — AJV‑based validator harness  
- `snapshots/run.js` — pipeline runner and diff generator  

Validation ensures:

- all required keys exist  
- arrays contain valid geometry  
- collapse maps reference valid anchors  
- contradiction geometry is structurally sound  
- pipeline snapshot matches layer snapshots  

---

## 5. Diagnostics

The suite includes:

- `diagnostics.md` — human‑readable diagnostic report  
- `snapshots.diff.md` — diff viewer  
- `coverage.md` — coverage report  

Diagnostics confirm:

- no missing geometry  
- no malformed arrays  
- no orphan anchors  
- no drift indicators  
- no cross‑layer contradictions  
- full pipeline alignment  

All snapshots are **structurally healthy**.

---

## 6. Manifest & Visual Maps

Supporting files:

- `index.json` — machine‑readable manifest  
- `manifest.svg` — visual snapshot map  
- `topology.svg` — pipeline topology diagram  
- `topology.json` — machine‑readable topology graph  

These provide:

- developer clarity  
- CI integration  
- front‑end visualization  
- structural introspection  

---

## 7. Canon Alignment

Snapshots follow TriadicFrameworks canon:

- clarity‑first  
- structure‑only  
- deterministic geometry  
- drift‑bounded evolution  
- coherence declared  
- paradox structural  

They do not interpret meaning.  
They validate **shape**, **flow**, and **structural consistency**.

---

## 8. License

Open educational use permitted.
