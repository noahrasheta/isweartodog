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
