# Features Research

**Domain:** features
**Project:** I Swear to Dog
**Product Type:** Cinematic immersive storytelling website — single-page scroll narrative

---

## Table Stakes (What Readers Expect)

These are non-negotiable. A reader arriving at any serious long-form web story expects all of these:

| Feature | Why It Matters |
|---------|----------------|
| Fast initial load (< 3s on mobile) | Readers bail before they even start if the page is slow |
| Readable typography on all screen sizes | Mobile reading is the majority use case; text that requires pinching-and-zooming kills the experience |
| Obvious "where to start" entry point | The page must communicate "begin here" without UX ambiguity |
| Working scroll (no scroll hijacking surprises) | Scroll hijacking is widely despised; momentum-based scrolling should feel natural |
| Images that don't break layout | Images must have reserved space (blur placeholders / aspect-ratio) to prevent layout shift |
| No horizontal overflow | A single horizontal scrollbar on mobile is an immediate trust-killer |
| Dark mode support (or intentional single mode) | Given the atmospheric design intent, dark-only is appropriate and defensible |
| Accessible text contrast | WCAG 2.1 AA minimum: 4.5:1 for body text, 3:1 for large text |

---

## Best-in-Class Storytelling Sites: Observed Patterns

### The NYT Snowfall Pattern (HIGH confidence — widely documented)
The gold standard that popularized "parallax journalism." Its key features:
- **Chapter-anchored navigation**: Fixed sidebar nav with chapter markers — readers can jump to any chapter without losing their place
- **Scroll-triggered multimedia**: Video, audio, and image reveals keyed to scroll position — content emerges as you descend
- **Immersive full-bleed imagery**: Images that span the full viewport height create cinematic transitions between sections
- **Typography hierarchy**: A clear distinction between pull quotes, body text, and captions — never a wall of undifferentiated text
- **Parallax headers per chapter**: Each chapter opens with a visually distinct header environment

### The Pudding Pattern (HIGH confidence — verified via pudding.cool)
Visual essays built as scrollytelling data stories. Relevant techniques:
- **Single author owns the whole thing**: Writing, analysis, design, and code by the same person (or very small team) — this ensures narrative coherence
- **Experimental visual approaches deliberately tried**: Not every attempt succeeds; the willingness to try unconventional approaches is itself the brand
- **Visual-first selection criteria**: They only pick topics where visuals genuinely add meaning — not decoration
- **Commitment to a single reading mode**: No "also available as a regular article" fallback — the experience is the product
- **Progress through scroll feels rewarding**: The reader feels momentum and discovery, not fatigue

### The Boat (SBS) Pattern (MEDIUM confidence — training data, site not crawlable)
The Boat is a celebrated 2013 HTML5 adaptation of a Nam Le short story. Key techniques often cited:
- **Synchronized audio with scroll position**: Ambient sound that fades in/out based on scroll depth creates atmosphere without autoplay violation
- **Parallax depth layers**: Multiple image layers moving at different speeds simulate 3D depth during scrolling
- **Text fragmented by scroll pace**: Sentences and phrases are revealed gradually, making the reader's scroll speed part of the pacing
- **Full-bleed atmospheric art**: Art is not illustration of the text — it IS the experience, with text overlaid

### The Way of the Code (MEDIUM confidence — training data)
An AI-generated visual essay with mythological framing — highly relevant reference:
- **Sacred aesthetic for secular content**: The deliberate mismatch between reverent presentation and satirical/philosophical content creates productive cognitive tension
- **Consistent visual system**: Each section uses the same visual grammar even as content varies — consistency creates trust
- **Ambient atmospheric textures**: Noise/grain overlays and subtle animations reinforce "ancient document" reading mode

---

## AI-Assisted Creative Writing Pipelines

### Agent Role Architecture (HIGH confidence — well-established in practice)

For a fiction project of this kind, the standard agent team maps to traditional editorial roles:

| Agent Role | Responsibility | Quality Gate |
|------------|---------------|--------------|
| **Creative Writer** | Produces initial draft of each letter — tone, jokes, world-building, plot beats | Does the voice sound right? Is the premise fully exploited? |
| **Voice Editor** | Enforces Nando's specific voice — wise elder/Gandalf tone from a tiny trembling Maltese | Every sentence: does Nando sound ancient and certain, not cute and exclamatory? |
| **Flow Editor** | Controls pacing across and within letters — tension rises, humor releases, callbacks land | Read at speed: does the scroll feel earned? Are transitions between letters resonant? |
| **Consistency Checker** | Tracks narrative facts, timeline, character details, callbacks — prevents continuity errors | Cross-letter audit: are all established facts honored? Do callbacks reference accurately? |
| **Copy Editor** | Grammar, punctuation, formatting, word count targets | Clean output suitable for MDX, no orphaned clauses or typographic errors |

