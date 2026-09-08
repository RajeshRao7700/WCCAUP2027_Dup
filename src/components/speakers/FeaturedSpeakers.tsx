import { Link } from "@tanstack/react-router";
import { Section } from "@/components/common/Section";
import { SectionHeader } from "@/components/common/SectionHeader";
import { QueryBoundary } from "@/components/common/States";
import { SpeakerCard } from "./SpeakerCard";
import { Button } from "@/components/ui/button";
import { useSpeakers } from "@/hooks/useConferenceData";

export function FeaturedSpeakers() {
  const query = useSpeakers();

  return (
    <Section tone="light" id="speakers">
      <SectionHeader
        eyebrow="Programme"
        title="Featured Speakers"
        description="Keynote, plenary and invited voices from research institutions and industry."
      />
      <div className="mt-14">
        <QueryBoundary
          query={query}
          loadingLabel="Loading speakers…"
          emptyMessage="Speaker announcements coming soon."
          isEmpty={(speakers) => speakers.length === 0}
        >
          {(speakers) => (
            <>
              <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {speakers.slice(0, 6).map((speaker) => (
                  <SpeakerCard key={speaker.id} speaker={speaker} />
                ))}
              </ul>
              <div className="mt-10 text-center">
                <Button asChild variant="outline">
                  <Link to="/speakers">View all speakers</Link>
                </Button>
              </div>
            </>
          )}
        </QueryBoundary>
      </div>
    </Section>
  );
}
