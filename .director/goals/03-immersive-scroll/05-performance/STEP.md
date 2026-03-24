# Step 5: Performance tuning

## What This Delivers

Lighthouse 90+ on mobile emulation. LCP under 2.5s, CLS under 0.1, INP under 200ms. Images optimized with correct sizes props and reasonable total page weight. Ambient CSS grain effect added for desktop (SVG filter approach, zero JS cost).

## Tasks

- [ ] Task 1: Optimize images — sizes prop, priority, blur placeholders
- [ ] Task 2: Achieve Lighthouse 90+ mobile
- [ ] Task 3: Add ambient CSS grain effect for desktop

## Needs First

Everything integrated from Steps 3 and 4.

## Decisions

### Locked
- CSS SVG grain for atmosphere, desktop only, no canvas particles
- Gate ambient effects with @media (hover: hover) or prefers-reduced-motion
- No backdrop-filter: blur() (causes jank on mobile)
- Target 200-400KB per image after next/image optimization
