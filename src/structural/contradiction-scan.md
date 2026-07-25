# RTT/1 — Contradiction Scan  
**Module:** Structural.ContradictionScan  
**Version:** 1.0.0-alpha  
**Session:** rtt=1 · coherence=declared · drift=bounded · paradox=structural

---

## 1. Purpose

The contradiction scan identifies **structural contradictions** visible on the RTT/1 surface.  
Contradictions differ from tensions:

- **tensions** = surface-level misalignments  
- **contradictions** = mutually incompatible structural claims  

---

## 2. Contradiction Structure

```json
{
  "contradiction_scan": {
    "contradictions": ["string"],
    "severity": "none | low | medium | high"
  }
}
```

---

## 3. Extraction Rules

- contradictions must be **explicit**  
- contradictions must be **structural**, not interpretive  
- contradictions must be **surface-visible**  
- severity is based on **operator conflict density**

---

## 4. Example

```json
{
  "contradiction_scan": {
    "contradictions": ["Claim A conflicts with Claim B"],
    "severity": "medium"
  }
}
```
