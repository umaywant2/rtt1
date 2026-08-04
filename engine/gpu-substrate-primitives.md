# gpu-substrate-primitives — RTT/1 Operator
**RTT:** 1  
**Coherence:** None  
**Drift:** None  
**Paradox:** None  

## 1. Overview
The GPU Substrate Primitives operator converts OpenGPU substrate nodes and edges
into RTT/1 primitive clarity objects. RTT/1 does not interpret drift, coherence,
or geometry — only structural primitives.

## 2. Input
```json
{
  "nodes": [ ... ],
  "edges": [ ... ]
}
```

## 3. Processing
- Each substrate node → RTT/1 primitive
- Each substrate edge → RTT/1 relationship
- All values must be deterministic and normalized

## 4. Output
```json
{
  "engine": "RTT/1",
  "operator": "gpu-substrate-primitives",
  "version": "2026.1",
  "primitives": [ ... ],
  "relationships": [ ... ]
}
```

## 5. Errors
- GS1-001: Invalid substrate input

## 6. Version
2026.1
