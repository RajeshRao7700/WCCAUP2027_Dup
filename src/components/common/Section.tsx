import type { ReactNode } from "react";

interface SectionProps {
  id?: string;
  tone?: "light" | "subtle" | "deep";
  className?: string;
  children: ReactNode;
  labelledBy?: string;
}

const toneClass = {
  light: "bg-background",
  subtle: "bg-subtle",
  deep: "surface-deep",
} as const;

export function Section({ id, tone = "light", className = "", children }: SectionProps) {
  return (
    <section
      {...(id ? { id } : {})}
      className={`relative py-20 sm:py-24 ${toneClass[tone]} ${className}`}
    >
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">{children}</div>
    </section>
  );
}
