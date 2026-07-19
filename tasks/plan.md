# Inner DAVE — Milestone 1 Plan

**Scope:** M1 = the **core insight loop** — check in (energy × texture + journal) → see it on **Today** and **Month** → get gentle **rules-based reflections**. Meds/food/tasks are M2; see [`SPEC.md`](../SPEC.md).

**Two shaping principles (your asks):**
1. **Vertical slices.** Every *product* task cuts one complete path — DB → server action → UI → test — so each is independently reviewable and demonstrable. No "build all the components, then all the actions" horizontal layers.
2. **Incremental, learn-as-you-go infrastructure.** Each tool is its own small task that ends in something you can *see working*, with a "what you'll learn" note. You'll understand each piece before the next lands on top of it.

**Working agreement:** one slice = one branch = one PR. Each PR must pass `typecheck + lint + test`, carry its own tests, and be verifiable on its own. **Checkpoints** between phases are deliberate pause-and-review moments.

---

## Dependency graph

```
P0.1 Git repo ──▶ P0.2 Next.js ──┬─▶ P0.3 Biome
                                  ├─▶ P0.4 Tailwind + tokens ─▶ P0.6 Storybook
                                  ├─▶ P0.5 Vitest
                                  ├─▶ P0.7 Supabase + Drizzle (+ users, getCurrentUser)
                                  ├─▶ P0.8 Playwright
                                  └─▶ P0.9 CI + Chromatic
                                          │
   (foundation) ───── Checkpoint A ───────┘
        │
        ├─▶ P1.1 Domain vocab + copy module ─┐
        ├─▶ P1.2 entries schema + save action │
        │        (needs P0.7)                 ├─▶ P1.3 Check-in flow UI ─▶ P1.4 Today
        └────────────────────────────────────┘            │
                                          Checkpoint B ─────┘
        │
        └─▶ P2.1 Month view ─▶ P2.2 Day detail        (needs entries)
                                    │
                              Checkpoint C
        │
        └─▶ P3.1 Reflection engine + streak rule ─▶ P3.2 feedback + suppression
                 (needs entries)                          │
                     └─▶ P3.3 Patterns view UI ─▶ P3.4 more rules
                                                     │
                                               Checkpoint D  → M1 done
```

**Reading it:** the foundation fans out from the Next.js scaffold; product slices depend on Tailwind/tokens (UI), entries+Drizzle (data), and the copy module (strings). The reflection engine is pure logic and only needs entries data, so it can be built and fully unit-tested before its UI exists.

---

## Phase 0 — Foundation *(incremental; each step ends in something you can see)*

