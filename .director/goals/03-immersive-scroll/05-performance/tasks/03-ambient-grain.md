# Task: Add ambient CSS grain effect for desktop

## What To Do

Add a subtle film grain texture overlay using CSS SVG feTurbulence filter — zero JavaScript cost. Apply only on desktop (gate with @media (hover: hover) to exclude touch devices). Also respect prefers-reduced-motion. The grain should be barely perceptible — adding atmosphere without drawing attention. It should contribute to the "ancient manuscript" feel without impacting readability.

## Why It Matters

A nice-to-have that adds the final layer of atmosphere. The SVG filter approach has zero performance cost compared to canvas-based particles — it's pure CSS.

## Size

**Estimate:** small

Well-documented CSS pattern. The hard part is calibrating subtlety — too much grain is distracting, too little is invisible.

## Done When

- [ ] SVG feTurbulence grain filter applied as overlay
- [ ] Desktop only (@media (hover: hover))
- [ ] Disabled for prefers-reduced-motion users
- [ ] Subtle enough to not affect readability
- [ ] No impact on Lighthouse performance score
- [ ] Adds to atmospheric dark theme without being distracting

## Needs First

Performance baseline established (don't want to debug grain effects in Lighthouse results).
