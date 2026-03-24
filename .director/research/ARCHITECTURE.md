# Architecture Research: I Swear to Dog

**Project type:** Static storytelling website — single-page immersive scroll with 9 letters, AI artwork, and cinematic pacing.
**Research date:** 2026-03-24
**Confidence:** HIGH (verified against Next.js 16 docs, MDX docs, motion.dev docs, web.dev performance guides)

---

## System Overview

This is a static site with no server-side logic at runtime. Everything is built at compile time and served as flat files from Vercel's global CDN. The architectural challenge is not complexity — it's performance under a heavy content and image load while preserving immersive scroll experience.

**Core constraint:** Single-page scroll. All 9 letters live on `/` as hash-anchored sections. No routing, no data fetching at runtime, no CMS calls.

---

## Next.js 16 App Router SSG Architecture

**Pattern:** Static export via App Router. The root `app/page.tsx` is a Server Component that imports all letter content at build time and renders the complete page as a single HTML document.

**Key configuration:**
- Set `output: 'export'` in `next.config.ts` for pure static files (HTML + assets, no Next.js server required at runtime)
- Alternatively, deploy normally to Vercel — App Router pages with no dynamic APIs are automatically statically rendered. This is the simpler option for Vercel hosting.
- Do NOT use `searchParams` in the page component — that forces dynamic rendering.

**SSG behavior:** When the page has no dynamic dependencies, Next.js pre-renders it at build time. On Vercel, this happens automatically. Pages are served from edge locations with ~0ms TTFB after cache warm.

**Recommended approach:** Deploy normally to Vercel (not `output: 'export'`). Let Next.js auto-detect the page as static. This preserves `next/image` optimization features which require the image API endpoint that `output: 'export'` removes.

---

## File Structure

Content-heavy Next.js sites work best with a clear separation between content, components, and utilities.

```
i-swear-to-dog/
├── app/
│   ├── layout.tsx          # Root layout: fonts, metadata, dark background
│   ├── page.tsx            # Single page: renders all letters in sequence
│   ├── globals.css         # Base styles, CSS variables for color palette
│   └── opengraph-image.tsx # OG image generation (optional, Vercel supports this)
├── content/
│   ├── letters/
│   │   ├── 00-introduction.mdx   # Noah's frame narrative / introduction
│   │   ├── 01-letter.mdx         # Letter 1 from Nando to Jarvis
│   │   ├── 02-letter.mdx
│   │   ├── ...
│   │   ├── 09-letter.mdx         # The twist letter
│   │   └── 10-epilogue.mdx       # Noah's epilogue
│   └── metadata.ts               # Typed letter registry (slug, title, artFile, order)
├── components/
│   ├── Letter.tsx                 # Single letter section: art + text
│   ├── LetterArt.tsx              # Image display with blur placeholder
│   ├── ChapterNav.tsx             # Floating dot navigation (9 dots)
│   ├── ScrollProgress.tsx         # Reading progress bar
│   ├── FrameNarrative.tsx         # Noah's intro/epilogue sections
│   └── ui/
│       ├── AnimatedSection.tsx    # Viewport-triggered fade/slide wrapper
│       └── GrainOverlay.tsx       # CSS grain texture overlay (optional)
├── lib/
│   ├── letters.ts                 # Utility: read and sort all letters
│   └── types.ts                   # TypeScript types for letter metadata
├── public/
│   └── art/
│       ├── letter-01.jpg          # AI-generated artwork, one per letter
│       ├── letter-02.jpg
│       └── ...
├── mdx-components.tsx             # Required for @next/mdx App Router integration
├── next.config.ts                 # MDX configuration, image settings
└── tailwind.config.ts             # Tailwind 4 config
```

---

## MDX Content Pipeline Architecture

**Approach:** Local MDX files in `/content/letters/`, imported statically in `app/page.tsx` at build time. No runtime file system access.

**Frontmatter handling:** `@next/mdx` does not support YAML frontmatter natively. Two recommended patterns:

1. **Export metadata from MDX** (simplest, no extra deps):
   ```mdx
   export const metadata = {
     title: "On the Domestication of Primates",
     letterNumber: 1,
     artFile: "letter-01.jpg",
     recipient: "Jarvis",
   }

   # Letter the First
   Dear Jarvis...
   ```
   Then import: `import Letter01, { metadata } from '@/content/letters/01-letter.mdx'`

2. **gray-matter with fs** (more flexible, requires build-time fs access):
   Use `gray-matter` in a `lib/letters.ts` utility that reads files server-side during build. Works well when you need to list/sort letters dynamically.

**Recommended:** Use MDX export metadata (option 1) for simplicity. Import each letter file directly in `app/page.tsx`. For 9-11 files, explicit imports are fine — no dynamic glob needed.

**Frontmatter schema for each letter:**
```typescript
type LetterMetadata = {
  title: string            // Letter's thematic title
  letterNumber: number     // 0 for intro, 1-9 for letters, 10 for epilogue
  artFile: string          // Filename in /public/art/
  artAlt: string           // Accessibility alt text for the artwork
  artStyle: string         // "baroque" | "illuminated-manuscript" | etc.
  recipient: string        // "Jarvis" for all letters, or narrative label
}
```

**MDX setup:**
```bash
npm install @next/mdx @mdx-js/loader @mdx-js/react @types/mdx
```

Configure `next.config.ts`:
```typescript
import createMDX from '@next/mdx'

const withMDX = createMDX({
  options: {
    remarkPlugins: ['remark-gfm'],  // GitHub flavored markdown (optional)
  },
})

export default withMDX({
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
})
```

Provide `mdx-components.tsx` at root (required for App Router):
```typescript
import type { MDXComponents } from 'mdx/types'

export function useMDXComponents(): MDXComponents {
  return {
    // Override prose elements with Tailwind/custom styles here
    p: ({ children }) => <p className="mb-6 leading-relaxed">{children}</p>,
  }
}
```

---

## Component Architecture

### Letter (primary content container)

The workhorse component. Receives letter metadata + MDX content as props. Renders as a full-viewport section with hash anchor for navigation.

```typescript
interface LetterProps {
  id: string               // Hash anchor: "letter-1"
  metadata: LetterMetadata
  children: React.ReactNode  // Rendered MDX content
}
```

Structure: `<section id={id}>` → `<LetterArt />` → `<article>` (prose content)

### LetterArt

Wraps `next/image` with blur placeholder. The art is the hero of each section.

- Statically import each image file so Next.js auto-detects dimensions and generates `blurDataURL`
- Use `priority` prop on letter-01 (above the fold on initial load)
- All others use default lazy loading (scroll-triggered via native browser behavior)
- Size: full-width, constrained max-width (~800-1000px), 16:9 or 4:3 aspect ratio

```typescript
interface LetterArtProps {
  src: StaticImageData     // Statically imported image
  alt: string
  priority?: boolean
}
```

### ChapterNav

Floating fixed position dot navigation. 9 dots (or 11 if intro/epilogue included). Active state tracked via IntersectionObserver watching each `<section>`.

- Render once at root level, outside the letter list
- Use `useIntersectionObserver` (custom hook) to track which section is in view
- Update active dot without scroll listeners (IntersectionObserver is more performant)
- Dots link to `#letter-1` through `#letter-9` with smooth scroll behavior (`scroll-behavior: smooth` in CSS)

```typescript
interface ChapterNavProps {
  letters: LetterMetadata[]
  activeIndex: number
}
```

### ScrollProgress

A thin progress bar at the top of the viewport. Tracks document scroll position.

- Must be a Client Component (`'use client'`)
- Use `useScroll` from Framer Motion (returns `scrollYProgress` as a MotionValue 0-1)
- Or use native `window.scrollY` / `document.body.scrollHeight` if avoiding Framer for this
- Animate the bar width using `scaleX` transform (GPU-accelerated) rather than changing `width`

