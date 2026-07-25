# Contributing to RTT/1
**Engine:** RTT/1  
**Mode:** S‑mode  
**Session:** rtt=1 · coherence=declared · drift=bounded · paradox=structural  

Thank you for your interest in contributing to the RTT/1 structural engine.  
This document describes the contribution workflow, coding conventions, documentation standards, and structural expectations for all patches, enhancements, and modules.

RTT/1 is part of the TriadicFrameworks canon.  
Contributions must preserve coherence, avoid drift, and maintain structural clarity.

---

## 1. Contribution Philosophy
RTT/1 is a **clarity‑first structural engine**.  
All contributions should:

- improve clarity  
- preserve structural integrity  
- maintain drift‑bounded behavior  
- avoid interpretive expansion  
- align with the RTT canon  

RTT/1 evaluates **structure only**.  
Contributions must not introduce interpretive logic or semantic inference.

---

## 2. Repository Structure
The RTT/1 repository contains:

- `engine.json` — engine identity + pipeline  
- `module.json` — TriadicFrameworks module manifest  
- `src/clarity/` — clarity surface modules  
- `src/structural/` — load‑bearing, contradiction, critique  
- `src/diagnostics/` — diagnostic table  
- `session-context.html` — canonical session metadata  
- `structure-map.json` — machine topology  
- `structure-map.md` — Docsbook narrative  
- `structure-map.svg` — visual topology  
- `rtt1.js` — pipeline router  
- `rtt1.css` — canonical styling  
- `rtt1.test.json` — pipeline test harness  
- `rtt1.test.js` — automated test runner  
- `rtt1.mock.json` — deterministic CI mock data  
- `api/analyze.js` — front-end wrapper  

Contributions should respect this structure.

---

## 3. Coding Standards
### 3.1 JavaScript (Engine + API)
- Use ES modules (`import` / `export`).  
- Avoid side effects in pipeline modules.  
- Functions must be deterministic.  
- No network calls inside engine modules.  
- No interpretation of meaning; structure only.

### 3.2 JSON (Topology + Tests)
- All JSON must be valid and parsable.  
- Keys use `snake_case`.  
- Engine outputs must match RTT/1 schema.  
- Test harnesses must be deterministic.

### 3.3 HTML/CSS (Docsbook + Front Door)
- Follow TriadicFrameworks Docsbook conventions.  
- Use semantic HTML.  
- Styling must remain minimal and structural.  
- No external dependencies.

---

## 4. Documentation Standards
All documentation must:

- follow the TriadicFrameworks Docsbook tone  
- use clarity‑first explanations  
- avoid interpretive commentary  
- include session context when relevant  
- maintain structural alignment with RTT canon  

Docsbook pages should be:

- concise  
- structural  
- coherent  
- drift‑bounded  

---

## 5. Adding New Modules
When adding a new module:

1. Update `module.json` with:
   - module name  
   - purpose  
   - category  
   - version  
   - structural role  

2. Add documentation in `docs/` or `src/` as appropriate.

3. Ensure the module:
   - does not alter pipeline order  
   - does not introduce interpretive drift  
   - integrates cleanly with existing layers  

4. Add tests to:
   - `rtt1.test.json`  
   - `rtt1.test.js`  

5. Update:
   - `structure-map.json`  
   - `structure-map.md`  
   - `structure-map.svg`  

---

## 6. Submitting a Pull Request
To submit a PR:

1. Fork the repository.  
2. Create a feature branch.  
3. Make changes with clear commit messages.  
4. Run the full test suite:
   - `rtt1.test.js`  
   - mock mode  
   - router integration  

5. Ensure documentation is updated.  
6. Submit PR with:
   - description of changes  
   - structural rationale  
   - test results  

PRs must maintain coherence and avoid drift.

---

## 7. Code of Conduct
Contributors must:

- respect the RTT canon  
- maintain clarity  
- avoid interpretive expansion  
- collaborate constructively  
- preserve structural integrity  

RTT/1 is a clarity‑first project.  
All contributions should reflect this principle.

---

## 8. License
Open educational use permitted.

---

# End of CONTRIBUTING.md
RTT/1 proceeds next to:

- structural critique  
- diagnostic surface  
- engine routing  

