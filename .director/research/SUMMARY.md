# Research Summary: I Swear to Dog

**Synthesized:** 2026-03-24
**Mode:** Research
**Sources:** STACK.md, FEATURES.md, ARCHITECTURE.md, PITFALLS.md

---

## Executive Summary

I Swear to Dog is a cinematic single-page scroll website that delivers a satirical epistolary narrative — nine letters from Nando, a five-pound Maltese who claims authorship of humanity, to his nephew Jarvis. The product is best understood as a piece of authored literary art that happens to live on the web. The precedents that matter most are NYT Snowfall, The Pudding, and narrative experiences like "The Boat" — experiences built around one continuous reading journey rather than navigable content. Building the experience correctly means committing fully to immersion: no CMS, no comments, no newsletter interruptions, no scroll hijacking. The experience is the product.

The recommended technical approach is straightforward: Next.js 16 App Router with static generation, local MDX files loaded via `@next/mdx`, Framer Motion for scroll-triggered entrance animations, Tailwind CSS 4 with a dark-only theme, and `next/image` for the nine AI-generated artwork pieces. Every technology in the stack serves the same goal — a fast, immersive, dark atmospheric reading experience delivered as pure static HTML from Vercel's global CDN. The architecture has no runtime complexity. The challenge is execution quality, not technical difficulty.

The highest risks are not technical. Voice consistency across nine AI-generated letters is the most critical risk — without a canonical voice document and an editorial pipeline that enforces Nando's voice at every stage, the letters will feel authored by different people. Image weight and mobile animation performance are the second tier of risk: nine unoptimized AI images and too many simultaneous scroll-triggered animations are the two most likely causes of a poor Lighthouse score. Both are entirely preventable with the right setup patterns.

---

## Key Findings

### Stack

| Layer | Technology | Version | Notes |
|-------|-----------|---------|-------|
| Framework | Next.js App Router | 16.2.1 | Static generation; no `output: 'export'` needed on Vercel |
| Language | TypeScript | 5.x | Standard throughout |
| Styling | Tailwind CSS 4 | 4.2 | `@theme` directive replaces `tailwind.config.js` |
| Animations | Framer Motion (Motion) | Latest | `whileInView` for entrances; `useScroll` for progress bar |
| Content | `@next/mdx` + local MDX files | Latest | Do NOT use next-mdx-remote (archived) or Contentlayer (deprecated) |
| Typography plugin | `@tailwindcss/typography` | Latest | `prose-invert` for dark mode prose |
| Body font | EB Garamond (variable) | Google Fonts | Better dark-bg rendering than Cormorant at body sizes |
| Display font | Cormorant Garamond | Google Fonts | Optional; headers/drop caps only |
| UI font | Geist Sans | Google Fonts / Vercel | Navigation, metadata, UI elements |
| Images | `next/image` with static imports | Built-in | Auto-blur, auto-dimensions, WebP on Vercel |
| Font loading | `next/font/google` | Built-in | Self-hosted; eliminates CLS from font swap |
| Hosting | Vercel | Free tier | Global CDN; no serverless functions needed |

**Critical version note:** Do not enable `mdxRs: true` (experimental Rust MDX compiler — explicitly "not recommended for production" in official docs). Use the standard JS MDX pipeline.

**Do Not Hand-Roll:**
- MDX loading: use `@next/mdx` (official, RSC-native). Do not write a custom file reader.
- Font loading: use `next/font/google` (self-hosted, CLS-free). Do not link Google Fonts in `<head>`.
- Image optimization: use `next/image` with static imports. Do not use `<img>` tags directly.
- Scroll progress: use `useScroll` from Framer Motion. Do not write raw scroll event listeners.
- Chapter tracking: use `IntersectionObserver`. Do not poll scroll position with `scroll` event listeners.
- Dark mode: define base theme colors as dark values in `@theme`. Do not use `prefers-color-scheme` or JS toggles.

---

### Features

**Must-Have (table stakes — ship nothing without these):**

