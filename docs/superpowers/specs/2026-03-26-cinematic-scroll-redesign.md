# Cinematic Scroll Redesign: I Swear to Dog

**Date:** 2026-03-26
**Status:** Draft
**Creative Direction:** "The Matrix meets Dan Brown" -- ancient sacred knowledge wrapped in a technological/cosmic reality. Layers within layers, discovery within discovery.

---

## 1. Design Vision

Transform the current linear scroll experience into a **cinematic descent through layers of reality**. The scroll journey itself tells the story: the reader starts at the surface (Noah's human voice), descends into an increasingly rich cosmic medium (the dogs' letters), reaches the deepest layer of revelation (Letter 9: the pattern), and returns to the surface (epilogue).

Even without reading a word, the visual journey communicates "entering something deep, then surfacing."

### Core Principles

- **Progressive enhancement**: content-first base that works everywhere; cinematic effects layered on for capable devices.
- **Two-world contrast**: cosmic space (gold on dark) vs. parchment letters (dark on warm). Two realms, two palettes.
- **Escalating density**: the atmosphere grows richer as you descend, mirroring the narrative's escalating revelation.
- **Accessibility preserved**: semantic HTML, keyboard navigation, screen reader support, reduced motion fully respected. WCAG 2.1 AA maintained.

---

## 2. Page Architecture: Five Zones

### Zone 1: The Surface (Introduction)
- Dark background, minimal. Faint stars beginning to form, very sparse.
- Noah's voice: "How This Began." Clean typography, grounded, warm.
- As the reader scrolls past the introduction, the **threshold transition** begins: stars multiply, nebula wisps appear, particles start drifting. The cosmos opens beneath.

### Zone 2: The Descent Begins (Letters 1-3)
- Cosmic atmosphere present but still relatively sparse. Upper layers.
- Nebula colors lean cool: deep blues, indigo, hints of violet.
- Each letter is a pinned scene (see Section 3).
- Between letters: brief passage through the cosmic medium with subtle color shifts.

### Zone 3: Deepening (Letters 4-6)
- Atmosphere grows richer. More particle density.
- Warmer nebula tones creep in: amber, deep gold alongside the blues.
- Parchment surfaces feel slightly more weathered or ancient.
- Descent transitions between letters become more pronounced.

### Zone 4: The Deep (Letters 7-9)
- Full atmospheric density. Rich nebula fields.
- Geometric patterns emerge subtly in the particle field: sacred geometry, fractal hints, matrix-like grid lines woven into the nebula.
- By Letter 9: the atmosphere feels like the deepest layer of something infinite. Geometric patterns most visible.

### Zone 5: The Return (Epilogue)
- Density thins. Particles settle. Geometric patterns fade.
- Ascent back toward the surface. Atmosphere simplifies.
- Noah's voice returns. Calm, grounded. Epilogue text in a quieter space; cosmos visible but distant.

---

## 3. Letter Scene Choreography

Each letter is a **GSAP ScrollTrigger pinned scene** with four phases. This is the core experience.

### Phase 1: Approach (Artwork Reveal)
As the reader scrolls toward a letter, the artwork emerges from the cosmic atmosphere:
- Starts slightly scaled up and blurred, then sharpens and settles into position.
- Artwork is split into 2-3 depth layers with parallax separation:
  - **Background layer** (sky, environment, distant elements): moves slowest.
  - **Midground layer** (main subject, architecture): medium speed.
  - **Foreground layer** (close details, decorative elements): moves fastest, drifts past the reader.
- Creates the feeling of scrolling *into* the painting.

### Phase 2: Parchment Materializes
Once artwork is positioned, the parchment surface fades in within the scene:
- Semi-translucent warm panel with subtle noise texture.
- Soft edge glow, slight corner radius (~8-12px).
- Letter header appears: number in UI font, title in display type.
- Artwork remains visible around and behind the parchment.

### Phase 3: Reading
- Parchment and text scroll naturally.
- Artwork layers remain pinned or move very slowly via parallax.
- Reader is reading the letter *within the scene*.
- Cosmic atmosphere alive in the periphery.

### Phase 4: Release and Descent
- Parchment fades out.
- Artwork layers parallax apart and fade.
- Cosmic atmosphere takes over.
- Reader descends through stars and nebula to the next letter.

### Mobile Adaptation
- Artwork: single layer (original image), dramatic reveal (scale + blur-to-sharp).
- Parchment: appears below artwork, not overlaid. No pinning.
- Natural scroll. Still beautiful, just not the full depth illusion.

---

## 4. Cosmic Atmosphere System

All built with CSS for performance. No canvas, no heavy rendering.

