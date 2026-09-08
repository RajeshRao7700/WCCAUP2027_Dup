import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/common/Layout";
import { PageHeader } from "@/components/common/PageHeader";
import { Section } from "@/components/common/Section";
import { QueryBoundary } from "@/components/common/States";
import { useUpdates } from "@/hooks/useConferenceData";
import { formatDate } from "@/lib/format";
import { buildSeo } from "@/config/site";

export const Route = createFileRoute("/updates")({
  head: () =>
    buildSeo({
      title: "Conference Updates",
      description:
        "Latest WCCAUP2027 announcements: registration, deadlines, speakers and programme releases.",
      path: "/updates",
    }),
  component: UpdatesPage,
});

function UpdatesPage() {
  const query = useUpdates();

  return (
    <Layout>
      <PageHeader
        eyebrow="News"
        title="Conference Updates"
        description="Announcements from the WCCAUP2027 organising committee."
      />
      <Section>
        <QueryBoundary
          query={query}
          loadingLabel="Loading updates…"
          emptyMessage="Conference updates will appear here."
          isEmpty={(updates) => updates.length === 0}
        >
          {(updates) => (
            <ul className="mx-auto max-w-3xl space-y-5">
              {updates.map((update) => (
                <li
                  key={update.id}
                  className="card-lift rounded-xl border border-border bg-card p-7"
                >
                  <div className="flex flex-wrap items-center gap-3">
                    <time dateTime={update.publishedAt} className="text-sm text-muted-foreground">
                      {formatDate(update.publishedAt)}
                    </time>
                    {update.tag ? (
                      <span className="rounded-full border border-border px-3 py-0.5 text-[0.65rem] font-semibold uppercase tracking-widest text-primary">
                        {update.tag}
                      </span>
                    ) : null}
                  </div>
                  <h2 className="mt-3 text-lg font-semibold">{update.title}</h2>
                  <p className="mt-2 leading-relaxed text-muted-foreground">{update.body}</p>
                </li>
              ))}
            </ul>
          )}
        </QueryBoundary>
      </Section>
    </Layout>
  );
}