| Feature | Notes |
|---------|-------|
| 9 letters — complete and polished | The entire product; non-negotiable |
| Frame narrative (intro + epilogue) | Noah's framing that contextualizes the letters |
| AI sacred art for each letter | One piece per letter; visual identity of the site |
| Dark atmospheric design | Core aesthetic; dark-only is intentional and correct |
| Mobile-optimized scroll | Majority of readers are on mobile |
| Floating dot chapter navigation (9 dots) | Hash anchors `#letter-1` through `#letter-9`; IntersectionObserver for active state |
| Scroll-triggered text reveals | `whileInView` entrance animations; `once: true` always |
| OG image + Twitter card | Static 1200x630 image; `opengraph-image.png` convention in `/app/` |
| WCAG 2.1 AA compliance | 4.5:1 body text contrast minimum |
| `prefers-reduced-motion` support | All decorative animations must disable for affected users |
| Correct serif font for dark bg | EB Garamond body, Cormorant headers — visually tested on real hardware |
| Semantic HTML structure | `<article>`, `<section>`, `<nav>` with proper `aria-label` attributes |

**Nice-to-Have (build if time allows):**

| Feature | Notes |
|---------|-------|
| Reading progress bar | Thin gold bar at top, `useScroll` + `scaleX` |
| Post-Letter-9 hidden coda | Rewards readers who linger; zero performance cost |
| Alt text easter eggs | Sardonic alt text on sacred art visible to DOM inspectors |
| Page title scroll updates | `document.title` changes to quotes as reader progresses |
| Ambient grain texture | CSS SVG filter approach (zero JS); not canvas |

**Anti-Features (do not build):**

- Comment sections
- Mid-scroll newsletter modals
- Infinite scroll or "related content" after Letter 9
- Sticky social share buttons visible during reading
- CMS or admin panel (one-time publication)
- Cookie banners (use Vercel Analytics — privacy-friendly, no cookies)
- Autoplaying ambient audio
- Scroll hijacking (scroll-triggered animations are fine; controlling scroll velocity is not)
- `react-spring` alongside Framer Motion (use one animation library)
- Canvas-based particles (performance cost on mobile)

---

### Architecture

**Pattern:** Single route `/` with 9-11 hash-anchored `<section>` elements. Server Components for letter content. Client Components pushed to animation wrappers only.

**Key components:**

| Component | Type | Responsibility |
|-----------|------|---------------|
| `app/layout.tsx` | Server | Fonts, metadata, dark background, persistent overlays |
| `app/page.tsx` | Server Component | Assembles all letters; explicit imports for each MDX file |
| `Letter.tsx` | Server Component | Section container with hash anchor; art + prose |
| `LetterArt.tsx` | Server Component | `next/image` wrapper with blur placeholder |
| `AnimatedSection.tsx` | Client Component | `motion.div` with `whileInView`; the entry animation wrapper |
| `ChapterNav.tsx` | Client Component | Floating dots; IntersectionObserver for active state |
| `ScrollProgress.tsx` | Client Component | `useScroll` + `scaleX`; thin progress bar |
| `FrameNarrative.tsx` | Server Component | Noah's introduction and epilogue |
| `mdx-components.tsx` | Required by @next/mdx | Typography overrides for MDX prose elements |

**Content pipeline (pre-code):**

```
Phase 1: Story Architecture → outline, arc, voice doc, twist mechanism
Phase 2: Writing → 9 letters via editorial agent pipeline (writer → voice editor → flow editor → consistency checker → copy editor)
Phase 3: Art Direction → per-letter image generation prompts with consistency document
Phase 4: Image Generation → Noah curates AI-generated art
Phase 5: Integration → Claude Code builds the site
```

**Client/Server boundary rule:** Keep `Letter.tsx` and MDX content as Server Components. Push `'use client'` down only to animation wrappers (`AnimatedSection`), `ChapterNav`, and `ScrollProgress`. This preserves RSC benefits for content rendering while enabling client-side animations where needed.

**Frontmatter pattern:** Export metadata from MDX files using `export const metadata = { ... }` — `@next/mdx` supports this natively. No YAML frontmatter (not supported without extra plugins). No `gray-matter` needed.

**Important architectural decision:** Do NOT use `output: 'export'` in `next.config.ts`. Deploy normally to Vercel; Next.js auto-detects the page as static. Using `output: 'export'` removes the `next/image` optimization API that Vercel provides.

---

### Pitfalls

**Top pitfalls for this specific project (ranked by risk):**

**CRITICAL:**

1. **Voice drift across 9 AI-generated letters**
   - Cause: Separate AI sessions with no shared anchoring artifacts
   - Prevention: Build a canonical voice document before writing starts. Include sentence length range, verbal tics, banned phrases, how Nando refers to humans, his irony register. Feed to every session. Voice editor role is not optional.
   - Connected: FEATURES.md editorial pipeline architecture requires a "story bible" — this is the same document.

