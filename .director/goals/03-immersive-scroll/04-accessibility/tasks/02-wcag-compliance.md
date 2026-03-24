# Task: Verify WCAG 2.1 AA compliance — contrast, landmarks, focus indicators

## What To Do

Audit the site for WCAG 2.1 AA compliance. Verify: text contrast ratios (cream #F5F0E8 on charcoal should be ~12:1 — well above 4.5:1 minimum, but check all text elements including navigation dots, tooltips, and any secondary text). Verify focus indicators on all interactive elements (ChapterNav dots, any links). Check that focus order follows reading order. Run an accessibility audit tool (axe or Lighthouse accessibility audit) and fix any findings.

## Why It Matters

Accessibility isn't optional — it's a must-have in the vision. A score of 95+ on Lighthouse accessibility is the target.

## Size

**Estimate:** medium

Requires systematic audit with tooling. May uncover unexpected issues in specific elements.

## Done When

- [ ] All text passes 4.5:1 contrast ratio minimum (body text should be ~12:1)
- [ ] Focus indicators visible on all interactive elements
- [ ] Focus order follows reading order (top to bottom)
- [ ] Lighthouse accessibility audit run with score 95+
- [ ] Any findings from axe/Lighthouse fixed
- [ ] Screen reader navigation tested (sections, headings, navigation)

## Needs First

Content integrated in Step 3.
