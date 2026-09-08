import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/common/Layout";
import { PageHeader } from "@/components/common/PageHeader";
import { Section } from "@/components/common/Section";
import { QueryBoundary } from "@/components/common/States";
import { SpeakerGrid } from "@/components/speakers/SpeakerGrid";
import { useSpeakers } from "@/hooks/useConferenceData";
import { buildSeo } from "@/config/site";

export const Route = createFileRoute("/speakers/")({
  head: () =>
    buildSeo({
      title: "Speakers",
      description:
        "Meet the keynote, plenary, invited and featured speakers presenting at WCCAUP2027.",
      path: "/speakers",
    }),
  component: SpeakersPage,
});

function SpeakersPage() {
  const query = useSpeakers();

  return (
    <Layout>
      <PageHeader
        eyebrow="Programme"
        title="Speakers"
        description="Filter by category to explore the WCCAUP2027 speaker programme."
      />
      <Section>
        <QueryBoundary
          query={query}
          loadingLabel="Loading speakers…"
          emptyMessage="Speaker announcements coming soon."
          isEmpty={(speakers) => speakers.length === 0}
        >
          {(speakers) => <SpeakerGrid speakers={speakers} />}
        </QueryBoundary>
      </Section>
    </Layout>
  );
}
