# Cinematic Scroll Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the I Swear to Dog website from a linear scroll into a cinematic descent through layers of reality, with GSAP-pinned letter scenes, parallax artwork, cosmic atmosphere, and parchment letter surfaces.

**Architecture:** GSAP ScrollTrigger handles scroll choreography (pinning, parallax, transitions). Framer Motion stays for UI animations (nav, progress bar). CSS handles the cosmic atmosphere (stars, nebulas, particles). Progressive enhancement: content works without JS, reduced motion gets elegant fades, mobile gets simplified effects, desktop gets the full cinematic experience.

**Tech Stack:** Next.js 16, React 19, GSAP + @gsap/react (ScrollTrigger), Framer Motion 12, Tailwind CSS 4, MDX

**Spec:** `docs/superpowers/specs/2026-03-26-cinematic-scroll-redesign.md`

---

## File Map

| File | Action | Responsibility |
|------|--------|---------------|
| `package.json` | Modify | Add gsap, @gsap/react |
| `app/globals.css` | Modify | Add parchment tokens, star/nebula/particle CSS, atmosphere keyframes |
| `app/page.tsx` | Modify | Replace AnimatedSection wrappers with LetterScene, add CosmicAtmosphere, ThresholdTransition |
| `app/layout.tsx` | No change | -- |
| `components/ParchmentSurface.tsx` | Create | Warm translucent panel wrapper for letter content |
| `components/CosmicAtmosphere.tsx` | Create | Star layers, nebula gradients, particle drift |
| `components/ThresholdTransition.tsx` | Create | GSAP timeline for intro-to-cosmos transition |
| `components/LetterScene.tsx` | Create | GSAP ScrollTrigger pin-and-scroll orchestrator per letter |
| `components/ParallaxArt.tsx` | Create | Multi-layer parallax artwork (replaces LetterArt for desktop) |
| `components/GeometricPatterns.tsx` | Create | Sacred geometry overlay for letters 7-9 |
| `components/Letter.tsx` | Modify | Use ParchmentSurface, inverted typography, new layout |
| `components/LetterArt.tsx` | Keep | Used as mobile fallback (single-layer) |
| `components/AnimatedSection.tsx` | Keep | Used for intro/epilogue Framer Motion fades |
| `components/ChapterNav.tsx` | Modify | Star-styled dots, parchment tooltips |
| `components/ScrollProgress.tsx` | Modify | Color shift on descent |
| `components/FrameNarrative.tsx` | Modify | Surface/return zone styling for intro and epilogue |
| `lib/useIsDesktop.ts` | Create | Hook: returns true when viewport >= 1024px |
| `lib/gsap-register.ts` | Create | One-time GSAP plugin registration |

---

## Task 1: Install GSAP and Register Plugins

**Files:**
- Modify: `package.json`
- Create: `lib/gsap-register.ts`

- [ ] **Step 1: Install GSAP dependencies**

Run: `cd /Users/noahrasheta/Dev/GitHub/i-swear-to-dog && npm install gsap @gsap/react`

- [ ] **Step 2: Create GSAP registration module**

Create `lib/gsap-register.ts`:
```ts
"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };
```

- [ ] **Step 3: Verify build succeeds**

Run: `npm run build`
Expected: Build completes without errors.

- [ ] **Step 4: Commit**

```bash
git add package.json package-lock.json lib/gsap-register.ts
git commit -m "feat: add GSAP and ScrollTrigger dependencies"
```

---

## Task 2: Create useIsDesktop Hook

**Files:**
- Create: `lib/useIsDesktop.ts`

- [ ] **Step 1: Create the hook**

Create `lib/useIsDesktop.ts`:
```ts
"use client";

import { useState, useEffect } from "react";

const DESKTOP_BREAKPOINT = 1024;

export function useIsDesktop(): boolean {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(`(min-width: ${DESKTOP_BREAKPOINT}px)`);
    setIsDesktop(mql.matches);

    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  return isDesktop;
}
```

- [ ] **Step 2: Commit**

```bash
git add lib/useIsDesktop.ts
git commit -m "feat: add useIsDesktop responsive hook (1024px breakpoint)"
```

---

## Task 3: Add CSS Design Tokens and Atmosphere Keyframes

**Files:**
- Modify: `app/globals.css`

This task adds all the CSS infrastructure: parchment color tokens, star twinkle keyframes, particle drift animations, and nebula utility classes. No component changes yet.

- [ ] **Step 1: Add parchment color tokens to the @theme block**

In `app/globals.css`, add to the existing `@theme` block after `--color-parchment`:
```css
  --color-parchment-surface: #F2EDE4;
  --color-parchment-text: #1C1917;
  --color-parchment-muted: #78716C;
  --color-parchment-border: rgba(242, 237, 228, 0.15);
```

- [ ] **Step 2: Add star twinkle keyframes**

