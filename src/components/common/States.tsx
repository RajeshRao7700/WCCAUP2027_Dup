import { AlertCircle, Inbox, Loader2 } from "lucide-react";

export function LoadingState({ label = "Loading…" }: { label?: string }) {
  return (
    <div
      role="status"
      className="flex items-center justify-center gap-3 py-14 text-muted-foreground"
    >
      <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
      <span className="text-sm">{label}</span>
    </div>
  );
}

export function EmptyState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-border py-14 text-center">
      <Inbox className="h-6 w-6 text-muted-foreground" aria-hidden="true" />
      <p className="max-w-sm text-sm text-muted-foreground">{message}</p>
    </div>
  );
}

export function ErrorState({ error }: { error: unknown }) {
  const message =
    error instanceof Error && error.message
      ? error.message
      : "We could not load this content right now.";
  return (
    <div
      role="alert"
      className="flex flex-col items-center justify-center gap-3 rounded-lg border border-destructive/30 bg-destructive/5 py-12 text-center"
    >
      <AlertCircle className="h-6 w-6 text-destructive" aria-hidden="true" />
      <p className="max-w-sm text-sm text-foreground">{message}</p>
    </div>
  );
}

/** Shared wrapper so every backend-driven section handles all three states. */
export function QueryBoundary<T>({
  query,
  loadingLabel,
  emptyMessage,
  isEmpty,
  children,
  hideWhenEmpty = false,
}: {
  query: { data: T | undefined; isLoading: boolean; error: unknown };
  loadingLabel?: string;
  emptyMessage?: string;
  isEmpty?: (data: T) => boolean;
  hideWhenEmpty?: boolean;
  children: (data: T) => React.ReactNode;
}) {
  if (query.isLoading) return <LoadingState {...(loadingLabel ? { label: loadingLabel } : {})} />;
  if (query.error) return <ErrorState error={query.error} />;
  if (!query.data)
    return hideWhenEmpty ? null : <EmptyState message={emptyMessage ?? "Content coming soon."} />;
  if (isEmpty?.(query.data)) {
    return hideWhenEmpty ? null : <EmptyState message={emptyMessage ?? "Content coming soon."} />;
  }
  return <>{children(query.data)}</>;
}
