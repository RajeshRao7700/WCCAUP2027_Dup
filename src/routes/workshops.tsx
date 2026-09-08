import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/common/Layout";
import { PageHeader } from "@/components/common/PageHeader";
import { WorkshopSection } from "@/components/conference/WorkshopSection";
import { RegistrationCTA } from "@/components/conference/CTASections";
import { buildSeo } from "@/config/site";

export const Route = createFileRoute("/workshops")({
  head: () =>
    buildSeo({
      title: "Workshops",
      description:
        "Hands-on WCCAUP2027 workshops on production agent systems, evaluation and responsible AI.",
      path: "/workshops",
    }),
  component: WorkshopsPage,
});

function WorkshopsPage() {
  return (
    <Layout>
      <PageHeader
        eyebrow="Hands-on"
        title="Workshops"
        description="Practical sessions running alongside the main conference programme."
      />
      <WorkshopSection />
      <RegistrationCTA />
    </Layout>
  );
}
