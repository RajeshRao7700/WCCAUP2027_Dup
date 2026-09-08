import { Link } from "@tanstack/react-router";
import { brand } from "@/config/site";

/** Placeholder conference logo treatment — easy to replace with real artwork. */
export function Logo({ tone = "light" }: { tone?: "light" | "dark" }) {
  const isDark = tone === "dark";
  return (
    <Link to="/" className="flex items-center gap-3" aria-label={`${brand.shortName} home`}>
      <span
        className={`grid h-11 w-11 place-items-center rounded-md border text-[0.62rem] font-bold leading-[1.05] tracking-tight ${
          isDark
            ? "border-deep-border bg-deep/60 text-deep-foreground"
            : "border-border bg-secondary text-foreground"
        }`}
      >
        <span className="text-gradient block text-[0.78rem]">{brand.logoTop}</span>
        <span className={isDark ? "block text-deep-muted" : "block text-muted-foreground"}>
          {brand.logoBottom}
        </span>
      </span>
      <span className="hidden sm:block">
        <span
          className={`block text-base font-semibold ${isDark ? "text-deep-foreground" : "text-foreground"}`}
        >
          {brand.shortName}
        </span>
        <span
          className={`block text-[0.7rem] ${isDark ? "text-deep-muted" : "text-muted-foreground"}`}
        >
          Generative AI &amp; Agentic AI
        </span>
      </span>
    </Link>
  );
}
