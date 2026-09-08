interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
  as?: "h1" | "h2";
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "center",
  tone = "light",
  as: Heading = "h2",
}: SectionHeaderProps) {
  const alignment = align === "center" ? "text-center mx-auto" : "text-left";
  return (
    <div className={`max-w-3xl ${alignment}`}>
      {eyebrow ? (
        <p className={`eyebrow ${tone === "dark" ? "text-cyan" : "text-primary"}`}>{eyebrow}</p>
      ) : null}
      <Heading
        className={`mt-3 text-3xl font-semibold sm:text-4xl ${
          tone === "dark" ? "text-deep-foreground" : "text-foreground"
        }`}
      >
        {title}
      </Heading>
      {description ? (
        <p
          className={`mt-4 text-base leading-relaxed ${tone === "dark" ? "text-deep-muted" : "text-muted-foreground"}`}
        >
          {description}
        </p>
      ) : null}
      <span
        className={`mt-6 block h-px w-24 ${align === "center" ? "mx-auto" : ""}`}
        style={{ backgroundImage: "var(--gradient-accent)" }}
        aria-hidden="true"
      />
    </div>
  );
}
