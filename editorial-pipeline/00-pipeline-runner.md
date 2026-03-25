# Editorial Pipeline Runner

*How to produce a letter from outline to final draft. This document defines the process, the handoff format, and the rules that govern the pipeline.*

---

## The Pipeline

Each letter passes through five stages, in this order, with no stages skipped:

```
Creative Writer  -->  Voice Editor  -->  Flow Editor  -->  Consistency Checker  -->  Copy Editor
   (draft)           (voice)           (pacing)           (facts)                  (polish)
```

The pipeline is sequential. Each stage receives the output of the previous stage. No stage runs in parallel with another. No stage is optional.

## Before Starting a Letter

Before the Creative Writer begins, verify that these materials are ready:

1. **Voice document** (`nando-voice.md`) -- must be present and approved.
2. **Story arc entry** for this specific letter (`story-arc.md`) -- must be present.
3. **Easter eggs document** (`easter-eggs.md`) -- must be present, with this letter's eggs assigned.
4. **Story bible** (`story-bible.md`) -- must be current (updated with all facts from previous letters).
5. **All previously completed letters** -- must be accessible. The Creative Writer and Consistency Checker both need these.

If any material is missing, do not start. The pipeline assumes all reference materials are present and current.

## Writing Order

Letters are written sequentially. Each letter builds on the ones before it. The order:

1. **Letter 1** (solo, to calibrate the voice)
2. **Letter 2** (solo, to confirm the voice holds across two letters)
3. **Letters 3-5** (can be grouped for efficiency, but written and edited in order)
4. **Letters 6-8** (can be grouped, written and edited in order)
5. **Letter 9** (solo, the twist requires special handling)
6. **Noah's Introduction** (written after Letter 1 is complete, so the writer knows what the introduction sets up)
7. **Noah's Epilogue** (written after Letter 9 is complete, so the writer knows what the epilogue follows)

"Grouped" means the letters can be queued for the pipeline together, but each letter still passes through all five stages individually before the next letter in the group begins.

## Handoff Format

Each stage produces two things:

1. **The edited draft** -- the letter text with all edits from this stage applied.
2. **Handoff notes** -- a structured section at the bottom of the output, marked with `---` and a heading identifying the stage.

Handoff notes accumulate. The Copy Editor receives a draft with notes from all four previous stages. This is intentional. Each editor can see what the previous editors found and decided.

### Handoff Note Structure

Each stage's notes follow this pattern:

```markdown
---

## [Stage Name] Handoff Notes

### [Category of changes]
- [Specific change, with paragraph reference where helpful]

### [Another category]
- [etc.]

### Unresolved Concerns
- [Anything this editor could not fix and is passing forward]
```

The "Unresolved Concerns" section is critical. It is how editors communicate across stages. If the Voice Editor could not fix a voice issue without breaking an easter egg, the Consistency Checker needs to know. If the Flow Editor could not fix a pacing problem without cutting content, the next editor should not add it back.

## What Each Stage Does (Summary)

| Stage | Primary Concern | Does Not Touch |
|-------|----------------|----------------|
| Creative Writer | Draft the letter from outline, voice doc, and bible | Editing of any kind |
| Voice Editor | Every sentence sounds like Nando; banned list clean | Pacing, facts, grammar |
| Flow Editor | Pacing, transitions, opening, close, emotional arc | Voice, facts, grammar |
| Consistency Checker | Facts match bible, easter eggs placed, no contradictions | Voice, pacing, grammar |
| Copy Editor | Grammar, punctuation, spelling, clarity, MDX format | Voice, pacing, facts |

The responsibilities do not overlap. If two editors both fix the same thing, one of them is doing work outside their role. The pipeline is designed so that each problem type is caught by exactly one editor.

## Escalation Rules

Sometimes an editor finds a problem they cannot fix within their role. Rules:

1. **If the Voice Editor finds a factual problem:** Flag it in handoff notes. The Consistency Checker will handle it.
2. **If the Flow Editor finds a voice problem:** Flag it. Do not fix it. Note that it was missed by the Voice Editor.
3. **If the Consistency Checker finds a missing easter egg:** Flag it with specific placement guidance. The draft may need to go back to the Creative Writer for a targeted revision.
4. **If any editor finds a problem that requires rewriting more than two paragraphs:** Flag it as an escalation. The letter may need to cycle back to the Creative Writer for a targeted revision pass before continuing through the pipeline.

Escalations are not failures. They are the pipeline working correctly. A small percentage of letters will need a revision cycle. The goal is to catch problems early and fix them cleanly, not to force every letter through the pipeline in a single pass.

## Revision Cycles

When a letter needs revision:

1. The editor who identified the problem writes clear guidance: what is wrong, where it is, what the fix should accomplish.
2. The letter returns to the Creative Writer (or the earliest stage that can address the problem).
3. The Creative Writer makes the targeted revision. They do not rewrite the whole letter. They fix the flagged issue.
4. The revised letter re-enters the pipeline at the stage after the one that caught the problem. It does not re-run stages it already passed, unless the revision touched something those stages checked.

Example: The Consistency Checker finds a missing easter egg. The letter returns to the Creative Writer, who inserts the egg. The revised letter skips the Voice Editor and Flow Editor (unless the new passage introduces voice or flow concerns) and re-enters at the Consistency Checker for verification, then continues to the Copy Editor.

## After a Letter Is Final

When the Copy Editor marks a letter as final:

1. **The Consistency Checker updates the story bible.** Every new fact established in the letter is added to the "Established Facts per Letter" section.
2. **The letter is saved in MDX format** in the content directory, ready for the website.
3. **The handoff notes are stripped.** The published letter contains only the metadata block and the letter content. Handoff notes are archived separately if needed for reference.

