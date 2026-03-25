# Task: Build the editorial agent team

## What To Do

Create the specialized AI agent team that will produce and edit the letters. Five roles with non-overlapping responsibilities: (1) Creative Writer — drafts each letter from the arc outline, voice document, and story bible; (2) Voice Editor — checks every sentence against Nando's voice document, fixes drift, enforces forbidden phrases list; (3) Flow Editor — evaluates pacing, transitions between paragraphs, reading rhythm, ensures each letter has a strong opening and lingering close; (4) Consistency Checker — maintains the story bible, verifies facts, catches contradictions with previous letters, validates easter egg placements; (5) Copy Editor — grammar, punctuation, sentence-level polish. Each agent needs a clear system prompt with its role, the voice document, and the relevant reference materials. The pipeline is sequential: writer → voice → flow → consistency → copy.

## Why It Matters

This editorial pipeline is what separates authored-quality writing from AI slop. Each role catches different failure modes. The pipeline must be built and tested before any letter is written.

## Size

**Estimate:** large

Building 5 agent prompts with clear role boundaries, testing the pipeline with a sample passage, and verifying handoff between stages.

## Done When

- [ ] All 5 agent roles defined with clear, non-overlapping system prompts
- [ ] Each agent receives the voice document and its role-specific instructions
- [ ] Forbidden phrases list integrated into Voice Editor's checks
- [ ] Story bible template created for Consistency Checker to maintain
- [ ] Pipeline tested with a sample paragraph through all 5 stages
- [ ] Handoff format between stages defined (what each editor passes to the next)

## Needs First

Nando's voice document and the 9-letter arc outline from Step 1.