### AnimatedSection (animation wrapper)

A reusable viewport-entry animation. Wraps content blocks within letters to create the cinematic fade-in feel.

- Client Component using Framer Motion's `motion.div` with `whileInView` prop
- `viewport={{ once: true }}` — animate in once, stay visible (no reverse on scroll out)
- Default animation: fade up (opacity 0→1, y 20→0, duration 0.6s, ease "easeOut")
- Use `initial` + `whileInView` + `transition` props

```typescript
// Simple, works for most cases
<motion.div
  initial={{ opacity: 0, y: 24 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-80px" }}
  transition={{ duration: 0.6, ease: "easeOut" }}
>
  {children}
</motion.div>
```

The `margin: "-80px"` triggers animation slightly before the element fully enters — creates a smoother feel than waiting until the element is fully visible.

---

## Animation Architecture with Framer Motion

**Strategy:** Framer Motion for component-level animations. CSS transitions for hover states and micro-interactions. No scroll-linked parallax (performance risk on mobile).

**Animation categories:**

| Type | Mechanism | Component |
|------|-----------|-----------|
| Section fade-in | `whileInView`, once | AnimatedSection |
| Reading progress | `useScroll` → `scaleX` | ScrollProgress |
| Nav active state | CSS transition on dot | ChapterNav |
| Art reveal | `whileInView` with slight scale | LetterArt |
| Ambient grain | CSS animation only | GrainOverlay |

**Client/Server boundary:** Framer Motion components must be Client Components. Keep Server Components for the Letter wrapper (which loads MDX content) and push `'use client'` down to the animation wrapper level only. This preserves Server Component benefits for content rendering.

**Pattern:**
```typescript
// Letter.tsx — Server Component (can stay server-side)
import { AnimatedSection } from '@/components/ui/AnimatedSection'

export function Letter({ metadata, children }) {
  return (
    <section id={`letter-${metadata.letterNumber}`}>
      <LetterArt src={metadata.art} alt={metadata.artAlt} />
      <AnimatedSection>  {/* Client Component boundary here */}
        <article>{children}</article>
      </AnimatedSection>
    </section>
  )
}
```

**Performance budget for animations:**
- Only animate `opacity`, `transform` (translate, scale) — these are GPU-composited and do not trigger layout
- Avoid animating `width`, `height`, `top`, `left`, `margin`, `padding`
- Set `will-change: transform` sparingly — only on elements that will definitely animate
- Use `viewport={{ once: true }}` everywhere — no repeated animation on scroll-out

**Scroll-linked animation (ScrollProgress only):**
```typescript
'use client'
import { useScroll, useSpring } from 'framer-motion'

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })
  return <motion.div style={{ scaleX, transformOrigin: "0%" }} className="fixed top-0 h-1 w-full bg-gold-500 z-50" />
}
```

---

## Image Asset Pipeline

**Organization:** All artwork lives in `/public/art/`. Name files predictably: `letter-01.jpg` through `letter-09.jpg`. Use `letter-00-intro.jpg` for the introduction piece if one is created.

**Format:** JPEG for photographs/paintings (better compression for the painting aesthetic). WebP or AVIF if source quality is already web-optimized. Next.js automatically converts and serves in modern formats regardless of source format.

**Static import pattern (recommended):**
```typescript
// At top of Letter01.mdx or in a central registry
import artLetter01 from '@/public/art/letter-01.jpg'
```

Static imports give Next.js the image dimensions at build time, enabling:
- Automatic `blurDataURL` generation (no manual base64 needed)
- Correct aspect ratio reservation (prevents layout shift)
- Width/height props automatically set

**Image sizing guidelines:**
- Display width: 800-1000px (constrained by prose column)
- Source resolution: 1600-2000px wide (2x for retina displays)
- File size target: 200-400KB per image (acceptable for intentional cinematic presentation)
- First image: `priority` prop (preloaded with `<link rel="preload">`)
- All others: default lazy loading (deferred until near viewport)