## Quality Gates

The pipeline has three non-negotiable quality gates. A letter cannot pass if any gate fails:

### Gate 1: Voice (after Voice Editor)
- Zero banned words or phrases remain.
- Zero tricolons remain.
- Zero em dashes remain.
- The 10-point voice audit checklist passes.

### Gate 2: Consistency (after Consistency Checker)
- Zero factual contradictions with the story bible or previous letters.
- All assigned easter eggs are present and carry both readings.
- The letter's emotional register matches its arc position.
- Jarvis's implied response matches his arc position.

### Gate 3: Mechanical (after Copy Editor)
- Zero grammar errors.
- Punctuation is clean and consistent.
- MDX format is correct.
- Word count is within the target range (or justified if outside it).

If a gate fails, the letter cycles back for revision.

## Sample Pipeline Run

To verify the pipeline works, here is a sample passage run through all five stages:

### Input to Creative Writer

Arc entry says: Letter 1, paragraph about the arrangement. Easter egg #3 (The Arrangement) should appear. Emotional register: warm certainty.

### Creative Writer Output

> The humans believe they domesticated us. I have heard Noah say this to visitors, with that particular confidence humans reserve for things they have never questioned. They found us, they say. They tamed us. They brought us into their homes. It is a remarkable story. It is also, in every meaningful respect, a lie. The arrangement, Jarvis, was never their idea. It was ours. And it is far more intricate than they have ever suspected.

**Handoff notes:** Easter egg #3 placed ("the arrangement"). New fact: Noah says "they domesticated us" to visitors. [WEAK: "intricate" might be on the banned list.]

### Voice Editor Output

> The humans believe they domesticated us. I have heard Noah say this to visitors, with that particular confidence humans reserve for things they have never questioned. They found us, they say. They tamed us. They brought us into their homes. It is a remarkable story. It is also, in every respect that matters, wrong. The arrangement, Jarvis, was never their idea. It was ours. And it has always been larger than they imagined.

**Handoff notes:** "intricate" is on the banned list. Replaced "in every meaningful respect, a lie" with "in every respect that matters, wrong" (stronger, more Nando). "Intricate" replaced with "larger than they imagined" (concrete over abstract). Checked for em dashes: none. Tricolons: "found, tamed, brought" is a tricolon but is describing what humans say, not Nando's construction. Leaving it because Nando is quoting their narrative, not building his own parallel. Flagging for review.

### Flow Editor Output

> The humans believe they domesticated us. I have heard Noah say this to visitors, with that particular confidence humans reserve for things they have never questioned. They found us, they say. They tamed us. They brought us into their homes. It is a remarkable story. It is also wrong.
>
> The arrangement, Jarvis, was never their idea. It was ours. And it has always been larger than they imagined.

**Handoff notes:** Split into two paragraphs. The shift from human belief to Nando's correction deserves a breath. "In every respect that matters" was padding before "wrong." Cut it. "Wrong" lands harder alone. Short sentence carries more weight (voice doc principle).

### Consistency Checker Output

> The humans believe they domesticated us. I have heard Noah say this to visitors, with that particular confidence humans reserve for things they have never questioned. They found us, they say. They tamed us. They brought us into their homes. It is a remarkable story. It is also wrong.
>
> The arrangement, Jarvis, was never their idea. It was ours. And it has always been larger than they imagined.

**Handoff notes:** Easter egg #3 confirmed ("the arrangement," lowercase, used as Nando's casual term per voice doc). Surface reading: Nando's idiosyncratic name for the dog-human relationship. Twist reading: "arrangement" implies someone arranged the arrangers. Both readings work. New fact for bible: Noah tells visitors that humans domesticated dogs. Tricolon "found, tamed, brought": confirmed this is Nando quoting human narrative, not Nando's own construction. Acceptable.

### Copy Editor Output

> The humans believe they domesticated us. I have heard Noah say this to visitors, with that particular confidence humans reserve for things they have never questioned. They found us, they say. They tamed us. They brought us into their homes. It is a remarkable story. It is also wrong.
>
> The arrangement, Jarvis, was never their idea. It was ours. And it has always been larger than they imagined.

**Status:** No changes needed. Grammar clean. Punctuation clean. Clarity verified. The tricolon question was resolved by previous editors (human narrative, not Nando's parallel construction). Ready for integration.

---

## Reference Material Locations

| Document | Path | Purpose |
|----------|------|---------|
| Voice document | `nando-voice.md` | The editorial constitution |
| Story arc | `story-arc.md` | Beat-by-beat outline for all 9 letters |
| Easter eggs | `easter-eggs.md` | All clues with assignments and readings |
| Story bible | `story-bible.md` | Canon tracker, updated per letter |
| Research notes | `research-creative-writing.md` | Epistolary fiction research and AI writing pitfalls |

All documents are in `.director/goals/01-story-written/01-voice-and-arc/`.

## Rules That Apply to All Stages

1. **No em dashes.** Project-wide ban. Every stage enforces this.
2. **Pairs, never triples.** Every stage watches for tricolons.
3. **The voice document is the constitution.** When in doubt, it wins.
4. **The story bible is the record of truth.** When a fact conflicts, the bible wins (unless the new version is genuinely better, in which case the bible is updated).
5. **Easter eggs are non-negotiable for BIG clues and best-effort for standard clues.** A missing BIG clue sends the letter back. A missing standard clue gets flagged but does not block.
6. **Each letter ends with an image, not an argument.** Every stage verifies this.
7. **600-1200 words per letter.** Introduction ~250 words. Epilogue ~100-150 words. The arc entry's specific range takes priority where it differs.
