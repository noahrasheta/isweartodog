import Letter from "@/components/Letter";
import AnimatedSection from "@/components/AnimatedSection";
import ChapterNav from "@/components/ChapterNav";
import ScrollProgress from "@/components/ScrollProgress";
import FrameNarrative from "@/components/FrameNarrative";

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
  {
    Content: Letter01,
    metadata: meta01,
    art: art01,
    alt: "A Byzantine icon depicting a sacred Maltese, gold leaf and candlelight",
  },
  {
    Content: Letter02,
    metadata: meta02,
    art: art02,
    alt: "A cave painting showing primitive humans watched over by canine figures",
  },
  {
    Content: Letter03,
    metadata: meta03,
    art: art03,
    alt: "A luminous dog gazing upward at layered celestial spheres",
  },
  {
    Content: Letter04,
    metadata: meta04,
    art: art04,
    alt: "Psychedelic forest scene with glowing mushrooms and awakening dogs",
  },
  {
    Content: Letter05,
    metadata: meta05,
    art: art05,
    alt: "Two silhouettes by a fire, one human and one dog, under a vast sky",
  },
  {
    Content: Letter06,
    metadata: meta06,
    art: art06,
    alt: "The word DOG reflected as GOD in a gilded mirror",
  },
  {
    Content: Letter07,
    metadata: meta07,
    art: art07,
    alt: "An infinite corridor of rooms, each with a smaller creature tending a larger one",
  },
  {
    Content: Letter08,
    metadata: meta08,
    art: art08,
    alt: "A small white dog staring intently at a sleeping human in blue light",
  },
  {
    Content: Letter09,
    metadata: meta09,
    art: art09,
    alt: "Nested layers of reality spiraling outward, each containing a creator and a creation",
  },
] as const;

/**
 * Override the default MDX wrapper (from mdx-components.tsx) so content
 * flows directly into the parent Letter/FrameNarrative containers, which
 * already provide their own typography and layout styles.
 * Also hide h1 headings since Letter renders its own header.
 */
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
    <main id="main-content" className="min-h-screen">
      <ScrollProgress />
      <ChapterNav />

      {/* Title */}
      <AnimatedSection>
        <div className="flex items-center justify-center py-24">
          <div className="max-w-2xl px-6 text-center">
            <h1 className="font-display text-4xl font-semibold text-gold mb-6">
              I Swear to Dog
            </h1>
            <p className="text-lg text-cream/80 leading-relaxed">
              The sacred letters of Nando to Jarvis, revealing the true origin
              of the human species.
            </p>
          </div>
        </div>
      </AnimatedSection>

      {/* Introduction */}
      <AnimatedSection>
        <FrameNarrative section="introduction" heading="How This Began">
          <Introduction components={frameMdxComponents} />
        </FrameNarrative>
      </AnimatedSection>

      {/* Letters 1-9 */}
      {letters.map(({ Content, metadata, art, alt }, index) => (
        <AnimatedSection key={metadata.letter!}>
          <Letter
            number={metadata.letter!}
            title={metadata.title}
            artworkSrc={art}
            artworkAlt={alt}
            priority={index === 0}
            sizes="(max-width: 768px) 100vw, 768px"
          >
            <Content components={letterMdxComponents} />
          </Letter>
        </AnimatedSection>
      ))}

      {/* Epilogue */}
      <AnimatedSection>
        <FrameNarrative section="epilogue" heading="After the Letters">
          <Epilogue components={frameMdxComponents} />
        </FrameNarrative>
      </AnimatedSection>
    </main>
  );
}
