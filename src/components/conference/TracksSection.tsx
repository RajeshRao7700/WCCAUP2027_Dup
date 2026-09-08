import { Section } from "@/components/common/Section";
import { SectionHeader } from "@/components/common/SectionHeader";
import { QueryBoundary } from "@/components/common/States";
import { useTracks } from "@/hooks/useConferenceData";
import type { Track } from "@/types/conference";

export function TrackCard({ track, index }: { track: Track; index: number }) {
  return (
    <li className="card-lift rounded-xl border border-border bg-card p-7">
      <span className="eyebrow text-muted-foreground">
        Track {String(index + 1).padStart(2, "0")}
      </span>
      <h3 className="mt-3 text-lg font-semibold">{track.name}</h3>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{track.description}</p>
    </li>
  );
}

export function TracksSection({ showHeader = true }: { showHeader?: boolean }) {
  const query = useTracks();

  return (
    <Section tone="light" id="tracks">
      {showHeader ? (
        <SectionHeader
          eyebrow="Scientific Programme"
          title="Conference Tracks"
          description="Submissions and sessions are organised across the following tracks."
        />
      ) : null}
      <div className="mt-14">
        <QueryBoundary
          query={query}
          loadingLabel="Loading tracks…"
          emptyMessage="Conference tracks will be announced soon."
          isEmpty={(tracks) => tracks.length === 0}
        >
          {(tracks) => (
            <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {tracks.map((track, index) => (
                <TrackCard key={track.id} track={track} index={index} />
              ))}
            </ul>
          )}
        </QueryBoundary>
      </div>
    </Section>
  );
}