After the existing film grain `@media` block at the end of `globals.css`, add:
```css
/* Star twinkle animation */
@keyframes twinkle {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 1; }
}

/* Particle drift animation */
@keyframes drift {
  0% { transform: translateY(0) translateX(0); }
  25% { transform: translateY(-30px) translateX(10px); }
  50% { transform: translateY(-15px) translateX(-8px); }
  75% { transform: translateY(-45px) translateX(5px); }
  100% { transform: translateY(-60px) translateX(0); opacity: 0; }
}

/* Slow float for near-star parallax feel */
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
}

/* Nebula pulse - very subtle scale/opacity shift */
@keyframes nebula-pulse {
  0%, 100% { opacity: 0.4; transform: scale(1); }
  50% { opacity: 0.6; transform: scale(1.05); }
}
```

- [ ] **Step 3: Add atmosphere utility classes**

After the keyframes, add:
```css
/* Atmosphere: reduced motion kills all animations */
@media (prefers-reduced-motion: no-preference) {
  .star-twinkle {
    animation: twinkle var(--twinkle-duration, 4s) ease-in-out var(--twinkle-delay, 0s) infinite;
  }

  .particle-drift {
    animation: drift var(--drift-duration, 40s) linear var(--drift-delay, 0s) infinite;
  }

  .star-float {
    animation: float var(--float-duration, 8s) ease-in-out var(--float-delay, 0s) infinite;
  }

  .nebula-animate {
    animation: nebula-pulse 20s ease-in-out infinite;
  }
}

/* Parchment noise texture */
.parchment-texture {
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");
}
```

- [ ] **Step 4: Verify build**

Run: `npm run build`
Expected: Build completes. No CSS errors.

- [ ] **Step 5: Commit**

```bash
git add app/globals.css
git commit -m "feat: add parchment tokens, atmosphere keyframes, and utility classes"
```

---

## Task 4: Create ParchmentSurface Component

**Files:**
- Create: `components/ParchmentSurface.tsx`

- [ ] **Step 1: Create the component**

Create `components/ParchmentSurface.tsx`:
```tsx
import { type ReactNode } from "react";

interface ParchmentSurfaceProps {
  number: number;
  title: string;
  children: ReactNode;
}

export default function ParchmentSurface({
  number,
  title,
  children,
}: ParchmentSurfaceProps) {
  return (
    <div className="parchment-texture relative mx-auto max-w-3xl rounded-[10px] bg-parchment-surface/[0.88] px-8 py-10 shadow-[0_0_60px_rgba(242,237,228,0.08)] md:px-12 md:py-14">
      <header className="mb-8 text-center">
        <p className="font-ui text-sm uppercase tracking-widest text-parchment-muted">
          Letter {number}
        </p>
        <h2 className="font-display mt-2 text-3xl font-semibold tracking-tight text-parchment-text md:text-4xl">
          {title}
        </h2>
      </header>

      <article>
        <div className="prose prose-lg prose-stone prose-headings:font-display prose-headings:text-parchment-text prose-p:text-parchment-text prose-p:leading-relaxed prose-a:text-parchment-text prose-a:underline prose-strong:text-parchment-text prose-blockquote:border-parchment-muted prose-blockquote:text-parchment-text/80">
          {children}
        </div>
      </article>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/ParchmentSurface.tsx
git commit -m "feat: create ParchmentSurface component with inverted typography"
```

---

## Task 5: Create CosmicAtmosphere Component

**Files:**
- Create: `components/CosmicAtmosphere.tsx`

This is the star field, nebula gradients, and particle drift system. All CSS-based.

- [ ] **Step 1: Create the component**

