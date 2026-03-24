# Step Research: Writing Pipeline — Letters 1-9 plus Frame Narrative

**Step:** Writing pipeline — Letters 1-9 plus frame narrative
**Goal:** Goal 1 — The story is written, polished, and ready to publish
**Researched:** 2026-03-24
**Confidence:** MEDIUM-HIGH (core MDX and agent patterns verified against official docs; creative writing pipeline practices synthesized from multiple strong sources)

---

## What This Step Delivers

All 9 letters (600-1200 words each) + Noah's introduction (~250 words) + epilogue (~100-150 words), fully edited through a 5-stage editorial pipeline, in MDX format with exported metadata blocks. The editorial pipeline is: creative writer → voice editor → flow editor → consistency checker → copy editor.

---

## Key Research Questions

### 1. How to structure a multi-agent editorial pipeline for sequential fiction

**Finding (HIGH confidence — verified against Anthropic's official agent patterns documentation):**

The optimal pattern for this pipeline is **prompt chaining with an evaluator-optimizer loop** — not a parallel orchestrator. Anthropic's "Building Effective Agents" guide describes prompt chaining as ideal when tasks "can be cleanly decomposed into fixed subtasks" and sequential order matters. The evaluator-optimizer loop (one agent generates, another critiques in a cycle) is explicitly recommended for creative work where "iterative refinement provides measurable value."

For Nando's letters, the pipeline maps cleanly:

| Stage | Agent Role | What It Does | What It Checks |
|-------|-----------|--------------|----------------|
| 1 | Creative writer | Drafts the full letter from the outline beat | Does the letter hit the story beat? Does it advance the arc? |
| 2 | Voice editor | Rewrites to Nando's canonical voice | Sentence length, irony register, forbidden phrases, Nando-isms |
| 3 | Flow editor | Edits for pacing, transitions, paragraph rhythm | Does it read as one breath? Do paragraphs vary in length and energy? |
| 4 | Consistency checker | Checks against running story bible | Any contradictions with Letters 1-N? Are seeds from earlier letters honored? |
| 5 | Copy editor | Final grammar, punctuation, MDX formatting | No typos; metadata block is correct; no AI slop tells remain |

**Implementation pattern:** Each agent receives (a) the voice document, (b) the story bible in its current state, (c) the output from the previous agent, and (d) its specific role instruction. This is standard prompt chaining with shared context documents — no special framework needed.

**Key principle from Anthropic docs:** "Simple, composable patterns" outperform complex agent frameworks. The five-stage chain above is the right level of complexity. Do not add routing logic or dynamic task decomposition — the stages are fixed.

---

### 2. How to maintain voice consistency across 9 AI writing sessions

**Finding (MEDIUM confidence — synthesized from prompt engineering best practices and epistolary fiction craft):**

Voice drift is the #1 risk for this project (confirmed in the SUMMARY.md research). The prevention strategy has three parts:

**Part A — The canonical voice document (load into every session)**

The voice document must be concrete, not vague. "Wise and humorous" is useless. The following categories must be defined:

- **Sentence length range:** e.g., "Nando writes in short declarative sentences with occasional long periodic sentences. Never two long sentences in a row. Maximum sentence length: ~40 words."
- **Verbal tics:** e.g., "Nando refers to humans as 'the project.' Never 'humans,' never 'people,' never 'mankind.'"
- **Irony register:** e.g., "Nando's humor is dry academic understatement, never sarcasm or snark. He finds humans objectively fascinating in the way a researcher finds a lab specimen fascinating."
- **Opening line pattern:** e.g., "Letters begin in media res — Nando already mid-thought. Never 'Dear Jarvis, I hope this letter finds you...'"
- **Closing pattern:** e.g., "Letters close with a question that reframes everything above."
- **Forbidden words and phrases:** (see Section 4 below)
- **What Nando never does:** never expresses doubt about the plan, never uses human slang, never breaks the fourth wall

**Part B — Few-shot examples in every prompt**

From Anthropic's prompting guide: few-shot examples are "one of the most reliable ways to steer Claude's output format, tone, and structure." The voice document should include 3-5 sample paragraphs from Noah that exemplify Nando's voice perfectly. Every writing agent session loads these examples as `<examples>` tagged context.

**Part C — Letter-by-letter voice calibration**

The first letter is the voice calibration point. Before running Letters 2-9 through the full pipeline, Letter 1 must be reviewed and approved (its final version becomes the first sample paragraph in the few-shot bank). The approved Letter 1 is added to the `<examples>` block for all subsequent sessions.

---

### 3. How to structure a story bible / continuity document that grows per letter

**Finding (MEDIUM confidence — derived from screenwriting and game-narrative practices, not a single authoritative source):**

The story bible is a living document that must grow exactly once per letter — after the letter clears all editorial stages. It is the single source of truth for the consistency checker agent.

**Recommended structure:**

```
# Story Bible

## Voice Document
[Canonical voice parameters — loaded into every session]

## World Rules (established in the outline — does not change)
[The fixed mythology: dogs created humans, how uplift happened, the simulation layer]

## Established Facts (grows per letter)
- Letter 1: [List of facts, character details, events established in Letter 1]
- Letter 2: [New facts introduced in Letter 2]
...

## Callbacks and Seeds (grows per letter)
- Letter 3 introduced the simulation hint: "the dream within the dream" — must pay off by Letter 9
- Letter 5 named a specific human: "the one Jarvis calls Marcus" — if referenced again, same name

## Running Character Notes
- Jarvis: what has Nando said about him so far? What has he been asked to do?
- Nando: any physical/emotional details revealed? (the trembling, the warmth, the size)
- Humans: how have they been characterized so far?

## Forbidden Contradictions (things that would break the canon)
[Added as each letter establishes facts that could be contradicted later]
```

**Key discipline:** The consistency checker's ONLY job is checking the current draft against this document. It does not rewrite for voice. The flow editor does not check continuity. Roles must not blur — blurred roles produce mediocre output because each agent hedges.

**Continuity document as shared context:** The story bible is passed in full as `<story_bible>` tagged XML to the voice editor, flow editor, and consistency checker at every stage. The creative writer receives only the arc outline beat for the current letter (not previous letters in full — this prevents it from drifting toward previous letters' styles). The consistency checker receives the full letter text + the full story bible and looks for contradictions.

---

### 4. Forbidden phrase list — comprehensive AI slop tells

**Finding (HIGH confidence — synthesized from widely documented AI writing patterns; these appear consistently across detection literature)**

These must be in every agent's system prompt as a hard ban. The copy editor's primary job is hunting these.

**Transition inflation (most common AI tell):**
- Moreover, Furthermore, Additionally, In addition, Consequently, Nevertheless, Nonetheless, Subsequently, Henceforth, Heretofore, Therein, Thus, Hence, Indeed
- "It is worth noting that..." / "It should be noted that..."
- "This is not to say..." / "That said..."
- "At its core..." / "At the heart of..."
- "In essence," / "In short," / "In summary,"
- "Ultimately," (when not genuinely the last point)

**Vocabulary inflation (AI's favorite fancy words):**
- tapestry, multifaceted, nuanced, intricate, complex, delicate, profound
- testament (as in "a testament to")
- pivotal, crucial, vital, paramount, seminal, foundational
- framework, paradigm, landscape, ecosystem (when not literal)
- resonate, resonate deeply, deeply resonant
- underscore (as a verb)
- illuminate, shed light on, bring to light
- embody, encapsulate, epitomize
- journey (metaphorical), odyssey, path forward
- transformative, groundbreaking, revolutionary (when not actually those things)
- beacon, cornerstone, linchpin, fulcrum

**Hedging phrases (AI covering itself):**
- "One might argue..." / "It could be said that..."
- "In many ways..." / "In some sense..."
- "Perhaps the most..." / "What makes this particularly..."
- "There is something..." as a sentence opener

**Sycophantic openers (almost always AI-generated):**
- "Certainly!" / "Of course!" / "Absolutely!" / "Great question!"
- "Fascinating," when used to acknowledge the reader's point
- Any response that begins by restating the question

**Structural AI patterns:**
- Rule of three lists that feel like bullet points converted to prose: "not only X, but also Y, and ultimately Z"
- Parallel structure overuse: three or more constructions with identical grammar in a row
- Every paragraph beginning with the topic sentence stated plainly, then elaborated
- Closing paragraphs that "zoom out" to bigger picture significance after the point was already made

**For epistolary voice specifically (Nando's letter format):**
- Never open with a pleasantry or acknowledgment of receiving a prior letter (Nando doesn't do social warmth)
- Never close with "Yours faithfully" / "With warmest regards" / "As ever" — Nando's closings are abrupt and pointed
- Never use em-dashes for emphasis in the modern blogging style: "This is the truth — and it matters"
- No rhetorical questions that the writer then immediately answers (this is an essay tic, not a letter tic)

---

### 5. How to make AI writing feel genuinely authored

**Finding (MEDIUM confidence — synthesized from craft writing sources, not a single authoritative document):**

The difference between authored and generated prose operates at several levels:

**Specificity over generality.** Generic AI writing says "the dog watched carefully." Authored writing says "he tilted his head 11 degrees." Specificity signals a mind that was there. Prompt instruction: "Do not write general observations. Write specific details. If you don't have a specific detail, invent a plausible one rather than staying general."

**Sentence rhythm variation.** AI writing defaults to syntactically uniform sentences. Real prose alternates: one long winding sentence followed by a blunt short one. A fragment. Then a return to complexity. Prompt instruction: "After every third sentence, write a sentence of three words or fewer. Vary your sentence openings — no two consecutive sentences should begin with the same part of speech."

**Earned emotion, not stated emotion.** AI defaults to telling: "This was a profound realization." Authored prose shows: a single unexpected image that contains the emotion without naming it. Prompt instruction: "Do not use the words profound, moved, realized, felt, understood. Show the emotional content through what Nando notices, not through what he feels."

**Point of view compression.** AI writing spreads itself evenly across a topic. Authored writing has a center of gravity — one thing that matters more than all the others, and everything else orbits it. Prompt instruction: "Every letter has one irreducible sentence — the sentence that, if removed, would collapse the letter. Write that sentence last, then restructure the letter so it earns that sentence."

**Idiosyncratic detail.** The Screwtape Letters works because Lewis's demons have specific opinions, specific contempts, specific enthusiasms. Nando must have opinions about specific things — not about "dogs" and "humans" in the abstract. The voice document should specify: Nando's favorite human invention, the one human behavior he finds genuinely admirable, the one thing Jarvis does that irritates him.

---

### 6. Sequential writing workflow — passing context between sessions

**Finding (HIGH confidence — based on verified prompt engineering patterns and the nature of stateless LLM sessions):**

Each AI session has no memory of previous sessions. Context must be explicitly reconstructed at the start of every session. The standard pattern from Anthropic's prompt engineering guide: use XML-tagged structured documents passed as context.

**Session opening structure for each letter:**

```xml
<voice_document>
[full canonical voice parameters]
</voice_document>

<story_bible>
[full growing story bible, current state]
</story_bible>

<arc_outline>
Letter N: [what this letter must establish, the emotional beat, the story function, what it seeds for future letters]
</arc_outline>

<examples>
[3-5 approved paragraphs from previously approved letters that best exemplify Nando's voice]
</examples>

<task>
Write Letter N in Nando's voice. Letter should be 600-1200 words. Begin in media res.
</task>
```

**Key context management rules:**

1. **Do not include the full text of all previous letters** in the creative writer's context. This creates drift toward previous letters' styles and can produce unconscious repetition. Include only the arc outline and examples.

2. **The consistency checker is the exception** — it must receive the full previous letters or the extracted facts document. One or the other, not both (the story bible's "Established Facts" section is preferred because it's already filtered).

3. **The examples block grows but caps at 5 entries.** After Letter 3 is approved, cycle out the example paragraphs to always include the most recently approved letter's best paragraph. This prevents the examples from becoming stale while keeping the context window manageable.

4. **Letter-to-letter throughline.** Each letter must have at least one explicit callback to the previous letter. This is a structural rule in the arc outline, not something left to the creative writer to discover. The arc outline says: "Letter 4 must reference [specific thing from Letter 3]."

---

### 7. MDX format with exported metadata blocks

**Finding (HIGH confidence — verified directly against Next.js 16 official docs at nextjs.org):**

The `@next/mdx` package does NOT support YAML frontmatter by default. The correct pattern is JavaScript ESM exports inside the MDX file.

**Canonical MDX metadata pattern for this project:**

```mdx
export const metadata = {
  letterNumber: 1,
  title: "On the Question of Fire",
  wordCount: 847,
  artworkAlt: "A Maltese in Renaissance style blessing a primitive human at a hearth",
  hookLine: "You asked me once why we gave them fire. The answer, Jarvis, is embarrassingly simple.",
}

# Letter I: On the Question of Fire

[letter content in markdown]
```

**Accessing metadata in the page component:**

```tsx
import LetterOne, { metadata } from '@/content/letter-01.mdx'

// metadata.letterNumber, metadata.title, metadata.hookLine all available
```

**Recommended metadata fields per letter:**

| Field | Type | Purpose |
|-------|------|---------|
| `letterNumber` | number | Sort order for chapter navigation |
| `title` | string | Letter title for dot nav tooltip (aria-label) |
| `wordCount` | number | Approximate — useful for reading time estimate |
| `artworkAlt` | string | Alt text for the paired artwork (SEO + accessibility) |
| `hookLine` | string | First sentence or compelling excerpt for OG/social use |
| `artworkFile` | string | Filename reference: `"letter-01.jpg"` — keeps art + content linked |

**MDX file location pattern:**

```
content/
  letter-01.mdx
  letter-02.mdx
  ...
  letter-09.mdx
  introduction.mdx
  epilogue.mdx
```

---

### 8. Quality gates between editorial stages

**Finding (MEDIUM confidence — synthesized from editorial practice and agent design principles):**

Each stage needs a concrete checklist, not vague criteria. Vague criteria produce vague results. Here are the specific quality gates per stage:

**Gate 1 — Creative writer output passes to voice editor if:**
- [ ] Hits the arc outline beat for this letter (introduce X, seed Y, advance Z)
- [ ] Length is 500-1400 words (voice editor may trim or expand slightly)
- [ ] No flagrant plot contradictions with the world rules
- [ ] The letter has a clear center of gravity (one thing it's really about)

**Gate 2 — Voice editor output passes to flow editor if:**
- [ ] All forbidden phrases removed
- [ ] Sentence length varies — at least one sentence of ≤5 words every 4-5 paragraphs
- [ ] Nando's specific verbal tics are present (as defined in voice document)
- [ ] Opening is in media res (not a pleasantry or acknowledgment)
- [ ] Closing is pointed/abrupt (not a warm farewell)
- [ ] No hedging or academic qualifiers

**Gate 3 — Flow editor output passes to consistency checker if:**
- [ ] No paragraph begins with a topic sentence that is then simply expanded (AI structural tic)
- [ ] Energy varies — at least one tonal shift (from dry to urgent, or from distant to intimate)
- [ ] Transitions are invisible or structural, not transitional phrases
- [ ] The "irreducible sentence" exists and is in the correct position
- [ ] Word count is 600-1200 (must trim or expand if outside range)

**Gate 4 — Consistency checker output passes to copy editor if:**
- [ ] No contradictions with story bible's Established Facts section
- [ ] Required callback to previous letter is present
- [ ] Any new facts introduced are noted for story bible update
- [ ] Characters' names, titles, and descriptions are consistent with prior letters

**Gate 5 — Copy editor output is final if:**
- [ ] Zero forbidden phrases (second check — this is the hard gate)
- [ ] MDX formatting is clean: no stray markdown artifacts, proper paragraph breaks
- [ ] `export const metadata = { ... }` block is present and complete
- [ ] Grammar, punctuation, and spelling are correct
- [ ] No sentence that sounds like it was written by a machine (human read-aloud test)

**What happens if a gate fails?** Return to the previous stage with specific instructions, not vague feedback. "Revise" is useless. "Remove the word 'profound' in paragraph 3 and the transition 'Moreover' in paragraph 5, then shorten the second-to-last paragraph by half" is actionable.

---

## How to Batch the Letters

**Finding (MEDIUM confidence — derived from the sequential constraint and practical session management):**

The instructions lock in sequential writing (each letter builds on the last). Two approaches are viable:

**Option A — One at a time (all 9 individually):**
- Pros: Maximum story coherence; story bible grows cleanly; voice calibration can adjust after each letter
- Cons: Nine separate pipeline runs; slower
- Best for: Getting voice right, especially if Letter 1 needs multiple passes

**Option B — Batches of 3 (Letters 1-3, then 4-6, then 7-9):**
- Pros: Three fewer pipeline transitions; allows batch review of a tonal arc
- Cons: Cannot adjust story bible between Letters 1 and 2 if Letter 2 contradicts Letter 1
- Best for: Once the voice is calibrated and Letters 1-2 are approved

**Recommendation:** Write Letters 1-2 individually to calibrate voice. Once both are approved, proceed in groups of 3 (Letters 3-5, then 6-8, then Letter 9 solo given the twist). The frame narrative (introduction + epilogue) should be written last, after all 9 letters exist — Noah's discovery framing must reference what actually exists.

---

## Epistolary Fiction Reference Points

The Screwtape Letters (C.S. Lewis) is the structural model. Key craft observations from that text:
- Letters are self-contained arguments, not narrative scenes
- The reader infers the other side of the correspondence from what's responded to
- The voice never wavers — Screwtape's contempt and bureaucratic precision are consistent from Letter 1 to Letter 31
- Each letter introduces ONE new idea or teaching, not three
- The comedy comes entirely from the gap between the author's frame (diabolical) and the reader's frame (human)

For Nando, the gap is: Nando's frame is ancient divine purpose; the reader's frame is "this is a five-pound dog." That gap must be protected. Any moment where Nando seems small, uncertain, or emotionally vulnerable to ordinary dog feelings breaks the comedy. Nando must be completely, sincerely self-important.

---

## Open Questions for This Step

| Question | Why It Matters | Who Decides |
|----------|----------------|-------------|
| Does the voice document already exist from Step 1.1 (voice and arc)? | If yes, this step uses it as input. If no, writing cannot begin. | Director / workflow — check Step 1.1 deliverables |
| What is the specific arc beat for each letter? | The creative writer needs this per-letter | Step 1.1 deliverable (arc outline) |
| What are Nando's specific opinions and idiosyncratic details? | Required for authored specificity (see Finding 5) | Noah should define 5-10 specific Nando facts in the voice document |
| Letter 1 voice calibration: does Noah review before Letters 2-9 proceed? | Noah's approval of Letter 1 is the quality anchor for the rest | Noah |

---

## Confidence Assessment

| Finding | Confidence | Source |
|---------|------------|--------|
| Multi-agent pipeline structure (prompt chaining) | HIGH | Anthropic official "Building Effective Agents" documentation |
| MDX export metadata syntax | HIGH | Next.js 16 official docs (nextjs.org/docs/app/guides/mdx), verified March 2026 |
| Forbidden phrase list | HIGH | Well-documented across multiple detection sources; patterns are consistent |
| Voice consistency via few-shot examples | HIGH | Anthropic prompt engineering guide |
| Story bible structure | MEDIUM | Synthesized from screenwriting/game-narrative practices; no single authoritative source |
| Quality gate checklists | MEDIUM | Synthesized from editorial practice and agent design principles |
| Letter batching recommendation | MEDIUM | Derived from sequential constraint logic; no single authoritative source |
| "Authored vs generated" prose techniques | MEDIUM | Synthesized from craft writing sources; empirically validated but not formally documented |
