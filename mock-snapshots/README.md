# RTT/1 — Mock Snapshots

This directory contains **deterministic mock snapshots** used for CI testing of the RTT/1 structural engine.

Snapshots provide stable, predictable outputs that allow developers and automated systems to verify:

- pipeline stability  
- deterministic structural behavior  
- front‑end integration correctness  
- regression detection  
- consistent engine geometry across updates  

Each file in this directory corresponds to one RTT/1 layer, plus a full‑pipeline snapshot.

All snapshots are **synthetic**, **safe**, and **canon‑aligned**. They do not represent real analysis; instead, they serve as fixed reference outputs for testing and validation.

## Included Snapshots

- `clarity_surface.snapshot.json`  
- `load_bearing.snapshot.json`  
- `contradiction_scan.snapshot.json`  
- `structural_critique.snapshot.json`  
- `diagnostic_surface.snapshot.json`  
- `full_pipeline.snapshot.json`  

## Related Files

- `index.json` — snapshot manifest  
- `schema.json` — validation schema  
- `schema.test.js` — schema validator harness  
- `snapshots/run.js` — snapshot runner  
- `snapshots.diff.md` — human‑readable diff viewer  

## Usage

Snapshots are automatically validated and compared against live RTT/1 output through:

- GitHub Actions (`ci.yml`)  
- `snapshots/run.js`  
- `schema.test.js`  

These tools ensure the RTT/1 engine remains structurally deterministic and drift‑bounded across all updates.