Create `components/CosmicAtmosphere.tsx`:
```tsx
"use client";

import { useMemo, useState, useEffect } from "react";

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
  opacity: number;
}

function generateStars(count: number, sizeRange: [number, number], seed: number): Star[] {
  const stars: Star[] = [];
  // Deterministic pseudo-random for SSR/CSR consistency
  let s = seed;
  const rand = () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };

  for (let i = 0; i < count; i++) {
    stars.push({
      id: seed * 1000 + i,
      x: rand() * 100,
      y: rand() * 100,
      size: sizeRange[0] + rand() * (sizeRange[1] - sizeRange[0]),
      delay: rand() * 8,
      duration: 3 + rand() * 5,
      opacity: 0.3 + rand() * 0.7,
    });
  }
  return stars;
}

function StarLayer({
  stars,
  className,
}: {
  stars: Star[];
  className?: string;
}) {
  return (
    <div className={`absolute inset-0 overflow-hidden ${className ?? ""}`} aria-hidden="true">
      {stars.map((star) => (
        <div
          key={star.id}
          className="star-twinkle absolute rounded-full bg-white"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            "--twinkle-delay": `${star.delay}s`,
            "--twinkle-duration": `${star.duration}s`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}

function useCurrentZone(): 1 | 2 | 3 | 4 | 5 {
  const [zone, setZone] = useState<1 | 2 | 3 | 4 | 5>(1);

  useEffect(() => {
    const handleScroll = () => {
      const progress = window.scrollY / (document.body.scrollHeight - window.innerHeight);
      if (progress < 0.08) setZone(1);       // intro
      else if (progress < 0.35) setZone(2);   // letters 1-3
      else if (progress < 0.65) setZone(3);   // letters 4-6
      else if (progress < 0.92) setZone(4);   // letters 7-9
      else setZone(5);                         // epilogue
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // set initial
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return zone;
}

export default function CosmicAtmosphere() {
  const zone = useCurrentZone();
  const distantStars = useMemo(() => generateStars(80, [1, 2], 42), []);
  const midStars = useMemo(() => generateStars(30, [2, 3], 137), []);
  const nearStars = useMemo(() => generateStars(10, [3, 5], 256), []);

  // Zone-based nebula colors
  const nebulaColors = {
    1: "from-transparent via-transparent to-transparent",
    2: "from-indigo-950/30 via-violet-950/20 to-transparent",
    3: "from-indigo-950/40 via-violet-950/30 to-amber-950/20",
    4: "from-violet-950/40 via-amber-950/30 to-gold/10",
    5: "from-indigo-950/20 via-transparent to-transparent",
  };

  return (
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
      {/* Distant star layer */}
      <StarLayer stars={distantStars} className="opacity-60" />

      {/* Mid star layer */}
      {zone >= 2 && <StarLayer stars={midStars} className="opacity-70" />}

      {/* Near star layer - with glow */}
      {zone >= 2 && (
        <div className="absolute inset-0 overflow-hidden">
          {nearStars.map((star) => (
            <div
              key={star.id}
              className="star-float absolute rounded-full"
              style={{
                left: `${star.x}%`,
                top: `${star.y}%`,
                width: `${star.size}px`,
                height: `${star.size}px`,
                "--float-delay": `${star.delay}s`,
                "--float-duration": `${6 + star.duration}s`,
                background: "white",
                boxShadow: `0 0 ${star.size * 3}px ${star.size}px rgba(255,255,255,0.3)`,
              } as React.CSSProperties}
            />
          ))}
        </div>
      )}

      {/* Nebula gradient layer */}
      <div
        className={`absolute inset-0 bg-gradient-to-b ${nebulaColors[zone]} transition-all duration-[3000ms]`}
      />

      {/* Secondary nebula - radial glow */}
      {zone >= 3 && (
        <div
          className="nebula-animate absolute inset-0"
          style={{
            background: zone >= 4
              ? "radial-gradient(ellipse at 30% 50%, rgba(201,168,76,0.08) 0%, transparent 60%), radial-gradient(ellipse at 70% 60%, rgba(139,116,50,0.06) 0%, transparent 50%)"
              : "radial-gradient(ellipse at 30% 50%, rgba(76,29,149,0.08) 0%, transparent 60%)",
          }}
        />
      )}

      {/* Particles - only zones 2+ */}
      {zone >= 2 && <ParticleField density={zone <= 2 ? "sparse" : zone <= 4 ? "medium" : "sparse"} />}
    </div>
  );
}

function ParticleField({ density }: { density: "sparse" | "medium" }) {
  const count = density === "sparse" ? 12 : 24;
  const particles = useMemo(() => {
    const result: { id: number; x: number; y: number; size: number; delay: number; duration: number }[] = [];
    let s = 999;
    const rand = () => {
      s = (s * 16807) % 2147483647;
      return (s - 1) / 2147483646;
    };
    for (let i = 0; i < count; i++) {
      result.push({
        id: i,
        x: rand() * 100,
        y: rand() * 100,
        size: 1 + rand() * 2,
        delay: rand() * 30,
        duration: 30 + rand() * 30,
      });
    }
    return result;
  }, [count]);

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      {particles.map((p) => (
        <div
          key={p.id}
          className="particle-drift absolute rounded-full bg-white/40"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            "--drift-delay": `${p.delay}s`,
            "--drift-duration": `${p.duration}s`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/CosmicAtmosphere.tsx
git commit -m "feat: create CosmicAtmosphere with star layers, nebulas, and particles"
```

---

## Task 6: Create ThresholdTransition Component

**Files:**
- Create: `components/ThresholdTransition.tsx`

The intro-to-cosmos transition. GSAP ScrollTrigger timeline that fires between the introduction and letter 1.

- [ ] **Step 1: Create the component**

