# Step 2: Component architecture

## What This Delivers

All UI components scaffolded and working: Letter (section container with hash anchor), LetterArt (next/image wrapper), AnimatedSection (motion.div with whileInView), ChapterNav (floating dots with IntersectionObserver), ScrollProgress (useScroll progress bar), and FrameNarrative (intro/epilogue container). Client/server boundaries are correct — animation wrappers are Client Components, letter content stays as Server Components.

## Tasks

- [ ] Task 1: Build Letter and LetterArt components
- [ ] Task 2: Build AnimatedSection wrapper with scroll-triggered entrances
- [ ] Task 3: Build ChapterNav with floating dots and IntersectionObserver
- [ ] Task 4: Build ScrollProgress bar
- [ ] Task 5: Build FrameNarrative component for intro and epilogue

## Needs First

Project setup and theme configured from Step 1.

## Decisions

### Locked
- whileInView with viewport={{ once: true }} as project-wide default in AnimatedSection
- IntersectionObserver for chapter tracking, not scroll event listeners
- Client/Server boundary: AnimatedSection, ChapterNav, ScrollProgress are Client Components; Letter, LetterArt, FrameNarrative are Server Components
- Only animate opacity and transform (GPU-composited, no layout reflow)
- Dot nav needs tooltip/label with letter title for accessibility
