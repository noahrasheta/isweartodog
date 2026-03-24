# Vision

## Project Name
I Swear to Dog

## What It Does
A cinematic storytelling website that presents a satirical origin mythology — the story of how dogs, the original intelligent species, uplifted humans from grunting cavemen into the dominant species on Earth, told through 9 letters from a five-pound Maltese named Nando to an older dog named Jarvis. The narrative is framed by Noah's discovery of the letters, builds through humor and world-building, and culminates in a simulation hypothesis twist that reframes everything. The site pairs each letter with AI-generated sacred artwork and presents the whole experience as an immersive, dark, atmospheric scroll — a work of art meant to be read in one sitting and shared immediately after.

**One-line pitch:** *What if dogs created humans the way humans are creating AI — and the whole thing is a simulation where every creator is also a creation?*

**Domain:** isweartodog.com

## Who It's For
Intellectually curious people who enjoy creative writing, philosophical humor, and mind-bending narratives. Dog lovers who appreciate irreverent takes on the dog-human bond. People interested in AI, the simulation hypothesis, and Eastern philosophy. Ages 25-55, comfortable reading long-form content online. Secondary audience: tech/AI professionals, creative professionals evaluating Noah's work, and fans of satirical religious commentary (Screwtape Letters, Terry Pratchett).

## Key Features

### Must-Have
- 9 letters from Nando to Jarvis in the Screwtape Letters format (one-sided correspondence, wise elder voice from a tiny shy dog)
- Frame narrative — Noah's introduction and epilogue
- AI-generated sacred/mythological artwork for each letter (Renaissance, illuminated manuscripts, cave paintings, Baroque — dogs as divine figures)
- Single-page immersive scroll experience with cinematic pacing
- Dark atmospheric design (charcoal background, warm cream text, antique gold accents)
- Floating chapter navigation (dot indicator for 9 letters)
- Responsive and accessible (mobile-optimized, WCAG 2.1 AA)
- Public GitHub repository

### Nice-to-Have
- Easter eggs hidden throughout (the "hidden in plain sight" theme demands it)
- Subtle ambient effects on desktop (particles, grain, gradients)
- Reading progress indicator
- Social sharing (copy link, social cards with compelling OG image)

## Tech Stack
- **Framework:** Next.js 16 (App Router, SSG)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **Animations:** Framer Motion (scroll-triggered entrances, transitions)
- **Content:** Local MDX files (no CMS, no database)
- **Images:** next/image (optimization, blur placeholders, lazy loading)
- **Fonts:** Serif display font for narrative + Geist Sans for UI + Geist Mono for code elements
- **Hosting:** Vercel (free tier, global CDN)
- **Analytics:** Vercel Analytics (optional, privacy-friendly)

## Content Creation Strategy

This is the heart of the project. Content is created through specialized AI agents, not written externally:

1. **Research & Outline** — Deep research into creative writing best practices, story architecture, character voice. A specialized writing agent builds a thorough outline covering story arc, character development, letter-by-letter beats, and narrative consistency.
2. **Writing** — An agent team produces the letters with an editorial pipeline: creative writer, voice editor (Nando's wise elder tone), flow editor (pacing, transitions), consistency checker (narrative continuity, callbacks), and copy editor (grammar, punctuation).
3. **Artwork Direction** — A specialized agent reviews each completed letter and produces detailed image generation prompts with style consistency guidelines, character portrayal rules, and color palette harmony.
4. **Image Generation** — Noah runs prompts through Replicate, curates results. Consistent sacred/mythological aesthetic across all 9 letters despite varying art styles per letter.

No external review pause — the AI editorial team is the quality gate. Noah provides the overall vision and creative direction.

## Success Looks Like
One of the most beautiful, most creative, and most memorable storytelling websites ever made. Specifically:
- A reader who opens the link can't stop scrolling until they finish all 9 letters
- The twist in Letter 9 genuinely surprises and moves people
- People share it immediately after reading ("you have to read this")
- The craft is evident at every level — writing, art, design, code
- Lighthouse performance score 90+, accessibility 95+
- The public codebase demonstrates what's possible when AI tools meet creative vision

## Decisions Made

| Decision | Why |
|----------|-----|
| Single-page scroll, not multi-page | Maintains narrative immersion. The story is meant to be read in one sitting. Hash anchors give shareability. |
| Screwtape Letters format (one-sided) | Reader infers Jarvis's side, creating engagement. Proven literary device. |
| Nando's voice: wise elder / Gandalf tone | The contrast between a five-pound trembling Maltese and an ancient sage is inherently hilarious. |
| Dark mode only, no toggle | The atmosphere IS the experience. "Ancient secret revealed by candlelight." |
| MDX for content, no CMS | One-time publication. Content lives in the repo. No ongoing updates needed. |
| AI-assisted content creation with agent teams | Specialized agents fill the roles of a real editorial team (writer, voice editor, flow editor, consistency checker, copy editor). |
| Content phases before code | The story is the soul. Get it right first, then build the frame. |
| No external review pause | AI editorial team is the quality gate. Noah reviews and directs throughout. |
| Public GitHub repo | Part of the artistic statement — showing what's possible with AI-human collaboration. |
| Art style: serious sacred/mythological, not cartoonish | The contrast between reverent art and satirical text IS the joke. |

## Open Questions
- [UNCLEAR] Serif font choice — Playfair Display, Cormorant Garamond, EB Garamond, and Lora are candidates. Needs visual testing on dark backgrounds at reading sizes.
- [UNCLEAR] Specific easter eggs — the "hidden in plain sight" theme calls for them, but specifics TBD during polish phase.
- [UNCLEAR] Background ambient effects scope — particles, fog, animated grain add atmosphere but need performance testing on mobile.
