# Inner DAVE

*(working name — renamed from "Inner Weather"; the mood-as-weather frame lives on in the UI's calm, low-pressure tone)*

## Problem Statement

**How might we give an AuDHD brain a gentle, low-friction place to run the day *and understand itself* — noticing the patterns behind why some days work and others don't, without becoming one more tracker to fall off of and feel guilty about?**

## Recommended Direction

A personal, emotionally-attuned **insight tool** — not a productivity app, not a clinical instrument. The user logs a lightweight daily check-in; the app quietly accumulates signals (body state, mood, meds/supps, food, and *task completion as an energy proxy*); and instead of handing back charts to analyze, it **reflects patterns back to you gently and tentatively** — "third restless evening this week, and the other two also followed busy afternoons — does that ring true?"

The centerpiece the user fell for is **The Detective** (insight comes *to* you). The honest constraint: a *statistics* engine on noisy n=1 data is a six-months-of-logging problem and can produce confident-but-spurious claims that mislead or feed rumination. So the Detective's **v1 body is a qualitative "noticing companion,"** not a stats engine — it works at n=5, never makes a false causal claim, and degrades gracefully when data is sparse. Statistical rigor is a later upgrade *once the data exists to earn it*.

Two design commitments run through everything: **Body-First** (scaffold interoception — "what's your body doing? wired / heavy / restless / foggy / calm" — rather than a 1–10 happiness slider, because alexithymia is common and naïve mood sliders can harm the target user) and **No Guilt** (gentle optional nudges, zero streaks, gaps are neutral and invisible). Tasks earn their place by doubling as a signal the companion can correlate against, rather than sitting in a separate silo.

Built for the user first on **Next.js + Vercel**, but **schema is user-scoped from day one** so "share with the AuDHD community later" isn't a rewrite.

## Key Assumptions to Validate

- [ ] **You'll log often enough to have signal.** The whole thesis dies on sparse data. → *Test:* make week 1 pleasant *on its own*, before any insight payoff exists. If you're not logging ~4×/week by day 10 for reasons of friction/joy (not just insight), the ritual design is wrong.
- [ ] **Findable patterns exist in your n=1.** Mood is lagged and multi-causal. → *Test:* after ~3 weeks, can *you* (or a rules pass) name even one honest "these cluster together" observation? If nothing surfaces, reconsider which signals you capture.
- [ ] **Reflection helps rather than harms.** Pattern-surfacing can wound an RSD/rumination-prone brain. → *Test:* draft the reflection copy *first*; if a real "low day" observation reads as judgmental, the framing (not the feature) needs rework.
- [ ] **Body-first check-ins feel natural, not clinical.** The hardest UX. → *Test:* prototype the interoception picker and use it for a week before building anything else.

## MVP Scope

**In:**
- **Daily check-in** (quick-but-real, ~1 min): body-state picker (interoception vocabulary) → optional emotion tag → one-line "what happened before this?" note → meds/supps quick-tap → food quick-log (just *what*, not calories/macros).
- **Part-of-day task planner:** tasks assigned to Morning / Afternoon / Evening *or* a specific time; done/not-done. Completion silently feeds the signal stream.
- **Patterns view ("what I've noticed"):** starts **rules-based** and deterministic; unlocks after ≥ N days of data; always tentative, curious, body-first language; never a causal claim.
- **Monthly overview:** calendar view of body/mood state + med adherence at a glance; tap any day to see its full entry.
- **Gentle nudges:** one optional daily reminder. No streaks, no red marks, no "you missed 3 days."
- **User-scoped data model** (even though it's single-user now) on Vercel Postgres/Neon/Supabase.

**Out (v1):**
- Statistical/causal correlation engine · LLM-powered reflection · Apple Health / wearable ingestion · calorie/macro/nutrition analysis · real multi-user auth & sharing · clinical PDF export.

## Not Doing (and Why)

- **Statistics-based Detective (causal correlations) in v1** — n=1 data is too sparse/noisy early; it would produce confident garbage and risk feeding rumination. Ships later, once data earns it.
- **LLM reflection in v1** — adds cost + the privacy weight of sending personal mental-health text to an API. Rules-based reflection is cheaper, fully private, deterministic, and a cleaner learning build. LLM is a phase-2 upgrade.
- **60-second single-card ritual & clinical export** — you explicitly dropped both. Noted; not pursuing.
- **Real auth / social / sharing now** — "me first." Hedged by user-scoped schema so it's not a rewrite later.
- **Food *as nutrition*** — food is a *signal* for the companion, not a calorie tracker. Log *what*, not *how much*.
- **Streaks / gamified accountability** — you chose gentle nudges; streaks manufacture guilt for the exact brain we're protecting.

## Open Questions

- **Reflection engine v1: rules-based vs. LLM?** Recommendation is rules-based first (private, free, deterministic, good learning). Worth a deliberate decision since "learning Next.js" is half your motivation.
- **What are the 5–8 interoception words that actually fit *you*?** The vocabulary is the heart of the product and is deeply personal — worth drafting from your own experience before coding.
- **Persistence choice:** Vercel Postgres vs. Neon vs. Supabase (Supabase buys you easy auth later for the "share" phase).
- **What's the minimum N** (days of data) **before the Patterns view turns on** without feeling either empty or spuriously confident?
