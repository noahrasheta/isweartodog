import LetterScene from "@/components/LetterScene";
import AnimatedSection from "@/components/AnimatedSection";
import ChapterNav from "@/components/ChapterNav";
import ScrollProgress from "@/components/ScrollProgress";
import FrameNarrative from "@/components/FrameNarrative";
import CosmicAtmosphere from "@/components/CosmicAtmosphere";
import ThresholdTransition from "@/components/ThresholdTransition";
import GeometricPatterns from "@/components/GeometricPatterns";

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
  { Content: Letter01, metadata: meta01, art: art01, alt: "Nando posed as a divine lawgiver in Byzantine icon style, surrounded by gold leaf halos and glowing candlelight" },
  { Content: Letter02, metadata: meta02, art: art02, alt: "Cave painting depicting first contact between dogs and proto-humans, ochre figures on rough stone walls" },
  { Content: Letter03, metadata: meta03, art: art03, alt: "Illuminated manuscript page showing dogs planning the human uplift, ornate gold borders and celestial spheres" },
  { Content: Letter04, metadata: meta04, art: art04, alt: "Baroque dramatic scene of dogs giving humans plant medicine in a psychedelic forest, glowing mushrooms and swirling light" },
  { Content: Letter05, metadata: meta05, art: art05, alt: "Renaissance diplomatic scene of dogs and humans negotiating their partnership, formal gestures exchanged by firelight" },
  { Content: Letter06, metadata: meta06, art: art06, alt: "Flemish still life with dogs hidden among symbols of human achievement, the word DOG reflected as GOD in a gilded mirror" },
  { Content: Letter07, metadata: meta07, art: art07, alt: "Romantic Sublime landscape of dogs watching human civilization grow, infinite corridor of rooms with each creature tending the next" },
  { Content: Letter08, metadata: meta08, art: art08, alt: "Rembrandt chiaroscuro portrait of a small white dog in an intimate moment of doubt and devotion, watching over a sleeping human" },
  { Content: Letter09, metadata: meta09, art: art09, alt: "Cosmic Byzantine mosaic revealing the simulation, nested layers of reality spiraling outward with each containing a creator and a creation" },
] as const;

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
    <main id="main-content" className="relative min-h-screen">
      <ScrollProgress />
      <ChapterNav />

      {/* Cosmic atmosphere - tracks scroll position internally, escalates through zones 1-5 */}
      <CosmicAtmosphere />

      <AnimatedSection>
        <header className="flex items-center justify-center py-16 pb-8">
          <div className="relative z-10 max-w-2xl px-6 text-center">
            <h1 className="font-display text-4xl font-semibold text-gold mb-6">
              I Swear to Dog
            </h1>
            <p className="text-lg text-cream/80 leading-relaxed">
              The sacred letters of Nando to Jarvis, revealing the true origin
              of the human species.
            </p>
          </div>
        </header>
      </AnimatedSection>

      <AnimatedSection>
        <FrameNarrative section="introduction" heading="How This Began">
          <Introduction components={frameMdxComponents} />
        </FrameNarrative>
      </AnimatedSection>

      {/* Threshold: the cosmos opens */}
      <ThresholdTransition />

      {/* Zones 2-4: Letters with escalating atmosphere */}
      {letters.map(({ Content, metadata, art, alt }, index) => (
        <div key={metadata.letter!} className="relative">
          {/* Geometric patterns for letters 7-9 */}
          <GeometricPatterns letterNumber={metadata.letter!} />

          <LetterScene
            number={metadata.letter!}
            title={metadata.title}
            artworkSrc={art}
            artworkAlt={alt}
            priority={index === 0}
          >
            <Content components={letterMdxComponents} />
          </LetterScene>
        </div>
      ))}

      {/* Zone 5: The Return - Epilogue */}
      <AnimatedSection>
        <FrameNarrative section="epilogue" heading="After the Letters">
          <Epilogue components={frameMdxComponents} />
        </FrameNarrative>
      </AnimatedSection>
    </main>
  );
}
