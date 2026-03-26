# Task: Wire up ChapterNav to all letter sections

## What To Do

Connect the ChapterNav component to all 9 letter sections. Configure the IntersectionObserver to track all #letter-1 through #letter-9 hash anchors. Verify that the active dot correctly tracks the reader's position, smooth-scrolling to the correct section on click, and the nav updates responsively as the reader scrolls through the full story.

## Why It Matters

The dot navigation is useless if it doesn't correctly track position across all 9 letters. This wiring task ensures the navigation works with real content, not just test sections.

## Size

**Estimate:** small

Connecting an existing component to real content. Should work if the Letter components have correct hash anchor ids.

## Done When

- [ ] ChapterNav tracks all 9 letter sections correctly
- [ ] Active dot updates as reader scrolls through each section
- [ ] Clicking any dot smooth-scrolls to the correct letter
- [ ] Navigation works on both desktop and mobile
- [ ] No jank or lag in active state updates

## Needs First

All 9 letters integrated with hash anchors.