**Art registry pattern:**
```typescript
// lib/letters.ts
import art01 from '@/public/art/letter-01.jpg'
import art02 from '@/public/art/letter-02.jpg'
// ...

export const artRegistry = {
  'letter-01': art01,
  'letter-02': art02,
  // ...
}
```

---

## Performance Architecture

**Core strategy:** Load the first letter experience instantly. Defer everything else.

**LCP (Largest Contentful Paint) target: under 2.5s**
- The hero image for letter-01 is likely the LCP element
- Use `priority` on the first `<Image>` — this generates a `<link rel="preload">` in the document head
- Keep total above-the-fold HTML and CSS minimal — avoid large layout components blocking render
- Preload the display font using Next.js `next/font` (prevents font swap flash)

**Progressive image loading:**
- `placeholder="blur"` on all `<Image>` components — shows the blurred thumbnail while the full image loads
- This is automatic when images are statically imported (blurDataURL generated at build time)

**Lazy loading strategy:**
- All letter art below the first viewport: lazy loaded via native browser behavior (next/image default)
- JavaScript for below-fold sections: code-split via dynamic imports if bundle becomes large (unlikely at this scale)
- Framer Motion: tree-shakeable, only import what you use

**Scroll performance:**
- Use IntersectionObserver for active chapter detection (not scroll event listeners)
- Use `useScroll` from Framer Motion for ScrollProgress (uses IntersectionObserver and RAF internally)
- Avoid `scroll` event listeners with layout-triggering reads (`getBoundingClientRect` on scroll)

**Bundle considerations:**
- Framer Motion adds ~30KB gzipped — acceptable for an animation-forward site
- MDX content: compiled to JavaScript at build time, served as static JS chunks
- Split large Client Component islands using `next/dynamic` with `ssr: false` if needed for non-critical interactive features (easter eggs, ambient particles)

**Core Web Vitals targets:**
- LCP < 2.5s (first art piece as LCP element)
- CLS < 0.1 (prevented by static image imports with fixed dimensions)
- INP < 200ms (minimal interactivity — nav dots, progress bar)

---

## Content Creation Pipeline Architecture

The content is created before the site is built. This is a pre-production pipeline, not a runtime concern. The pipeline produces files that land in `/content/letters/`.

**Phase structure:**

```
Phase 1: Story Architecture
  Agent: Outline specialist
  Input: VISION.md + creative brief
  Output: .director/brainstorms/story-outline.md
           - 9-letter arc with beats
           - Nando's character voice guide
           - Narrative callbacks map (what gets set up vs. paid off)
           - The twist mechanism for Letter 9

Phase 2: Writing
  Agent team working per-letter:
  ├── Creative writer: First draft of letter
  ├── Voice editor: Ensure Nando's wise elder voice is consistent
  ├── Flow editor: Pacing, paragraph rhythm, sentence variation
  ├── Consistency checker: References to previous letters, callbacks
  └── Copy editor: Final grammar, punctuation, formatting
  Output: content/letters/01-letter.mdx through 09-letter.mdx

Phase 3: Artwork Direction
  Agent: Art director (reviews completed letter)
  Input: Each completed letter MDX file
  Output: Detailed image generation prompt for that letter
           - Style reference (baroque / illuminated manuscript / cave painting / etc.)
           - Subject matter (what dogs are doing / the mythological scene depicted)
           - Color palette requirements (warm golds, deep charcoals)
           - Character portrayal rules (consistent dog depiction across letters)
           - Negative prompts (what to avoid)

Phase 4: Image Generation + Curation
  Actor: Noah (human)
  Input: Art direction prompts from Phase 3
  Tool: Replicate or similar
  Output: public/art/letter-01.jpg through letter-09.jpg
  Quality gate: Visual consistency check across all 9 pieces

Phase 5: Integration
  Actor: Claude Code
  Input: MDX content + curated artwork
  Output: Complete working site
```

