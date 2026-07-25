# RTT/1 — Snapshot Topology Map  
**Directory:** `mock-snapshots/`  
**Session:** rtt=1 · coherence=declared · drift=bounded · paradox=structural  

This document describes the **topological structure** of the RTT/1 snapshot suite.  
It maps each snapshot to its corresponding RTT/1 layer, shows the relationships between layers, and provides a structural overview of how the snapshot suite mirrors the RTT/1 engine pipeline.

Snapshots are **synthetic**, **deterministic**, and **canon‑aligned**.  
They exist to validate **structure**, not meaning.

---

## 1. Topology Overview

The RTT/1 snapshot suite mirrors the five canonical layers of the engine:

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

The **full pipeline snapshot** sits at the center, aggregating all layers into a single deterministic structural output.

---

## 2. Snapshot → Layer Mapping

| Snapshot File                         | RTT/1 Layer            | Role |
|---------------------------------------|-------------------------|------|
| `clarity_surface.snapshot.json`       | Clarity Surface         | Surface geometry |
| `load_bearing.snapshot.json`          | Load‑Bearing            | Anchor geometry |
| `contradiction_scan.snapshot.json`    | Contradiction Scan      | Conflict geometry |
| `structural_critique.snapshot.json`   | Structural Critique     | Stability geometry |
| `diagnostic_surface.snapshot.json`    | Diagnostic Surface      | Diagnostic geometry |
| `full_pipeline.snapshot.json`         | Pipeline (all layers)   | Aggregated geometry |

Each snapshot is structurally isolated but topologically connected through the RTT/1 pipeline.

---

## 3. Layer Geometry

### **Clarity Surface → Load‑Bearing**
The clarity surface defines:

- stated elements  
- visible structure  
- declared relationships  

These feed directly into the load‑bearing layer, which identifies:

- anchors  
- collapse maps  
- structural supports  

### **Load‑Bearing → Contradiction Scan**
Anchors and collapse maps determine:

- direct contradictions  
- implicit contradictions  
- load‑bearing conflicts  

### **Contradiction Scan → Structural Critique**
Contradiction geometry informs:

- presence  
- absence  
- tension  
- stability  
- shape geometry  

### **Structural Critique → Diagnostic Surface**
Critique geometry produces:

- diagnostic summaries  
- structural synthesis  
- stability assessments  

---

## 4. Pipeline Topology

The full pipeline snapshot (`full_pipeline.snapshot.json`) contains:

- engine identity  
- session metadata  
- all five RTT/1 layers  
- canonical structural shape  

It is the **topological root** of the snapshot suite.

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

This topology ensures:

- deterministic structure  
- drift‑bounded geometry  
- CI reproducibility  
- stable front‑end rendering  

---

## 5. Supporting Topology Files

| File                     | Purpose |
|--------------------------|---------|
| `index.json`             | Snapshot manifest |
| `schema.json`            | Validation schema |
| `schema.test.js`         | Schema validator harness |
| `snapshots/run.js`       | Snapshot runner |
| `snapshots.diff.md`      | Diff viewer |
| `manifest.svg`           | Visual topology map |

These files collectively maintain the **structural integrity** of the snapshot suite.

---

## 6. Topology Summary

The RTT/1 snapshot suite is:

- **complete**  
- **deterministic**  
- **canon‑aligned**  
- **drift‑bounded**  
- **structurally faithful** to RTT/1  

It provides a stable reference surface for CI, development, and front‑end integration.
