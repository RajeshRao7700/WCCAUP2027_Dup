/**
 * Conference Registration Category Pricing Configuration.
 *
 * Current policy: ₹10 (INR 10) for every category.
 * Amounts can be adjusted individually per category here as needed.
 */

export interface CategoryPrice {
  amount: number;
  currency: "INR" | "USD";
  currencySymbol: string;
  formattedPrice: string;
  description?: string;
}

export const DEFAULT_CATEGORY_PRICE: CategoryPrice = {
  amount: 10,
  currency: "INR",
  currencySymbol: "₹",
  formattedPrice: "₹10",
};

/**
 * Category-specific fee schedule.
 * Currently all categories are set to ₹10 as requested.
 * Later on, modify any individual amount here.
 */
export const CATEGORY_PRICING: Record<string, CategoryPrice> = {
  DELEGATE: {
    amount: 10,
    currency: "INR",
    currencySymbol: "₹",
    formattedPrice: "₹10",
    description: "General attendance across all technical sessions and exhibits.",
  },
  STUDENT: {
    amount: 10,
    currency: "INR",
    currencySymbol: "₹",
    formattedPrice: "₹10",
    description: "Full access for enrolled undergraduate and postgraduate students.",
  },
  RESEARCHER: {
    amount: 10,
    currency: "INR",
    currencySymbol: "₹",
    formattedPrice: "₹10",
    description: "Academic and institutional research scholar pass.",
  },
  AUTHOR: {
    amount: 10,
    currency: "INR",
    currencySymbol: "₹",
    formattedPrice: "₹10",
    description: "Presentation and publication pass for accepted paper authors.",
  },
  SPEAKER: {
    amount: 10,
    currency: "INR",
    currencySymbol: "₹",
    formattedPrice: "₹10",
    description: "Keynote, plenary, and invited speaker registration.",
  },
  EXHIBITOR: {
    amount: 10,
    currency: "INR",
    currencySymbol: "₹",
    formattedPrice: "₹10",
    description: "Booth representative and commercial exhibitor pass.",
  },
  OTHER: {
    amount: 10,
    currency: "INR",
    currencySymbol: "₹",
    formattedPrice: "₹10",
    description: "Custom attendee registration category.",
  },
};

/**
 * Helper to fetch pricing details for any category code.
 * Falls back to DEFAULT_CATEGORY_PRICE if the category code is unrecognized.
 */
export function getCategoryPrice(categoryCode?: string | null): CategoryPrice {
  if (!categoryCode) {
    return DEFAULT_CATEGORY_PRICE;
  }
  const normalized = categoryCode.toUpperCase();
  return CATEGORY_PRICING[normalized] ?? DEFAULT_CATEGORY_PRICE;
}
