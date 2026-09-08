import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/common/Layout";
import { Button } from "@/components/ui/button";
import { buildSeo } from "@/config/site";

export const Route = createFileRoute("/$")({
  head: () => ({
    ...buildSeo({
      title: "Page Not Found",
      description: "The page you are looking for is not available.",
    }),
    meta: [
      ...buildSeo({
        title: "Page Not Found",
        description: "The page you are looking for is not available.",
      }).meta,
      { name: "robots", content: "noindex" },
    ],
  }),
  component: NotFoundPage,
});

function NotFoundPage() {
  return (
    <Layout>
      <section className="surface-deep relative flex min-h-[60vh] items-center overflow-hidden">
        <div className="grid-pattern absolute inset-0 opacity-50" aria-hidden="true" />
        <div className="relative mx-auto w-full max-w-3xl px-5 py-24 text-center sm:px-8">
          <p className="text-gradient text-7xl font-semibold">404</p>
          <h1 className="mt-4 text-3xl font-semibold text-deep-foreground">Page not found</h1>
          <p className="mt-4 text-deep-muted">
            The page you are looking for has moved or is not part of the WCCAUP2027 website.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild>
              <Link to="/">Back to home</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-deep-border bg-transparent text-deep-foreground hover:bg-deep-foreground/10 hover:text-deep-foreground"
            >
              <Link to="/program">View programme</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
