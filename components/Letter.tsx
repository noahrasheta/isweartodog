import { type ReactNode } from "react";
import { type StaticImageData } from "next/image";
import LetterArt from "@/components/LetterArt";

interface LetterProps {
  number: number;
  title: string;
  artworkSrc: string | StaticImageData;
  artworkAlt: string;
  blurDataURL?: string;
  priority?: boolean;
  sizes?: string;
  children: ReactNode;
}

export default function Letter({
  number,
  title,
  artworkSrc,
  artworkAlt,
  blurDataURL,
  priority = false,
  sizes,
  children,
}: LetterProps) {
  return (
    <section
      id={`letter-${number}`}
      aria-label={`Letter ${number}: ${title}`}
      className="py-24 first:pt-16 last:pb-32 md:py-32"
    >
      <header className="mx-auto mb-8 max-w-3xl px-6 text-center">
        <p className="font-ui text-sm uppercase tracking-widest text-gold-muted">
          Letter {number}
        </p>
        <h2 className="font-display mt-2 text-3xl font-semibold tracking-tight text-gold md:text-4xl">
          {title}
        </h2>
      </header>

      <LetterArt
        src={artworkSrc}
        alt={artworkAlt}
        blurDataURL={blurDataURL}
        priority={priority}
        sizes={sizes}
      />

      <article className="mx-auto max-w-3xl px-6">
        <div className="prose prose-invert prose-lg prose-headings:font-display prose-headings:text-gold prose-p:text-cream prose-p:leading-relaxed prose-a:text-gold prose-a:no-underline hover:prose-a:underline focus-visible:prose-a:outline-2 focus-visible:prose-a:outline-gold focus-visible:prose-a:outline-offset-2 prose-strong:text-cream prose-blockquote:border-gold-dim prose-blockquote:text-cream/80">
          {children}
        </div>
      </article>
    </section>
  );
}
