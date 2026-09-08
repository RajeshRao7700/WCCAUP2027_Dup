import { Link } from "@tanstack/react-router";
import { MapPin, Plane } from "lucide-react";
import { Section } from "@/components/common/Section";
import { SectionHeader } from "@/components/common/SectionHeader";
import { QueryBoundary } from "@/components/common/States";
import { Button } from "@/components/ui/button";
import { useVenue } from "@/hooks/useConferenceData";

export function VenueSection({ compact = false }: { compact?: boolean }) {
  const query = useVenue();

  return (
    <Section tone="light" id="venue">
      <QueryBoundary query={query} loadingLabel="Loading venue information…" hideWhenEmpty>
        {(venue) => (
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <SectionHeader eyebrow="Location" title="Venue" align="left" />
              <p className="mt-8 text-xl font-semibold">{venue.name}</p>
              <address className="mt-2 not-italic text-muted-foreground">
                {venue.address}
                <br />
                {venue.city}, {venue.country}
              </address>

              <ul className="mt-8 space-y-3">
                <li className="flex gap-3 text-sm text-muted-foreground">
                  <Plane className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                  {venue.nearestAirport ?? "Airport information to be announced"}
                </li>
                {venue.transportation
                  .slice(0, compact ? 2 : venue.transportation.length)
                  .map((item) => (
                    <li key={item} className="flex gap-3 text-sm text-muted-foreground">
                      <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
              </ul>

              {compact ? (
                <Button asChild variant="outline" className="mt-8">
                  <Link to="/venue">Venue &amp; travel details</Link>
                </Button>
              ) : venue.travelNotes ? (
                <p className="mt-8 rounded-lg border border-border bg-secondary p-5 text-sm leading-relaxed text-muted-foreground">
                  {venue.travelNotes}
                </p>
              ) : null}
            </div>

            <div
              className="overflow-hidden rounded-xl border border-border"
              style={{ boxShadow: "var(--shadow-soft)" }}
            >
              {venue.mapEmbedUrl ? (
                <iframe
                  title={`Map showing ${venue.name}`}
                  src={venue.mapEmbedUrl}
                  loading="lazy"
                  className="h-80 w-full border-0 lg:h-[26rem]"
                />
              ) : (
                <div className="surface-deep grid-pattern h-80 w-full" aria-hidden="true" />
              )}
            </div>
          </div>
        )}
      </QueryBoundary>
    </Section>
  );
}
