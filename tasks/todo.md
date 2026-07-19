# Inner DAVE — Milestone 1 To-Do

Each task = one branch = one PR. 🙋 = needs your account/manual action. Check off as merged.
See [`tasks/plan.md`](plan.md) for the phases, dependency graph, and checkpoints.

---

## Phase 0 — Foundation

### ☐ P0.1 — Wire up the Git repo  🙋
Connect this folder to `github.com/vicki3z/inner_dave.git` and push what we have.
- **Do:** `git init`; add `origin`; `git fetch`; merge any remote history (`--allow-unrelated-histories`); add `.gitignore` (`node_modules`, `.next`, `.env*`, `test-results`, `storybook-static`); commit `docs/`, `SPEC.md`, `prototypes/`, `tasks/`; push `-u origin main`.
- **Accept:** remote tracks `main`; existing docs/spec/prototype are on GitHub; tree is clean.
- **Verify:** `git remote -v` shows origin; `git status` clean; commit visible on GitHub.
- **Learn:** connecting a local folder to an existing remote; the reconciliation merge.

### ☐ P0.2 — Scaffold Next.js + TypeScript
- **Do:** `pnpm` via `corepack enable`; `create-next-app` (App Router, TS strict, src dir, **no ESLint**); trim boilerplate to a minimal home page.
- **Accept:** `pnpm dev` serves a page at `localhost:3000`; `pnpm typecheck` passes.
- **Verify:** open the page; run `pnpm typecheck`.
- **Learn:** App Router folder layout; Server vs Client Components.

### ☐ P0.3 — Biome (lint + format)
- **Do:** add Biome + `biome.json`; scripts `lint` (check) and `format` (write); remove any stray ESLint config.
- **Accept:** `pnpm lint` and `pnpm format` run clean on the scaffold.
- **Verify:** run both; introduce a bad format, confirm `format` fixes it.
- **Learn:** one fast tool replacing ESLint + Prettier.

### ☐ P0.4 — Tailwind + our design tokens
- **Do:** install Tailwind; port the prototype's CSS-variable tokens into `globals.css`; map them into the Tailwind theme; wire serif/rounded font stacks; set the light/dark mechanism (`prefers-color-scheme` + `data-theme` override). Add a throwaway `/_swatch` route.
- **Accept:** `/_swatch` shows the palette, both fonts, and both themes correctly.
- **Verify:** toggle theme on `/_swatch`; colours/fonts match the prototype.
- **Learn:** tokens → Tailwind theme wiring; theme override precedence.

### ☐ P0.5 — Vitest (unit)
- **Do:** set up Vitest; write one real test for a `lib/utils/dates.ts` helper (e.g. `localDayString`).
- **Accept:** `pnpm test` green with ≥1 meaningful test.
- **Verify:** `pnpm test`; break the util, confirm red.
- **Learn:** Vitest config; the unit-test loop.

### ☐ P0.6 — Storybook (+ first primitive)
- **Do:** set up Storybook; build one token-based primitive (`Card` or `Chip`) with a story rendering it in **light and dark**.
- **Accept:** `pnpm storybook` shows the primitive in both themes.
- **Verify:** open Storybook; switch theme in the story.
- **Learn:** building components in isolation; the design-system workflow.

### ☐ P0.7 — Supabase + Drizzle (+ users + auth seam)  🙋
- **Do:** 🙋 create Supabase project, put `DATABASE_URL`/`DIRECT_URL` in `.env.local`; Drizzle config; `users` table in `lib/db/schema.ts`; first migration; `db:seed` (one user); `getCurrentUser()` seam returning the seeded user.
- **Accept:** `pnpm db:migrate` applies; `pnpm db:seed` inserts; `pnpm db:studio` shows the user; `getCurrentUser()` returns it.
- **Verify:** run migrate/seed/studio; a tiny script logs `getCurrentUser()`.
- **Learn:** schema → migration → seed; the single-user seam that becomes real auth later.

### ☐ P0.8 — Playwright (E2E)
- **Do:** set up Playwright; one test asserting the home page loads and shows expected text.
- **Accept:** `pnpm test:e2e` green against the dev/preview server.
- **Verify:** `pnpm test:e2e`.
- **Learn:** real-browser E2E setup; how it differs from RTL.

### ☐ P0.9 — CI + Chromatic  🙋
- **Do:** GitHub Actions workflow running `typecheck + lint + test` on PRs; 🙋 Chromatic project + token (repo secret) + workflow publishing stories; capture baseline.
- **Accept:** a PR shows CI green; Chromatic baseline captured; a deliberate visual change is flagged.
- **Verify:** open a test PR; view the checks + Chromatic build.
- **Learn:** CI quality gates; visual-regression review.

> **✅ Checkpoint A** — foundation solid, everything green, repo + CI live.

---

## Phase 1 — Check in and see today