### Star Field (3 Layers)
- **Distant**: 1-2px, many, slow drift. White/blue-white. CSS twinkle animation with randomized delays.
- **Mid**: 2-3px, fewer, moderate drift. Some with soft glow.
- **Near**: 3-5px, occasional, fastest movement. Visible glow halos. Parallax with scroll via GSAP.

### Nebula Fields
- Large, soft CSS radial/conic gradients at various depths.
- Color palette shifts by zone:
  - **Letters 1-3**: deep navy, indigo, dark violet.
  - **Letters 4-6**: violet blending into amber, touches of deep gold.
  - **Letters 7-9**: amber, gold, violet, hints of electric blue.
- Very slow scroll movement (2-5% of scroll speed) for deep background parallax.
- Mixed blur levels: some crisp color washes, others heavily blurred atmospheric glows.

### Geometric Patterns (Letters 7-9 Only)
- Sacred geometry elements in the atmosphere: hexagonal grids, concentric circles, fractal branching.
- Very low opacity (5-15%), gold color.
- Emerge gradually: barely visible at Letter 7, more defined at Letter 8, clearly present at Letter 9.
- CSS/SVG-based with scroll-triggered opacity via GSAP.

### Particle Drift
- Floating motes of light/dust, CSS animated (30-60s keyframe loops).
- ~20-30 elements max across the viewport.
- Density increases with descent.
- Hidden when `prefers-reduced-motion` is active.

### Threshold Transition (Intro to Cosmos)
The most dramatic single moment. GSAP ScrollTrigger timeline tied to the scroll region between intro and Letter 1:
- Stars multiply (new elements fade in).
- First nebula glow appears at bottom of viewport and rises.
- Particle drift begins.
- Subtle vignette darkens edges.
- Feeling: a door opening beneath you into the cosmos.

### Performance Guardrails
- All atmosphere uses CSS transforms and opacity (GPU-composited, no layout thrashing).
- `will-change: transform` used sparingly on star layers.
- Nebula gradients are large static elements that only translate, never repaint.
- Particle count capped at ~20-30 total.
- Entire atmosphere system disableable for reduced motion.

---

## 5. Parchment Surface Design

### Visual Properties
- **Background**: warm off-white, ~85-90% opacity. Cosmic atmosphere bleeds through faintly at edges.
- **Texture**: subtle CSS noise overlay, warm-toned. Tactile without being photorealistic.
- **Edge treatment**: soft warm box-shadow glow, gentle falloff. No hard borders.
- **Corner radius**: ~8-12px. Organic, not mechanical.
- **Width**: max-w-3xl desktop, near full-width mobile with comfortable padding.

### Typography on Parchment (Inverted Palette)
- **Letter number**: Geist (UI font), small caps/uppercase, muted warm tone.
- **Title**: Cormorant Garamond, dark charcoal/near-black on warm surface.
- **Body text**: EB Garamond, dark charcoal, generous leading. Maximum readability.
- **Blockquotes/emphasis**: subtle treatments within the warm palette. No gold on parchment.

### Contrast Principle
Cosmic space uses the current palette (gold on dark). Parchment inverts it (dark on warm). This creates a visceral shift entering each letter. Two realms, two palettes:
- **Cosmos**: vast, dark, gold-accented, expansive.
- **Letters**: intimate, warm, grounded, readable.

### Depth Positioning
The parchment floats at a specific depth in the parallax stack:
- Behind the artwork's foreground layer (foreground elements may overlap parchment edges).
- In front of artwork midground and background layers.
- The letter exists *within* the scene, not on top of it.

---

## 6. Navigation & Progress

Minimal. The experience speaks for itself.

### Progress Bar
- Top of viewport, 1-2px.
- Color shifts subtly with descent: cool tones at top, warming as you descend.
- Existing Framer Motion `useScroll` + `useSpring` approach retained.

### Chapter Dots
- Right side, similar to current positioning.
- Restyled: softly glowing points matching the star aesthetic.
- Active dot: brighter with small glow halo. Inactive: dim, star-like.
- Hover tooltip: warm parchment-toned background with dark text (letter palette, not cosmos palette).
- Behavior unchanged: IntersectionObserver, smooth scroll on click.

### Mobile
- Progress bar: same, top of viewport.
- Chapter dots: hidden by default, revealed on tap at right edge.

---

## 7. Technical Architecture

### Library Responsibilities

| Layer | Tool | Handles |
|-------|------|---------|
| Scroll choreography | GSAP ScrollTrigger | Pin-and-scroll scenes, artwork parallax, threshold transition, depth-dive transitions, geometric pattern reveals |
| UI animation | Framer Motion (existing) | Nav entrance/exit, progress bar spring, hover states, reduced motion detection |
| Atmosphere | CSS | Star fields, nebula gradients, particle drift, parchment surface, glow effects, grain texture |
| Content | MDX (existing) | Letter text, intro, epilogue. No changes to content pipeline |

