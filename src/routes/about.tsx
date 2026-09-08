import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/common/Layout";
import { PageHeader } from "@/components/common/PageHeader";
import { AboutSection } from "@/components/conference/AboutSection";
import { WhyAttend } from "@/components/conference/WhyAttend";
import { AttendeesFrom } from "@/components/conference/AttendeesFrom";
import { CallForPapersCTA } from "@/components/conference/CTASections";
import { buildSeo } from "@/config/site";

export const Route = createFileRoute("/about")({
  head: () =>
    buildSeo({
      title: "About the Conference",
      description:
        "About WCCAUP2027: the scope, themes and community behind the International Conference on Generative AI & Agentic AI.",
      path: "/about",
    }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <Layout>
      <PageHeader
        eyebrow="About"
        title="About WCCAUP2027"
        description="An international forum for generative and agentic intelligence, bridging research advances and real deployment experience."
      />
      <AboutSection />
      <WhyAttend />
      <AttendeesFrom />
      <CallForPapersCTA />
    </Layout>
  );
}