2. **AI slop tells breaking the authored-work illusion**
   - Cause: Default AI prose patterns (filler transitions, hedging, inflation vocabulary)
   - Prevention: Copy editor and voice editor agents must have explicit forbidden-phrases checklists. Examples: "Moreover," "Furthermore," "tapestry," "multifaceted," "In essence," "One might argue." Noah's final review should specifically hunt for these.

**HIGH:**

3. **Unoptimized AI images (9 x 1-4MB each)**
   - Cause: Raw Replicate output not processed; `sizes` prop missing; `priority` on wrong images
   - Prevention: Source at 1600-2000px wide; `next/image` handles WebP conversion. Set `priority` only on first letter image. Set correct `sizes` prop. Target 200-400KB per image after optimization. Use static imports for auto-`blurDataURL`.
   - Connected: STACK.md's `next/image` static import pattern solves this when followed correctly.

4. **Pure white text instead of cream**
   - Cause: Developer defaulting to `text-white` during implementation
   - Prevention: Define cream text in `@theme` as the base text color. Never use `#FFFFFF` for body text. Cream `#F5F0E8` on charcoal `#1C1A16` gives ~12:1 — compliant without halation.

5. **Ambient effects running on mobile causing jank**
   - Cause: CSS grain animations, `backdrop-filter: blur()`, canvas particles on mobile
   - Prevention: CSS grain via SVG `feTurbulence` filter is acceptable. No canvas particles. No `backdrop-filter: blur()`. Gate any ambient effects with `@media (hover: hover)` or `prefers-reduced-motion` checks.

6. **CLS from AI art images without reserved dimensions**
   - Cause: Dynamic-size images without explicit containers; missing `width`/`height`
   - Prevention: Use static imports for all artwork (auto-dimensions + `blurDataURL`). If using `fill`, wrap in a positioned parent with explicit aspect-ratio. Target CLS < 0.1.

7. **Narrative tension flat across 9 letters**
   - Cause: Each letter generated as an independent essay; arc not pre-planned
   - Prevention: The outline agent must define what each letter ADDS that the previous did not — escalation points, reveals, tonal shifts. Letter 9's simulation hypothesis twist must be seeded in earlier letters to feel inevitable.

**MEDIUM:**

8. **`whileInView` without `once: true` on entrance animations**
   - Prevention: Set `viewport={{ once: true }}` as a project-wide default in `AnimatedSection`.

9. **Serif font rendering on Windows dark backgrounds**
   - Cause: Cormorant Garamond is extremely thin; renders poorly on Windows ClearType
   - Prevention: Use EB Garamond for body text. Visually test on Windows dark mode at 18px before locking font choice.

10. **YAML frontmatter in MDX files silently failing**
    - Cause: `@next/mdx` does not support YAML frontmatter by default
    - Prevention: Use MDX export syntax (`export const metadata = { ... }`) rather than YAML frontmatter.

11. **Turbopack dev/production parity for MDX plugins**
    - Cause: Remark/rehype plugins with function options fail under Turbopack (dev) but work in production
    - Prevention: Use string-based plugin configuration. Test MDX pipeline in both dev and production builds.

---

## Implications for Gameplan

### Recommended goal and step structure

The research strongly points to a content-first, then code approach. The VISION.md states this, FEATURES.md endorses it, and ARCHITECTURE.md formalizes it as the "Phase 1-5" pipeline. Building the technical shell before content exists means building blind.

**Suggested goal structure:**

---

**Goal 1: Story and Content Foundation**
*Everything needed before code starts.*

