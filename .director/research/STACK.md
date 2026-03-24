# Stack Research

**Project:** I Swear to Dog
**Domain:** stack
**Researched:** 2026-03-24

---

## Summary Recommendation

The vision specifies the stack clearly: Next.js 16 (App Router, SSG), TypeScript, Tailwind CSS 4, Framer Motion, local MDX files, next/image, Geist fonts + a serif display font, Vercel. This research validates those choices, resolves open questions (serif font, MDX loading approach), and identifies the optimal configuration patterns for a dark, atmospheric, content-heavy single-page scroll site.

**Recommended approach:** Use `@next/mdx` (the official Next.js MDX plugin) for local MDX files — not next-mdx-remote. MDX files live in the repo, are imported directly, and render as React Server Components at build time. No runtime serialization needed.

---

## Framework

**Next.js 16.2.1** (current as of March 2026) — App Router, SSG, TypeScript.

**Confidence:** HIGH (verified against official Next.js docs, version 16.2.1 confirmed)

### SSG for single-page scroll sites

For a fully static single-page site, the App Router with static generation is the right call. All content is known at build time, no dynamic data fetching needed. Key patterns:

- Pages without dynamic APIs (no `cookies()`, `headers()`, `searchParams`) prerender automatically as static HTML
- The new `use cache` directive and Partial Prerendering (PPR) are available but not needed for this site — pure static is simpler
- `generateStaticParams` is available but not needed for a single-page site
- `export const dynamic = 'force-static'` can be set explicitly if needed, but static is the default when no dynamic APIs are used

**For this project:** A single `app/page.tsx` that imports MDX content and renders everything in sequence will fully prerender to static HTML at `next build`. This is the simplest and most performant approach.

### Hosting

Vercel free tier with global CDN. Static HTML + Edge CDN = near-instant loads worldwide. No serverless functions needed for this project.

---

## Content: MDX Loading

**Recommendation: `@next/mdx` (official Next.js plugin)**

**Confidence:** HIGH (verified against official Next.js 16.2.1 documentation)

### Options compared

| Option | Status | App Router | Use case |
|--------|--------|-----------|----------|
| `@next/mdx` | Active, official | Yes (Server Components) | Local MDX files — best fit |
| `next-mdx-remote` | Archived, unsupported | Pages Router focused | Remote/CMS MDX — not needed here |
| `next-mdx-remote-client` | Active, community | Yes (RSC subpath) | Remote MDX alternative if needed |
| Contentlayer | Deprecated | N/A | Do not use |

### Why `@next/mdx` is correct for this project

- MDX files live in the repo — no remote fetching needed
- Files are imported directly: `import Letter1 from '@/content/letter-01.mdx'`
- Renders as React Server Components at build time — zero client JS for content
- Custom component mapping via `mdx-components.tsx` for typography styling
- Frontmatter via `export const metadata = {}` inside MDX, or via `remark-frontmatter` plugin
- Remark/rehype plugin ecosystem available for typography enhancements

### Setup pattern

```js
// next.config.mjs
import createMDX from '@next/mdx'

const withMDX = createMDX({
  options: {
    remarkPlugins: ['remark-gfm'],
    rehypePlugins: [],
  },
})

export default withMDX({
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
})
```

```tsx
// mdx-components.tsx — required for App Router
import type { MDXComponents } from 'mdx/types'

const components: MDXComponents = {
  // Map h1, h2, p, blockquote to custom styled components
  // This is where Cormorant/EB Garamond typography classes get applied
}

export function useMDXComponents(): MDXComponents {
  return components
}
```

### Typography plugin

`@tailwindcss/typography` (the `prose` plugin) pairs well with `@next/mdx`. It applies readable typographic styles to MDX-rendered HTML. For dark atmospheric design, use `prose-invert` modifier and override specific prose tokens via `@theme` in CSS.

---

## Animations: Framer Motion / Motion

**Recommendation: Motion (formerly Framer Motion), latest version**

