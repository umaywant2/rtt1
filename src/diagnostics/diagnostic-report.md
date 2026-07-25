# RTT/1 Diagnostic Report  
**Module:** Diagnostics.Report  
**Version:** 1.0.0-alpha  
**Session:** rtt=1 · coherence=declared · drift=bounded · paradox=structural

---

## 1. Purpose

The Diagnostic Report module provides a unified RTT/1 diagnostic envelope combining:

- issues  
- warnings  
- stats  
- clarity-surface diagnostics  
- scan diagnostics  
- graph diagnostics  

It is the canonical diagnostic layer used by:

- diagnosticEngine  
- diagnosticWorker  
- diagnosticClient  
- diagnosticGraph  
- clarity/report pipelines  

---

## 2. Diagnostic Envelope Structure

```json
{
  "diagnostics": {
    "issues": ["string"],
    "warnings": ["string"],
    "stats": {
      "timestamp": 1721920000000,
      "length": 128
    }
  }
}
```

---

## 3. Diagnostic Categories

### Issues  
Clarity-breaking or analysis-breaking conditions.

### Warnings  
Clarity-weakening or stability-reducing conditions.

### Stats  
Structural metadata:

- timestamp  
- payload length  

---

## 4. Graph Diagnostics

Graph diagnostics apply the diagnostic engine to each node:

```json
{
  "nodes": [
    {
      "id": "node-1",
      "diagnostics": { ... }
    }
  ],
  "edges": []
}
```

---

## 5. Downstream Modules

- clarity-report  
- clarity-scan  
- clarity-surface  
- diagnostic.graph  
- diagnostic.openapi  

---

## 6. Session Context

```
rtt=1
coherence=declared
drift=bounded
paradox=structural
```
