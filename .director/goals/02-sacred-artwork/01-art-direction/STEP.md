# Step 1: Art direction and style guide

## What This Delivers

An artwork style consistency document that locks the visual rules across all 9 images — palette, character portrayal, background requirements, aspect ratio, negative prompts, and per-period painter references. Nine detailed image generation prompts, one per letter, each specifying the sacred art style, scene description, and character anchors while maintaining the shared visual identity.

## Tasks

- [x] Task 1: Create artwork style consistency document
- [ ] Task 2: Generate per-letter image prompts with character and scene descriptions

## Needs First

All 9 letters must be written so the art direction agent can read each letter and design appropriate visual companions.

## Decisions

### Locked
- Art style: serious sacred/mythological, not cartoonish (the contrast with satirical text IS the joke)
- Varying art styles per letter (Renaissance, illuminated manuscripts, cave paintings, Baroque)
- Dogs portrayed as divine figures
- Source images at 1600-2000px wide for next/image optimization
- Name specific painters (Caravaggio, Fra Angelico, Rublev), not just period labels
- 4:3 aspect ratio, dark backgrounds, shared negative prompt block across all images

### Flexible
- Which specific art style maps to which letter
- Whether Nando and Jarvis appear as specific characters or are represented symbolically
