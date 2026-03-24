# Pitfalls Research

**Project:** I Swear to Dog
**Domain:** Pitfalls — common mistakes, things harder than they look, what causes rewrites
**Confidence:** HIGH (verified against official docs and authoritative UX/performance sources)

---

## 1. AI Creative Writing Pitfalls

### Voice Drift Across 9 Letters (HIGH confidence)

The single biggest risk in AI-generated long-form fiction is voice inconsistency. When each letter is generated in separate sessions, the model's interpretation of "Nando's voice" drifts. Letter 1 might lean sardonic, Letter 5 contemplative, Letter 8 overly formal. Readers feel this even when they cannot name it.

**What causes it:** AI systems are stateless across sessions. Without explicit anchoring artifacts (voice reference document, example passages, banned phrases, approved cadence patterns), every generation starts fresh.

**The fix:** Build a canonical voice document before writing starts. Include: sentence length range, Nando's verbal tics, topics he finds amusing vs. grave, how he refers to humans, his relationship with irony. Feed this document to every writing session as context. The voice editor role in the pipeline is not optional — it is the primary defense against drift.

### AI "Slop" Tells That Break Immersion (HIGH confidence)

AI-generated literary prose has recognizable tells that trained readers spot immediately, killing the sense of a real authored voice:

- **Filler transitions:** "Moreover," "Furthermore," "It is worth noting that," "In essence"
- **Hedging:** "One might argue," "In many ways," "To some extent"
- **Inflation vocabulary:** "tapestry," "intricate," "multifaceted," "nuanced," "profound," "timeless"
- **Sycophantic conclusions:** Every letter ending on a note of "and thus we see the beautiful truth"
- **Over-explanation:** Restating the joke after landing it; explaining the satire instead of trusting the reader

**The fix:** The copy editor and voice editor agents must have explicit checklists of forbidden phrases. The consistency checker should flag any of these. Final review by Noah should specifically hunt for "slop tells" before content is locked.

### Loss of Narrative Tension Across the Arc (MEDIUM confidence)

Nine letters is a long form. AI-generated content tends toward:

- Consistent intensity rather than rising/falling tension
- Repeating the same tonal register (always wry, always wise) without modulation
- Front-loading reveals rather than parceling them across the arc
- Letters that read as independent essays rather than chapters in a building story

The Screwtape Letters works because the tension escalates and Screwtape's certainty eventually cracks. Each letter needs a distinct purpose in the arc — Nando cannot just dispense wisdom uniformly across all nine.

**The fix:** The outline agent must define what each letter ADDS to the story that the previous letter did not. Emotional arc, reveals, and escalation should be specified before writing begins. This is harder to retrofit than to plan.

### The "Wise But Boring" Trap (MEDIUM confidence)

The Gandalf-in-a-five-pound-dog premise is funny on paper, but if every letter is Nando solemnly dispensing ancient canine wisdom, the humor evaporates by Letter 3. The contrast between the physical reality of Nando (shy, trembling Maltese) and his voice (ancient sage) is the joke — but the joke only works if the letters occasionally acknowledge the absurdity or let the human situation puncture the solemnity.

**The fix:** At least some letters should have moments where Nando's physical reality intrudes. Brief, played completely straight. The humor comes from the gap between the gravitas of his words and the reality of what he is.

---

## 2. Long-Form Scroll Performance Pitfalls

### Too Many Simultaneous Animated Elements (HIGH confidence)

Single-page long-scroll sites frequently accumulate dozens of scroll-triggered animation observers. Each `IntersectionObserver` or Framer Motion `whileInView` element adds overhead. At 9 letters, with artwork, pull quotes, and decorative elements each having entrance animations, the total can easily reach 60-80 animated nodes.

**The symptom:** Smooth scrolling on desktop, significant jank on mid-range Android phones. The first few sections feel polished, the middle sections feel sluggish.

