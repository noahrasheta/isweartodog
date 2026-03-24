# Task: Integrate all 9 letters as MDX with exported metadata

## What To Do

Place all 9 letter MDX files in the project's content directory. Import them explicitly in app/page.tsx (direct imports, not dynamic — there are only 9). Each letter's exported metadata provides its title, number, and any frontmatter. Render each letter inside a Letter component wrapped in an AnimatedSection. Verify the reading order is correct and the scroll experience flows naturally.

## Why It Matters

This is where the story meets the website. The integration must be clean — each letter rendering with correct typography, proper spacing, and smooth scroll-triggered entrances.

## Size

**Estimate:** medium

9 imports and renderings, with attention to reading flow and spacing between letters.

## Done When

- [ ] All 9 MDX files placed in the project content directory
- [ ] Each letter imported explicitly in app/page.tsx
- [ ] Each letter rendered in Letter + AnimatedSection
- [ ] Reading order correct (Letter 1 through Letter 9)
- [ ] Typography renders correctly with prose-invert styling
- [ ] Scroll between letters feels natural (spacing, rhythm)

## Needs First

All components from Step 2 and all written content from Goal 1.