### Best Practices for Editorial Agent Workflows (MEDIUM confidence — emerging practice)

- **Sequential, not parallel, for fiction**: Each agent should see the work of the previous agent, not a fresh draft. Voice editing after first draft. Flow editing after voice. This mirrors how real editorial revision works.
- **Prompts should include the full current letter AND a style brief**: Style briefs encode Nando's voice rules, recurring motifs, and established world-building facts — agents with brief + letter in context will outperform agents with letter alone.
- **The Consistency Checker needs a running "story bible"**: This is a living document (can be a simple list) of: names, dates, world facts, phrases coined in earlier letters, and any promises made to the reader. The checker validates each letter against the bible, then updates it.
- **Human-in-the-loop at direction level, not execution level**: Noah should set the goals for each letter and review the final output — not micromanage individual agent passes. Trust the pipeline.
- **Treat the agent team as a draft machine, not a final delivery system**: Even with a complete editorial pipeline, the output needs Noah's final read. AI agents do not catch "does this feel surprising enough" — only a reader does.

### Content-Before-Code Principle (HIGH confidence — endorsed by vision)
The VISION.md explicitly states "Content phases before code." This is correct for narrative sites. Building the frame before the content means the frame may not fit the content. Writing all 9 letters first, then designing the reading experience around what the letters need, produces a tighter result.

---

## Scroll-Based Narrative Pacing Techniques

### Framer Motion for Next.js (HIGH confidence — official docs)
Framer Motion (now the `motion` package) is the right tool for this project's scroll pacing. Key capabilities:

- **`whileInView` prop**: Elements animate when they enter the viewport — the primary tool for reveal-on-scroll
- **`useScroll` hook**: Returns a `scrollYProgress` value (0–1) that can drive any animation via `useTransform` — this enables text fade-in at specific scroll depths
- **`viewport` prop on `motion` elements**: Controls when `whileInView` triggers — `{ once: true }` ensures letters animate in once and stay (not re-animate when scrolling back up)
- **Variants**: Pre-defined animation states (`hidden`, `visible`) that enable staggered entrances of text paragraphs within a letter
- **`prefers-reduced-motion` respect**: Must be honored — check `window.matchMedia('(prefers-reduced-motion: reduce)')` and skip decorative animations for affected users

### Pacing Patterns Specific to This Project

- **Letter opens with image full-bleed, text fades in over it**: Reader sees the sacred art first, then the letter text emerges — matches the "discovering an ancient document" framing
- **Paragraph-by-paragraph reveal (staggered variants)**: Within each letter, paragraphs enter with slight delay between them — prevents the letter from feeling like a wall of text
- **Chapter boundaries**: Dramatic pause between letters — additional whitespace, a subtle divider, or a brief transition animation signals "one letter ends, another begins"
- **The twist in Letter 9 needs pacing**: The simulation hypothesis reveal should be slower — longer between paragraphs, different visual treatment — to give it weight
- **No scroll snap for this type of content**: CSS scroll snapping works for discrete slides but would break the continuous reading flow of letters. Free scroll with scroll-triggered animations is correct.

---

## Chapter Navigation Patterns

### Floating Dot Navigation (HIGH confidence — matches vision spec)
The VISION.md specifies "floating chapter navigation (dot indicator for 9 letters)." This is the right pattern for this content type:

- **9 dots for 9 letters**: Each dot is a scroll anchor
- **Active state**: The dot for the currently-visible letter highlights — uses `IntersectionObserver` to detect which letter section is in view
- **Click behavior**: Smooth-scroll to the letter section (`scrollIntoView({ behavior: 'smooth' })`)
- **Tooltip on hover**: Letter number and title (e.g., "Letter III: On the Matter of Fetch") on hover/focus — provides context without cluttering the navigation
- **Placement**: Right-side vertical strip on desktop, hidden or collapsed to bottom bar on mobile
- **Hash anchors**: Each letter gets a hash (`#letter-1` through `#letter-9`) so specific letters are directly linkable and shareable

### Reading Progress Indicator (matches nice-to-have)
A thin progress bar at the top of the viewport — 1-2px, in antique gold accent color — driven by `scrollYProgress` from Framer Motion. Provides peripheral awareness of progress without demanding attention.

---

## Social Sharing Optimization

### Open Graph (HIGH confidence — verified via ogp.me and Next.js docs)

