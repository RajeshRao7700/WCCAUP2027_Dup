import { ArrowUpRight } from "lucide-react";
import { Section } from "@/components/common/Section";
import { SectionHeader } from "@/components/common/SectionHeader";
import { QueryBoundary } from "@/components/common/States";
import { useWorkshopBanners } from "@/hooks/useConferenceData";
import type { WorkshopBanner } from "@/types/conference";

function WorkshopCard({ workshop }: { workshop: WorkshopBanner }) {
  const content = (
    <>
      <div className="relative aspect-[16/9] overflow-hidden">
        {workshop.imageUrl ? (
          <img
            src={workshop.imageUrl}
            alt={workshop.title}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="surface-deep grid-pattern h-full w-full" aria-hidden="true" />
        )}
      </div>
      <div className="flex items-start justify-between gap-4 p-6">
        <div>
          <h3 className="text-lg font-semibold">{workshop.title}</h3>
          {workshop.description ? (
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {workshop.description}
            </p>
          ) : null}
        </div>
        {workshop.targetUrl ? (
          <ArrowUpRight className="h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
        ) : null}
      </div>
    </>
  );

  return (
    <li className="card-lift overflow-hidden rounded-xl border border-border bg-card">
      {workshop.targetUrl ? (
        <a href={workshop.targetUrl} className="block">
          {content}
        </a>
      ) : (
        content
      )}
    </li>
  );
}

export function WorkshopSection() {
  const query = useWorkshopBanners();

  return (
    <Section tone="subtle" id="workshops">
      <SectionHeader
        eyebrow="Hands-on"
        title="Workshops"
        description="Practical, instructor-led sessions running alongside the main programme."
      />
      <div className="mt-14">
        <QueryBoundary
          query={query}
          loadingLabel="Loading workshops…"
          emptyMessage="Workshop details will be announced soon."
          isEmpty={(items) => items.length === 0}
        >
          {(items) => (
            <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {items.map((workshop) => (
                <WorkshopCard key={workshop.id} workshop={workshop} />
              ))}
            </ul>
          )}
        </QueryBoundary>
      </div>
    </Section>
  );
}
