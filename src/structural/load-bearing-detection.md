# RTT/1 — Load-Bearing Detection  
**Module:** Structural.LoadBearingDetection  
**Version:** 1.0.0-alpha  
**Session:** rtt=1 · coherence=declared · drift=bounded · paradox=structural

---

## 1. Purpose

Load-bearing detection identifies structural elements that **support** the RTT/1 surface.  
These elements become candidates for RTT/2 structural elevation.

---

## 2. Load-Bearing Structure

```json
{
  "load_bearing_detection": {
    "candidates": ["string"],
    "anchors": ["string"],
    "support_level": "weak | moderate | strong"
  }
}
```

---

## 3. Extraction Rules

- candidates must be **structurally relevant**  
- anchors must be **repeated** or **stabilizing**  
- support level is based on **anchor density + operator stability**

---

## 4. Example

```json
{
  "load_bearing_detection": {
    "candidates": ["structure"],
    "anchors": ["structure", "stability"],
    "support_level": "strong"
  }
}
```
