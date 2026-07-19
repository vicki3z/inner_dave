# Inner DAVE — Specification

*A gentle, body-first AuDHD self-insight app. Working name: **Inner DAVE**.*

Companion docs: [`docs/ideas/inner-weather.md`](docs/ideas/inner-weather.md) (one-pager) ·
[`docs/design/voice-and-vocabulary.md`](docs/design/voice-and-vocabulary.md) (voice & vocab — the source of truth for copy) ·
[`prototypes/checkin.html`](prototypes/checkin.html) (validated clickable prototype).

---

## 1. Objective

**Give an AuDHD brain a low-friction place to run the day *and understand itself*** — where mood, meds,
food, and tasks are all lightweight *signals* feeding a gentle "Detective" that reflects patterns back,
tentatively and without judgement, so the user can see *why* some days work and others don't.

It is **not** a productivity app and **not** a clinical tool. The north star is **self-insight**.

**Target user:** the author first (single-user v1), designed so "share with the AuDHD community later"
is not a rewrite. Optimises for a demand-avoidant, RSD-prone, sensory-sensitive, sometimes-alexithymic brain.

**Success criteria (v1):**
- The daily check-in takes well under a minute and never feels like data entry.
- After ~2–3 weeks of use, the Patterns view surfaces at least one reflection the user recognises as true.
- The user keeps coming back after missing days — because nothing shames them for the gap.
- Zero moments where the app makes the user feel *behind*, *graded*, or *wrong*.

---

## 2. Tech stack

| Layer | Choice | Notes |
|---|---|---|
| Framework | **Next.js (App Router)**, React, TypeScript (strict) | Server Components by default; Server Actions for mutations. |
| Hosting | **Vercel** | |
| Database | **Supabase Postgres** | Auth stays dormant in v1; ready for "share later". |
| Data access | **Drizzle ORM** + `drizzle-kit` migrations | Type-safe, SQL-transparent (good for learning). |
| Auth (v1) | **None active.** Single seeded user behind a `getCurrentUser()` seam | Swap the seam to Supabase Auth later — one function. |
| Styling | **Tailwind + our design tokens** | Prototype palette/type live as CSS variables in `globals.css`, mapped into the Tailwind theme. |
| Validation | **Zod** at every Server Action boundary | |
| Lint & format | **Biome** | One fast tool for both; replaces ESLint + Prettier. |
| Unit / integration tests | **Vitest** + **React Testing Library** | See §8 for the layer split. |
| E2E tests | **Playwright** | First-class — not deferred. |
| Visual tests | **Storybook + Chromatic** | Build components in isolation + visual-regression across light/dark. (Learning goal; see §8.) |
| Package manager | **pnpm** | `npm` works identically — swap `pnpm`→`npm` if preferred. |

**Fonts (no webfonts — CSP-safe, native on the author's devices):** serif stack
`"Iowan Old Style", Palatino, Charter, Georgia, serif` for prompts/reflections; rounded stack
`ui-rounded, "SF Pro Rounded", -apple-system, system-ui` for UI.

---

## 3. Commands

```bash
pnpm dev            # Next.js dev server
pnpm build          # production build
pnpm start          # run production build
pnpm lint           # biome check (lint)
pnpm format         # biome format --write
pnpm typecheck      # tsc --noEmit
pnpm test           # vitest run (unit + frontend integration)
pnpm test:watch     # vitest watch
pnpm test:e2e       # playwright test
pnpm storybook      # Storybook dev server
pnpm build-storybook # static Storybook (Chromatic consumes this)
pnpm chromatic      # publish stories → Chromatic visual regression
pnpm db:generate    # drizzle-kit: generate migration from schema
pnpm db:migrate     # apply migrations
pnpm db:seed        # seed single user + sample med catalogue
pnpm db:studio      # drizzle studio (inspect data)
```

Env (`.env.local`, never committed): `DATABASE_URL` (Supabase pooled), `DIRECT_URL` (migrations),
`SEED_USER_ID`.

---

## 4. Project structure

```
app/
  layout.tsx                 # root layout, theme tokens, fonts
  globals.css                # design tokens (CSS vars) + Tailwind layers
  page.tsx                   # Today (home)
  check-in/…                 # the two-tap flow (client) + later meds/food steps
  month/page.tsx             # monthly overview
  patterns/page.tsx          # the Detective / reflections
components/
  ui/                        # primitives (Card, Chip, TimeField, Sheet, TabBar…)
  check-in/  month/  patterns/  today/
lib/
  db/        schema.ts        # Drizzle schema (single source of DB truth)
             client.ts  seed.ts
  domain/    enums.ts types.ts    # Energy, Texture, PartOfDay… shared types
  auth/      current-user.ts   # getCurrentUser() seam (single user in v1)
  reflections/ engine.ts rules/ types.ts   # the deterministic Detective
  copy/      voice.ts textures.ts energy.ts reflections.ts   # ALL user-facing strings
  actions/   *.ts             # Server Actions (Zod-validated)
  utils/     dates.ts aggregate.ts
drizzle/                      # generated migrations
tests/  or  *.test.ts colocated
```

**Principle:** every user-facing string lives under `lib/copy/` so the voice rules (§8) can be
enforced and unit-tested in one place — nothing hand-writes reflection text inline.

---

## 5. Data model

Every table is **user-scoped** (`user_id` FK) from day one, even though v1 has one user.

- **users** — `id` (uuid, pk), `created_at`.
- **entries** *(a check-in)* — `id`, `user_id`, `entry_date` (date), `energy` (enum
  `a_lot|some|low|none`), `texture` (enum `bright|calm|steady|restless|overwhelmed|stressed|flat`),
  `note` (text, nullable), `checked_in_at` (timestamptz). **No uniqueness constraint** — the schema
  supports **multiple check-ins per day** from day one. In M1/M2 the UI logs one per day and "check in
  again" edits the day's latest entry; the multi-check-in *experience* (logging several, showing intraday
  variation) is a **Milestone 3** feature. Index (`user_id`, `entry_date`).
