# RTT/1 — Structural Map (Narrative)
**Engine:** RTT/1 Structural  
**Mode:** S‑mode  
**Session:** rtt=1 · coherence=declared · drift=bounded · paradox=structural  

The RTT/1 Structural Map describes how the engine processes an input from its initial clarity surface through structural analysis and into a final diagnostic table.  
It is the narrative companion to:

- `structure-map.json` (machine‑readable topology)
- `structure-map.svg` (visual topology)
- RTT/1 pipeline definitions in `engine.json`

---

## 1. Overview
RTT/1 is a **layered structural engine**.  
It evaluates the structure of an input without interpreting meaning, resolving paradoxes, or altering coherence.

The engine flows through five layers:

1. **Clarity Surface**  
2. **Load‑Bearing Detection**  
3. **Contradiction Scan**  
4. **Structural Critique**  
5. **Diagnostic Surface**

Each layer depends on the outputs of earlier layers, forming a **linear‑layered topology**.

---

## 2. Layer Descriptions

### **2.1 Clarity Surface**
The first layer.  
It exposes the visible surface of the input:

- stated elements  
- surface claims  
- visible structure  
- vocabulary  
- declared relationships  

This layer provides the **structural raw material** for all downstream modules.

---

### **2.2 Load‑Bearing Detection**
The second layer.  
It identifies elements the input **depends on** for structural stability.

Outputs include:

- candidate load‑bearing elements  
- confirmed load‑bearing elements  
- structural anchors  
- collapse map  

This layer determines what the structure *requires* to hold together.

---

### **2.3 Contradiction Scan**
The third layer.  
It identifies contradictions visible from the clarity surface and load‑bearing map.

Contradictions include:

- direct  
- implicit  
- load‑bearing conflicts  
- propagation contradictions  
- regime contradictions  

This layer reveals structural conflicts without resolving them.

---

### **2.4 Structural Critique**
The fourth layer.  
It synthesizes the previous layers into a single structural reading.

Outputs include:

- structural presence  
- structural absence  
- structural tension  
- stability  
- structural shape  
- synthesis  

This layer evaluates the **overall structural integrity** of the input.

---

### **2.5 Diagnostic Surface**
The final layer.  
It produces a **parsable diagnostic table** combining all structural findings.

This table is used by:

- analysts  
- students  
- researchers  
- downstream engines  
- AIs  

It is the canonical RTT/1 output.

---

## 3. Pipeline Flow

The RTT/1 pipeline is strictly ordered:

```
clarity_surface
→ load_bearing_detection
→ contradiction_scan
→ structural_critique
→ diagnostic_surface
```

Each module receives the outputs of earlier modules.  
No module interprets meaning; all operate on structural features only.

---

## 4. Dependency Graph

### **Clarity Surface**
Feeds:

- load_bearing_detection  
- contradiction_scan  
- structural_critique  
- diagnostic_surface  

### **Load‑Bearing Detection**
Feeds:

- structural_critique  
- diagnostic_surface  

### **Contradiction Scan**
Feeds:

- structural_critique  
- diagnostic_surface  

### **Structural Critique**
Feeds:

- diagnostic_surface  

---

## 5. Structural Geometry

RTT/1 classifies its topology as:

- **Shape:** layered  
- **Flow:** linear  
- **Anchors:**  
  - load_bearing_candidates  
  - contradiction_geometry  
  - presence  
  - absence  
  - tension  
  - diagnostic_summary  

These anchors define how structural information propagates through the engine.

---

## 6. Purpose of the Structural Map

The structural map provides:

- a human‑readable explanation of RTT/1’s architecture  
- a guide for developers integrating RTT/1 into front‑ends  
- a reference for students learning RTT structural analysis  
- a topology for AIs performing structural reasoning  

It ensures that RTT/1 remains:

- coherent  
- drift‑bounded  
- structurally consistent  
- canon‑aligned  

---

# End of Structural Map (Narrative)
RTT/1 proceeds next to:

- engine routing (`rtt1.js`)  
- diagnostic rendering (`diagnostic-table.html`)  
- structural documentation (`structural-critique.md`)  
