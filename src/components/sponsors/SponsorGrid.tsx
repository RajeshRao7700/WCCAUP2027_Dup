import { Section } from "@/components/common/Section";
import { SectionHeader } from "@/components/common/SectionHeader";
import { QueryBoundary } from "@/components/common/States";
import { useMediaPartners, useSponsors } from "@/hooks/useConferenceData";
import type { Sponsor, SponsorshipLevel } from "@/types/conference";

const tierOrder: SponsorshipLevel[] = ["PLATINUM", "GOLD", "SILVER", "BRONZE", "PARTNER"];
const tierLabels: Record<SponsorshipLevel, string> = {
  PLATINUM: "Platinum",
  GOLD: "Gold",
  SILVER: "Silver",
  BRONZE: "Bronze",
  PARTNER: "Partners",
};

function SponsorTile({ sponsor }: { sponsor: Sponsor }) {
  const inner = (
    <>
      {sponsor.logoUrl ? (
        <img
          src={sponsor.logoUrl}
          alt={`${sponsor.name} logo`}
          loading="lazy"
          className="max-h-12 w-auto object-contain"
        />
      ) : (
        <span className="text-center text-sm font-semibold">{sponsor.name}</span>
      )}
      {sponsor.description ? (
        <span className="mt-2 block text-center text-xs text-muted-foreground">
          {sponsor.description}
        </span>
      ) : null}
    </>
  );

  return (
    <li className="card-lift flex min-h-28 flex-col items-center justify-center rounded-xl border border-border bg-card p-6">
      {sponsor.websiteUrl ? (
        <a
          href={sponsor.websiteUrl}
          target="_blank"
          rel="noreferrer noopener"
          className="flex flex-col items-center justify-center"
        >
          {inner}
        </a>
      ) : (
        inner
      )}
    </li>
  );
}

export function SponsorGrid() {
  const query = useSponsors();

  return (
    <Section tone="light" id="sponsors">
      <QueryBoundary
        query={query}
        loadingLabel="Loading sponsors…"
        isEmpty={(items) => items.length === 0}
        hideWhenEmpty
      >
        {(sponsors) => (
          <>
            <SectionHeader
              eyebrow="Supporters"
              title="Sponsors"
              description="WCCAUP2027 is supported by organisations investing in the future of intelligent systems."
            />
            <div className="mt-14 space-y-10">
              {tierOrder.map((tier) => {
                const group = sponsors.filter((sponsor) => sponsor.sponsorshipLevel === tier);
                if (group.length === 0) return null;
                return (
                  <div key={tier}>
                    <h3 className="eyebrow text-muted-foreground">{tierLabels[tier]}</h3>
                    <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                      {group.map((sponsor) => (
                        <SponsorTile key={sponsor.id} sponsor={sponsor} />
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </QueryBoundary>
    </Section>
  );
}

export function MediaPartnerGrid() {
  const query = useMediaPartners();

  return (
    <Section tone="subtle" id="media-partners">
      <QueryBoundary
        query={query}
        loadingLabel="Loading media partners…"
        isEmpty={(items) => items.length === 0}
        hideWhenEmpty
      >
        {(partners) => (
          <>
            <SectionHeader eyebrow="Media" title="Media Partners" />
            <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {partners.map((partner) => (
                <li
                  key={partner.id}
                  className="card-lift flex min-h-24 flex-col items-center justify-center rounded-xl border border-border bg-card p-6 text-center"
                >
                  {partner.websiteUrl ? (
                    <a
                      href={partner.websiteUrl}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="font-semibold"
                    >
                      {partner.name}
                    </a>
                  ) : (
                    <span className="font-semibold">{partner.name}</span>
                  )}
                  {partner.description ? (
                    <span className="mt-2 text-xs text-muted-foreground">
                      {partner.description}
                    </span>
                  ) : null}
                </li>
              ))}
            </ul>
          </>
        )}
      </QueryBoundary>
    </Section>
  );
}
