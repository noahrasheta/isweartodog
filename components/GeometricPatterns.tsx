"use client";

import { useRef, useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap-register";

interface GeometricPatternsProps {
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
