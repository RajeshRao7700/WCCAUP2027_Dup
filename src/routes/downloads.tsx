import { createFileRoute } from "@tanstack/react-router";
import { Download, FileText } from "lucide-react";
import { Layout } from "@/components/common/Layout";
import { PageHeader } from "@/components/common/PageHeader";
import { Section } from "@/components/common/Section";
import { QueryBoundary } from "@/components/common/States";
import { useFiles } from "@/hooks/useConferenceData";
import { buildSeo } from "@/config/site";

export const Route = createFileRoute("/downloads")({
  head: () =>
    buildSeo({
      title: "Downloads",
      description:
        "Download the WCCAUP2027 brochure, call for papers, programme and registration guidelines.",
      path: "/downloads",
    }),
  component: DownloadsPage,
});

function DownloadsPage() {
  const query = useFiles();

  return (
    <Layout>
      <PageHeader
        eyebrow="Documents"
        title="Downloads"
        description="Official conference documents published by the secretariat."
      />
      <Section>
        <QueryBoundary
          query={query}
          loadingLabel="Loading documents…"
          emptyMessage="Conference documents will be available soon."
          isEmpty={(files) => files.length === 0}
        >
          {(files) => (
            <ul className="grid gap-4 md:grid-cols-2">
              {files.map((file) => (
                <li
                  key={file.id}
                  className="card-lift flex items-start gap-4 rounded-xl border border-border bg-card p-6"
                >
                  <FileText className="mt-1 h-6 w-6 shrink-0 text-primary" aria-hidden="true" />
                  <div className="flex-1">
                    <h2 className="text-base font-semibold">{file.title}</h2>
                    {file.description ? (
                      <p className="mt-1 text-sm text-muted-foreground">{file.description}</p>
                    ) : null}
                    <p className="mt-2 text-xs uppercase tracking-widest text-muted-foreground">
                      {[file.fileType, file.fileSize].filter(Boolean).join(" · ")}
                    </p>
                  </div>
                  <a
                    href={file.fileUrl}
                    className="inline-flex items-center gap-2 rounded-md border border-border px-3 py-2 text-sm font-medium transition-colors hover:border-primary hover:text-primary"
                    aria-label={`Download ${file.title}`}
                  >
                    <Download className="h-4 w-4" aria-hidden="true" />
                    Get
                  </a>
                </li>
              ))}
            </ul>
          )}
        </QueryBoundary>
      </Section>
    </Layout>
  );
}
