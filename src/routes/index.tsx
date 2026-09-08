import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/common/Layout";
import { HeroSection } from "@/components/conference/HeroSection";
import { ConferenceHighlights } from "@/components/conference/ConferenceHighlights";
import { AboutSection } from "@/components/conference/AboutSection";
import { WhyAttend } from "@/components/conference/WhyAttend";
import { TracksSection } from "@/components/conference/TracksSection";
import { ImportantDateTimeline } from "@/components/conference/ImportantDateTimeline";
import { FeaturedSpeakers } from "@/components/speakers/FeaturedSpeakers";
import { WorkshopSection } from "@/components/conference/WorkshopSection";
import { AttendeesFrom } from "@/components/conference/AttendeesFrom";
import { MediaPartnerGrid, SponsorGrid } from "@/components/sponsors/SponsorGrid";
import { CallForPapersCTA, RegistrationCTA } from "@/components/conference/CTASections";
import { VenueSection } from "@/components/conference/VenueSection";
import { ContactSection } from "@/components/conference/ContactSection";
import { buildSeo } from "@/config/site";

export const Route = createFileRoute("/")({
  head: () =>
    buildSeo({
      title: "International Conference on Generative AI & Agentic AI",
      description:
        "WCCAUP2027 brings together researchers, engineers and industry leaders advancing generative intelligence, autonomous agents and foundation models.",
      path: "/",
    }),
  component: HomePage,
});

function HomePage() {
  return (
    <Layout>
      <HeroSection />
      <ConferenceHighlights />
      <AboutSection />
      <WhyAttend />
      <TracksSection />
      <ImportantDateTimeline />
      <FeaturedSpeakers />
      <WorkshopSection />
      <AttendeesFrom />
      <SponsorGrid />
      <MediaPartnerGrid />
      <RegistrationCTA />
      <CallForPapersCTA />
      <VenueSection compact />
      <ContactSection />
    </Layout>
  );
}
