import { Section } from "@/components/common/Section";
import { SectionHeader } from "@/components/common/SectionHeader";
import { QueryBoundary } from "@/components/common/States";
import { useImportantDates } from "@/hooks/useConferenceData";
import { formatDate } from "@/lib/format";

export function ImportantDateTimeline() {
  const query = useImportantDates();

  return (
    <Section tone="subtle" id="important-dates">
      <SectionHeader
        eyebrow="Plan Ahead"
        title="Important Dates"
        description="Key deadlines for submissions and registration."
      />
      <div className="mt-14">
        <QueryBoundary
          query={query}
          loadingLabel="Loading important dates…"
          emptyMessage="Important dates will be published shortly."
          isEmpty={(dates) => dates.length === 0}
        >
          {(dates) => (
            <ol className="relative mx-auto max-w-4xl border-l border-border pl-8 sm:border-l-0 sm:pl-0">
              {dates.map((item, index) => (
                <li
                  key={item.id}
                  className="relative pb-10 last:pb-0 sm:grid sm:grid-cols-[1fr_auto_1fr] sm:items-start sm:gap-8"
                >
                  <div className={index % 2 === 0 ? "sm:text-right" : "sm:order-3"}>
                    <p className="text-sm font-semibold text-primary">{formatDate(item.date)}</p>
                    <h3 className="mt-1 text-lg font-semibold">{item.title}</h3>
                    {item.description ? (
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {item.description}
                      </p>
                    ) : null}
                  </div>
                  <div className="absolute -left-[41px] top-1 sm:static sm:order-2 sm:flex sm:h-full sm:flex-col sm:items-center">
                    <span
                      className="block h-3 w-3 rounded-full ring-4 ring-background"
                      style={{ backgroundImage: "var(--gradient-accent)" }}
                      aria-hidden="true"
                    />
                    <span className="hidden w-px flex-1 bg-border sm:block" aria-hidden="true" />
                  </div>
                  <div className={index % 2 === 0 ? "sm:order-3" : ""} aria-hidden="true" />
                </li>
              ))}
            </ol>
          )}
        </QueryBoundary>
      </div>
    </Section>
  );
}
