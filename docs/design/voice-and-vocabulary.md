# Inner DAVE — Voice & Vocabulary (draft v2)

> The heart of the product. Check-in is **two quick taps** — *energy*, then *texture* — chosen so
> each choice is small and unambiguous. The reflection copy is a *safety design*, not decoration:
> it's what keeps pattern-surfacing from tipping into shame or rumination.

---

## 1. Voice principles (every word in the app follows these)

1. **Tentative, never certain.** "I noticed…", "these seem to go together", "might be nothing." Never "X causes Y."
2. **Curious, not evaluative.** Describe what happened; never grade the day. There is no "bad day" or "good day."
3. **Body before emotion.** Ask what the body is *doing* first. The texture word *is* the feeling — no separate emotion menu to wade through.
4. **Gaps are neutral.** Never count misses. Coming back after a break is welcomed, never tallied.
5. **Always an exit.** Every reflection can be waved off in one tap — and the app learns from that.
6. **Short.** One idea per message. Keep reading-load tiny.
7. **You're the expert on you.** The app *proposes*; you *decide*. It asks "does that ring true?" and believes your answer.

---

## 2. The check-in: two taps

### Tap 1 — Energy (the fuel gauge)

> **A lot · Some · Low · None**

A pure body-activation read. Fast, physical, no interpretation needed.

### Tap 2 — Texture (what it feels like)

Seven words, chosen to be clearly distinguishable from each other. Each carries a hidden
**valence** tag (pleasant / neutral / unpleasant) that feeds the reflection engine — you never see it.

| Texture | What it feels like | valence |
|---|---|---|
| **Bright** | light, clear, energy that feels good | pleasant |
| **Calm** | settled, easy, slow breath | pleasant |
| **Steady** | nothing loud, just okay, ticking along | neutral |
| **Restless** | fidgety, itchy-to-move, can't settle | unpleasant |
| **Overwhelmed** | too much coming in — need it to stop | unpleasant |
| **Stressed** | braced, pressured, wound-up | unpleasant |
| **Flat** | muted, disconnected, nothing much here | neutral |

*Steady vs. Flat (both neutral, deliberately different): **Steady** is an engaged, fine "I'm okay";
**Flat** is a checked-out, muted "nothing much here." One is present, one is disconnected.*

**Why two taps beats one word:** the same texture reads differently at different energy. The engine
stores `energy × texture`, so it can tell apart states a single word would blur:

- *Low + Restless* → understimulated, antsy   ·   *A lot + Restless* → wired, agitated
- *None + Calm* → restful, spent-but-okay   ·   *None + Flat* → shut down, dimmed low
- *A lot + Bright* → firing on all cylinders   ·   *Some + Flat* → coasting, checked-out
- *Some + Steady* → a normal, fine day — the honest "nothing to report" state

**Still yours to tune:** **Steady** carries the neutral "just fine, nothing to report" state, so
you're never forced to log a normal day as faintly good or faintly off. Bright/Calm cover pleasant;
Steady/Flat cover neutral; Restless/Overwhelmed/Stressed cover the harder states. Any word here can
still be swapped for one your body actually uses.

*Why no "Empty"? It was really an **energy** reading, not a texture — it kept clashing with the
energy tap. The **None** energy level now carries the empty-tank feeling; texture stays about the
felt quality.*

---

## 3. How this scaffolds interoception (without a big emotion menu)

The old plan was: body word → pick from a list of emotions. You found that overwhelming — too many
feeling-words that blur together. So the **two taps *are* the scaffold.** `energy × texture` already
lands you on a nameable state, and over weeks the app can gently reflect what a combo tends to sit
under — *learned from your own confirmations*, never a menu you have to pick from:

> "Heads up on a small thing — when your energy's Low and it feels Restless, you've often noted it was really *boredom* underneath. Might be one of those."

That's the alexithymia bridge: it *teaches* the mapping over time instead of demanding you name the feeling up front.

---

## 4. Daily check-in microcopy

- **Tap 1:** "How much energy right now?" → **A lot · Some · Low · None**
- **Tap 2:** "And what's it feel like?" → the 7 textures
- **What happened prompt (rotates, always optional, one line):**
  - "What happened just before this?"
  - "Anything around you feeding this?"
  - "What was the last hour like?"
  - "What's this sitting on top of?"
  *(All antecedent-focused. Never "why do you feel bad?" — that prompt spirals.)*
- **Meds / supps:** "Anything taken?" → quick-tap list, time auto-filled, editable.
- **Food:** "Eaten anything? Just jot what — no numbers." *(a signal, not a calorie count)*
- **Close:** "That's it. Nice one." *(no streak count, no "day 6 🔥")*

