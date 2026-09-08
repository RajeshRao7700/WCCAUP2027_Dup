import { Section } from "@/components/common/Section";
import { SectionHeader } from "@/components/common/SectionHeader";
import { QueryBoundary } from "@/components/common/States";
import { useAbout } from "@/hooks/useConferenceData";

export function AboutSection() {
  const query = useAbout();

  return (
    <Section tone="subtle" id="about">
      <QueryBoundary query={query} loadingLabel="Loading conference information…" hideWhenEmpty>
        {(about) => (
          <div className="grid gap-14 lg:grid-cols-[1.1fr_1fr] lg:items-start">
            <div>
              <SectionHeader eyebrow="The Conference" title={about.heading} align="left" />
              <p className="mt-8 text-lg leading-relaxed text-foreground">{about.summary}</p>
              {about.paragraphs.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 24)}
                  className="mt-4 leading-relaxed text-muted-foreground"
                >
                  {paragraph}
                </p>
              ))}
            </div>
            <ul className="grid gap-4 sm:grid-cols-2">
              {about.highlights.map((item) => (
                <li
                  key={item.title}
                  className="card-lift rounded-xl border border-border bg-card p-6"
                >
                  <span
                    className="block h-1 w-10 rounded-full"
                    style={{ backgroundImage: "var(--gradient-accent)" }}
                    aria-hidden="true"
                  />
                  <h3 className="mt-4 text-base font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </QueryBoundary>
    </Section>
  );
}