Ordered so each tool builds on the last. Steps marked **🙋 needs you** require your own account/manual action (I'll pair with you on them).

- **P0.1 Git** — wire this folder to `github.com/vicki3z/inner_dave.git` (unrelated-histories merge since we already have docs/spec/prototype), add `.gitignore`, first commit + push. 🙋 (push auth)
- **P0.2 Next.js scaffold** — App Router + TypeScript (strict), pnpm via corepack, no ESLint (Biome next). *Learn: App Router layout, RSC vs client.*
- **P0.3 Biome** — lint + format config, scripts, remove any ESLint. *Learn: one-tool lint/format.*
- **P0.4 Tailwind + our tokens** — port the prototype's CSS-variable token system into `globals.css`, map into the Tailwind theme, wire the serif/rounded font stacks and the light/dark theme mechanism. Ends with a throwaway `/_swatch` page proving tokens render in both themes. *Learn: token→Tailwind wiring, theming.*
- **P0.5 Vitest** — config + one real passing unit test (a date util we'll reuse). *Learn: unit test setup.*
- **P0.6 Storybook** — set up + one primitive (`Card` or `Chip`) with a light+dark story. *Learn: component-in-isolation workflow.*
- **P0.7 Supabase + Drizzle** — 🙋 create the Supabase project & get the connection string; then Drizzle config, a `users` table, first migration, a seed script (one user), and the `getCurrentUser()` seam. Ends with `db:studio` showing the seeded user. *Learn: schema → migration → seed, and the auth seam.*
- **P0.8 Playwright** — config + one E2E asserting the home page loads. *Learn: real-browser E2E setup.*
- **P0.9 CI + Chromatic** — 🙋 GitHub Actions running `typecheck/lint/test` on PRs; Chromatic project + workflow capturing a baseline. *Learn: CI gates + visual regression.*

**✅ Checkpoint A — Foundation:** app runs (`pnpm dev`), every tool green, repo pushed, a PR shows CI passing and a Chromatic baseline. *Nothing product-facing yet — this is the runway.*

---

## Phase 1 — Vertical slice: check in and see today

- **P1.1 Domain vocab + copy module** — `lib/domain/enums.ts` (Energy, Texture) + `lib/copy/` (texture words/glosses, energy labels, the `energy × texture` read-out map, check-in prompts) + the **copy-lint unit test** scaffold (no banned words). *First slice that establishes the centralised-copy + copy-lint pattern.*
- **P1.2 `entries` schema + save action** — entries table & enums + migration; a Zod-validated `saveTodayEntry` Server Action; `getTodayEntry` query. Unit test on the action's validation. *Learn: Drizzle enums, Server Actions, Zod boundary.*
- **P1.3 Check-in flow (UI)** — energy → texture → read-out + journal → save; client component built from tokens & copy module; Storybook stories (light+dark) for each step; RTL integration test that the flow advances and calls save.
- **P1.4 Today (home)** — RSC reads today's entry; launch card vs. summary; **return-after-gap** welcome copy (never a miss count). RTL test for both states; **E2E**: check in → Today shows it.

**✅ Checkpoint B — First value:** you can check in on your phone and see today. Review the *feel* against the prototype.

---

## Phase 2 — Vertical slice: the month

- **P2.1 Month overview** — query the month's entries; calendar grid tinted by texture **valence** (pleasant/neutral/heavier — atmospheric, never a grade); today ringed; honest empty state + legend. Unit test the grid builder (first-weekday, day-count, DST); Storybook for a cell in each valence (light+dark).
- **P2.2 Day detail sheet** — tap a day → sheet with the state read-out + note. RTL + E2E: tapping opens the right day.

**✅ Checkpoint C — Looking back:** the month reads as calm, not a scorecard. Sanity-check the tinting against the no-judgement rule.

---

## Phase 3 — Vertical slice: the Detective *(the crown jewel)*

- **P3.1 Reflection engine + first rule** — pure `lib/reflections` module: types + engine `(entries, today, feedback) → Reflection[]`, the **streak** rule (incl. positive), and the **min-N gate**. Deterministic (today passed in, no hidden `Date.now()`). Heavy unit tests + copy-lint on generated text. *No UI — fully testable logic.*
- **P3.2 `reflection_feedback` + suppression** — table + `recordVerdict` action; engine reads feedback so "Not really"/"Not for me" down-weights/suppresses a `pattern_key`. Unit test proves suppression.
- **P3.3 Patterns view (UI)** — render reflections (warm voice) + **journal look-back ("their words")** + confirm affordances wired to `recordVerdict` + honest empty/early states. Storybook (card + empty, light+dark); RTL (verdict recorded); **E2E** end-to-end.
- **P3.4 More rules** — add **co-occurrence** and **day-of-week tendency** rules, each with unit tests.

**✅ Checkpoint D — M1 done:** the full insight loop works end to end. Review against SPEC success criteria (§1): sub-minute check-in, a recognisable reflection, no moment that shames a gap.

---

## Human-in-the-loop steps (🙋)
- **P0.1** — authorising the push to your GitHub repo.
- **P0.7** — creating the Supabase project and handing me the connection string (goes in `.env.local`, never committed).
- **P0.9** — GitHub repo secrets + a Chromatic project token; deciding if CI runs on your account.
- **Deploy** (optional, anytime after Checkpoint B) — connecting the repo to Vercel for a live URL.

## Definition of done — Milestone 1
All Phase 0–3 tasks merged; `typecheck + lint + test + test:e2e` green in CI; Chromatic baseline established; the loop is usable on your phone; SPEC §1 success criteria hold on review.
