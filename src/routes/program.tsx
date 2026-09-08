import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/common/Layout";
import { PageHeader } from "@/components/common/PageHeader";
import { Section } from "@/components/common/Section";
import { QueryBoundary } from "@/components/common/States";
import { useProgram } from "@/hooks/useConferenceData";
import { buildSeo } from "@/config/site";

export const Route = createFileRoute("/program")({
  head: () =>
    buildSeo({
      title: "Conference Program",
      description:
        "Three-day WCCAUP2027 programme: keynotes, plenary sessions, parallel tracks, workshops and posters.",
      path: "/program",
    }),
  component: ProgramPage,
});

const typeLabels: Record<string, string> = {
  KEYNOTE: "Keynote",
  PLENARY: "Plenary",
  SESSION: "Session",
  WORKSHOP: "Workshop",
  POSTER: "Poster",
  BREAK: "Break",
};

function ProgramPage() {
  const query = useProgram();
  const [activeDay, setActiveDay] = useState(0);

  return (
    <Layout>
      <PageHeader
        eyebrow="Schedule"
        title="Conference Program"
        description="Provisional programme. Session times and rooms may be adjusted before the conference."
      />
      <Section>
        <QueryBoundary
          query={query}
          loadingLabel="Loading programme…"
          emptyMessage="The programme will be published soon."
          isEmpty={(days) => days.length === 0}
        >
          {(days) => {
            const day = days[Math.min(activeDay, days.length - 1)]!;
            return (
              <>
                <div className="flex flex-wrap gap-2" role="tablist" aria-label="Programme days">
                  {days.map((item, index) => (
                    <button
                      key={item.id}
                      type="button"
                      role="tab"
                      aria-selected={index === activeDay}
                      onClick={() => setActiveDay(index)}
                      className={`rounded-full border px-5 py-2 text-sm font-medium transition-colors ${index === activeDay
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border bg-card text-muted-foreground hover:text-foreground"
                        }`}
                    >
                      {item.label}
                      {item.date ? (
                        <span className="ml-2 hidden text-xs opacity-80 sm:inline">
                          {item.date}
                        </span>
                      ) : null}
                    </button>
                  ))}
                </div>

                <ul className="mt-10 divide-y divide-border overflow-hidden rounded-xl border border-border bg-card">
                  {day.sessions.map((session) => (
                    <li
                      key={session.id}
                      className="grid gap-2 p-6 sm:grid-cols-[110px_1fr] sm:gap-6"
                    >
                      <span className="text-sm font-semibold tabular-nums text-primary">
                        {session.time}
                      </span>
                      <div>
                        <div className="flex flex-wrap items-center gap-3">
                          <h2 className="text-base font-semibold">{session.title}</h2>
                          <span className="rounded-full border border-border px-2.5 py-0.5 text-[0.65rem] font-semibold uppercase tracking-widest text-muted-foreground">
                            {typeLabels[session.type] ?? session.type}
                          </span>
                        </div>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {[session.speaker, session.room].filter(Boolean).join(" · ")}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </>
            );
          }}
        </QueryBoundary>
      </Section>
    </Layout>
  );
}
