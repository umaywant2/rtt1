# RTT/1 — Clarity Scan  
**Module:** Clarity.Scan  
**Version:** 1.0.0-alpha  
**Session:** rtt=1 · coherence=declared · drift=bounded · paradox=structural

---

## 1. Purpose

The clarity scan is the **diagnostic layer** that evaluates the clarity surface.  
It identifies:

- clarity tensions  
- clarity gaps  
- clarity anchors  
- clarity load‑bearing candidates  
- clarity stability  

It is the RTT/1 mechanism that determines **how well the surface holds together**.

---

## 2. Clarity Scan Structure

```json
{
  "clarity_scan": {
    "anchors": ["string"],
    "tensions": ["string"],
    "gaps": ["string"],
    "load_bearing": ["string"],
    "stability": "stable | weak | fractured"
  }
}
```

### Field meanings

- **anchors** — elements that stabilize the clarity surface  
- **tensions** — visible surface tensions (not contradictions)  
- **gaps** — missing clarity elements  
- **load_bearing** — candidates for structural load‑bearing  
- **stability** — overall clarity stability classification  

---

## 3. Extraction Rules

### 3.1 Anchors  
Elements that:

- repeat  
- structure the surface  
- provide continuity  

### 3.2 Tensions  
Visible tensions between:

- claims  
- goals  
- constraints  
- vocabulary  

### 3.3 Gaps  
Missing:

- definitions  
- links  
- justifications  

### 3.4 Load‑Bearing  
Candidates that:

- appear structurally important  
- shape the clarity surface  
- may become load‑bearing in RTT/2  

### 3.5 Stability  
Determined by:

- anchor strength  
- tension severity  
- gap density  
- operator coherence  

---

## 4. Gradient Capture Mapping

| Gradient Capture | Clarity Scan |
|------------------|--------------|
| `capture.tokens` | anchors |
| `capture.operators` | load_bearing |
| `capture.summary` | stability cues |
| `capture.regime` | paradox regime |

---

## 5. Example Clarity Scan

```json
{
  "clarity_scan": {
    "anchors": ["structure", "claim"],
    "tensions": ["goal vs constraint"],
    "gaps": ["missing definition of scope"],
    "load_bearing": ["structure"],
    "stability": "stable"
  }
}
```

---

## 6. Downstream Modules

- `clarity-report.md` — integrates clarity surface + clarity scan  
- `clarity.worker.js` — worker‑optimized clarity scanning  
- `clarity.client.js` — browser clarity scanning  

---

## 7. Session Context

```
rtt=1
coherence=declared
drift=bounded
paradox=structural
```
