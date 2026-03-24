# Step 3: Content integration

## What This Delivers

All 9 letters, all artwork, and the frame narrative assembled into the single-page scroll. Each letter section has a hash anchor (#letter-1 through #letter-9). Artwork uses next/image static imports with blur placeholders. The page reads top to bottom as the complete story experience.

## Tasks

- [ ] Task 1: Integrate all 9 letters as MDX with exported metadata
- [ ] Task 2: Integrate all artwork with next/image static imports
- [ ] Task 3: Integrate frame narrative (introduction and epilogue)
- [ ] Task 4: Wire up ChapterNav to all letter sections

## Needs First

All components from Step 2, all written content from Goal 1, and all curated artwork from Goal 2.

## Decisions

### Locked
- Static image imports for auto-blurDataURL and auto-dimensions
- priority prop only on first letter's image
- Correct sizes prop on all images
- Hash anchors #letter-1 through #letter-9 for shareability