**The fix:** Batch animations by section, not by element. Animate the section container entering, not every paragraph. Limit simultaneous scroll observers. Use `once: true` on all whileInView animations — re-triggering on scroll-up adds zero value and doubles the work.

### Layout Thrashing from Scroll Triggers (HIGH confidence)

Scroll-linked animations that read scroll position and write to DOM properties (position, size, opacity via JS) can cause layout thrashing — the browser forced to calculate layout mid-frame because reads and writes are interleaved.

**Official guidance (web.dev):** Restrict animations to `transform` and `opacity`. These run on the compositor thread and never trigger layout recalculation. Animating `top`, `left`, `width`, `height`, or anything that affects layout via scroll will cause frame drops on every scroll event.

**Framer Motion pitfall:** `useScroll` with complex `useTransform` chains that output layout-affecting properties. The value-transformation pipeline is executed on every scroll event. If the output property triggers layout, performance degrades with scroll depth.

### Mobile Ambient Effects: The "Works on My MacBook Pro" Problem (HIGH confidence)

Particle effects, animated grain/noise overlays, CSS blur filters, and fog effects are the most common culprits for mobile performance failure. These effects that render smoothly on a high-end desktop can drop a mid-range mobile to 15fps.

**Specific risks for this project:**
- CSS `backdrop-filter: blur()` is GPU-intensive and slower on mobile
- `canvas`-based particle effects do not automatically pause when off-screen
- Animated noise/grain textures using CSS animation on `::after` pseudo-elements repaint constantly
- Multiple overlapping `mix-blend-mode` layers compound performance costs

**The fix:** Feature-detect via `window.matchMedia('(prefers-reduced-motion)')` and degrade ambient effects. Use `navigator.hardwareConcurrency` or battery API as proxies for device capability. All ambient effects should be desktop-only by default with explicit opt-in consideration for mobile.

### Memory Leaks from Scroll Handlers Not Cleaned Up (MEDIUM confidence)

React effects that attach scroll listeners and do not return cleanup functions accumulate across the lifecycle of the page. On a single-page immersive experience where the user never navigates away, these listeners stack.

**The fix:** Every `useEffect` attaching a scroll listener must return `() => window.removeEventListener(...)`. Framer Motion's hooks handle this internally, but any custom scroll logic does not.

---

## 3. Dark Theme Typography Pitfalls

### Serif Font Rendering on Dark Backgrounds Varies Significantly by OS (HIGH confidence)

Serif fonts at reading sizes on dark backgrounds exhibit different rendering behavior across platforms:

- **macOS:** Sub-pixel antialiasing is off by default since Mojave. Serifs render thinner than expected. Fonts that look sharp at 18px on white can look wiry and hard to read at 18px on charcoal.
- **Windows:** ClearType rendering makes serifs appear heavier and sometimes blurry, especially at 16-18px.
- **iOS:** Extremely good rendering, but aggressive font smoothing means thin serif strokes disappear at small sizes.
- **Android:** Highly variable. OLED screens with true black backgrounds exacerbate halos around thin serif strokes.

**The fix for this project:** The open question about font choice (Playfair Display vs Cormorant Garamond vs EB Garamond vs Lora) must be resolved through cross-platform visual testing, not just design tool preview. Cormorant Garamond is beautiful but extremely thin — it reads poorly on Windows dark backgrounds at body size. Lora is more robust. Playfair Display holds up better on dark backgrounds due to its higher stroke contrast being legible even with rendering variations.

**Minimum body size:** 18px for body text on dark backgrounds. 16px is the standard recommendation for light backgrounds, but dark background rendering demands larger sizes to compensate for perceived thinness.

### "Technically Passes, Actually Uncomfortable" Contrast (HIGH confidence)