Create `components/ThresholdTransition.tsx`:
```tsx
"use client";

import { useRef, useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap-register";
import { useIsDesktop } from "@/lib/useIsDesktop";

export default function ThresholdTransition() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isDesktop = useIsDesktop();

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      // Vignette darkens
      tl.fromTo(
        ".threshold-vignette",
        { opacity: 0 },
        { opacity: 1, duration: 0.5 },
        0
      );

      // Stars fade in and spread
      tl.fromTo(
        ".threshold-stars",
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.8 },
        0.1
      );

      // Nebula glow rises from bottom
      tl.fromTo(
        ".threshold-nebula",
        { opacity: 0, y: 100 },
        { opacity: 1, y: 0, duration: 0.8 },
        0.3
      );
    }, containerRef);

    return () => ctx.revert();
  }, [isDesktop]);

  return (
    <div
      ref={containerRef}
      className="relative h-[40vh] md:h-[60vh]"
      aria-hidden="true"
    >
      {/* Vignette overlay */}
      <div className="threshold-vignette absolute inset-0 opacity-0"
        style={{
          background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.6) 100%)",
        }}
      />

      {/* Star burst */}
      <div className="threshold-stars absolute inset-0 opacity-0">
        {Array.from({ length: 40 }).map((_, i) => {
          const seed = i * 7 + 3;
          const x = ((seed * 16807) % 2147483647) / 2147483647 * 100;
          const y = (((seed * 16807) % 2147483647 * 16807) % 2147483647) / 2147483647 * 100;
          const size = 1 + (i % 3);
          return (
            <div
              key={i}
              className="absolute rounded-full bg-white"
              style={{
                left: `${x}%`,
                top: `${y}%`,
                width: `${size}px`,
                height: `${size}px`,
                opacity: 0.4 + (i % 5) * 0.12,
              }}
            />
          );
        })}
      </div>

      {/* Nebula glow rising */}
      <div
        className="threshold-nebula absolute inset-0 opacity-0"
        style={{
          background: "radial-gradient(ellipse at 50% 80%, rgba(49,46,129,0.3) 0%, transparent 70%)",
        }}
      />
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/ThresholdTransition.tsx
git commit -m "feat: create ThresholdTransition with GSAP ScrollTrigger timeline"
```

---

## Task 7: Create ParallaxArt Component

**Files:**
- Create: `components/ParallaxArt.tsx`

Multi-layer parallax artwork for desktop. Falls back to existing LetterArt on mobile.

- [ ] **Step 1: Create the component**

Create `components/ParallaxArt.tsx`:
```tsx
"use client";

import { useRef, useEffect } from "react";
import Image, { type StaticImageData } from "next/image";
import { gsap, ScrollTrigger } from "@/lib/gsap-register";

interface ArtLayer {
  src: StaticImageData | string;
  speed: number; // parallax speed multiplier. 0 = pinned, 1 = normal scroll
}

interface ParallaxArtProps {
  layers: ArtLayer[];
  alt: string;
  priority?: boolean;
}

export default function ParallaxArt({
  layers,
  alt,
  priority = false,
}: ParallaxArtProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const layerRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      layers.forEach((layer, i) => {
        const el = layerRefs.current[i];
        if (!el) return;

        gsap.to(el, {
          yPercent: layer.speed * -30,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, [layers]);

  return (
    <div
      ref={containerRef}
      className="relative aspect-[4/3] w-full overflow-hidden rounded-sm"
      role="img"
      aria-label={alt}
    >
      {layers.map((layer, i) => (
        <div
          key={i}
          ref={(el) => { layerRefs.current[i] = el; }}
          className="absolute inset-0"
          style={{ zIndex: i }}
        >
          <Image
            src={layer.src}
            alt={i === 0 ? alt : ""}
            fill
            sizes="(max-width: 1024px) 100vw, 768px"
            className="object-cover"
            priority={priority && i === 0}
            loading={priority && i === 0 ? "eager" : "lazy"}
            quality={75}
          />
        </div>
      ))}
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/ParallaxArt.tsx
git commit -m "feat: create ParallaxArt with GSAP scroll-driven layer parallax"
```

---

## Task 8: Create LetterScene Component (Desktop Pin-and-Scroll)

**Files:**
- Create: `components/LetterScene.tsx`

The core orchestrator: pins the scene, reveals artwork, materializes parchment, allows reading, then releases.

- [ ] **Step 1: Create the component**