**Confidence:** HIGH (library is actively maintained; Framer Motion has rebranded to Motion at motion.dev)

**Note:** The library has rebranded from `framer-motion` to `motion`. The npm package `framer-motion` still works and is the same library, but new documentation is at `motion.dev`. Both `framer-motion` and `motion` packages can be used.

### Key APIs for scroll-triggered storytelling

**`whileInView`** — Simplest approach for scroll-triggered entrance animations. Fires when the element enters the viewport. Best for "fade in on scroll" per-letter reveals.

```tsx
<motion.div
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-100px" }}
  transition={{ duration: 0.8, ease: "easeOut" }}
>
  {/* Letter content */}
</motion.div>
```

**`useScroll` + `useTransform`** — Scroll-linked animations. The scroll position drives a CSS value in real time. Best for parallax effects on artwork, reading progress indicators, and ambient background shifts.

```tsx
const { scrollYProgress } = useScroll()
const opacity = useTransform(scrollYProgress, [0, 0.1], [1, 0])
```

**`AnimatePresence`** — For elements that mount/unmount, like a chapter navigation that fades in after scrolling past the intro.

### Patterns for cinematic scroll sites

1. **Per-letter entrance:** `whileInView` with `once: true` — each letter fades/slides in when it enters the viewport. This is the workhorse for this project.
2. **Artwork parallax:** `useScroll` scoped to a container element (`ref`) + `useTransform` to shift the image slightly slower than scroll speed.
3. **Reading progress dot nav:** `useScroll` on the page + `useTransform` to calculate which letter section is active.
4. **Ambient background shifts:** `useScroll` + `useTransform` on background color or gradient opacity — subtle warmth shift as the story progresses.

### Performance note

Motion uses the Web Animations API and CSS transforms, which run on the compositor thread. Animations targeting `opacity`, `transform`, and `filter` are GPU-accelerated and safe for 60fps on mobile. Avoid animating `height`, `width`, or layout properties.

---

## Styling: Tailwind CSS 4

**Version:** 4.2 (current as of March 2026)

**Confidence:** HIGH (verified against official Tailwind docs)

### Key changes from Tailwind 3

Tailwind CSS 4 moves theme configuration from `tailwind.config.js` to CSS-native `@theme` directive. No JavaScript config file needed.

```css
/* app/globals.css */
@import "tailwindcss";

@theme {
  /* Custom color palette */
  --color-charcoal-950: oklch(0.12 0.01 250);
  --color-charcoal-900: oklch(0.16 0.01 250);
  --color-cream: oklch(0.93 0.025 85);
  --color-gold: oklch(0.78 0.12 75);

  /* Serif font for narrative */
  --font-serif: "EB Garamond", Georgia, serif;

  /* UI font */
  --font-sans: "Geist", system-ui, sans-serif;
}

/* Force dark mode always (no toggle) */
@custom-variant dark (&:where(.dark, .dark *));
```

Then add `class="dark"` to `<html>` element permanently. No JavaScript toggle needed.

### Dark-only theme pattern

For this project (dark mode only, no toggle), the recommended approach:

1. Add `@custom-variant dark (&:where(.dark, .dark *))` to CSS
2. Add `class="dark"` to `<html>` in `app/layout.tsx`
3. Define all colors as dark-mode values directly (no need for `dark:` variants everywhere)
4. Alternatively, define all base theme colors as the dark values directly in `@theme` — no `dark:` prefix needed at all

The simplest approach for dark-only: skip the `dark:` variants entirely. Just define dark-background colors as the base theme values.

---

## Typography: Serif Font Selection

**Recommendation: EB Garamond (primary) with Cormorant Garamond as fallback consideration**