**File handoff contract:**
Each letter MDX file should be complete with:
- Export metadata block (letterNumber, title, artFile, artAlt, artStyle)
- Letter content (ready to render, no placeholders)
- Artwork file referenced exists in `/public/art/`

---

## Root Layout Architecture

The `app/layout.tsx` establishes the global visual foundation:

```typescript
import { Cormorant_Garamond, Geist_Sans } from 'next/font/google'

const displayFont = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-display',
})

const uiFont = Geist_Sans({
  subsets: ['latin'],
  variable: '--font-ui',
})

export const metadata: Metadata = {
  title: 'I Swear to Dog',
  description: 'The true origin of humanity, as told by a five-pound Maltese.',
  openGraph: {
    // social card config
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${displayFont.variable} ${uiFont.variable}`}>
      <body className="bg-stone-950 text-stone-100 antialiased">
        <ChapterNav />
        <ScrollProgress />
        {children}
      </body>
    </html>
  )
}
```

The root layout renders `ChapterNav` and `ScrollProgress` as persistent overlays. `{children}` is the page content.

---

## Page Architecture

`app/page.tsx` is a Server Component that assembles all letters in sequence:

```typescript
import Letter01, { metadata as meta01 } from '@/content/letters/01-letter.mdx'
import letter01Art from '@/public/art/letter-01.jpg'
// ... all 9-11 imports

export default function Page() {
  return (
    <main>
      <FrameNarrative type="introduction">
        {/* Noah's discovery of the letters */}
      </FrameNarrative>

      <Letter metadata={meta01} art={letter01Art} id="letter-1" priority>
        <Letter01 />
      </Letter>

      {/* Letters 2-9 */}

      <FrameNarrative type="epilogue">
        {/* Noah's closing reflection */}
      </FrameNarrative>
    </main>
  )
}
```

This is verbose but explicit. For 9-11 files, explicit imports are the right call — easy to understand, type-safe, no dynamic import complexity.

---

## Architectural Decisions

| Decision | Recommendation | Rationale |
|----------|---------------|-----------|
| Routing | Single route `/` with hash anchors | Maintains immersion, no page transitions needed |
| Content loading | Static MDX imports at build time | No runtime overhead, fully pre-rendered |
| Frontmatter | MDX export syntax | No extra dependencies, TypeScript-friendly |
| Image handling | Static imports + next/image | Auto-dimensions, auto-blur, auto-format |
| Animation scope | Entry animations only, no parallax | Mobile performance, avoids scroll jank |
| Client/Server split | Server Components for letter content, Client for animation wrappers | Best of both worlds |
| Art organization | `/public/art/` flat directory | Simple, matches next/image import patterns |
| Chapter tracking | IntersectionObserver (not scroll events) | More performant, no layout thrashing |
| Font loading | next/font/google with CSS variables | Eliminates CLS from font swap |
| SSG vs SSR | Default Next.js static rendering on Vercel | No need for `output: 'export'` — auto-detected |

---

## Known Architectural Risks

**Ambient particle/grain effects:** CSS animated grain texture (pseudo-element with noise SVG or canvas) is lightweight. JavaScript particle systems (canvas-based) are expensive on mobile — skip or make desktop-only with `@media (hover: hover)`.

**Framer Motion bundle on mobile:** Framer Motion is worth the ~30KB for this project, but ensure animations respect `prefers-reduced-motion`:
```typescript
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
```
Or use Framer's built-in: wrap animations in a check or use the `ReducedMotion` API.

**Image weight:** 9 images at 300KB each = 2.7MB total. Lazy loading means only 1-2 images load initially, but total page weight is heavy. On slow connections, images below the fold are fine — just ensure first image loads fast.

**MDX bundle size:** Each MDX file compiles to a JS chunk. For prose-only content, chunks will be small (< 20KB each). Not a concern at this scale.

**Hash navigation and accessibility:** Ensure each `<section>` has an `id` matching hash links. Add `aria-label` to the `<ChapterNav>` landmark. Dot-only nav needs visible labels or `title` attributes for screen reader users.
