# RTT/1 — Clarity Surface  
**Module:** Clarity.Surface  
**Version:** 1.0.0-alpha  
**Session:** rtt=1 · coherence=declared · drift=bounded · paradox=structural

---

## 1. Purpose

The clarity surface is the **first RTT/1 layer** applied to any input.  
It does not interpret, critique, or restructure.  
It exposes only what is **already present** on the surface.

This module defines the canonical structure of the clarity surface used by:

- `analyze.js`  
- `report.worker.js`  
- `report.client.js`  
- `clarity-scan.md`  
- `clarity-report.md`  

---

## 2. Clarity Surface Structure

```json
{
  "clarity_surface": {
    "summary": "string | null",
    "signals": ["string"],
    "operators": ["string"],
    "coherence": "declared | null",
    "drift": "bounded | high | null",
    "paradox": "structural | null"
  }
}
```

### Field meanings

- **summary** — a neutral description of the visible surface  
- **signals** — clarity‑relevant tokens extracted from the input  
- **operators** — structural operators present on the surface  
- **coherence** — declared coherence state  
- **drift** — drift classification  
- **paradox** — paradox regime  

---

## 3. Extraction Rules

### 3.1 Summary  
- Must be neutral  
- Must be surface‑only  
- No interpretation  
- No critique  

### 3.2 Signals  
Extract tokens that are:

- structurally relevant  
- clarity‑bearing  
- non‑trivial (length > 5)  

### 3.3 Operators  
Extract operators that:

- appear explicitly  
- shape the surface  
- contribute to clarity structure  

### 3.4 Coherence  
Declared by session context or analyzer.

### 3.5 Drift  
Bounded unless analyzer detects instability.

### 3.6 Paradox  
Structural for RTT/1.

---

## 4. Gradient Capture Mapping

| Gradient Capture | Clarity Surface |
|------------------|-----------------|
| `capture.summary` | `summary` |
| `capture.tokens` | `signals` |
| `capture.operators` | `operators` |
| `capture.coherence` | `coherence` |
| `capture.drift` | `drift` |
| `capture.regime` | `paradox` |

---

## 5. Example Clarity Surface

```json
{
  "clarity_surface": {
    "summary": "Input presents a structured claim with stable vocabulary.",
    "signals": ["structured", "vocabulary", "stability"],
    "operators": ["claim", "structure"],
    "coherence": "declared",
    "drift": "bounded",
    "paradox": "structural"
  }
}
```

---

## 6. Downstream Modules

- `clarity-scan.md` — performs RTT/1 clarity scanning  
- `clarity-report.md` — produces full clarity reports  
- `clarity.worker.js` — worker‑optimized clarity extraction  
- `clarity.client.js` — browser clarity extraction  

---

## 7. Session Context

```
rtt=1
coherence=declared
drift=bounded
paradox=structural
```
