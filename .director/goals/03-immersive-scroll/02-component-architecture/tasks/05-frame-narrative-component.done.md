# Task: Build FrameNarrative component for intro and epilogue

## What To Do

Create the FrameNarrative Server Component — a container for Noah's introduction and epilogue that visually distinguishes these sections from Nando's letters. The frame narrative is in a different voice (Noah's, not Nando's) and should feel like a different layer — perhaps slightly different typography treatment, different spacing, or a subtle visual distinction. It should frame the letters without competing with them.

## Why It Matters

The frame narrative bookends the story. It needs to feel distinct from the letters themselves so readers intuitively understand they're hearing a different voice (Noah's casual narration vs Nando's cosmic wisdom).

## Size

**Estimate:** small

One component with styling decisions. Simpler than Letter because it doesn't have artwork or hash anchors.

## Done When

- [ ] FrameNarrative component renders introduction and epilogue content
- [ ] Visually distinct from Letter sections (different treatment, same dark theme)
- [ ] Server Component (no 'use client')
- [ ] Works with MDX content as children
- [ ] Reads as a natural bookend to the letter sequence

## Needs First

Letter component built (so FrameNarrative can be designed in contrast to it).