### Progressive Enhancement Tiers

**Tier 1: Content-first (no JS animations)**
- All text readable, all images visible, semantic HTML intact.
- Parchment surfaces visible via CSS.
- Cosmic atmosphere as static CSS gradients and positioned stars.
- Navigation functional via anchor links.

**Tier 2: Reduced motion**
- GSAP animations replaced with instant state changes.
- Framer Motion detects `prefers-reduced-motion` (existing).
- Particles hidden. Star twinkle disabled.
- Parchment surfaces appear immediately without fade.
- Still beautiful: palette, typography, and layout carry the experience.

**Tier 3: Mobile**
- Artwork: single layer, no parallax. Dramatic reveal (scale + blur-to-sharp) via GSAP.
- Parchment: below artwork, no overlay. Natural scroll, no pinning.
- Atmosphere: simplified. Fewer stars, nebula gradients present, no particles.
- Threshold transition: simplified fade.

**Tier 4: Desktop full experience**
- Everything: pinned scenes, parallax layers, particle drift, geometric patterns, threshold transition, full atmosphere density.

### New Dependencies
- `gsap` + `@gsap/react` (ScrollTrigger plugin): ~25kb gzipped total. Free tier only; no ScrollSmoother or other premium plugins.
- No Lenis, no Three.js, no canvas particle systems.

### Responsive Breakpoint
- **Desktop full experience** (Tier 4): >= 1024px (`lg` breakpoint). Pinned scenes, parallax layers, particles, full atmosphere.
- **Mobile simplified** (Tier 3): < 1024px. No pinning, single-layer artwork, reduced atmosphere.
- A single breakpoint keeps the logic simple. Tablet-landscape gets the desktop experience; tablet-portrait and phones get the mobile path.

### Artwork Production Requirement
- Each of 9 artworks separated into 2-3 depth layers (PNGs with transparency).
- One-time task done outside the codebase (AI tools, Photoshop, or manual masking).
- Desktop uses layered versions; mobile uses existing single images.
- **Asset location**: `artwork/layers/letter-{01-09}/` with files named `bg.png`, `mid.png`, `fg.png`.
- **Dimensions**: match the original artwork resolution. Transparency where layers are cut.
- **Blocking dependency**: parallax scenes cannot be built until layers are produced. Plan should sequence this first.

### File Structure

```
components/
  Letter.tsx            -> refactored (parchment surface, GSAP scene wrapper)
  LetterArt.tsx         -> refactored (multi-layer parallax)
  LetterScene.tsx       -> NEW (GSAP pin-and-scroll orchestrator per letter)
  AnimatedSection.tsx   -> kept (Framer Motion, non-GSAP elements)
  ChapterNav.tsx        -> minor style updates (star-like dots, tooltip restyle)
  ScrollProgress.tsx    -> minor style updates (color shift on descent)
  CosmicAtmosphere.tsx  -> NEW (star layers, nebula, particles)
  ThresholdTransition.tsx -> NEW (intro-to-cosmos GSAP timeline)
  ParchmentSurface.tsx  -> NEW (warm panel wrapper for letter content)
  GeometricPatterns.tsx -> NEW (sacred geometry overlay, letters 7-9)
  FrameNarrative.tsx    -> refactored (surface/return zone styling)
```

### What Does NOT Change
- MDX content files and pipeline.
- Content structure (9 letters, intro, epilogue).
- Font stack (Cormorant Garamond, EB Garamond, Geist).
- Color tokens (gold, cream, charcoal remain; new warm parchment tokens added).
- SEO metadata, robots.txt, sitemap.
- Accessibility infrastructure (skip links, ARIA labels, semantic elements, keyboard nav).

---

## 8. Success Criteria

1. A first-time visitor scrolls the site and has a "wow" reaction within the first 10 seconds.
2. The threshold transition from intro into the cosmos is a distinct, memorable moment.
3. Each letter feels like entering a chamber within a painting, not reading text on a webpage.
4. The two-world contrast (cosmos vs. parchment) is immediately felt without explanation.
5. The escalating atmosphere density mirrors the narrative's deepening revelation.
6. The site is fully readable and beautiful with all animations disabled.
7. Mobile delivers a clean, compelling reading experience without broken effects.
8. Lighthouse performance score remains above 90 on mobile.
9. WCAG 2.1 AA compliance maintained.
10. No audio. Purely visual storytelling through scroll.