- **med_items** *(the user's catalogue)* — `id`, `user_id`, `name`, `schedule` (enum
  `morning|evening|anytime`), `active` (bool), `sort_order`.
- **med_logs** *(taken on a day)* — `id`, `user_id`, `entry_date`, `med_item_id` (nullable, for ad-hoc
  supplements), `name` (text, denormalised), `taken_at` (timestamptz). Unique (`user_id`,`entry_date`,`name`).
- **food_logs** — `id`, `user_id`, `entry_date`, `label` (text — *just what, no numbers*), `logged_at`.
- **tasks** — `id`, `user_id`, `task_date` (date), `text`, `part_of_day` (enum
  `morning|afternoon|evening|timed`), `scheduled_time` (time, nullable — only for `timed`), `done` (bool),
  `done_at` (nullable), `sort_order`. *"Move to tomorrow" = bump `task_date`.*
- **reflection_feedback** — `id`, `user_id`, `pattern_key` (stable string identifying a pattern shape),
  `verdict` (enum `rings_true|not_really|not_sure|dismissed`), `created_at`. Reflections themselves are
  **computed on the fly**; only the user's response is stored, and it weights/suppresses future surfacing.

Enums are Postgres enums mirrored by TS union types in `lib/domain/enums.ts`.

---

## 6. Features & acceptance criteria

### Milestone 1 — Core insight loop *(the v1 build target)*

**Check-in (two taps + journal)**
- [ ] Tap 1 energy (A lot/Some/Low/None) → Tap 2 texture (7 words) → interpreted state read-out (`energy × texture`) → optional one-line "what happened before this?" (rotating antecedent prompt) → done.
- [ ] Saving writes today's `entries` row; "Check in again" edits the day's latest. (Schema allows many/day; M1 keeps one.)
- [ ] Close copy is warm, no streak count. Whole flow is keyboard/screen-reader accessible.

**Today (home)**
- [ ] Before check-in: a calm launch card. After: today's weather read-out + note, with "check in again".
- [ ] Returning after a gap shows *"Welcome back. Nothing to catch up on."* — never a miss count.

**Month overview**
- [ ] Real calendar for the current month; each logged day tinted by its texture's **valence**
  (pleasant/neutral/heavier — *atmospheric tones, never a red/green grade*). Today ringed.
- [ ] Tap a day → detail sheet (state read-out + note). Future days empty. Legend states "no good or bad days".

**The Detective (reflections) — entry-only rules for M1**
- [ ] Patterns view is gated behind a minimum-N of entries; below it, honest empty/early copy (never a fabricated pattern).
- [ ] Rules v1 (from `entries` alone): texture/energy **streaks** (incl. positive), **co-occurrence** over a window, **day-of-week tendency**.
- [ ] Each reflection: warm tentative text + **journal look-back** ("their words" — the raw notes from the referenced days) + `Rings true / Not really / Not sure` + quiet "Not for me".
- [ ] Verdicts persist to `reflection_feedback`; "Not really"/"Not for me" down-weight or suppress that `pattern_key`.

### Milestone 2 — Full capture
- [ ] **Meds/supps:** catalogue (`med_items`) + per-day logging with **editable times** and **ad-hoc add**; blanks are neutral.
- [ ] **Food:** quick add of labels, no numbers.
- [ ] **Tasks:** Morning/Afternoon/Evening lanes + **Timed** (specific-time) lane; toggle done (no red), move-to-tomorrow. Part-of-day **or** specific time (either/or).
- [ ] Today + Month day-detail extend to show meds/food/tasks.
- [ ] Reflection engine gains **cross-signal** rules: med-link, **task-as-signal** (completion as an energy proxy), food-link — all still tentative, never causal.

