import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/common/Layout";
import { PageHeader } from "@/components/common/PageHeader";
import { Section } from "@/components/common/Section";
import { QueryBoundary } from "@/components/common/States";
import { useConference, useHotels } from "@/hooks/useConferenceData";
import { buildSeo } from "@/config/site";

export const Route = createFileRoute("/accommodation")({
  head: () =>
    buildSeo({
      title: "Accommodation",
      description:
        "Recommended hotels, distances from the venue and booking guidance for WCCAUP2027 delegates.",
      path: "/accommodation",
    }),
  component: AccommodationPage,
});

function AccommodationPage() {
  const query = useHotels();
  const { data: conference } = useConference();

  return (
    <Layout>
      <PageHeader
        eyebrow="Your Stay"
        title="Accommodation"
        description="Placeholder hotel information. Final partner rates will be confirmed by the conference secretariat."
      />
      <Section>
        <QueryBoundary
          query={query}
          loadingLabel="Loading accommodation options…"
          emptyMessage="Accommodation information will be published soon."
          isEmpty={(hotels) => hotels.length === 0}
        >
          {(hotels) => (
            <ul className="grid gap-6 md:grid-cols-2">
              {hotels.map((hotel) => (
                <li
                  key={hotel.id}
                  className="card-lift rounded-xl border border-border bg-card p-7"
                >
                  <div className="flex items-start justify-between gap-4">
                    <h2 className="text-lg font-semibold">{hotel.name}</h2>
                    <span className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">
                      {hotel.category}
                    </span>
                  </div>
                  <dl className="mt-4 space-y-2 text-sm text-muted-foreground">
                    <div className="flex gap-2">
                      <dt className="font-medium text-foreground">Distance:</dt>
                      <dd>{hotel.distanceFromVenue}</dd>
                    </div>
                    {hotel.priceRange ? (
                      <div className="flex gap-2">
                        <dt className="font-medium text-foreground">Price:</dt>
                        <dd>{hotel.priceRange}</dd>
                      </div>
                    ) : null}
                  </dl>
                  {hotel.notes ? (
                    <p className="mt-4 text-sm text-muted-foreground">{hotel.notes}</p>
                  ) : null}
                </li>
              ))}
            </ul>
          )}
        </QueryBoundary>

        <div className="mt-12 rounded-xl border border-border bg-secondary p-7">
          <h2 className="text-lg font-semibold">Booking guidance</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Delegates arrange their own accommodation. Quote the conference name when booking to
            access partner rates where available. For group bookings or assistance, contact the
            secretariat
            {conference?.email ? (
              <>
                {" "}
                at{" "}
                <a href={`mailto:${conference.email}`} className="text-primary hover:underline">
                  {conference.email}
                </a>
              </>
            ) : null}
            .
          </p>
        </div>
      </Section>
    </Layout>
  );
}
