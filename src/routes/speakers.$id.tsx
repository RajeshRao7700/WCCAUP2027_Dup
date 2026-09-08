import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Share2 } from "lucide-react";
import { Layout } from "@/components/common/Layout";
import { Section } from "@/components/common/Section";
import { EmptyState, ErrorState, LoadingState } from "@/components/common/States";
import { Button } from "@/components/ui/button";
import { useSpeaker } from "@/hooks/useConferenceData";
import { initialsOf, speakerCategoryLabels } from "@/lib/format";
import { buildSeo } from "@/config/site";

export const Route = createFileRoute("/speakers/$id")({
  head: ({ params }) =>
    buildSeo({
      title: "Speaker Profile",
      description: "Speaker profile, affiliation and biography for the WCCAUP2027 programme.",
      path: `/speakers/${params.id}`,
    }),
  component: SpeakerDetailPage,
});

function SpeakerDetailPage() {
  const { id } = Route.useParams();
  const { data: speaker, isLoading, error } = useSpeaker(id);

  const share = async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      await navigator
        .share({ title: document.title, url: window.location.href })
        .catch(() => undefined);
    } else if (typeof navigator !== "undefined") {
      await navigator.clipboard?.writeText(window.location.href).catch(() => undefined);
    }
  };

  return (
    <Layout>
      <Section>
        <Link
          to="/speakers"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          All speakers
        </Link>

        <div className="mt-8">
          {isLoading ? <LoadingState label="Loading speaker…" /> : null}
          {error ? <ErrorState error={error} /> : null}
          {!isLoading && !error && !speaker ? (
            <EmptyState message="This speaker profile is not available." />
          ) : null}

          {speaker ? (
            <article className="grid gap-12 lg:grid-cols-[380px_1fr]">
              <div className="overflow-hidden rounded-xl border border-border">
                {speaker.photoUrl ? (
                  <img
                    src={speaker.photoUrl}
                    alt={`Portrait of ${speaker.firstName} ${speaker.lastName}`}
                    className="aspect-[3/4] w-full object-cover"
                  />
                ) : (
                  <div className="surface-deep grid aspect-[3/4] w-full place-items-center">
                    <span className="text-5xl font-semibold tracking-widest text-deep-foreground">
                      {initialsOf(speaker.firstName, speaker.lastName)}
                    </span>
                  </div>
                )}
              </div>

              <div>
                <p className="eyebrow text-primary">
                  {speakerCategoryLabels[speaker.category] ?? speaker.category}
                </p>
                <h1 className="mt-3 text-4xl font-semibold">
                  {speaker.firstName} {speaker.lastName}
                </h1>
                {speaker.designation ? <p className="mt-3 text-lg">{speaker.designation}</p> : null}
                <p className="mt-1 text-muted-foreground">
                  {[speaker.organization, speaker.country].filter(Boolean).join(" · ")}
                </p>
                {speaker.biography ? (
                  <p className="mt-8 leading-relaxed text-muted-foreground">{speaker.biography}</p>
                ) : null}
                <div className="mt-10 flex flex-wrap gap-3">
                  <Button variant="outline" onClick={share}>
                    <Share2 className="mr-2 h-4 w-4" aria-hidden="true" />
                    Share profile
                  </Button>
                  <Button asChild>
                    <Link to="/registration">Register Now</Link>
                  </Button>
                </div>
              </div>
            </article>
          ) : null}
        </div>
      </Section>
    </Layout>
  );
}
