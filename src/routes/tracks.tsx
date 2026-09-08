import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/common/Layout";
import { PageHeader } from "@/components/common/PageHeader";
import { TracksSection } from "@/components/conference/TracksSection";
import { CallForPapersCTA } from "@/components/conference/CTASections";
import { buildSeo } from "@/config/site";

export const Route = createFileRoute("/tracks")({
  head: () =>
    buildSeo({
      title: "Conference Tracks",
      description:
        "Explore the WCCAUP2027 tracks: foundation models, agentic systems, multimodal AI, governance, enterprise adoption and more.",
      path: "/tracks",
    }),
  component: TracksPage,
});

function TracksPage() {
  return (
    <Layout>
      <PageHeader
        eyebrow="Scientific Programme"
        title="Conference Tracks"
        description="Submissions are reviewed within the following thematic tracks."
      />
      <TracksSection showHeader={false} />
      <CallForPapersCTA />
    </Layout>
  );
}
