import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/common/Layout";
import { PageHeader } from "@/components/common/PageHeader";
import { MediaPartnerGrid, SponsorGrid } from "@/components/sponsors/SponsorGrid";
import { buildSeo } from "@/config/site";

export const Route = createFileRoute("/sponsors")({
  head: () =>
    buildSeo({
      title: "Sponsors & Media Partners",
      description:
        "Organisations supporting WCCAUP2027 across platinum, gold, silver, bronze and partner tiers.",
      path: "/sponsors",
    }),
  component: SponsorsPage,
});

function SponsorsPage() {
  return (
    <Layout>
      <PageHeader
        eyebrow="Partnership"
        title="Sponsors & Media Partners"
        description="WCCAUP2027 is made possible by organisations investing in the future of intelligent systems."
      />
      <SponsorGrid />
      <MediaPartnerGrid />
    </Layout>
  );
}
