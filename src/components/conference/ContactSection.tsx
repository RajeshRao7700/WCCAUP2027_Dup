import { Mail, MapPin, Phone } from "lucide-react";
import { Section } from "@/components/common/Section";
import { SectionHeader } from "@/components/common/SectionHeader";
import { useConference } from "@/hooks/useConferenceData";

export function ContactSection({ children }: { children?: React.ReactNode }) {
  const { data: conference } = useConference();

  return (
    <Section tone="subtle" id="contact">
      <div className="grid gap-12 lg:grid-cols-2">
        <div>
          <SectionHeader
            eyebrow="Get in Touch"
            title="Contact the Secretariat"
            description="For programme, registration and sponsorship enquiries."
            align="left"
          />
          <ul className="mt-10 space-y-5">
            {conference?.email ? (
              <li className="flex items-start gap-3">
                <Mail className="mt-1 h-4 w-4 text-primary" aria-hidden="true" />
                <a href={`mailto:${conference.email}`} className="text-sm hover:text-primary">
                  {conference.email}
                </a>
              </li>
            ) : null}
            {conference?.phone ? (
              <li className="flex items-start gap-3">
                <Phone className="mt-1 h-4 w-4 text-primary" aria-hidden="true" />
                <a
                  href={`tel:${conference.phone.replace(/\s/g, "")}`}
                  className="text-sm hover:text-primary"
                >
                  {conference.phone}
                </a>
              </li>
            ) : null}
            <li className="flex items-start gap-3">
              <MapPin className="mt-1 h-4 w-4 text-primary" aria-hidden="true" />
              <span className="text-sm text-muted-foreground">
                {conference?.venueName ?? "Venue to be announced"}
                <br />
                {[conference?.city, conference?.country].filter(Boolean).join(", ")}
              </span>
            </li>
          </ul>
        </div>
        <div>{children}</div>
      </div>
    </Section>
  );
}
