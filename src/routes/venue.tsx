import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/common/Layout";
import { PageHeader } from "@/components/common/PageHeader";
import { VenueSection } from "@/components/conference/VenueSection";
import { buildSeo } from "@/config/site";

export const Route = createFileRoute("/venue")({
  head: () =>
    buildSeo({
      title: "Venue & Travel",
      description:
        "Venue address, transportation, airport access and travel guidance for WCCAUP2027 delegates.",
      path: "/venue",
    }),
  component: VenuePage,
});

function VenuePage() {
  return (
    <Layout>
      <PageHeader
        eyebrow="Location"
        title="Venue & Travel"
        description="Everything you need to plan your journey to the conference."
      />
      <VenueSection />
    </Layout>
  );
}
