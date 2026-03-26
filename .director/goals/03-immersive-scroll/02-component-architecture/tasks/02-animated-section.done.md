# Task: Build AnimatedSection wrapper with scroll-triggered entrances

## What To Do

Create the AnimatedSection Client Component — a motion.div wrapper that uses Framer Motion's whileInView to animate content as it enters the viewport. This is the ONLY animation wrapper needed; all other letter content stays as Server Components. Set viewport={{ once: true }} as the default (animations play once, don't re-trigger on scroll-up). Only animate opacity and transform (GPU-composited properties). Design a subtle, elegant entrance — fade-in with slight upward movement, not flashy.

## Why It Matters

This single component handles all scroll-triggered animations on the site. Building it once with the right defaults (once: true, GPU-only properties) prevents performance issues across all 9 letters.

## Size

**Estimate:** medium

One component, but it defines the animation language for the entire site. Needs careful tuning of timing and easing.

## Done When

- [ ] AnimatedSection is a Client Component ('use client')
- [ ] Uses motion.div with whileInView
- [ ] viewport={{ once: true }} set as default
- [ ] Only animates opacity and transform (no layout-triggering properties)
- [ ] Entrance animation is subtle and elegant (fade + slight rise)
- [ ] Animation timing and easing feel cinematic, not bouncy
- [ ] Works correctly when wrapping Letter components

## Needs First

Letter component built from the previous task.