---

## 5. Reflection copy — the Detective's voice

Rules-based v1. Placeholders in `{braces}`. Every reflection ends with a confirm affordance and can be dismissed. Kept short.

**Co-occurrence (gentle, neutral):**
> "Small thing I noticed — the last `{3}` days your energy was `{Low}` and felt `{Restless}`, and each had `{no evening supp}`. Might be nothing. Ring true?"

**Sequence / lag:**
> "Your `{Restless}` evenings this week each came after a `{fuller afternoon}`. Just noticing the shape."

**Positive (equally important — notice what's working):**
> "Nice one: your `{Bright}` mornings this week all followed nights in bed before `{11}`. Worth knowing."
>
> "Three `{Calm}` days running — last stretch like this was back in `{May}`. Something's working."

**Med / supp link (careful, never blaming):**
> "Both `{Flat}` mornings this week came after evenings without `{meds}`. Not a rule — just a thread."

**Show the evidence before asking (journal look-back).**
A reflection asks you to confirm a pattern — but you can't answer honestly from memory. So every
reflection that references specific days surfaces the short journal notes from *those* days, right
above the confirm buttons, so you can re-read what actually happened before you tap.

- **v1 — their words (confirmed default):** the dated one-line notes you wrote, verbatim. Tested and
  chosen — seeing your own words makes the confirm call easier. Deterministic, private, zero cost, and
  it means the **whole v1 reflection layer needs no LLM at all.**
- **later — summary (deferred):** a short synthesis for when notes are many or long. Nice-to-have,
  needs the LLM layer — explicitly *not* in v1.

> Tue — "back-to-back calls till 4, no gap to breathe"
> Wed — "big errand run after lunch, forgot to eat"
> Thu — "afternoon meeting ran long, skipped my walk"

This is what makes "you're the final word" real: the app shows its working, then believes your call.

**Confirm affordance (on every reflection):**
`[ Rings true ]  [ Not really ]  [ Not sure ]`   + a quiet `[ Don't show me things like this ]`
→ "Not really" weights that pattern *down* so it stops surfacing. You're always the final word.

**Never say:**
- causal words — "caused", "because of", "due to", "makes you"
- evaluative words — "bad day", "good day", "poor", "better", "worse"
- guilt words — "you missed", "you forgot", "you skipped", "streak", "behind", "catch up"
- instruction — "you should", "try to", "make sure you"
- any bare number that reads as a scorecard

---

## 6. Empty & early states (Patterns view — honesty over fake insight)

- **No data yet:** "Nothing to notice yet — that's expected. Check in a few times and I'll start looking for the shapes in your days. No rush."
- **A few entries (below threshold):** "Still early — `{4}` check-ins so far. I won't guess at patterns until there's enough to actually mean something. Probably another week."
- **Threshold reached, nothing found:** "I've been looking and nothing's jumping out yet — which is honestly fine. Days don't always have tidy patterns. I'll keep a quiet eye out."

*(Never fabricate a pattern to look useful. An honest "nothing yet" is the trust-builder.)*

---

## 7. Nudges & coming back (guilt-free)

- **Gentle nudge (optional, max one/day):**
  - "Free minute? Your body might have something to tell you."
  - "No pressure — just here if you want to check in."
- **Return after a gap (this is the make-or-break moment):**
  - "Welcome back. Nothing to catch up on — start wherever you are."
  - ❌ Never: "You missed 5 days" / a broken streak / a guilt-shaped empty calendar.

---

## 8. Task-as-signal framing

Tasks live in **part-of-day lanes** and quietly feed the engine — but the task screen never nags.

- **Planner header:** "What's the shape of today?" → lanes: **Morning · Afternoon · Evening**, plus an optional **timed** lane for the few things that truly have a clock.
- **Unfinished task:** no red, no guilt. It just wasn't done. Optional neutral "Move to tomorrow?"
- **The signal is invisible here.** It only ever resurfaces as a gentle reflection — e.g. "your fuller mornings tend to go with `{Bright}` — interesting" — never as a productivity score.

---

## Decisions & open threads
- **Voice: Warm.** Confirmed via prototype — keep the soft, tentative framing, not the minimal register.
- **Textures: 7.** Removed *Empty* (it was an energy reading, not a texture). Final set: Bright · Calm · Steady · Restless · Overwhelmed · Stressed · Flat.
- **Reflection look-back: raw notes ("their words").** Every reflection shows the journal notes from the days it references, above the confirm buttons — validated as making the decision easier. Summary view is deferred to the LLM phase; the **v1 reflection layer stays fully rules-based, no LLM.**
- Open: keep sanity-checking that the remaining `energy × texture` read-outs match how your states actually feel.
