import { type ReactNode } from "react";

interface FrameNarrativeProps {
  /** "introduction" or "epilogue" — sets the section id and aria label */
  section: "introduction" | "epilogue";
  /** Optional heading displayed above the narrative */
  heading?: string;
  /** MDX content or other React children */
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
      className={`py-20 md:py-28 ${isEpilogue ? "pt-32 md:pt-40" : "pb-12 md:pb-16"}`}
    >
      <div className="mx-auto max-w-2xl px-6">
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