Step 1.1 — Voice and Arc Architecture
- Deliverable: Canonical voice document (Nando's sentence patterns, verbal tics, banned phrases, irony register) + 9-letter arc outline (each letter's purpose, what it adds to the story, escalation points, twist setup in Letters 1-8)
- Features: Frame narrative, 9 letters complete
- Pitfalls to watch: Voice drift (#1), Narrative tension flat (#7), "Wise but boring" trap
- Research flag: This step defines quality ceiling for everything that follows. Noah must personally approve the voice document and arc outline before any letter drafts begin.

Step 1.2 — Letter Writing Pipeline (Letters 1-9)
- Deliverable: All 9 letters + introduction + epilogue in MDX format, with exported metadata blocks
- Features: 9 letters complete and polished, frame narrative
- Pitfalls to watch: Voice drift (#1), AI slop tells (#2), Narrative tension (#7), "Wise but boring" trap
- Agent pipeline: Creative writer → Voice editor → Flow editor → Consistency checker → Copy editor, sequential per letter
- Research flag: The consistency checker needs the story bible as a running document updated after each letter. Do not run letters in parallel.

Step 1.3 — Art Direction and Image Generation
- Deliverable: 9 approved AI artwork pieces in `/public/art/`, plus a style consistency document used across all prompts
- Features: Sacred art for each letter
- Pitfalls to watch: Inconsistent AI art style across sessions (#image section), image weight (source at 1600-2000px, ~85% JPEG quality)
- Actor: Art direction agent produces prompts; Noah curates and approves
- Research flag: Batch-compare all 9 images side-by-side before approving to catch palette drift.

---

**Goal 2: Technical Foundation**
*The minimum shell before any letter goes on screen.*

Step 2.1 — Project Setup and Theme
- Deliverable: Next.js 16 project with Tailwind CSS 4 `@theme` configured (colors, fonts), `next/font/google` loading EB Garamond and Cormorant, dark-only mode (`class="dark"` on `<html>`), `@next/mdx` configured, `mdx-components.tsx` present
- Features: Dark atmospheric design
- Pitfalls to watch: Pure white text drift (#4) — lock cream text as base color in `@theme` now; `output: 'export'` mistake — do not add this; `mdxRs: true` — do not enable
- Research flag: Standard setup; well-documented patterns. Skip extra research.

Step 2.2 — Component Architecture
- Deliverable: `Letter.tsx`, `LetterArt.tsx`, `AnimatedSection.tsx`, `ChapterNav.tsx`, `ScrollProgress.tsx`, `FrameNarrative.tsx` all scaffolded with correct Client/Server boundaries; `IntersectionObserver` for active chapter tracking
- Features: Floating dot chapter navigation, scroll-triggered reveals, reading progress bar
- Pitfalls to watch: Too many `motion` wrappers (#Framer Motion bundle); `whileInView` without `once: true` (#8); `layout` prop on scroll elements; scroll event listeners instead of IntersectionObserver
- Research flag: Follow ARCHITECTURE.md component interfaces closely. The Client/Server boundary is the critical decision — animate wrappers are Client Components, letter content is Server Components.

---

**Goal 3: Content Integration and Polish**
*Assembling content + code into a finished experience.*

Step 3.1 — Letter Integration
- Deliverable: All letters, artwork, and frame narrative integrated into `app/page.tsx`; each letter section has hash anchor; `next/image` static imports with `priority` on first image only
- Features: All must-haves from Feature Priority Matrix
- Pitfalls to watch: CLS from image dimensions (#6); image weight (#3); `sizes` prop missing; `priority` on wrong images
- Research flag: Verify `blurDataURL` generation is working (check Network tab — first paint should show blurred placeholder).

Step 3.2 — Accessibility and Motion Safety
- Deliverable: `prefers-reduced-motion` implemented (decorative animations disabled); WCAG 2.1 AA contrast verified (cream text on charcoal, not pure white); semantic HTML landmarks in place; focus indicators on dot nav; alt text on all artwork
- Features: WCAG 2.1 AA, `prefers-reduced-motion`, semantic HTML, accessible text contrast
- Pitfalls to watch: Pure white text drift (#4); ambient effects on mobile (#5); contrast "technically passes but uncomfortable" (halation from white text)
- Research flag: Test on actual Windows hardware with dark mode. EB Garamond at 18px body minimum.

Step 3.3 — Performance Tuning and OG Image
- Deliverable: Lighthouse ≥ 90 mobile (LCP < 2.5s, CLS < 0.1, INP < 200ms); OG image (static `opengraph-image.png` 1200x630) in `/app/`; hash anchors shareable; Vercel Analytics connected (no cookies)
- Features: OG image + Twitter card, hash anchors per letter, fast initial load
- Pitfalls to watch: Animation count on mobile (#animation pitfalls); ambient effects on mobile (#5); total page weight
- Research flag: Run Lighthouse on mobile emulation before considering done. Test scroll feel on a mid-range Android device if possible.

Step 3.4 — Nice-to-Haves (if time allows)
- Deliverable: Post-Letter-9 hidden coda; alt text easter eggs; page title scroll updates; ambient CSS grain (SVG filter, not canvas)
- Features: Nice-to-have features from Feature Priority Matrix
- Pitfalls to watch: CSS grain repaint cost; `document.title` updates in a Client Component
- Research flag: Defer all of these until Steps 3.1-3.3 are green on mobile Lighthouse.

---

### Steps requiring deeper investigation during planning

| Step | Needs Investigation | Reason |
|------|-------------------|--------|
| 1.1 Voice document | Noah should define Nando's voice parameters directly | AI agents cannot invent the voice — the voice is specific to Noah's creative vision |
| 1.2 Letter writing | First letter should be reviewed by Noah before pipeline runs letters 2-9 | Early voice calibration prevents rework across all 9 |
| 3.2 Font cross-platform | Needs visual testing on Windows dark mode | Cormorant Garamond dark-bg rendering on Windows is a known pitfall with no code workaround |

### Steps with well-documented patterns (standard approach)

| Step | Pattern | Source |
|------|---------|--------|
| 2.1 `@next/mdx` setup | Official Next.js 16 docs | STACK.md and ARCHITECTURE.md both provide exact configuration |
| 2.1 Tailwind dark-only | `@theme` + `class="dark"` on `<html>` | STACK.md provides exact CSS pattern |
| 2.2 `AnimatedSection` | `motion.div` + `whileInView` + `once: true` | ARCHITECTURE.md provides exact component code |
| 3.1 `next/image` static imports | Static import path for auto-`blurDataURL` | ARCHITECTURE.md image asset pipeline section |
| 3.3 OG image | `opengraph-image.png` file convention | FEATURES.md verified against Next.js 16 docs |

---

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| STACK.md | HIGH | All primary technologies verified against official docs at Next.js 16.2.1, Tailwind 4.2, MDX. Serif font recommendation is MEDIUM (requires visual testing). |
| FEATURES.md | HIGH | Feature priority matrix well-grounded; OG spec and WCAG verified against official sources. AI editorial pipeline best practices are MEDIUM (emerging). |
| ARCHITECTURE.md | HIGH | Verified against Next.js 16 and MDX official docs. Component patterns are well-established. Content pipeline phases are grounded in the project's vision. |
| PITFALLS.md | HIGH | Top pitfalls verified against official Next.js docs (image, MDX), web.dev (CLS, motion), and well-documented typography practices. AI writing pitfalls based on training data. |

**Gaps that need attention:**

1. **Nando's voice** — No voice document exists yet. This is the single highest-risk gap. The entire content quality depends on it being created before any letter drafting begins.

2. **Artwork style guide** — No visual consistency document for art direction exists. Required before image generation to prevent palette and style drift across 9 pieces.

3. **Font final decision** — EB Garamond is recommended but the vision lists it as an open question. Requires visual testing at 18px on dark background on Windows and iOS before final commitment.

4. **Letter arc detail** — The story premise is established but the beat-by-beat arc for all 9 letters has not been specified. This must exist before writing begins or narrative tension (pitfall #7) is likely.

---

## Sources Cross-Reference

| Finding | Source 1 | Source 2 | Synthesis |
|---------|---------|---------|-----------|
| Content before code | FEATURES.md (Content-Before-Code principle) | ARCHITECTURE.md (Phase 1-5 pipeline) | Unified: content and art must exist before site is built |
| `@next/mdx` over alternatives | STACK.md (recommended, official, RSC-native) | PITFALLS.md (YAML frontmatter fails silently) | Use MDX export syntax, not YAML; `@next/mdx` only |
| EB Garamond over Cormorant for body | STACK.md (variable font, dark-bg readable) | PITFALLS.md (Cormorant thin on Windows dark mode) | EB Garamond confirmed for body; Cormorant display only |
| `once: true` on `whileInView` | ARCHITECTURE.md (performance budget section) | PITFALLS.md (explicit pitfall — omitting `once: true`) | Project-wide default; build into `AnimatedSection` |
| Cream text, not white | STACK.md (`oklch(0.93 0.025 85)` for cream) | PITFALLS.md (halation from pure white on dark) | Lock cream in `@theme`; never allow `text-white` for body |
| Static imports for images | ARCHITECTURE.md (auto-dimensions, auto-blur) | PITFALLS.md (CLS without reserved dimensions) | Static imports are mandatory, not optional |
| IntersectionObserver for chapter tracking | ARCHITECTURE.md (more performant than scroll events) | PITFALLS.md (memory leaks from scroll handlers) | No raw scroll listeners for chapter tracking |
| No canvas particles | STACK.md (CSS grain via SVG filter is zero-cost) | PITFALLS.md (canvas particles don't pause off-screen) | CSS-only ambient effects; canvas is explicitly out |
| Dot nav needs tooltip/label | FEATURES.md (tooltip on hover/focus with letter title) | ARCHITECTURE.md (add `aria-label` to `<ChapterNav>`) | Dot-only nav fails accessibility without visible labels |