### ☐ P1.1 — Domain vocab + copy module
- **Do:** `lib/domain/enums.ts` (Energy, Texture unions); `lib/copy/` — texture words+glosses, energy labels, the `energy × texture` read-out map, rotating check-in prompts, close/welcome copy; the **copy-lint** Vitest test (fails on any banned causal/evaluative/guilt word from SPEC §9).
- **Accept:** copy imported from one place; copy-lint test passes and *fails* if a banned word is added.
- **Verify:** `pnpm test`; add "because" to a string, confirm red, revert.
- **Learn:** centralised copy; enforcing the voice via a test.

### ☐ P1.2 — `entries` schema + save action
- **Do:** `entries` table + Postgres enums (energy/texture) + `note` + `checked_in_at`, **no unique constraint**, index `(user_id, entry_date)`; migration; Zod-validated `saveTodayEntry` Server Action (upsert the day's latest in M1); `getTodayEntry` query.
- **Accept:** action rejects invalid enum/empty; writes/updates today's row; query returns it.
- **Verify:** unit test the action's Zod validation + a DB round-trip.
- **Learn:** Drizzle enums; Server Actions; validating at the boundary.

### ☐ P1.3 — Check-in flow (UI)
- **Do:** client flow energy → texture → read-out + optional journal → save; built from tokens + copy module; Storybook stories (light+dark) for each step.
- **Accept:** flow advances tap-by-tap; save calls `saveTodayEntry`; matches prototype feel; keyboard/SR accessible.
- **Verify:** RTL integration test (advances + calls save); click through in-app; Storybook shows steps.
- **Learn:** client-component state; wiring UI to a Server Action.

### ☐ P1.4 — Today (home)
- **Do:** RSC reads today's entry; launch card (no entry) vs. summary (read-out + note); **return-after-gap** welcome copy — never a miss count.
- **Accept:** both states render correct copy; gap shows welcome, not a tally.
- **Verify:** RTL for both states; **E2E**: check in → Today shows it.
- **Learn:** RSC data fetching; the no-guilt return behaviour.

> **✅ Checkpoint B** — first real value: check in and see today. Review the feel.

---

## Phase 2 — The month

### ☐ P2.1 — Month overview
- **Do:** query the month's entries; calendar grid tinted by texture **valence** (atmospheric, never a grade); today ringed; honest empty state + legend ("no good or bad days").
- **Accept:** logged days tint correctly in both themes; today ringed; future days empty.
- **Verify:** unit test the grid builder (first-weekday/day-count/DST); Storybook cell per valence; view in-app.
- **Learn:** date-grid logic; encoding state as calm colour.

### ☐ P2.2 — Day detail sheet
- **Do:** tap a day → sheet with state read-out + note.
- **Accept:** the tapped day's data shows; today included.
- **Verify:** RTL + E2E: tap opens the right day.
- **Learn:** sheet/overlay pattern; passing server data into an interaction.

> **✅ Checkpoint C** — the month reads as calm. Check tinting vs. the no-judgement rule.

---

## Phase 3 — The Detective

### ☐ P3.1 — Reflection engine + streak rule
- **Do:** pure `lib/reflections` — types + engine `(entries, today, feedback) → Reflection[]`; **streak** rule (incl. positive); **min-N gate**. Deterministic (today passed in).
- **Accept:** fixtures → expected reflections; below-N → none; generated text passes copy-lint.
- **Verify:** `pnpm test` (rich fixture suite).
- **Learn:** pure-function design for testability; why determinism matters.

### ☐ P3.2 — `reflection_feedback` + suppression
- **Do:** table + `recordVerdict` action; engine reads feedback to down-weight/suppress a `pattern_key`.
- **Accept:** recording "Not really" stops that pattern resurfacing.
- **Verify:** unit test: feed a verdict → engine suppresses it.
- **Learn:** stable pattern keys; feedback loops.

### ☐ P3.3 — Patterns view (UI)
- **Do:** render reflections (warm voice) + **journal look-back ("their words")** + `Rings true / Not really / Not sure` + quiet "Not for me", wired to `recordVerdict`; honest empty/early states.
- **Accept:** evidence shows before the buttons; verdict persists; empty states never fabricate a pattern.
- **Verify:** Storybook (card + empty, light+dark); RTL (verdict recorded); **E2E** end-to-end.
- **Learn:** showing evidence before asking; wiring feedback.

### ☐ P3.4 — More rules
- **Do:** add **co-occurrence** and **day-of-week tendency** rules, each unit-tested.
- **Accept:** each rule fires on fixtures and stays silent without support; all pass copy-lint.
- **Verify:** `pnpm test`.
- **Learn:** growing a rule set behind a stable engine interface.

> **✅ Checkpoint D — Milestone 1 done.** Full loop works; CI green incl. E2E; Chromatic baseline; usable on your phone; SPEC §1 success criteria hold.
