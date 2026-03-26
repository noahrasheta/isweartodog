"use client";

import { useRef, useEffect } from "react";
import Image, { type StaticImageData } from "next/image";
import { gsap, ScrollTrigger } from "@/lib/gsap-register";

interface ArtLayer {
  src: StaticImageData | string;
  speed: number;
}

interface ParallexArtProps {
  layers: ArtLayer[];
  alt: string;
  priority?: boolean;
}

export default function ParallaxArt({
  layers,
  alt,
  priority = false,
}: ParallexArtProps) {
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
