import { Boxes, Cpu, Mic, Wrench } from "lucide-react";
import { Section } from "@/components/common/Section";
import { QueryBoundary } from "@/components/common/States";
import { useHighlights } from "@/hooks/useConferenceData";

const icons = [Cpu, Boxes, Mic, Wrench];

export function ConferenceHighlights() {
  const query = useHighlights();

  return (
    <Section tone="light" className="py-14 sm:py-16">
      <QueryBoundary
        query={query}
        loadingLabel="Loading highlights…"
        isEmpty={(items) => items.length === 0}
        hideWhenEmpty
      >
        {(items) => (
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {items.map((item, index) => {
              const Icon = icons[index % icons.length]!;
              return (
                <li
                  key={item.id}
                  className="card-lift rounded-xl border border-border bg-card p-6"
                  style={{ boxShadow: "var(--shadow-soft)" }}
                >
                  <Icon className="h-6 w-6 text-primary" aria-hidden="true" />
                  <h3 className="mt-4 text-base font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </li>
              );
            })}
          </ul>
        )}
      </QueryBoundary>
    </Section>
  );
}