**Confidence:** MEDIUM (comparative analysis based on typography best practices; visual testing still needed per the vision's open question)

### Candidates evaluated

| Font | Character | Weights | Dark BG readability | Notes |
|------|-----------|---------|---------------------|-------|
| **EB Garamond** | Classical, scholarly, old-world | 400–800 + italics, variable font | Excellent | Renaissance-accurate letterforms. The most authentic "ancient text" feel. Variable font = performance win. |
| **Cormorant Garamond** | Elegant, high-contrast, delicate | 300–700, italic, variable | Good at large sizes, risky at small | Very high stroke contrast. Stunning for headers, potentially hard at body size on dark backgrounds. |
| **Playfair Display** | Editorial, bold, high-contrast | 400–900, variable | Good at display sizes | Better for headers/drop caps than body text. Feels modern-editorial, less ancient. |
| **Lora** | Warm, readable, medium contrast | 400–700, variable | Excellent | Most readable at body text sizes. Less "sacred" feel, more contemporary. |

### Recommendation

**EB Garamond** for body text (letters, narrative prose). It is a variable font (single file covering all weights/styles), has authentic Garamond letterforms, and renders with enough weight at reading sizes on dark backgrounds.

**Cormorant Garamond** for display/headers (letter titles, drop caps) if high contrast styling is desired. Its elegance at large sizes suits the mythological artwork context.

**Geist Sans** (already in vision) for UI elements — navigation dots, metadata, code elements.

### Loading via next/font

```tsx
// app/layout.tsx
import { EB_Garamond, Cormorant_Garamond } from 'next/font/google'

const ebGaramond = EB_Garamond({
  subsets: ['latin'],
  variable: '--font-eb-garamond',
  display: 'swap',
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})
```

`next/font` self-hosts Google Fonts — no external requests at runtime, no CORS issues, no layout shift.

### Typography scale for dark backgrounds

Long-form reading on dark backgrounds benefits from:
- Slightly larger base font size (18–20px body, not 16px)
- Generous line height (1.7–1.85 for body prose)
- Warm cream text (`oklch(0.93 0.025 85)` range) rather than pure white — reduces eye strain
- Letter spacing slightly increased for lighter font weights

---

## Images: next/image

**Confidence:** HIGH (verified against official Next.js 16.2.1 documentation)

### Strategy for art-heavy single-page sites

All 9 letter artwork images are local assets stored in `/public/art/`. Static imports give automatic width/height detection and `blurDataURL` generation.

```tsx
import Image from 'next/image'
import letter1Art from '/public/art/letter-01.jpg'

<Image
  src={letter1Art}
  alt="Sacred artwork for Letter I"
  placeholder="blur"    // Blur-up while loading
  priority={false}      // Only true for above-fold image
  sizes="(max-width: 768px) 100vw, 80vw"
  className="w-full h-auto"
/>
```

### Key optimizations

- **`placeholder="blur"`** — automatic with static imports. The blurred preview displays instantly while the full image loads.
- **`priority`** — Set `true` only for the first visible image (hero/intro artwork). All others load lazily.
- **`sizes`** prop — Critical for responsive art images. Tells the browser expected display size so it serves the right WebP variant.
- **WebP/AVIF** — `next/image` automatically serves modern formats on Vercel.
- **Lazy loading** — Native browser lazy loading is enabled by default. Images load as the user scrolls down — perfect for the sequential letter reveal pattern.

### Format recommendation

Store source images as high-quality JPEGs or PNGs. `next/image` converts to WebP/AVIF automatically on Vercel. For AI-generated sacred art at typical display widths (800–1200px), source files of 2000–2400px wide at ~85% JPEG quality give Vercel enough resolution to generate all responsive variants.

---

## Immersive Scroll Enhancement Libraries

**Confidence:** MEDIUM (training data + verification of primary libraries)

### Core libraries (recommended)

| Library | Purpose | Notes |
|---------|---------|-------|
| **Framer Motion / Motion** | All animations — scroll triggers, transitions, parallax | Already in vision. Use this for everything. |
| **`@tailwindcss/typography`** | Prose styling for MDX content | Essential. Handles all the complex long-form typography defaults. |
| **`next/font`** | Self-hosted font loading | Built into Next.js. Use for all fonts. |

### Additional libraries worth considering

**`react-intersection-observer`** — A lightweight wrapper around the Intersection Observer API. Useful if you need scroll-triggered state changes that aren't animation (e.g., updating the active chapter in the navigation dots). Framer Motion's `whileInView` handles most cases, but this is cleaner for non-animation state.

**`lenis`** (by Studio Freight, now maintained by darkroom.engineering) — Smooth scroll library. Adds momentum/easing to native scroll. Popular on cinematic portfolio sites. Integrates with Framer Motion via a shared scroll position. **Use with caution on mobile** — some users find smooth scroll disorienting, and it can conflict with accessibility preferences (`prefers-reduced-motion`). Optional/nice-to-have.

**`react-spring`** — Alternative to Framer Motion for physics-based animations. Not recommended here — Framer Motion is already chosen and the two conflict. Use one animation library, not both.

### Ambient effects

For the atmospheric grain/particle effects mentioned in the vision:

- **CSS grain texture** via SVG filter (`feTurbulence` + `feColorMatrix`) — zero JS, zero performance cost, native CSS. Best for subtle film grain overlay.
- **CSS `@keyframes` + Tailwind custom animations** — For slow gradient shifts, pulsing glows, floating particles.
- **Canvas-based particles** — Avoid unless Lighthouse performance budget allows. JS particles on mobile can hurt Core Web Vitals.

---

## Full Stack Summary

| Layer | Technology | Version | Status |
|-------|-----------|---------|--------|
| Framework | Next.js App Router | 16.2.1 | Confirmed active |
| Language | TypeScript | 5.x | Standard |
| Styling | Tailwind CSS 4 | 4.2 | Confirmed active |
| Animations | Framer Motion (Motion) | Latest | Confirmed active |
| Content | `@next/mdx` + local MDX files | Latest | Recommended over next-mdx-remote |
| Typography plugin | `@tailwindcss/typography` | Latest | Add to project |
| Body font | EB Garamond (variable) | Google Fonts | Recommended |
| Display font | Cormorant Garamond | Google Fonts | Optional (headers/drop caps) |
| UI font | Geist Sans + Geist Mono | Google Fonts / Vercel | Already in vision |
| Images | `next/image` | Built-in | Confirmed |
| Font loading | `next/font/google` | Built-in | Confirmed |
| Hosting | Vercel | Free tier | Confirmed |
| Analytics | Vercel Analytics | Optional | Privacy-friendly |
| Smooth scroll | Lenis | Optional | Nice-to-have, test mobile |

---

## Open Questions Resolved

| Question from Vision | Resolution |
|---------------------|-----------|
| Serif font choice | EB Garamond for body prose (variable font, authentic letterforms, dark bg readable). Cormorant Garamond optionally for display sizes. Visual test at 18–20px on dark background before final decision. |
| MDX approach | Use `@next/mdx`. next-mdx-remote is archived. Local MDX files with direct imports is correct for this project. |
| Tailwind CSS 4 config | `@theme` directive in CSS replaces `tailwind.config.js`. Dark-only mode: add `class="dark"` to `<html>` permanently. |
| Ambient effects | CSS grain via SVG filter is zero-cost. JS particles need mobile performance testing. Lenis smooth scroll is optional. |

---

## Sources

- Next.js 16.2.1 official documentation (nextjs.org/docs) — verified 2026-03-24
- Tailwind CSS 4.2 official documentation (tailwindcss.com/docs) — verified 2026-03-24
- next-mdx-remote-client GitHub (ipikuka/next-mdx-remote-client) — verified 2026-03-24
- next-mdx-remote GitHub (hashicorp/next-mdx-remote) — verified archived 2026-03-24
- Motion documentation (motion.dev) — reference confirmed active, API details from training data
- Typography best practices for dark background reading — training data (MEDIUM confidence)