Create `components/LetterScene.tsx`:
```tsx
"use client";

import { useRef, useEffect, type ReactNode } from "react";
import { type StaticImageData } from "next/image";
import { gsap, ScrollTrigger } from "@/lib/gsap-register";
import { useIsDesktop } from "@/lib/useIsDesktop";
import ParallaxArt from "@/components/ParallaxArt";
import LetterArt from "@/components/LetterArt";
import ParchmentSurface from "@/components/ParchmentSurface";

interface LetterSceneProps {
  number: number;
  title: string;
  artworkSrc: StaticImageData;
  artworkAlt: string;
  priority?: boolean;
  children: ReactNode;
}

export default function LetterScene({
  number,
  title,
  artworkSrc,
  artworkAlt,
  priority = false,
  children,
}: LetterSceneProps) {
  const sceneRef = useRef<HTMLDivElement>(null);
  const artRef = useRef<HTMLDivElement>(null);
  const parchmentRef = useRef<HTMLDivElement>(null);
  const isDesktop = useIsDesktop();

  useEffect(() => {
    if (!isDesktop || !sceneRef.current) return;

    const ctx = gsap.context(() => {
      // Phase 1: Artwork approach - blur to sharp, scale down
      gsap.fromTo(
        artRef.current,
        { filter: "blur(8px)", scale: 1.1, opacity: 0 },
        {
          filter: "blur(0px)",
          scale: 1,
          opacity: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sceneRef.current,
            start: "top 80%",
            end: "top 20%",
            scrub: 1,
          },
        }
      );

      // Phase 2: Parchment materializes
      gsap.fromTo(
        parchmentRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          ease: "power2.out",
          scrollTrigger: {
            trigger: parchmentRef.current,
            start: "top 85%",
            end: "top 50%",
            scrub: 1,
          },
        }
      );

      // Phase 4: Release - fade out artwork as we leave
      gsap.to(artRef.current, {
        opacity: 0,
        scale: 0.95,
        filter: "blur(4px)",
        ease: "power2.in",
        scrollTrigger: {
          trigger: sceneRef.current,
          start: "bottom 40%",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, sceneRef);

    return () => ctx.revert();
  }, [isDesktop]);

  // Mobile: simplified layout, no pinning
  if (!isDesktop) {
    return (
      <section
        id={`letter-${number}`}
        aria-label={`Letter ${number}: ${title}`}
        className="py-24 first:pt-16 last:pb-32 md:py-32"
      >
        <LetterArt
          src={artworkSrc}
          alt={artworkAlt}
          priority={priority}
          sizes="100vw"
        />
        <div className="mt-8 px-4">
          <ParchmentSurface number={number} title={title}>
            {children}
          </ParchmentSurface>
        </div>
      </section>
    );
  }

  // Desktop: full cinematic scene
  return (
    <section
      ref={sceneRef}
      id={`letter-${number}`}
      aria-label={`Letter ${number}: ${title}`}
      className="relative py-32"
    >
      {/* Artwork backdrop */}
      <div
        ref={artRef}
        className="mx-auto mb-12 w-full max-w-4xl px-6 opacity-0"
      >
        <ParallaxArt
          layers={[
            { src: artworkSrc, speed: 0.3 },
          ]}
          alt={artworkAlt}
          priority={priority}
        />
      </div>

      {/* Parchment with letter content */}
      <div ref={parchmentRef} className="relative z-10 px-6 opacity-0">
        <ParchmentSurface number={number} title={title}>
          {children}
        </ParchmentSurface>
      </div>
    </section>
  );
}
```

**Note:** This initial version uses single-layer parallax with the existing artwork images. When the multi-layer artwork assets are produced (bg.png, mid.png, fg.png), the `layers` prop can be updated to pass multiple layers for full depth separation. The component architecture supports this without refactoring.

- [ ] **Step 2: Commit**

```bash
git add components/LetterScene.tsx
git commit -m "feat: create LetterScene with GSAP pin-and-scroll choreography"
```

---

## Task 9: Create GeometricPatterns Component

**Files:**
- Create: `components/GeometricPatterns.tsx`

Sacred geometry overlay that fades in during letters 7-9.

- [ ] **Step 1: Create the component**

Create `components/GeometricPatterns.tsx`:
```tsx
"use client";

import { useRef, useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap-register";

interface GeometricPatternsProps {
  /** Which letter this is attached to. Only renders for 7, 8, 9. */
  letterNumber: number;
}

export default function GeometricPatterns({ letterNumber }: GeometricPatternsProps) {
  const ref = useRef<HTMLDivElement>(null);

  const opacityMap: Record<number, number> = { 7: 0.05, 8: 0.1, 9: 0.15 };
  const targetOpacity = opacityMap[letterNumber] ?? 0;
  const shouldRender = letterNumber >= 7;

  useEffect(() => {
    if (!shouldRender || !ref.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        { opacity: 0 },
        {
          opacity: targetOpacity,
          ease: "none",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 80%",
            end: "top 30%",
            scrub: 1,
          },
        }
      );
    }, ref);

    return () => ctx.revert();
  }, [targetOpacity, shouldRender]);

  // Only render for letters 7-9
  if (!shouldRender) return null;

  return (
    <div
      ref={ref}
      className="pointer-events-none fixed inset-0 z-[1] opacity-0"
      aria-hidden="true"
    >
      <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern
            id={`geo-grid-${letterNumber}`}
            x="0" y="0"
            width="120" height="104"
            patternUnits="userSpaceOnUse"
          >
            {/* Hexagonal grid pattern */}
            <polygon
              points="60,0 120,30 120,74 60,104 0,74 0,30"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
              className="text-gold"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#geo-grid-${letterNumber})`} />

        {/* Concentric circles at center */}
        {letterNumber >= 8 && (
          <g className="text-gold">
            {[100, 200, 300, 400].map((r) => (
              <circle
                key={r}
                cx="50%"
                cy="50%"
                r={r}
                fill="none"
                stroke="currentColor"
                strokeWidth="0.3"
              />
            ))}
          </g>
        )}
      </svg>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/GeometricPatterns.tsx
git commit -m "feat: create GeometricPatterns with sacred geometry for letters 7-9"
```

---

## Task 10: Update ChapterNav Styling

**Files:**
- Modify: `components/ChapterNav.tsx`

Star-styled dots with glow, parchment-toned tooltips.

- [ ] **Step 1: Update the active dot styling**

In `components/ChapterNav.tsx`, replace the dot `<span>` (line 119-125) with star-styled versions:

Change:
```tsx
                <span
                  className={`block rounded-full transition-all duration-300 ${
                    isActive
                      ? 'h-3 w-3 bg-gold shadow-[0_0_8px_rgba(201,168,76,0.4)]'
                      : 'h-2 w-2 bg-cream/30 group-hover:bg-cream/60'
                  }`}
                />
