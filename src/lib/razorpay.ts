import { appConfig } from "@/config/site";

declare global {
  interface Window {
    Razorpay?: any;
  }
}

const RAZORPAY_SCRIPT_URL = "https://checkout.razorpay.com/v1/checkout.js";

/**
 * Ensures the Razorpay checkout script is loaded into the document.
 */
export function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (typeof window === "undefined") {
      resolve(false);
      return;
    }

    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const existingScript = document.querySelector(`script[src="${RAZORPAY_SCRIPT_URL}"]`);
    if (existingScript) {
      existingScript.addEventListener("load", () => resolve(true));
      existingScript.addEventListener("error", () => resolve(false));
      return;
    }

    const script = document.createElement("script");
    script.src = RAZORPAY_SCRIPT_URL;
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export interface RazorpayCheckoutOptions {
  amountInRupees: number;
  categoryName?: string;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  notes?: Record<string, string>;
  onSuccess: (paymentId: string, response: RazorpaySuccessResponse) => void;
  onDismiss?: () => void;
  onError?: (error: Error) => void;
}

export interface RazorpaySuccessResponse {
  razorpay_payment_id: string;
  razorpay_order_id?: string;
  razorpay_signature?: string;
}

/**
 * Launches the official Razorpay Checkout popup modal.
 */
export async function openRazorpayCheckout(options: RazorpayCheckoutOptions): Promise<void> {
  const isLoaded = await loadRazorpayScript();
  if (!isLoaded || !window.Razorpay) {
    const error = new Error("Unable to initialize Razorpay payment gateway. Please check your internet connection.");
    options.onError?.(error);
    throw error;
  }

  const key = appConfig.razorpayKeyId;
  const amountInPaise = Math.round(options.amountInRupees * 100);

  const razorpayOptions = {
    key,
    amount: amountInPaise,
    currency: "INR",
    name: "WCCAUP2027 Conference",
    description: options.categoryName
      ? `${options.categoryName} Registration Fee (₹${options.amountInRupees})`
      : `Conference Registration Fee (₹${options.amountInRupees})`,
    image: "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f393.png",
    handler: function (response: RazorpaySuccessResponse) {
      options.onSuccess(response.razorpay_payment_id, response);
    },
    prefill: {
      name: options.prefill?.name || "",
      email: options.prefill?.email || "",
      contact: options.prefill?.contact || "",
    },
    notes: {
      category: options.categoryName || "General",
      amount_inr: String(options.amountInRupees),
      ...options.notes,
    },
    theme: {
      color: "#2563eb",
    },
    modal: {
      ondismiss: function () {
        options.onDismiss?.();
      },
      backdropclose: false,
    },
  };

  const razorpayInstance = new window.Razorpay(razorpayOptions);
  razorpayInstance.on("payment.failed", function (response: any) {
    const errorMsg = response?.error?.description || "Payment failed. Please try again.";
    options.onError?.(new Error(errorMsg));
  });

  razorpayInstance.open();
}
