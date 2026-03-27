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

      tl.fromTo(
        ".threshold-vignette",
        { opacity: 0 },
        { opacity: 1, duration: 0.5 },
        0
      );

      tl.fromTo(
        ".threshold-stars",
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.8 },
        0.1
      );

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
      className="relative h-[8vh] md:h-[12vh]"
      aria-hidden="true"
    >
      <div className="threshold-vignette absolute inset-0 opacity-0"
        style={{
          background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.6) 100%)",
        }}
      />

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

      <div
        className="threshold-nebula absolute inset-0 opacity-0"
        style={{
          background: "radial-gradient(ellipse at 50% 80%, rgba(49,46,129,0.3) 0%, transparent 70%)",
        }}
      />
    </div>
  );
}
