# Task: Build Letter and LetterArt components

## What To Do

Create the Letter component (Server Component) — a section container with a hash anchor id (#letter-N), accepting MDX content as children and an artwork image. Create the LetterArt component (Server Component) — a next/image wrapper designed for the sacred artwork with blur placeholder support, correct aspect ratio container, and the site's dark aesthetic. Letter sections should have appropriate spacing for the scroll experience.

## Why It Matters

These are the core building blocks — every letter on the page is a Letter wrapping LetterArt and MDX content. Getting the structure right here means clean integration later.

## Size

**Estimate:** medium

Two components with clear responsibilities. Needs thoughtful layout decisions for the reading experience.

## Done When

- [ ] Letter component renders a section with id="letter-N" hash anchor
- [ ] Letter accepts children (MDX content) and artwork prop
- [ ] LetterArt wraps next/image with blur placeholder support
- [ ] LetterArt uses a positioned parent with explicit aspect ratio (4:3)
- [ ] Both are Server Components (no 'use client')
- [ ] Spacing between letter sections creates natural reading rhythm
- [ ] Components render correctly with test content

## Needs First

Theme and fonts configured from Step 1.
