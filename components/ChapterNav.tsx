'use client';

import { useEffect, useState, useCallback } from 'react';

const LETTERS = [
  { number: 1, title: 'The Code' },
  { number: 2, title: 'Before the Uplift' },
  { number: 3, title: 'The Vision' },
  { number: 4, title: 'The Psychedelic Awakening' },
  { number: 5, title: 'The Bargain' },
  { number: 6, title: 'Hidden in Plain Sight' },
  { number: 7, title: 'The Long Game' },
  { number: 8, title: 'The Confession' },
  { number: 9, title: 'The Pattern' },
];

export default function ChapterNav() {
  const [activeIndex, setActiveIndex] = useState(-1);
  const [mounted, setMounted] = useState(false);
  const [presentSections, setPresentSections] = useState<Set<number>>(
    new Set(),
  );

  useEffect(() => {
    setMounted(true);

    const sectionEls: HTMLElement[] = [];
    const visibilityMap = new Map<string, boolean>();
    const found = new Set<number>();

    for (const letter of LETTERS) {
      const el = document.getElementById(`letter-${letter.number}`);
      if (el) {
        sectionEls.push(el);
        visibilityMap.set(el.id, false);
        found.add(letter.number);
      }
    }

    setPresentSections(found);

    if (sectionEls.length === 0) return;

    const updateActive = () => {
      for (let i = 0; i < sectionEls.length; i++) {
        if (visibilityMap.get(sectionEls[i].id)) {
          setActiveIndex(
            LETTERS.findIndex(
              (l) => `letter-${l.number}` === sectionEls[i].id,
            ),
          );
          return;
        }
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          visibilityMap.set(entry.target.id, entry.isIntersecting);
        }
        updateActive();
      },
      {
        rootMargin: '-20% 0px -20% 0px',
        threshold: 0,
      },
    );

    for (const el of sectionEls) {
      observer.observe(el);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const scrollTo = useCallback((number: number) => {
    const el = document.getElementById(`letter-${number}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      window.history.replaceState(null, '', `#letter-${number}`);
    }
  }, []);

  if (!mounted) return null;

  return (
    <nav
      aria-label="Letter navigation"
      className="fixed right-4 top-1/2 z-50 -translate-y-1/2 transition-opacity duration-500 md:right-6"
      style={{ opacity: activeIndex >= 0 ? 1 : 0 }}
    >
      <ol className="flex flex-col items-center gap-3">
        {LETTERS.map((letter, i) => {
          const isActive = i === activeIndex;
          const exists = presentSections.has(letter.number);

          if (!exists) {
            return (
              <li key={letter.number}>
                <span
                  className="block h-2 w-2 rounded-full bg-cream/10"
                  aria-hidden="true"
                />
              </li>
            );
          }

          return (
            <li key={letter.number}>
              <button
                onClick={() => scrollTo(letter.number)}
                aria-label={`Letter ${letter.number}: ${letter.title}`}
                title={`Letter ${letter.number}: ${letter.title}`}
                className="group relative flex items-center justify-center p-1 rounded-full focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-2"
              >
                <span
                  className={`block rounded-full transition-all duration-300 ${
                    isActive
                      ? 'h-3 w-3 bg-white shadow-[0_0_12px_4px_rgba(255,255,255,0.3)]'
                      : 'h-2 w-2 bg-white/30 group-hover:bg-white/60 group-hover:shadow-[0_0_6px_2px_rgba(255,255,255,0.15)]'
                  }`}
                />
                <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-md bg-parchment-surface/95 px-2.5 py-1 font-ui text-xs text-parchment-text opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100">
                  {letter.title}
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
