# Task: Build ChapterNav with floating dots and IntersectionObserver

## What To Do

Create the ChapterNav Client Component — a fixed-position vertical dot navigation showing 9 dots, one per letter. Use IntersectionObserver (not scroll event listeners) to track which letter section is currently in view and highlight the corresponding dot. Clicking a dot smooth-scrolls to that letter's hash anchor. Each dot needs a tooltip or aria-label with the letter number/title for accessibility. Style to match the dark atmospheric theme — subtle until needed, using antique gold for the active dot.

## Why It Matters

The floating nav is how readers orient themselves in a long scroll. Without it, they lose their place in 9 letters of content. It also provides skip-navigation for readers who want to jump to a specific letter.

## Size

**Estimate:** medium

Requires IntersectionObserver setup for 9 sections, smooth scroll behavior, and careful positioning that doesn't interfere with reading on mobile.

## Done When

- [ ] Fixed-position vertical dot nav with 9 dots
- [ ] IntersectionObserver tracks current visible section (not scroll listeners)
- [ ] Active dot highlighted with antique gold accent
- [ ] Clicking a dot smooth-scrolls to the correct letter section
- [ ] Each dot has tooltip/aria-label with letter identifier
- [ ] Positioned to not interfere with reading on both desktop and mobile
- [ ] Subtle appearance — doesn't distract from the content

## Needs First

Letter component built (needs the section hash anchors to connect to).