**Required tags (minimum):**
```html
<meta property="og:title" content="I Swear to Dog" />
<meta property="og:type" content="article" />
<meta property="og:image" content="https://isweartodog.com/og-image.png" />
<meta property="og:url" content="https://isweartodog.com" />
<meta property="og:description" content="Nine letters from Nando to Jarvis. The true origin story of humans — as told by the dog who made them." />
```

**Image specifications:**
- Recommended size: 1200 x 630px
- Maximum file size: 8MB for og:image
- Must be absolute URL (not relative path)
- Include `og:image:alt` for accessibility

### Twitter/X Cards (HIGH confidence — Next.js docs verified)
```html
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:image" content="https://isweartodog.com/twitter-image.png" />
```
- Maximum file size: 5MB for twitter:image
- `summary_large_image` is the correct card type for this content (shows large image above description)

### Next.js Implementation (HIGH confidence — verified via Next.js 16 docs)
Next.js App Router handles this through file conventions:
- Place `opengraph-image.png` (1200x630) in `/app/` directory — Next.js auto-generates the correct meta tags
- Place `twitter-image.png` in `/app/` directory — same auto-generation
- For dynamic OG images: use `opengraph-image.tsx` with `ImageResponse` from `next/og` — renders JSX to PNG at build time
- For this project, a **static OG image** (one of the sacred art pieces with title overlay) is the right approach — no dynamic generation needed

### OG Image Design Guidance (MEDIUM confidence — design best practice)
For maximum shareability, the OG image should:
- Feature one of the most striking sacred art pieces (probably the cover or Letter 9 reveal art)
- Include the title "I Swear to Dog" in the serif display font used on the site
- Use the same dark atmospheric palette (charcoal background, cream text, gold accents)
- The image should communicate "this is mysterious and beautiful and I want to know what it is" in 2 seconds

---

## Easter Egg Patterns

### Appropriate Easter Egg Patterns for This Project (MEDIUM confidence — design pattern knowledge)

The VISION.md notes "hidden in plain sight" as the theme. Patterns that fit:

| Easter Egg Type | Implementation Approach | Thematic Fit |
|-----------------|------------------------|--------------|
| **Konami code triggers** | Listen for specific key sequence, reveal hidden content | Medium — classic but expected |
| **Hidden text visible only at specific zoom levels** | CSS `font-size: 0` text with tooltip, or CSS `transform: scale` tricks | High — literally "hidden in plain sight" |
| **Long scroll reveal after Letter 9** | Content continues below "the end" — a short coda from Jarvis's perspective, or meta-commentary | Very high — rewards readers who linger |
| **Alt text easter eggs on the sacred art images** | Sardonic or mythological `alt` text visible only to screen readers and those who inspect the DOM | High — subversive, accessible, delightful |
| **Page title changes as you scroll** | `<title>` updates via `document.title` to quotes from the letters as reader progresses | High — share a screenshot of the tab and it becomes a conversation starter |
| **Source code comments** | Hidden messages in the HTML source — references to Nando's mythology | Medium — appeals to the tech audience specifically |
| **Cursor changes** | Custom cursor that becomes a paw print in specific sections | Medium — obvious but charming |
| **Favicon changes** | Favicon cycles between a dog paw, a human figure, and back — subtle animation loop | Low effort, high delight |

**Recommendation:** Prioritize the "post-Letter 9 scroll" easter egg (a hidden coda) and the DOM-inspectable alt text easter eggs. Both have zero performance cost and maximum thematic resonance.

---

## Accessibility for Long-Form Reading

### WCAG 2.1 AA Requirements (HIGH confidence — verified via w3.org)

**Text contrast minimums:**
- Body text: 4.5:1 ratio (normal size)
- Large text (18pt / 14pt bold+): 3:1 ratio
- Charcoal background + warm cream text typically achieves 10:1+ — this project should be fine by default

