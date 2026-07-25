# RTT/1 — Contradiction Scan
**Engine:** RTT/1 Structural  
**Mode:** S‑mode (structural contradiction scan)  
**Session:** rtt=1 · coherence=declared · drift=bounded · paradox=structural  

The contradiction scan identifies **structural contradictions** visible from the clarity surface and load‑bearing map.  
RTT/1 distinguishes between:

- **Direct contradictions** — explicitly stated conflicts  
- **Implicit contradictions** — structural conflicts revealed by dependencies  
- **Propagation contradictions** — contradictions that spread through anchors  
- **Regime contradictions** — contradictions between declared coherence and structural behavior  

This scan does **not** resolve contradictions; it only exposes them.

---

## 1. Direct Contradictions
Contradictions explicitly stated in the input.

**Template:**
- Direct A: {statement vs statement}  
- Direct B: {statement vs statement}  

---

## 2. Implicit Contradictions
Contradictions inferred from structural relationships.

**Template:**
- Implicit A: {dependency conflict}  
- Implicit B: {anchor conflict}  

---

## 3. Load‑Bearing Conflicts
Contradictions involving confirmed load‑bearing elements.

**Template:**
- {Element 1} conflicts with {Element 2} because {reason}.  
- {Element A} cannot support {Element B} under declared constraints.  

---

## 4. Propagation Contradictions
Contradictions that spread through anchors or dependencies.

**Template:**
- Removing {element} propagates contradiction to {dependent elements}.  
- Contradiction between {A} and {B} spreads to {C}.  

---

## 5. Regime Contradictions (RTT/1)
Contradictions between declared coherence and structural behavior.

**Template:**
- Declared coherence {X} conflicts with structural behavior {Y}.  
- Drift‑bounded declaration conflicts with {structural pattern}.  

---

## 6. Contradiction Geometry (Surface‑Level)
RTT/1 classifies contradiction geometry as:

- **Linear** — contradiction moves in a straight dependency chain  
- **Radial** — contradiction spreads outward from a central anchor  
- **Oscillatory** — contradiction alternates between elements  
- **Topological** — contradiction arises from structural shape  

**Template:**
- Geometry: {linear / radial / oscillatory / topological}  
- Origin: {element}  
- Spread: {elements}  

---

## 7. Contradiction Questions (Non‑interpretive)
Questions raised by contradiction patterns.

**Template:**
- What structural element causes the contradiction?  
- How does the contradiction propagate?  
- Which load‑bearing elements are affected?  

---

## 8. Contradiction Output (RTT/1)
Canonical RTT/1 output block for downstream modules.

```json
{
  "contradiction_scan": {
    "direct": ["..."],
    "implicit": ["..."],
    "load_bearing_conflicts": ["..."],
    "propagation": ["..."],
    "regime": ["..."],
    "geometry": {
      "type": "...",
      "origin": "...",
      "spread": ["..."]
    },
    "questions": ["..."]
  }
}
```

---

# End of Contradiction Scan  
RTT/1 proceeds next to:

1. **structural critique**  
2. **diagnostic surface**
