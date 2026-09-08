import { Link } from "@tanstack/react-router";
import type { Speaker } from "@/types/conference";
import { initialsOf, speakerCategoryLabels } from "@/lib/format";

export function SpeakerCard({ speaker }: { speaker: Speaker }) {
  const fullName = `${speaker.firstName} ${speaker.lastName}`;
  return (
    <li className="card-lift overflow-hidden rounded-xl border border-border bg-card">
      <Link
        to="/speakers/$id"
        params={{ id: String(speaker.id) }}
        className="block focus-visible:outline-none"
        aria-label={`View profile of ${fullName}`}
      >
        <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
          {speaker.photoUrl ? (
            <img
              src={speaker.photoUrl}
              alt={`Portrait of ${fullName}`}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="surface-deep grid h-full w-full place-items-center">
              <span className="text-3xl font-semibold tracking-widest text-deep-foreground">
                {initialsOf(speaker.firstName, speaker.lastName)}
              </span>
            </div>
          )}
          <span className="absolute left-4 top-4 rounded-full border border-deep-border bg-deep/80 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-widest text-deep-foreground">
            {speakerCategoryLabels[speaker.category] ?? speaker.category}
          </span>
        </div>
        <div className="p-6">
          <h3 className="text-lg font-semibold">{fullName}</h3>
          {speaker.designation ? (
            <p className="mt-1 text-sm text-primary">{speaker.designation}</p>
          ) : null}
          <p className="mt-2 text-sm text-muted-foreground">
            {[speaker.organization, speaker.country].filter(Boolean).join(" · ")}
          </p>
        </div>
      </Link>
    </li>
  );
}
