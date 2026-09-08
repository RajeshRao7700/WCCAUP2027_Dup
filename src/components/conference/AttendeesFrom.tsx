import { Globe2 } from "lucide-react";
import { Section } from "@/components/common/Section";
import { SectionHeader } from "@/components/common/SectionHeader";
import { QueryBoundary } from "@/components/common/States";
import { useAttendeesFrom } from "@/hooks/useConferenceData";

export function AttendeesFrom() {
  const query = useAttendeesFrom();

  return (
    <Section tone="deep">
      <div className="grid-pattern absolute inset-0 opacity-40" aria-hidden="true" />
      <div className="relative">
        <SectionHeader
          eyebrow="Global Community"
          title="Attendees From Around the World"
          description="WCCAUP2027 brings together participants from research institutions, enterprises and public organisations across these countries."
          tone="dark"
        />
        <div className="mt-14">
          <QueryBoundary
            query={query}
            loadingLabel="Loading locations…"
            isEmpty={(items) => items.length === 0}
            hideWhenEmpty
          >
            {(items) => (
              <ul className="flex flex-wrap justify-center gap-3">
                {items.map((item) => (
                  <li
                    key={item.id}
                    className="flex items-center gap-2 rounded-full border border-deep-border bg-deep/40 px-4 py-2 text-sm text-deep-foreground transition-colors hover:border-cyan/60"
                  >
                    <Globe2 className="h-3.5 w-3.5 text-cyan" aria-hidden="true" />
                    {item.name}
                  </li>
                ))}
              </ul>
            )}
          </QueryBoundary>
        </div>
      </div>
    </Section>
  );
}
