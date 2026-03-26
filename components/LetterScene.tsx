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

  return (
    <section
      ref={sceneRef}
      id={`letter-${number}`}
      aria-label={`Letter ${number}: ${title}`}
      className="relative py-32"
    >
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

      <div ref={parchmentRef} className="relative z-10 px-6 opacity-0">
        <ParchmentSurface number={number} title={title}>
          {children}
        </ParchmentSurface>
      </div>
    </section>
  );
}