WCAG AA requires 4.5:1 contrast for normal text. Pure white (#FFFFFF) on a dark charcoal (#1a1a1a) achieves roughly 17:1 — far above threshold. This is the pitfall, not the solution.

**The problem:** Extremely high contrast (pure white on near-black) causes halation — the white text appears to bleed or glow against the dark background, creating eye strain during extended reading. This is well-documented for long-form reading contexts (novels, essays, documentation sites).

**What works:** Off-white text on dark backgrounds. The I Swear to Dog spec (warm cream text on charcoal) is already correct. The pitfall is drift during implementation: if a developer defaults to `text-white` (pure white) on any text elements for convenience, it breaks the intended atmosphere and readability.

**Target values:** Cream text around `#F5F0E8` or similar on charcoal around `#1C1A16` gives approximately 12:1 — high enough for compliance, low enough to avoid halation. Pure white (#FFF) should be avoided for body text.

### Line Length Ignored on Wide Screens (MEDIUM confidence)

Long-form reading research consistently shows optimal line length is 60-80 characters (roughly 45-75 words). On widescreen monitors, unconstrained content width results in 120+ character lines that force excessive horizontal eye movement and degrade reading comprehension.

**Common mistake:** Setting `max-width: 100%` or using full-container widths on prose content because it "fills the space nicely" on wide monitors.

**The fix:** Content columns should be hard-constrained. `max-width: 65ch` or `max-width: 680px` on prose sections. This is especially critical for a site meant to be read in one sitting — reader fatigue from long line lengths is cumulative.

---

## 4. MDX and Content Pipeline Pitfalls

### Frontmatter Not Supported by Default (HIGH confidence)

`@next/mdx` does not support YAML frontmatter out of the box. Developers frequently add frontmatter to MDX files and wonder why it silently fails or appears as rendered text.

**The fix:** Either use exports within MDX files (`export const metadata = { ... }`) which `@next/mdx` supports natively, or add `remark-frontmatter` and `remark-mdx-frontmatter` plugins. For this project (9 static letters, no CMS), exported metadata is the simpler path.

### Turbopack Incompatibility with Plugin Functions (HIGH confidence — from official Next.js docs)

When using Turbopack (enabled by default in Next.js 15+ dev mode), remark/rehype plugins that accept function options cannot be passed. Only serializable (string-configurable) plugins work. This means the dev build may behave differently from the production build if plugins are configured with function options.

**The fix:** Use string-based plugin configuration when possible, or avoid relying on remark/rehype plugins with non-serializable options in the Turbopack dev environment.

### Large MDX Files Slow TypeScript Compilation (MEDIUM confidence)

Each MDX file is compiled as a TypeScript/JavaScript module. Very large MDX files (multi-thousand-word letters with embedded components) increase TypeScript compilation time and hot-reload latency. For 9 long-form letters, this is a real concern in development.

**The fix:** Keep MDX files as pure content (prose + minimal component use). Do not embed complex React logic in MDX. Move any interactive or animated components to separate `.tsx` imports that are called from MDX. This keeps MDX files lean and compilation fast.

### The Rust MDX Compiler Is Experimental (HIGH confidence — from official docs)

The experimental `mdxRs: true` option in Next.js config uses a Rust-based compiler that is explicitly marked "not recommended for production use." Using it introduces instability risk.

**The fix:** Do not enable `mdxRs`. Use the standard JavaScript-based MDX pipeline.

---

## 5. Framer Motion Performance Pitfalls

### `whileInView` on Every Element Without `once: true` (HIGH confidence)

The default behavior of `whileInView` re-triggers the animation every time the element scrolls into view — including on scroll-up. For a long-scroll story site, this means every letter section re-animates as the user scrolls back up. This creates visual noise and doubles animation work.

**The fix:** Always use `viewport={{ once: true }}` on entrance animations. Set this as a project-wide default in a shared animation config.

### Too Many `motion` Components Increases Bundle Size and Hydration Cost (MEDIUM confidence)

Every element wrapped in `motion.div`, `motion.p`, etc. adds component overhead. A page with 200+ motion-wrapped elements has measurable hydration cost on initial load. This is particularly impactful on mobile first paint.

**The fix:** Be selective. Use `motion` wrappers on section containers and key visual elements — not on every paragraph, every word, every decorative element. Decorative animations (grain, ambient effects) should use CSS animations, not Framer Motion.

### Layout Animations on Scroll Cause Reflow (HIGH confidence)

Framer Motion's `layout` prop enables automatic layout animations. Using `layout` on elements that change during scroll causes the browser to recalculate layout on every scroll frame — the exact behavior that web.dev performance guidance says to avoid.

**The fix:** Never use `layout` prop on elements that are scroll-linked or that change during scroll. Reserve `layout` for explicit user interaction responses (click, toggle, expand).

---

## 6. Image-Heavy Site Pitfalls

### CLS from AI Art Images Without Dimensions (HIGH confidence)

Images without explicit `width` and `height` attributes (or without a reserved aspect-ratio container) cause Cumulative Layout Shift when they load. For AI-generated artwork at the start of each letter section, this means sections visually jump as the user loads the page, directly hurting Lighthouse CLS scores.

**Next.js mitigation:** Locally imported images get dimensions automatically. Dynamically sized images using `fill` require a positioned parent container with explicit dimensions. Neither path works correctly unless dimensions are provided.

**The fix:** For AI artwork, import images as static assets to get automatic dimension detection, or define a fixed aspect ratio container (e.g., 4:3, 16:9, or a consistent portrait ratio) for every letter image that reserves the space before the image loads.

### Total Page Weight from 9 Full-Size AI Images (HIGH confidence)

A single high-quality AI-generated image from Replicate is typically 1-4MB as a PNG. Nine such images, unoptimized, creates a 9-36MB initial page weight. This destroys performance scores and first load experience on slow connections.

**Next.js `<Image>` handles this** but only when used correctly:
- Must specify `sizes` prop correctly to get responsive images
- `quality` prop defaults to 75, which is usually sufficient
- WebP/AVIF conversion happens automatically on Vercel

**Remaining risk:** Large above-the-fold hero images should use `priority` prop to avoid lazy loading for the first image. All remaining images should stay lazy. Blur placeholders (`placeholder="blur"`) with a provided `blurDataURL` dramatically improve perceived performance.

### Inconsistent AI Art Style Across Generation Sessions (MEDIUM confidence)

AI image generation is non-deterministic. Running the same prompt twice produces different results. Across 9 letters, even with careful prompt engineering, stylistic drift is common:

- Color palette shifts (Letter 2 has warm golden tones, Letter 7 looks cool blue)
- Composition changes (Letter 3 uses centered symmetry, Letter 6 uses diagonal composition)
- "Dog divinity" rendered inconsistently (Nando depicted with different fur color/style)
- Art style contamination between periods (Renaissance bleeds into Baroque, illuminated manuscript style inconsistent)

**The fix:** The artwork direction agent must produce a style consistency document that travels with every image prompt. This should include: exact color palette hex values, composition rules, character description (Nando's fur, size), and negative prompts to exclude unwanted styles. Noah's curation step should batch-compare images side by side before approving.

---

## 7. Storytelling UX Pitfalls

### Readers Losing Their Place in Long Scrolls (HIGH confidence)

On a single-page scroll with 9 letters, readers scroll past 10,000+ words. If they set the page down and return, or if the page refreshes, they lose their place with no recovery mechanism. This is especially damaging for the intended "read in one sitting" experience — if interrupted, users may not return.

**Common mistake:** Assuming users will read without interruption because the vision calls for it. Real reading behavior includes pauses, tab switching, phone calls, and refreshes.

**The fix:** The dot navigation (floating chapter indicator) partially addresses this. Browser scroll position is preserved on back navigation. `sessionStorage`-based scroll restoration can save position across page focuses. The reading progress indicator (nice-to-have) also helps users know where they are.

### Scroll Fatigue from Continuous Density (MEDIUM confidence)

Long-form narrative sites often fail not from bad writing but from unrelenting density. When every section feels equally weighty, equally dark, equally serious, readers experience cognitive fatigue. The brain cannot sustain the same level of engagement for 9 letters without rhythmic relief.

**The fix:** Visual pacing — deliberate white space, chapter breathers between letters, moments of visual simplicity amid the atmospheric complexity. The art can carry sections that need the reader to pause. Not every section needs cinematic animation. Restraint in some sections makes the climactic moments (Letter 9 twist) land harder.

### Navigation That Gets in the Way (MEDIUM confidence)

Floating navigation elements (dot indicators, progress bars) that are too large or positioned over content become distracting during reading. On mobile, a prominent progress indicator competes with the text for attention.

**The fix:** Navigation elements should be subtle by default and only become prominent on hover/tap. On mobile, dots should be small and positioned to avoid the reading area. The progress indicator should be a thin bar at the top (out of reading flow) rather than a large overlay.

---

## 8. Religious Satire Tone Pitfalls

### Crossing from Playful to Offensive (MEDIUM confidence)

The project's satirical framing — dogs as divine creators of humanity — invites comparison to religious creation myths. The Screwtape Letters walked a careful line between mocking spiritual corruption and genuine theological engagement. Terry Pratchett's work similarly skewered religion while maintaining evident affection for the subject.

**Where similar projects have failed:**
- Treating the source mythology (Christianity, Indigenous creation stories, Hindu cosmology) with contempt rather than playful subversion
- Directing the satire at believers rather than at the structures of belief
- Mockery that reads as mean rather than absurdist

**This project's natural protection:** The joke is fundamentally benign. The premise (dogs are the real intelligence, humans are the creation) is absurdist rather than blasphemous. Nando's voice should remain one of genuine affection for humans, not contempt. The simulation hypothesis ending elevates the whole to philosophy, not mockery.

**The risk zone:** If any letter dwells on human religious behavior in a way that sounds derisive toward actual believers rather than the premise, it crosses a line. The target of the satire should always be the cosmic joke (every creator is also a creation) — not human religious practice.

### The "Too Clever" Pitfall (LOW confidence — informed judgment)

Philosophical satire can become so densely self-referential that the humor evaporates. The simulation hypothesis twist needs to land as genuine wonder, not as a clever-clever puzzle for readers who "get it." If Letter 9 feels like it rewards only readers who already knew the simulation hypothesis, it will feel exclusive rather than illuminating.

**The fix:** The twist should be accessible to readers who have never heard of simulation theory. The narrative groundwork should make the revelation feel inevitable in retrospect, not like a genre-savvy Easter egg.

---

## Summary: The Highest-Risk Pitfalls for This Project

| Pitfall | Risk Level | Most Likely Impact |
|---------|------------|--------------------|
| Voice drift across 9 AI-generated letters | CRITICAL | Destroys immersion; reader notices the seams |
| AI slop tells in prose | CRITICAL | Breaks the "authored work" illusion |
| Pure white text instead of cream | HIGH | Eye strain destroys the reading experience |
| Unoptimized AI images (9 x 2-4MB) | HIGH | Poor Lighthouse scores; slow mobile load |
| Ambient effects running on mobile | HIGH | Jank makes the site feel broken |
| CLS from images without reserved dimensions | HIGH | Layout jumping on load hurts perceived quality |
| Narrative tension flat across 9 letters | HIGH | Reader disengages before Letter 9 twist |
| whileInView without `once: true` | MEDIUM | Visual noise on scroll-up |
| Serif font rendering on Windows dark mode | MEDIUM | Readability degraded on ~40% of desktop users |
| Line length unconstrained on wide screens | MEDIUM | Reading fatigue on desktop |

---

## Sources

- Next.js Image Optimization docs (verified March 2026, version 16.2.1)
- Next.js MDX configuration docs (verified March 2026, version 16.2.1)
- web.dev CSS Animations Guide (verified current)
- web.dev CLS documentation (verified current)
- web.dev Color and Contrast Accessibility (verified current)
- Training data (HIGH confidence for typography, Framer Motion, and AI writing patterns)
