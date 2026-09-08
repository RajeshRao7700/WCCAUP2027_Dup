import { Link } from "@tanstack/react-router";
import { Linkedin, Mail, Twitter, Youtube } from "lucide-react";
import { brand } from "@/config/site";
import { useConference } from "@/hooks/useConferenceData";

const quickLinks = [
  { to: "/about", label: "About" },
  { to: "/speakers", label: "Speakers" },
  { to: "/program", label: "Program" },
  { to: "/call-for-papers", label: "Call for Papers" },
  { to: "/registration", label: "Registration" },
  { to: "/venue", label: "Venue" },
  { to: "/contact", label: "Contact" },
] as const;

const resourceLinks = [
  { to: "/tracks", label: "Conference Tracks" },
  { to: "/workshops", label: "Workshops" },
  { to: "/accommodation", label: "Accommodation" },
  { to: "/downloads", label: "Downloads" },
  { to: "/updates", label: "Updates" },
  { to: "/committee", label: "Committee" },
] as const;

export function Footer() {
  const { data: conference } = useConference();
  const email = conference?.email ?? "";

  return (
    <footer className="surface-deep relative overflow-hidden">
      <div className="grid-pattern absolute inset-0 opacity-40" aria-hidden="true" />
      <div className="relative mx-auto w-full max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <p className="text-2xl font-semibold text-deep-foreground">{brand.shortName}</p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-deep-muted">{brand.title}</p>
            <div className="mt-6 flex gap-3">
              {[
                { Icon: Linkedin, label: "LinkedIn" },
                { Icon: Twitter, label: "X" },
                { Icon: Youtube, label: "YouTube" },
              ].map(({ Icon, label }) => (
                <a
                  key={label}
                  href="https://example.com"
                  aria-label={`${brand.shortName} on ${label}`}
                  className="grid h-10 w-10 place-items-center rounded-md border border-deep-border text-deep-muted transition-colors hover:border-cyan hover:text-deep-foreground"
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          <nav aria-label="Quick links">
            <h2 className="eyebrow text-cyan">Quick Links</h2>
            <ul className="mt-4 space-y-2">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-deep-muted transition-colors hover:text-deep-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Resources">
            <h2 className="eyebrow text-cyan">Resources</h2>
            <ul className="mt-4 space-y-2">
              {resourceLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-deep-muted transition-colors hover:text-deep-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="eyebrow text-cyan">Contact</h2>
            {email ? (
              <a
                href={`mailto:${email}`}
                className="mt-4 inline-flex items-center gap-2 text-sm text-deep-muted transition-colors hover:text-deep-foreground"
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
                {email}
              </a>
            ) : null}
            <p className="mt-4 text-sm text-deep-muted">
              {conference?.venueName ?? "Venue to be announced"}
              <br />
              {[conference?.city, conference?.country].filter(Boolean).join(", ")}
            </p>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-deep-border pt-6 text-sm text-deep-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© 2027 {brand.shortName}. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/privacy" className="transition-colors hover:text-deep-foreground">
              Privacy Policy
            </Link>
            <Link to="/terms" className="transition-colors hover:text-deep-foreground">
              Terms &amp; Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
