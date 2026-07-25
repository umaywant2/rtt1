# RTT/1 Example Inputs  
**Module:** Examples.Inputs  
**Version:** 1.0.0-alpha

---

## 1. Simple Text Input

```json
{
  "text": "The system maintains structural stability across its components."
}
```

---

## 2. Multi-field Input

```json
{
  "text": "Subsystem coherence remains stable.",
  "metadata": {
    "source": "unit-test",
    "priority": "high"
  }
}
```

---

## 3. Graph Node Input

```json
{
  "id": "node-1",
  "label": "Subsystem A",
  "payload": {
    "text": "Subsystem A exhibits bounded drift."
  }
}
```

---

## 4. Full Graph Input

```json
{
  "nodes": [
    { "id": "n1", "payload": { "text": "A is stable." } },
    { "id": "n2", "payload": { "text": "B shows minor drift." } }
  ],
  "edges": [
    { "from": "n1", "to": "n2", "label": "dependency" }
  ]
}
```
