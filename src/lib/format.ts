export function formatDate(value?: string): string {
  if (!value) return "To be announced";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}

export function formatDateRange(start?: string, end?: string): string {
  if (!start) return "Dates to be announced";
  if (!end) return formatDate(start);
  const startDate = new Date(start);
  const endDate = new Date(end);
  if (Number.isNaN(startDate.getTime()) || Number.isNaN(endDate.getTime()))
    return formatDate(start);
  const sameMonth =
    startDate.getMonth() === endDate.getMonth() &&
    startDate.getFullYear() === endDate.getFullYear();
  if (sameMonth) {
    return `${startDate.getDate()}–${endDate.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}`;
  }
  return `${formatDate(start)} – ${formatDate(end)}`;
}

export function initialsOf(first: string, last: string) {
  return `${first.charAt(0)}${last.charAt(0)}`.toUpperCase();
}

export const speakerCategoryLabels: Record<string, string> = {
  SIGNED_UP: "Signed Up",
  PLENARY: "Plenary",
  KEYNOTE: "Keynote",
  INVITED: "Invited",
  YRF: "Young Researcher",
  FEATURED: "Featured",
  DELEGATE: "Delegate",
  POSTER: "Poster",
  UNABLE_TO_ATTEND: "Unable to Attend",
};
