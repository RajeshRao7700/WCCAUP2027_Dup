import { Link } from "@tanstack/react-router";
import { CalendarDays, MapPin } from "lucide-react";
import heroImage from "@/assets/hero-network.jpg";
import { Button } from "@/components/ui/button";
import { brand } from "@/config/site";
import { useConference } from "@/hooks/useConferenceData";
import { useCountdown } from "@/hooks/useCountdown";
import { formatDateRange } from "@/lib/format";

export function HeroSection() {
  const { data: conference } = useConference();
  const countdown = useCountdown(conference?.conferenceDate);

  return (
    <section className="surface-deep relative overflow-hidden" aria-labelledby="hero-heading">
      <img
        src={heroImage}
        alt=""
        aria-hidden="true"
        width={1920}
        height={1088}
        className="absolute inset-0 h-full w-full object-cover opacity-45"
      />
      <div className="grid-pattern absolute inset-0 opacity-70" aria-hidden="true" />
      <div
        className="absolute inset-x-0 bottom-0 h-40"
        style={{ backgroundImage: "linear-gradient(to bottom, transparent, var(--background))" }}
        aria-hidden="true"
      />

      <div className="relative mx-auto w-full max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
        <div className="animate-fade-up max-w-4xl">
          <p className="eyebrow text-cyan">{brand.shortName} · International Conference</p>
          <h1
            id="hero-heading"
            className="mt-6 text-5xl font-semibold leading-[0.95] text-deep-foreground sm:text-7xl"
          >
            GENERATIVE AI
            <span className="mx-3 text-gradient">&amp;</span>
            <br />
            AGENTIC AI
          </h1>
          <p className="mt-6 max-w-2xl text-lg font-medium text-deep-foreground/90">
            {brand.tagline}
          </p>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-deep-muted">
            {brand.description}
          </p>

          <dl className="mt-10 flex flex-wrap gap-x-10 gap-y-4 text-sm">
            <div className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4 text-cyan" aria-hidden="true" />
              <dt className="sr-only">Dates</dt>
              <dd className="text-deep-foreground">
                {formatDateRange(conference?.conferenceDate, conference?.conferenceEndDate)}
              </dd>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-cyan" aria-hidden="true" />
              <dt className="sr-only">Venue</dt>
              <dd className="text-deep-foreground">
                {[conference?.venueName, conference?.city, conference?.country]
                  .filter(Boolean)
                  .join(", ") || "Venue to be announced"}
              </dd>
            </div>
          </dl>

          <div className="mt-10 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link to="/registration">Register Now</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-deep-border bg-transparent text-deep-foreground hover:bg-deep-foreground/10 hover:text-deep-foreground"
            >
              <Link to="/call-for-papers">Call for Papers</Link>
            </Button>
          </div>

          {countdown ? (
            <div
              className="mt-14 grid max-w-xl grid-cols-4 gap-3"
              aria-label="Time remaining until the conference"
            >
              {[
                { value: countdown.days, label: "Days" },
                { value: countdown.hours, label: "Hours" },
                { value: countdown.minutes, label: "Minutes" },
                { value: countdown.seconds, label: "Seconds" },
              ].map((unit) => (
                <div
                  key={unit.label}
                  className="rounded-lg border border-deep-border bg-deep/40 px-3 py-4 text-center backdrop-blur-sm"
                >
                  <span className="block text-2xl font-semibold tabular-nums text-deep-foreground sm:text-3xl">
                    {String(unit.value).padStart(2, "0")}
                  </span>
                  <span className="mt-1 block text-[0.65rem] uppercase tracking-widest text-deep-muted">
                    {unit.label}
                  </span>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
