import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/common/Layout";
import { PageHeader } from "@/components/common/PageHeader";
import { Section } from "@/components/common/Section";
import { buildSeo } from "@/config/site";

export const Route = createFileRoute("/terms")({
  head: () =>
    buildSeo({
      title: "Terms & Conditions",
      description: "Terms governing registration, participation and submissions at WCCAUP2027.",
      path: "/terms",
    }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <Layout>
      <PageHeader eyebrow="Legal" title="Terms & Conditions" />
      <Section>
        <div className="mx-auto max-w-3xl space-y-6 text-muted-foreground">
          <p>
            These placeholder terms will be replaced with the final conditions issued by the
            conference organisers.
          </p>
          <h2 className="text-xl font-semibold text-foreground">Registration</h2>
          <p>
            Registration is confirmed once payment is received and acknowledged by the conference
            secretariat. Registrations are personal and may be transferred only with written
            approval.
          </p>
          <h2 className="text-xl font-semibold text-foreground">Submissions</h2>
          <p>
            Authors confirm that submitted work is original and that they hold the rights necessary
            to present it at the conference.
          </p>
          <h2 className="text-xl font-semibold text-foreground">Programme changes</h2>
          <p>
            The organisers may adjust the programme, speakers or format where circumstances require,
            and will publish any changes on this website.
          </p>
        </div>
      </Section>
    </Layout>
  );
}
