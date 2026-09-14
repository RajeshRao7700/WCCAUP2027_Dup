/**
 * Single source of truth for frontend configuration.
 * Only PUBLIC values may live here. Never place secrets in VITE_* variables.
 */

const env = import.meta.env as Record<string, string | undefined>;

export const appConfig = {
  apiBaseUrl:
    (env["VITE_API_BASE_URL"] && env["VITE_API_BASE_URL"].trim()) ||
    "https://confmangsys.onrender.com",
  conferenceShortName:
    (env["VITE_CONFERENCE_SHORT_NAME"] && env["VITE_CONFERENCE_SHORT_NAME"].trim()) ||
    "WCCAUP2027",
  /** Mock mode is only active if explicitly set to 'true'. Default in production is false. */
  useMockData: env["VITE_USE_MOCK_DATA"] === "true",
  siteUrl:
    (env["VITE_SITE_URL"] && env["VITE_SITE_URL"].trim()) ||
    "https://wccaup-2027-dup.vercel.app",
  /** Public Razorpay API key identifier for online client-side checkout. */
  razorpayKeyId:
    (env["VITE_RAZORPAY_KEY_ID"] && env["VITE_RAZORPAY_KEY_ID"].trim()) ||
    "rzp_test_TaJstYd6vsQoTu",
};

export const brand = {
  shortName: "WCCAUP2027",
  logoTop: "GIAI",
  logoBottom: "2027",
  title: "International Conference on Generative AI & Agentic AI",
  tagline: "Building the Next Generation of Intelligent Systems",
  description:
    "Exploring Generative Intelligence, Autonomous Agents, Foundation Models and the Future of Human-AI Collaboration.",
};

/** Centralised SEO helper — pages call buildSeo() instead of hardcoding meta. */
export function buildSeo(options: {
  title: string;
  description: string;
  path?: string;
  image?: string;
}) {
  const title = `${options.title} | ${brand.shortName}`;
  const url = `${appConfig.siteUrl}${options.path ?? "/"}`;
  const meta: Array<Record<string, string>> = [
    { title },
    { name: "description", content: options.description },
    { property: "og:title", content: title },
    { property: "og:description", content: options.description },
    { property: "og:type", content: "website" },
    { property: "og:url", content: url },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: options.description },
  ];
  if (options.image) {
    meta.push({ property: "og:image", content: options.image });
    meta.push({ name: "twitter:image", content: options.image });
  }
  return { meta, links: [{ rel: "canonical", href: url }] };
}
