import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/common/Layout";
import { PageHeader } from "@/components/common/PageHeader";
import { Section } from "@/components/common/Section";
import { QueryBoundary } from "@/components/common/States";
import { CommitteeCard } from "@/components/committee/CommitteeCard";
import { useCommittee } from "@/hooks/useConferenceData";
import { buildSeo } from "@/config/site";

export const Route = createFileRoute("/committee")({
  head: () =>
    buildSeo({
      title: "Organising Committee",
      description:
        "The core committee responsible for the WCCAUP2027 scientific and organising programme.",
      path: "/committee",
    }),
  component: CommitteePage,
});

function CommitteePage() {
  const query = useCommittee();

  return (
    <Layout>
      <PageHeader
        eyebrow="Governance"
        title="Core Committee"
        description="The researchers and practitioners shaping the WCCAUP2027 programme."
      />
      <Section>
        <QueryBoundary
          query={query}
          loadingLabel="Loading committee…"
          emptyMessage="Committee members will be announced soon."
          isEmpty={(members) => members.length === 0}
        >
          {(members) => (
            <ul className="grid gap-6 lg:grid-cols-2">
              {members.map((member) => (
                <CommitteeCard key={member.id} member={member} />
              ))}
            </ul>
          )}
        </QueryBoundary>
      </Section>
    </Layout>
  );
}
