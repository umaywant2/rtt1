# RTT/1 — Clarity Surface
**Engine:** RTT/1 Structural  
**Mode:** S‑mode (surface-only)  
**Session:** rtt=1 · coherence=declared · drift=bounded · paradox=structural  

The clarity surface is the **visible layer** of the input.  
It does **not** interpret, restructure, or critique.  
It simply exposes what is **already there**, in a way that is:

- structurally neutral  
- drift‑bounded  
- coherence‑declared  
- paradox‑aware (but not paradox‑resolving)

---

## 1. Surface Summary
A short, neutral description of what the input *appears* to be doing.

**Template:**
- The input presents itself as:  
  - a claim / argument / explanation / narrative / specification  
- Its immediate surface intention seems to be:  
  - {describe intention without interpreting}  
- The surface structure is:  
  - linear / fragmented / layered / enumerated / mixed  

---

## 2. Stated Elements
List only what the input **explicitly** states.

**Template:**
- Key statements:  
  - {statement 1}  
  - {statement 2}  
  - {statement 3}  
- Declared goals:  
  - {goal 1}  
- Declared constraints:  
  - {constraint 1}  

---

## 3. Visible Structure
Describe the **shape** of the input without evaluating it.

**Template:**
- Form: paragraph / list / hybrid  
- Ordering: sequential / thematic / unordered  
- Surface anchors:  
  - {anchor 1}  
  - {anchor 2}  
- Load‑bearing candidates (surface only):  
  - {candidate 1}  
  - {candidate 2}  

*(These are not confirmed load‑bearing elements; RTT/1 confirms them later.)*

---

## 4. Surface Claims
Extract only the claims that are **directly visible**.

**Template:**
- Claim A: {text}  
- Claim B: {text}  
- Claim C: {text}  

---

## 5. Surface Vocabulary
Identify vocabulary that shapes the surface.

**Template:**
- Technical terms: {term 1}, {term 2}  
- Repeated terms: {term 1}, {term 2}  
- Framing terms: {term 1}, {term 2}  

---

## 6. Declared Relationships
Only relationships the input **explicitly** asserts.

**Template:**
- {X} is related to {Y} by {relationship}  
- {A} depends on {B}  
- {C} causes / implies / requires {D}  

---

## 7. Surface Tensions (Non‑evaluative)
These are **visible tensions**, not contradictions.  
Contradictions are handled later by RTT/1’s contradiction scan.

**Template:**
- Tension between {element 1} and {element 2}  
- Tension between {goal} and {constraint}  

---

## 8. Surface Gaps (Non‑interpretive)
Gaps are **missing pieces** that the input *appears* to rely on but does not state.

**Template:**
- Missing definition of {term}  
- Missing link between {A} and {B}  
- Missing justification for {claim}  

---

## 9. Surface Questions
These are **questions the surface raises**, not critiques.

**Template:**
- What does {term} mean on the surface?  
- How does {A} connect to {B}?  
- What is the intended scope of {claim}?  

---

## 10. Surface Output (RTT/1)
This is the canonical RTT/1 clarity‑surface output block.

```json
{
  "clarity_surface": {
    "summary": "...",
    "stated_elements": ["..."],
    "visible_structure": ["..."],
    "surface_claims": ["..."],
    "surface_vocabulary": ["..."],
    "declared_relationships": ["..."],
    "surface_tensions": ["..."],
    "surface_gaps": ["..."],
    "surface_questions": ["..."]
  }
}
```

---

# End of Clarity Surface  
RTT/1 proceeds next to:

1. **load‑bearing detection**  
2. **contradiction scan**  
3. **structural critique**  
4. **diagnostic surface**  

All downstream modules depend on this surface.