### Milestone 3 — Depth & durability *(future)*
- [ ] **Multiple check-ins per day** — log several, and show intraday variation on Today + Month.
- [ ] One optional gentle daily nudge; reduced-motion + full a11y pass.
- [ ] Reflection **Summary** view (needs LLM layer) — deferred.
- [ ] Activate Supabase **Auth** for share-later.
- [ ] Ambient capture (health/wearable ingest) — deferred.

---

## 7. Code style

- **TypeScript strict.** No `any` without a written reason. Enums as TS unions mirrored from DB.
- **Server Components by default**; mark client components explicitly and keep them small (the check-in flow, time pickers).
- **Mutations via Server Actions**, each guarded by a **Zod** schema at the boundary. Never trust client input.
- **Reflection engine is pure & deterministic** — plain functions in `lib/reflections`, no I/O, no `Date.now()` inside rule logic (pass "today" in), so it's fully unit-testable and reproducible.
- **All copy centralised** in `lib/copy/`. No user-facing string is written inline in a component.
- **Naming from the user's world**, not the schema (a person sees "meds", "food", "today" — not "med_logs").
- **Biome** governs lint + format — run `pnpm format` before committing; no ESLint/Prettier config to fight.
- Match the prototype's calm: generous spacing, big tap targets, `prefers-reduced-motion` honoured, focus-visible states.

---

## 8. Testing strategy

Four layers, each with a distinct job. Weighted toward the **reflection engine** — the crown jewel and the most logic-dense part.

- **Unit — Vitest** *(hooks, utils, pure functions; no rendering):*
  - **Reflection rules** (highest priority): fixture entry/log data → expected reflections; gating (below min-N → nothing); "Not really"/"Not for me" feedback suppresses a `pattern_key`.
  - Date / window / aggregation utils — streak detection, day-of-week grouping, "today" resolution across timezone & DST edges.
  - **Copy-lint test:** scan every string in `lib/copy/` and every generated reflection against the **"never say"** list (§9); the build fails on any banned causal/evaluative/guilt word.
  - Custom hooks (check-in flow state, etc.) via `renderHook`.
- **Frontend integration — Vitest + React Testing Library** *(component behaviour):*
  - Check-in advances two-tap → journal → save; empty/early Patterns states render honest copy; a reflection's confirm affordance records the right verdict; meds time-edit updates state.
- **E2E — Playwright** *(real browser + a test Supabase project — not deferred):*
  - Happy-path check-in persists and appears on Today + Month; return-after-a-gap shows welcome-back copy, never a miss count; a reflection is confirmed end-to-end.
- **Visual — Storybook + Chromatic** *(design-system regression):*
  - Every `components/ui` primitive gets a story; key surfaces (check-in steps, a reflection card, a Month cell) get **light + dark** stories. Chromatic catches unintended visual shifts when tokens or components change — high value for a calm, theme-sensitive UI, and the main vehicle for the visual-testing learning goal.
- **Gates:** `pnpm typecheck && pnpm lint && pnpm test` before every commit; `pnpm test:e2e` and `pnpm chromatic` run in CI (and pre-push).

---

## 9. Boundaries

**Always**
- Honour the voice rules: **tentative, never causal; curious, never evaluative; body before emotion.**
- Keep gaps neutral — return-after-gap welcomes, never tallies. No streaks, no scorecards.
- **User-scope every query** (even with one user).
- Keep the reflection engine **deterministic and LLM-free** in v1, and unit-tested.
- Respect `prefers-reduced-motion` and keep flows keyboard/screen-reader accessible.
- Show the **evidence (journal notes)** before asking the user to confirm a pattern.

**Ask first**
- Adding any dependency, or any schema/migration change.
- Introducing **any** LLM or external API, or anything that sends personal/mental-health data off the user's own backend.
- Changing the **texture/energy vocabulary** or the **reflection voice** (they're validated — treat as load-bearing).
- Enabling auth / multi-user, or anything that changes the single-user assumption.

**Never**
- Streaks, guilt mechanics, or copy that implies the user is behind/failing.
- **Causal claims** in reflections ("X caused Y") or evaluative day-grading ("good/bad day").
- Calorie / macro / nutrition tracking — food is a *signal*, logged as "just what".
- Fabricate a pattern when data is insufficient — an honest "nothing yet" always wins.
- Block the daily check-in behind auth or onboarding in v1.

---

## 10. Non-goals (v1)
Statistical/causal correlation engine · LLM reflections & summaries · calorie tracking · real multi-user
auth & sharing · clinical/PDF export · health-app / wearable integration.
*(Multiple check-ins per day is now a Milestone 3 feature, not a non-goal — the schema supports it from day one.)*
