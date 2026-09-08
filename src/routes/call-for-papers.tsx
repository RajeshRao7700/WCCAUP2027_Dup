import { createFileRoute, Link } from "@tanstack/react-router";

import { Layout } from "@/components/common/Layout";
import { PageHeader } from "@/components/common/PageHeader";
import { Section } from "@/components/common/Section";
import { SectionHeader } from "@/components/common/SectionHeader";
import { TracksSection } from "@/components/conference/TracksSection";
import { ImportantDateTimeline } from "@/components/conference/ImportantDateTimeline";
import { Button } from "@/components/ui/button";
import { buildSeo } from "@/config/site";

export const Route = createFileRoute("/call-for-papers")({
  head: () =>
    buildSeo({
      title: "Call for Papers",
      description:
        "WCCAUP2027 call for papers: scope, topics, submission guidelines, presentation types and abstract deadlines.",
      path: "/call-for-papers",
    }),
  component: CallForPapersPage,
});

const guidelines = [
  "Abstracts must be original and not previously published elsewhere.",
  "Submissions are limited to 400 words, excluding title, authors and references.",
  "Include up to six keywords describing the contribution.",
  "Each abstract is reviewed by at least two members of the programme committee.",
  "At least one author must register for the conference upon acceptance.",
];

const presentationTypes = [
  {
    code: "ORAL",
    label: "Oral Presentation",
    description: "20-minute talk followed by moderated questions.",
  },
  {
    code: "POSTER",
    label: "Poster Presentation",
    description: "Displayed across a dedicated poster session.",
  },
  {
    code: "WORKSHOP",
    label: "Workshop",
    description: "Half or full-day instructor-led practical session.",
  },
  {
    code: "OTHER",
    label: "Other",
    description: "Demonstrations, tutorials and community sessions.",
  },
];

function CallForPapersPage() {
  return (
    <Layout>
      <PageHeader
        eyebrow="Submissions"
        title="Call for Papers"
        description="Contribute original research, applied work and practical experience across generative and agentic AI."
      />

      <Section>
        <div className="grid gap-14 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <SectionHeader eyebrow="Scope" title="Conference Scope" align="left" />
            <p className="mt-8 leading-relaxed text-muted-foreground">
              WCCAUP2027 invites contributions advancing the theory, engineering and responsible
              deployment of generative and agentic intelligence. We welcome empirical studies,
              systems papers, negative results, evaluation methodology and deployment case studies
              from industry and the public sector.
            </p>
            <h3 className="mt-10 text-lg font-semibold">Submission Guidelines</h3>
            <ul className="mt-4 space-y-3">
              {guidelines.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                  <span
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
                    style={{ backgroundImage: "var(--gradient-accent)" }}
                    aria-hidden="true"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="eyebrow text-primary">Presentation Types</h2>
            <ul className="mt-6 space-y-4">
              {presentationTypes.map((type) => (
                <li
                  key={type.code}
                  className="card-lift rounded-xl border border-border bg-card p-6"
                >
                  <h3 className="text-base font-semibold">{type.label}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{type.description}</p>
                </li>
              ))}
            </ul>
            <Button asChild size="lg" className="mt-8 w-full">
              <Link to="/submit-abstract">Submit Abstract</Link>
            </Button>
          </div>
        </div>
      </Section>

      <TracksSection />
      <ImportantDateTimeline />
    </Layout>
  );
}
