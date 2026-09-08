import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export function RegistrationCTA() {
  return (
    <section className="surface-deep relative overflow-hidden" aria-labelledby="registration-cta">
      <div className="grid-pattern absolute inset-0 opacity-50" aria-hidden="true" />
      <div className="relative mx-auto flex w-full max-w-7xl flex-col items-start gap-6 px-5 py-20 sm:px-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl">
          <p className="eyebrow text-cyan">Registration</p>
          <h2
            id="registration-cta"
            className="mt-3 text-3xl font-semibold text-deep-foreground sm:text-4xl"
          >
            Secure your place at WCCAUP2027
          </h2>
          <p className="mt-4 text-base leading-relaxed text-deep-muted">
            Delegate, student, researcher, author, speaker and exhibitor categories are available.
            Early bird rates apply until the published deadline.
          </p>
        </div>
        <Button asChild size="lg">
          <Link to="/registration">Register Now</Link>
        </Button>
      </div>
    </section>
  );
}

export function CallForPapersCTA() {
  return (
    <section className="bg-background" aria-labelledby="cfp-cta">
      <div className="mx-auto w-full max-w-7xl px-5 py-20 sm:px-8">
        <div
          className="grid-pattern-light flex flex-col items-start gap-6 rounded-2xl border border-border bg-card p-10 lg:flex-row lg:items-center lg:justify-between"
          style={{ boxShadow: "var(--shadow-soft)" }}
        >
          <div className="max-w-2xl">
            <p className="eyebrow text-primary">Call for Papers</p>
            <h2 id="cfp-cta" className="mt-3 text-3xl font-semibold sm:text-4xl">
              Share your research with the global AI community
            </h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Oral, poster and workshop contributions are welcome across all conference tracks.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild variant="outline">
              <Link to="/call-for-papers">Read Guidelines</Link>
            </Button>
            <Button asChild>
              <Link to="/submit-abstract">Submit Abstract</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
