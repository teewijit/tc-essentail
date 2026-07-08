# Split Related Sections Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Split same-group fabrics and similar products into separate helpers and separate detail-page components.

**Architecture:** `relatedFabrics.js` exposes purpose-specific data helpers. `SameTypeSection` stays compact and swatch-focused near the purchase actions. `SimilarProductsSection` shows richer product detail in the lower page section.

**Tech Stack:** React 19, Vite, Tailwind CSS utilities, Node test runner.

## Global Constraints

- Keep the existing Tailwind utility style and Bai Jamjuree typography.
- Do not add dependencies.
- Similar products must show detail, not only swatches.
- Keep helper behavior testable with Node's built-in test runner.

---

### Task 1: Purpose-Specific Related Fabric Helpers

**Files:**
- Modify: `src/components/detail/relatedFabrics.test.js`
- Modify: `src/components/detail/relatedFabrics.js`

**Interfaces:**
- Produces: `getSameTypeFabrics(fabric, options)` returns fabrics with the same `type`, including the current fabric.
- Produces: `getSimilarFabrics(fabric, options)` returns fabrics outside the same `type`, sorted by usage/GSM similarity and capped by `limit`.

- [ ] **Step 1: Write the failing test**

Update imports and assertions in `src/components/detail/relatedFabrics.test.js` to use `getSameTypeFabrics` and `getSimilarFabrics`.

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test src/components/detail/relatedFabrics.test.js`

Expected: FAIL because `getSameTypeFabrics` and `getSimilarFabrics` are not exported yet.

- [ ] **Step 3: Write minimal implementation**

Replace `getRelatedFabrics` with the two named helpers while preserving the existing scoring behavior.

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test src/components/detail/relatedFabrics.test.js`

Expected: PASS.

### Task 2: Separate Detail-Page Components

**Files:**
- Create: `src/components/detail/SameTypeSection.jsx`
- Create: `src/components/detail/SimilarProductsSection.jsx`
- Modify: `src/pages/FabricDetailPage.jsx`
- Delete: `src/components/detail/RelatedSection.jsx` if no imports remain.

**Interfaces:**
- Consumes: `getSameTypeFabrics(fabric)` and `getSimilarFabrics(fabric)`.
- Produces: `SameTypeSection({ fabric, onOpen })` and `SimilarProductsSection({ fabric, onOpen, onViewAll })`.

- [ ] **Step 1: Implement `SameTypeSection`**

Move the compact swatch grid behavior into a focused component with no `mode` or `compact` props.

- [ ] **Step 2: Implement `SimilarProductsSection`**

Render similar fabrics as detailed clickable product cards with swatch, code, name, type, usage, GSM, width, price, and description.

- [ ] **Step 3: Wire `FabricDetailPage`**

Replace the upper `RelatedSection mode="sameType" compact` usage with `SameTypeSection`. Replace the lower `RelatedSection mode="related"` usage with `SimilarProductsSection`.

- [ ] **Step 4: Verify no old component imports remain**

Search for `RelatedSection` and remove `src/components/detail/RelatedSection.jsx` if unused.

### Task 3: Verification

**Files:**
- Check: `src/components/detail/*.jsx`
- Check: `src/pages/FabricDetailPage.jsx`

- [ ] **Step 1: Run helper tests**

Run: `node --test src/components/detail/relatedFabrics.test.js`

- [ ] **Step 2: Run lint**

Run: `npm run lint`

- [ ] **Step 3: Run build**

Run: `npm run build`

## Self-Review

- Spec coverage: helper split, component split, richer similar-product detail, and page wiring are covered.
- Placeholder scan: no placeholders remain.
- Type consistency: component and helper names match between tasks.
