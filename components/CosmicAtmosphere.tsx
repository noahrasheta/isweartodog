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
      if (progress < 0.08) setZone(1);
      else if (progress < 0.35) setZone(2);
      else if (progress < 0.65) setZone(3);
      else if (progress < 0.92) setZone(4);
      else setZone(5);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return zone;
}

export default function CosmicAtmosphere() {
  const zone = useCurrentZone();
  const distantStars = useMemo(() => generateStars(80, [1, 2], 42), []);
  const midStars = useMemo(() => generateStars(30, [2, 3], 137), []);
  const nearStars = useMemo(() => generateStars(10, [3, 5], 256), []);

  const nebulaColors = {
    1: "from-transparent via-transparent to-transparent",
    2: "from-indigo-950/30 via-violet-950/20 to-transparent",
    3: "from-indigo-950/40 via-violet-950/30 to-amber-950/20",
    4: "from-violet-950/40 via-amber-950/30 to-gold/10",
    5: "from-indigo-950/20 via-transparent to-transparent",
  };

  return (
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
      <StarLayer stars={distantStars} className="opacity-60" />

      {zone >= 2 && <StarLayer stars={midStars} className="opacity-70" />}

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

      <div
        className={`absolute inset-0 bg-gradient-to-b ${nebulaColors[zone]} transition-all duration-[3000ms]`}
      />

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
