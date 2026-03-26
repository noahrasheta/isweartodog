# Task: Implement prefers-reduced-motion across all animations

## What To Do

Gate all decorative animations behind a prefers-reduced-motion check. When the user has reduced motion enabled, AnimatedSection should render content immediately without entrance animations, ScrollProgress can remain (it's informational, not decorative), and any ambient effects should be disabled. Use Framer Motion's built-in reduced motion support or a CSS media query approach.

## Why It Matters

Required for WCAG 2.1 AA compliance and basic respect for users who experience motion sickness or vestibular disorders. Decorative animations must be optional.

## Size

**Estimate:** small

Straightforward — Framer Motion has built-in support for reduced motion preferences.

## Done When

- [ ] AnimatedSection skips entrance animations when prefers-reduced-motion is active
- [ ] ScrollProgress remains functional (informational, not decorative)
- [ ] Any ambient effects disabled for reduced motion users
- [ ] Tested with prefers-reduced-motion: reduce in browser dev tools
- [ ] Content remains fully readable and accessible without animations

## Needs First

All animations built in Step 2.
