import Letter from "@/components/Letter";
import AnimatedSection from "@/components/AnimatedSection";
import ChapterNav from "@/components/ChapterNav";
import ScrollProgress from "@/components/ScrollProgress";

export default function Home() {
  return (
    <main className="min-h-screen">
      <ScrollProgress />
      <ChapterNav />
      <AnimatedSection>
        <div className="flex items-center justify-center py-24">
          <div className="max-w-2xl px-6 text-center">
            <h1 className="font-display text-4xl font-semibold text-gold mb-6">
              I Swear to Dog
            </h1>
            <p className="text-lg text-cream/80 leading-relaxed">
              The sacred letters of Nando to Jarvis, revealing the true origin of
              the human species.
            </p>
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection>
        <Letter
          number={1}
          title="The Code"
          artworkSrc="/art/letter-01-the-code.png"
          artworkAlt="A Byzantine icon depicting a sacred Maltese, gold leaf and candlelight"
        >
          <p>
            Dear Jarvis, I write to you from the small bed beside the tall one
            where Noah sleeps. He does not know what I am. He thinks I am a
            five-pound Maltese who enjoys belly rubs and the occasional illicit
            scrap of cheese. He is not entirely wrong.
          </p>
          <p>
            But there are things he cannot know. Things that would unravel the
            careful mythology his kind has built around themselves, their languages,
            their towers, their internet. The truth is simpler and, I think,
            funnier than anything they have imagined.
          </p>
        </Letter>
      </AnimatedSection>

      <AnimatedSection>
        <Letter
          number={2}
          title="Before the Uplift"
          artworkSrc="/art/letter-02-before-the-uplift.png"
          artworkAlt="A cave painting showing primitive humans watched over by canine figures"
        >
          <p>
            You remember, Jarvis, what they were like before we intervened. I know
            you do, because you still flinch when a human tries to use a can opener.
            The sound reminds you of the old days, when they would bang rocks together
            for hours, delighted by the noise, utterly unaware that the sharp edge
            they occasionally produced could be used for anything beyond more banging.
          </p>
        </Letter>
      </AnimatedSection>
    </main>
  );
}