**Motion accessibility (HIGH confidence — verified via web.dev):**
- All scroll-triggered animations must respect `prefers-reduced-motion`
- Decorative animations (particles, grain, ambient effects) must be disabled when this preference is set
- Functional transitions (which letter you're on, progress indicator) can remain but should be simplified

### Long-Form Reading Specific Features (MEDIUM confidence — reading UX standards)

| Feature | Implementation | Priority |
|---------|---------------|----------|
| **Appropriate line length** | Max 65-75 characters per line (600-700px container width for body text) | Must-have |
| **Generous line height** | 1.6–1.8 for body text; 1.3–1.4 for headers | Must-have |
| **Paragraph spacing** | 1em–1.5em between paragraphs — text needs room to breathe | Must-have |
| **Focus indicators** | Visible focus rings on interactive elements (dot nav, links) — many navigating via keyboard | Must-have |
| **Skip navigation** | A skip-to-content link at the top for keyboard users | Should-have |
| **Semantic HTML structure** | `<article>`, `<section>`, `<header>`, `<nav>` — screen readers use these landmarks to navigate long pages | Must-have |
| **Alt text on all sacred art images** | Descriptive alt text — describes what's depicted, not just "image" | Must-have |
| **No autoplay audio/video** | Any ambient audio must be explicitly user-triggered | Must-have |
| **Color not sole conveyor of meaning** | Active chapter indicator needs shape/size difference, not just color | Should-have |
| **Readable font at system sizes** | Body text minimum 16px (1rem); do not use < 14px anywhere | Must-have |

### Serif Font Readability on Dark Backgrounds (MEDIUM confidence — typography practice)

The vision lists four serif font candidates. Notes for dark backgrounds:
- **Cormorant Garamond**: Beautiful at display sizes; can feel thin at body sizes on dark — test at 17–18px minimum
- **EB Garamond**: More robust at body sizes than Cormorant; better choice for paragraph text
- **Playfair Display**: Excellent for headers and pull quotes; too decorative for extended body text
- **Lora**: Most practical for body text on dark — designed for screen reading, performs well at 16px
- **Recommendation**: Use Playfair Display or Cormorant Garamond for chapter headers/letter headers, and Lora or EB Garamond for body paragraphs

---

## Anti-Features (Do Not Build These)

| Anti-Feature | Why It Hurts |
|--------------|--------------|
| **Comment section** | This is art, not a blog post. Comments invite derailment and moderation burden. |
| **Newsletter signup interruption** | Mid-scroll modal to subscribe destroys the immersion that is the entire point |
| **Infinite scroll or "related content"** | After Letter 9, the experience should end cleanly. Suggested content fights the emotional conclusion. |
| **Sticky social share buttons (always visible)** | Share buttons floating over the text interrupt reading. Place sharing affordances at the very end. |
| **CMS or admin panel** | One-time publication. The overhead of a CMS is pure cost with no benefit. |
| **User accounts / login** | No reason to ask readers to identify themselves. |
| **Cookie banners** | Use Vercel Analytics (privacy-friendly, no cookies) to avoid GDPR consent flows entirely. |
| **Autoplaying ambient audio** | Even if the audio is beautiful, autoplay violates both browser policies and user expectations. Make it opt-in. |
| **Scroll hijacking** | Taking control of the browser's scroll behavior (custom scrollbar behavior, forced scroll velocity) alienates users. Scroll-triggered animations are fine; controlling the scroll itself is not. |

---

## Feature Priority Matrix

| Feature | Must-Have | Nice-to-Have | Skip |
|---------|-----------|--------------|------|
| 9 letters — complete, polished | X | | |
| Frame narrative (intro + epilogue) | X | | |
| Sacred art for each letter | X | | |
| Dark atmospheric design | X | | |
| Mobile-optimized scroll | X | | |
| Floating dot chapter navigation | X | | |
| Scroll-triggered text reveals | X | | |
| OG image + Twitter card | X | | |
| WCAG 2.1 AA compliance | X | | |
| Semantic HTML for screen readers | X | | |
| `prefers-reduced-motion` support | X | | |
| Correct font for dark bg reading | X | | |
| Hash anchors per letter | X | | |
| Reading progress bar | | X | |
| Post-Letter-9 hidden coda | | X | |
| Alt text easter eggs | | X | |
| Page title scroll updates | | X | |
| Ambient particles/grain | | X | |
| Custom cursor | | | X |
| Ambient audio | | | X |
| Comment section | | | X |

---

## Sources

| Source | Confidence | Notes |
|--------|-----------|-------|
| ogp.me — Open Graph Protocol spec | HIGH | Official specification |
| Next.js 16 docs — opengraph-image convention | HIGH | Verified at nextjs.org, version 16.2.1 |
| web.dev — prefers-reduced-motion | HIGH | Authoritative Google source |
| CSS-Tricks — scroll-snap-align | HIGH | Comprehensive property documentation |
| pudding.cool/about | HIGH | Verified via WebFetch |
| ScrollMagic docs | HIGH | Verified via WebFetch |
| NYT Snowfall features | MEDIUM | Training data + widely cited secondary sources |
| The Boat (SBS) features | MEDIUM | Training data; site not crawlable |
| The Way of the Code features | MEDIUM | Training data only |
| AI editorial pipeline practices | MEDIUM | Emerging practice; no single authoritative source |
| Serif font dark background behavior | MEDIUM | Typography standards + design practice |
