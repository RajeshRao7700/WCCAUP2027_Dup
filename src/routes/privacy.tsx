import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/common/Layout";
import { PageHeader } from "@/components/common/PageHeader";
import { Section } from "@/components/common/Section";
import { buildSeo } from "@/config/site";

export const Route = createFileRoute("/privacy")({
  head: () =>
    buildSeo({
      title: "Privacy Policy",
      description: "How WCCAUP2027 collects, uses and protects delegate and author information.",
      path: "/privacy",
    }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <Layout>
      <PageHeader eyebrow="Legal" title="Privacy Policy" />
      <Section>
        <div className="mx-auto max-w-3xl space-y-6 text-muted-foreground">
          <p>
            This placeholder policy will be replaced with the final text issued by the conference
            organisers before registration opens publicly.
          </p>
          <h2 className="text-xl font-semibold text-foreground">Information we collect</h2>
          <p>
            We collect the details you provide when registering, submitting an abstract or
            contacting the secretariat: name, contact details, organisation and submission content.
          </p>
          <h2 className="text-xl font-semibold text-foreground">How information is used</h2>
          <p>
            Information is used solely to administer the conference — reviewing submissions,
            processing registrations and sending programme communications. Payment processing is
            handled by the conference payment provider; the website does not store payment
            credentials.
          </p>
          <h2 className="text-xl font-semibold text-foreground">Your rights</h2>
          <p>
            You may request access to, correction of, or deletion of your personal information by
            contacting the conference secretariat.
          </p>
        </div>
      </Section>
    </Layout>
  );
}
