interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
}

export function PageHeader({ eyebrow, title, description }: PageHeaderProps) {
  return (
    <header className="surface-deep relative overflow-hidden">
      <div className="grid-pattern absolute inset-0 opacity-60" aria-hidden="true" />
      <div className="relative mx-auto w-full max-w-7xl px-5 py-20 sm:px-8 sm:py-24">
        {eyebrow ? <p className="eyebrow text-cyan">{eyebrow}</p> : null}
        <h1 className="mt-3 max-w-3xl text-4xl font-semibold text-deep-foreground sm:text-5xl">
          {title}
        </h1>
        {description ? (
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-deep-muted">{description}</p>
        ) : null}
      </div>
    </header>
  );
}
