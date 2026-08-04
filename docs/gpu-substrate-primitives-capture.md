# RTT/1 — GPU Substrate Primitives Capture

## Example Input
```json
{
  "nodes": [
    { "id": "substrate:rocm.queue.0", "label": "ROCm Queue 0", "tier": "S" },
    { "id": "substrate:rdp.endpoint.client", "label": "RDP Client", "tier": "R" }
  ],
  "edges": [
    { "from": "substrate:rocm.queue.0", "to": "substrate:rdp.endpoint.client", "weight": 0.8 }
  ]
}
```

## Example Output
```json
{
  "engine": "RTT/1",
  "operator": "gpu-substrate-primitives",
  "version": "2026.1",
  "primitives": [
    { "id": "substrate:rocm.queue.0", "label": "ROCm Queue 0", "tier": "S" },
    { "id": "substrate:rdp.endpoint.client", "label": "RDP Client", "tier": "R" }
  ],
  "relationships": [
    { "from": "substrate:rocm.queue.0", "to": "substrate:rdp.endpoint.client", "weight": 0.8 }
  ]
}
```

## Interpretation
RTT/1 exposes raw substrate clarity with no drift or coherence.
