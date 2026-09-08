import { Section } from "@/components/common/Section";
import { SectionHeader } from "@/components/common/SectionHeader";

const reasons = [
  {
    number: "01",
    title: "Learn",
    description:
      "Deep technical sessions on foundation models, agents and evaluation from teams shipping at scale.",
  },
  {
    number: "02",
    title: "Connect",
    description:
      "Structured networking across research, enterprise, healthcare, science and public institutions.",
  },
  {
    number: "03",
    title: "Discover",
    description:
      "Early access to peer-reviewed results, benchmarks and emerging agent architectures.",
  },
  {
    number: "04",
    title: "Collaborate",
    description:
      "Find co-authors, pilot partners and research groups working on adjacent problems.",
  },
  {
    number: "05",
    title: "Innovate",
    description: "Hands-on workshops that translate research advances into working systems.",
  },
  {
    number: "06",
    title: "Lead",
    description:
      "Shape governance, safety and adoption standards for the next generation of intelligent systems.",
  },
];

export function WhyAttend() {
  return (
    <Section tone="deep">
      <div className="grid-pattern absolute inset-0 opacity-40" aria-hidden="true" />
      <div className="relative">
        <SectionHeader
          eyebrow="Participation"
          title="Why Attend WCCAUP2027?"
          description="Three days built for people advancing generative and agentic intelligence in research and in production."
          tone="dark"
        />
        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((reason) => (
            <li
              key={reason.number}
              className="group rounded-xl border border-deep-border bg-deep/40 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-cyan/60"
            >
              <span className="text-sm font-semibold tracking-widest text-cyan">
                {reason.number}
              </span>
              <h3 className="mt-3 text-xl font-semibold text-deep-foreground">{reason.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-deep-muted">{reason.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
