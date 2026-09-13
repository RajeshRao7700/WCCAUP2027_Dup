import { useMemo, useState } from "react";
import type { Speaker, SpeakerCategory } from "@/types/conference";
import { SpeakerCard } from "./SpeakerCard";
import { EmptyState } from "@/components/common/States";

const filters: { value: "ALL" | SpeakerCategory; label: string }[] = [
  { value: "ALL", label: "All" },
  { value: "SIGNED_UP", label: "Signed Up" },
  { value: "PLENARY", label: "Plenary" },
  { value: "KEYNOTE", label: "Keynote" },
  { value: "INVITED", label: "Invited" },
  { value: "FEATURED", label: "Featured" },
  { value: "YRF", label: "YRF" },
  { value: "DELEGATE", label: "Delegate" },
  { value: "POSTER", label: "Poster" },
];

export function SpeakerGrid({
  speakers,
  showFilters = true,
}: {
  speakers: Speaker[];
  showFilters?: boolean;
}) {
  const [active, setActive] = useState<"ALL" | SpeakerCategory>("ALL");
  const [term, setTerm] = useState("");

  const visible = useMemo(() => {
    const query = term.trim().toLowerCase();
    return speakers.filter((speaker) => {
      const matchesCategory = active === "ALL" || speaker.category === active;
      const haystack = `${speaker.firstName} ${speaker.lastName} ${speaker.organization ?? ""} ${speaker.country ?? ""}`;
      return matchesCategory && (!query || haystack.toLowerCase().includes(query));
    });
  }, [speakers, active, term]);

  return (
    <div>
      {showFilters ? (
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div
            className="flex flex-wrap gap-2"
            role="group"
            aria-label="Filter speakers by category"
          >
            {filters.map((filter) => {
              const isActive = filter.value === active;
              return (
                <button
                  key={filter.value}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setActive(filter.value)}
                  className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-card text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {filter.label}
                </button>
              );
            })}
          </div>
          <div>
            <label htmlFor="speaker-search" className="sr-only">
              Search speakers
            </label>
            <input
              id="speaker-search"
              type="search"
              value={term}
              onChange={(event) => setTerm(event.target.value)}
              placeholder="Search speakers"
              className="w-full rounded-md border border-input bg-card px-4 py-2 text-sm sm:w-64"
            />
          </div>
        </div>
      ) : null}

      {visible.length === 0 ? (
        <EmptyState message="No speakers match this selection yet." />
      ) : (
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((speaker) => (
            <SpeakerCard key={speaker.id} speaker={speaker} />
          ))}
        </ul>
      )}
    </div>
  );
}