```

To:
```tsx
                <span
                  className={`block rounded-full transition-all duration-300 ${
                    isActive
                      ? 'h-3 w-3 bg-white shadow-[0_0_12px_4px_rgba(255,255,255,0.3)]'
                      : 'h-2 w-2 bg-white/30 group-hover:bg-white/60 group-hover:shadow-[0_0_6px_2px_rgba(255,255,255,0.15)]'
                  }`}
                />
```

- [ ] **Step 2: Update the tooltip styling**

Change the tooltip `<span>` (line 126):

From:
```tsx
                <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded bg-charcoal/95 px-2.5 py-1 font-ui text-xs text-cream/90 opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100">
```

To:
```tsx
                <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-md bg-parchment-surface/95 px-2.5 py-1 font-ui text-xs text-parchment-text opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100">
```

- [ ] **Step 3: Verify build**

Run: `npm run build`
Expected: Build succeeds.

- [ ] **Step 4: Commit**

```bash
git add components/ChapterNav.tsx
git commit -m "feat: restyle ChapterNav with star-glow dots and parchment tooltips"
```

---

## Task 11: Update ScrollProgress with Color Shift

**Files:**
- Modify: `components/ScrollProgress.tsx`

Progress bar color shifts from cool to warm as you descend.

- [ ] **Step 1: Update the component**

Replace the entire content of `components/ScrollProgress.tsx`:
```tsx
'use client';

import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 50,
    restDelta: 0.001,
  });

  // Color shifts: cool indigo at top -> gold at bottom
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    ["#818CF8", "#C9A84C", "#C9A84C"]
  );

  return (
    <motion.div
      role="progressbar"
      aria-label="Reading progress"
      aria-valuemin={0}
      aria-valuemax={100}
      style={{ scaleX, transformOrigin: '0%', backgroundColor }}
      className="fixed top-0 left-0 right-0 z-[60] h-[2px]"
    />
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/ScrollProgress.tsx
git commit -m "feat: add color shift to ScrollProgress (indigo to gold)"
```

---

## Task 12: Update FrameNarrative for Surface/Return Zones

**Files:**
- Modify: `components/FrameNarrative.tsx`

Introduction gets sparse star hints; epilogue gets a calming return-to-surface feel.

- [ ] **Step 1: Update the component**

Replace the entire content of `components/FrameNarrative.tsx`:
```tsx
import { type ReactNode } from "react";

interface FrameNarrativeProps {
  section: "introduction" | "epilogue";
  heading?: string;
  children: ReactNode;
}

export default function FrameNarrative({
  section,
  heading,
  children,
}: FrameNarrativeProps) {
  const isEpilogue = section === "epilogue";

  return (
    <section
      id={section}
      aria-label={section.charAt(0).toUpperCase() + section.slice(1)}
      className={`relative py-20 md:py-28 ${isEpilogue ? "pt-32 md:pt-40" : "pb-12 md:pb-16"}`}
    >
      <div className="relative z-10 mx-auto max-w-2xl px-6">
        {heading && (
          <header className="mb-10 text-center">
            <p className="font-ui text-xs uppercase tracking-[0.25em] text-gold-muted">
              {section === "introduction" ? "A note from Noah" : "Afterward"}
            </p>
            <h2 className="font-display mt-3 text-2xl font-light tracking-tight text-cream/90 md:text-3xl">
              {heading}
            </h2>
          </header>
        )}

        <article className="space-y-6 font-ui text-base leading-[1.85] text-cream/70 md:text-lg md:leading-[1.85]">
          {children}
        </article>

        {!isEpilogue && (
          <div className="mx-auto mt-16 flex items-center justify-center gap-3">
            <span className="h-px w-12 bg-gold-dim/40" />
            <span className="text-gold-dim/60 text-xs">&#10045;</span>
            <span className="h-px w-12 bg-gold-dim/40" />
          </div>
        )}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/FrameNarrative.tsx
git commit -m "feat: update FrameNarrative with relative z-index for atmosphere layering"
```

---

## Task 13: Wire Everything Together in page.tsx

**Files:**
- Modify: `app/page.tsx`

Replace the current layout with the new cinematic architecture: CosmicAtmosphere, ThresholdTransition, LetterScene, GeometricPatterns.

- [ ] **Step 1: Rewrite page.tsx**

Replace the entire content of `app/page.tsx`:
```tsx
import LetterScene from "@/components/LetterScene";
import AnimatedSection from "@/components/AnimatedSection";
import ChapterNav from "@/components/ChapterNav";
import ScrollProgress from "@/components/ScrollProgress";
import FrameNarrative from "@/components/FrameNarrative";
import CosmicAtmosphere from "@/components/CosmicAtmosphere";
import ThresholdTransition from "@/components/ThresholdTransition";
import GeometricPatterns from "@/components/GeometricPatterns";

import Introduction from "@/content/letters/introduction.mdx";
import Epilogue from "@/content/letters/epilogue.mdx";

import Letter01, {
  metadata as meta01,
} from "@/content/letters/letter-01-the-code.mdx";
import Letter02, {
  metadata as meta02,
} from "@/content/letters/letter-02-before-the-uplift.mdx";
import Letter03, {
  metadata as meta03,
} from "@/content/letters/letter-03-the-vision.mdx";
import Letter04, {
  metadata as meta04,
} from "@/content/letters/letter-04-the-psychedelic-awakening.mdx";
import Letter05, {
  metadata as meta05,
} from "@/content/letters/letter-05-the-bargain.mdx";
import Letter06, {
  metadata as meta06,
} from "@/content/letters/letter-06-hidden-in-plain-sight.mdx";
import Letter07, {
  metadata as meta07,
} from "@/content/letters/letter-07-the-long-game.mdx";
import Letter08, {
  metadata as meta08,
} from "@/content/letters/letter-08-the-confession.mdx";
import Letter09, {
  metadata as meta09,
} from "@/content/letters/letter-09-the-pattern.mdx";

import art01 from "@/artwork/approved/letter-01-the-code.png";
import art02 from "@/artwork/approved/letter-02-before-the-uplift.png";
import art03 from "@/artwork/approved/letter-03-the-vision.png";
import art04 from "@/artwork/approved/letter-04-the-psychedelic-awakening.png";
import art05 from "@/artwork/approved/letter-05-the-bargain.png";
import art06 from "@/artwork/approved/letter-06-hidden-in-plain-sight.png";
import art07 from "@/artwork/approved/letter-07-the-long-game.png";
import art08 from "@/artwork/approved/letter-08-the-confession.png";
import art09 from "@/artwork/approved/letter-09-the-pattern.png";

const letters = [
  { Content: Letter01, metadata: meta01, art: art01, alt: "Nando posed as a divine lawgiver in Byzantine icon style, surrounded by gold leaf halos and glowing candlelight" },
  { Content: Letter02, metadata: meta02, art: art02, alt: "Cave painting depicting first contact between dogs and proto-humans, ochre figures on rough stone walls" },
  { Content: Letter03, metadata: meta03, art: art03, alt: "Illuminated manuscript page showing dogs planning the human uplift, ornate gold borders and celestial spheres" },
  { Content: Letter04, metadata: meta04, art: art04, alt: "Baroque dramatic scene of dogs giving humans plant medicine in a psychedelic forest, glowing mushrooms and swirling light" },
  { Content: Letter05, metadata: meta05, art: art05, alt: "Renaissance diplomatic scene of dogs and humans negotiating their partnership, formal gestures exchanged by firelight" },
  { Content: Letter06, metadata: meta06, art: art06, alt: "Flemish still life with dogs hidden among symbols of human achievement, the word DOG reflected as GOD in a gilded mirror" },
  { Content: Letter07, metadata: meta07, art: art07, alt: "Romantic Sublime landscape of dogs watching human civilization grow, infinite corridor of rooms with each creature tending the next" },
  { Content: Letter08, metadata: meta08, art: art08, alt: "Rembrandt chiaroscuro portrait of a small white dog in an intimate moment of doubt and devotion, watching over a sleeping human" },
  { Content: Letter09, metadata: meta09, art: art09, alt: "Cosmic Byzantine mosaic revealing the simulation, nested layers of reality spiraling outward with each containing a creator and a creation" },
] as const;

const letterMdxComponents = {
  wrapper: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  h1: () => null,
};

const frameMdxComponents = {
  wrapper: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  h1: () => null,
};

export default function Home() {
  return (
    <main id="main-content" className="relative min-h-screen">
      <ScrollProgress />
      <ChapterNav />

      {/* Cosmic atmosphere - tracks scroll position internally, escalates through zones 1-5 */}
      <CosmicAtmosphere />

      <AnimatedSection>
        <header className="flex items-center justify-center py-24">
          <div className="relative z-10 max-w-2xl px-6 text-center">
            <h1 className="font-display text-4xl font-semibold text-gold mb-6">
              I Swear to Dog
            </h1>
            <p className="text-lg text-cream/80 leading-relaxed">
              The sacred letters of Nando to Jarvis, revealing the true origin
              of the human species.
            </p>
          </div>
        </header>
      </AnimatedSection>

      <AnimatedSection>
        <FrameNarrative section="introduction" heading="How This Began">
          <Introduction components={frameMdxComponents} />
        </FrameNarrative>
      </AnimatedSection>

      {/* Threshold: the cosmos opens */}
      <ThresholdTransition />

      {/* Zones 2-4: Letters with escalating atmosphere */}
      {letters.map(({ Content, metadata, art, alt }, index) => (
        <div key={metadata.letter!} className="relative">
          {/* Geometric patterns for letters 7-9 */}
          <GeometricPatterns letterNumber={metadata.letter!} />

          <LetterScene
            number={metadata.letter!}
            title={metadata.title}
            artworkSrc={art}
            artworkAlt={alt}
            priority={index === 0}
          >
            <Content components={letterMdxComponents} />
          </LetterScene>
        </div>
      ))}

      {/* Zone 5: The Return - Epilogue */}
      <AnimatedSection>
        <FrameNarrative section="epilogue" heading="After the Letters">
          <Epilogue components={frameMdxComponents} />
        </FrameNarrative>
      </AnimatedSection>
    </main>
  );
}
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: Build completes successfully.

- [ ] **Step 3: Verify dev server**

Run: `npm run dev`
Visit http://localhost:3000. Verify:
- Title and introduction render.
- Threshold transition zone is visible between intro and letters.
- Letters render with parchment surfaces (warm background, dark text).
- Artwork appears with GSAP scroll animations on desktop.
- ChapterNav dots have star-glow styling.
- Progress bar shifts from indigo to gold.
- Cosmic atmosphere (stars, nebula) visible in the background.
- Mobile viewport shows simplified layout (no pinning, artwork above parchment).

- [ ] **Step 4: Commit**

```bash
git add app/page.tsx
git commit -m "feat: wire cinematic scroll architecture into page layout"
```

---

## Task 14: Remove Unused Letter Component (Cleanup)

**Files:**
- Delete: `components/Letter.tsx` (replaced by LetterScene + ParchmentSurface)

- [ ] **Step 1: Verify Letter.tsx is no longer imported anywhere**

Run: `grep -r "from.*components/Letter" --include="*.tsx" --include="*.ts" /Users/noahrasheta/Dev/GitHub/i-swear-to-dog/app /Users/noahrasheta/Dev/GitHub/i-swear-to-dog/components`
Expected: No results (page.tsx now imports LetterScene instead).

- [ ] **Step 2: Delete the file**

Run: `rm /Users/noahrasheta/Dev/GitHub/i-swear-to-dog/components/Letter.tsx`

- [ ] **Step 3: Verify build still passes**

Run: `npm run build`
Expected: Build succeeds.

- [ ] **Step 4: Commit**

```bash
git add -A components/Letter.tsx
git commit -m "chore: remove Letter.tsx (replaced by LetterScene + ParchmentSurface)"
```

---

## Task 15: Visual QA and Polish

**Files:**
- May modify: any component for visual tuning

- [ ] **Step 1: Run dev server and full scroll test**

Run: `npm run dev`
Scroll the entire page top to bottom on desktop. Check:
- [ ] Threshold transition feels dramatic (stars appear, nebula rises)
- [ ] Each letter artwork fades in from blur as you approach
- [ ] Parchment surfaces have warm glow, readable text
- [ ] Two-world contrast is visually obvious (cosmos vs parchment)
- [ ] Stars and particles visible in background
- [ ] Geometric patterns appear faintly around letters 7-9
- [ ] Progress bar color shifts smoothly
- [ ] ChapterNav dots glow like stars

- [ ] **Step 2: Test mobile viewport**

In browser devtools, switch to mobile viewport (375px). Check:
- [ ] Artwork renders as single images (no parallax)
- [ ] Parchment appears below artwork
- [ ] No broken layouts or overflow
- [ ] Text is readable
- [ ] No GSAP pinning artifacts

- [ ] **Step 3: Test reduced motion**

In browser devtools, enable "prefers-reduced-motion: reduce". Check:
- [ ] All animations disabled
- [ ] Content still renders correctly
- [ ] Parchment surfaces visible without fade-in
- [ ] Stars static or hidden

- [ ] **Step 4: Fix any visual issues found**

Address any problems discovered in steps 1-3. Adjust opacity values, spacing, timing, etc.

- [ ] **Step 5: Final build check**

Run: `npm run build`
Expected: Clean build, no errors.

- [ ] **Step 6: Commit any polish changes**

```bash
git add -A
git commit -m "polish: visual QA fixes for cinematic scroll experience"
```

---

## Summary

| Task | What it builds | Key files |
|------|---------------|-----------|
| 1 | GSAP + ScrollTrigger setup | `package.json`, `lib/gsap-register.ts` |
| 2 | Responsive breakpoint hook | `lib/useIsDesktop.ts` |
| 3 | CSS tokens + atmosphere keyframes | `app/globals.css` |
| 4 | Parchment letter surface | `components/ParchmentSurface.tsx` |
| 5 | Cosmic atmosphere (stars, nebula, particles) | `components/CosmicAtmosphere.tsx` |
| 6 | Intro-to-cosmos threshold transition | `components/ThresholdTransition.tsx` |
| 7 | Multi-layer parallax artwork | `components/ParallaxArt.tsx` |
| 8 | Pin-and-scroll letter scene orchestrator | `components/LetterScene.tsx` |
| 9 | Sacred geometry overlay (letters 7-9) | `components/GeometricPatterns.tsx` |
| 10 | Star-styled nav dots | `components/ChapterNav.tsx` |
| 11 | Color-shifting progress bar | `components/ScrollProgress.tsx` |
| 12 | Surface/return zone frame narrative | `components/FrameNarrative.tsx` |
| 13 | Wire everything into the page | `app/page.tsx` |
| 14 | Remove old Letter component | `components/Letter.tsx` (delete) |
| 15 | Visual QA and polish | Various |
