import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import {
  CheckCircle2,
  CreditCard,
  ShieldCheck,
  Sparkles,
  Clock,
  Printer,
  RotateCcw,
  AlertCircle,
} from "lucide-react";
import { Layout } from "@/components/common/Layout";
import { PageHeader } from "@/components/common/PageHeader";
import { Section } from "@/components/common/Section";
import { SelectField, TextAreaField, TextField } from "@/components/registration/FormField";
import { Button } from "@/components/ui/button";
import { registrationService } from "@/api/registrationService";
import { useRegistrationCategories } from "@/hooks/useConferenceData";
import type { RegistrationRequest, RegistrationResponse } from "@/types/conference";
import { appConfig, buildSeo } from "@/config/site";
import { getCategoryPrice } from "@/config/pricing";
import { openRazorpayCheckout } from "@/lib/razorpay";

export const Route = createFileRoute("/registration")({
  head: () =>
    buildSeo({
      title: "Registration",
      description:
        "Register for WCCAUP2027 across delegate, student, researcher, author, speaker and exhibitor categories. Pay online securely with Razorpay.",
      path: "/registration",
    }),
  component: RegistrationPage,
});

const schema = z.object({
  firstName: z.string().trim().min(1, "Enter your first name").max(80),
  lastName: z.string().trim().min(1, "Enter your last name").max(80),
  email: z.string().trim().email("Enter a valid email address").max(255),
  phone: z.string().trim().max(40).optional(),
  organization: z.string().trim().max(150).optional(),
  designation: z.string().trim().max(150).optional(),
  country: z.string().trim().max(100).optional(),
  registrationCategory: z.string().min(1, "Select a registration category"),
  notes: z.string().trim().max(1000).optional(),
});

type Values = z.infer<typeof schema>;

const empty: Values = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  organization: "",
  designation: "",
  country: "",
  registrationCategory: "",
  notes: "",
};

function RegistrationPage() {
  const [values, setValues] = useState<Values>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof Values, string>>>({});
  const [result, setResult] = useState<RegistrationResponse | null>(null);
  const [paymentMode, setPaymentMode] = useState<"razorpay" | "later">("razorpay");
  const [isPaying, setIsPaying] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [paidInfo, setPaidInfo] = useState<{
    paymentId?: string;
    amount?: number;
    currency?: string;
  } | null>(null);

  const categoriesQuery = useRegistrationCategories();
  const selectedCategory = (categoriesQuery.data ?? []).find(
    (c) => c.code === values.registrationCategory,
  );
  const currentPricing = getCategoryPrice(values.registrationCategory);

  const mutation = useMutation({
    mutationFn: (payload: RegistrationRequest) => registrationService.createRegistration(payload),
    onSuccess: (response) => setResult(response),
  });

  const set = (field: keyof Values) => (value: string) =>
    setValues((current) => ({ ...current, [field]: value }));

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const parsed = schema.safeParse(values);
    if (!parsed.success) {
      const fieldErrors: Partial<Record<keyof Values, string>> = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof Values;
        fieldErrors[key] ??= issue.message;
      }
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    setPaymentError(null);

    const pricing = getCategoryPrice(parsed.data.registrationCategory);

    if (paymentMode === "razorpay") {
      setIsPaying(true);
      try {
        await openRazorpayCheckout({
          amountInRupees: pricing.amount,
          categoryName: selectedCategory?.label || parsed.data.registrationCategory,
          prefill: {
            name: `${parsed.data.firstName} ${parsed.data.lastName}`,
            email: parsed.data.email,
            contact: parsed.data.phone || "",
          },
          notes: {
            organization: parsed.data.organization || "",
            country: parsed.data.country || "",
          },
          onSuccess: (paymentId) => {
            setIsPaying(false);
            setPaidInfo({
              paymentId,
              amount: pricing.amount,
              currency: pricing.currency,
            });
            mutation.mutate({
              ...parsed.data,
              amount: pricing.amount,
              currency: pricing.currency,
              paymentStatus: "PAID",
              paymentReference: paymentId,
            });
          },
          onDismiss: () => {
            setIsPaying(false);
            setPaymentError(
              "Razorpay payment was dismissed. You can retry paying with Razorpay or choose 'Pay Later'.",
            );
          },
          onError: (err) => {
            setIsPaying(false);
            setPaymentError(
              err.message || "Payment could not be processed. Please check details and try again.",
            );
          },
        });
      } catch (err: any) {
        setIsPaying(false);
        setPaymentError(err.message || "Failed to initialize Razorpay checkout.");
      }
    } else {
      // Pay Later option
      mutation.mutate({
        ...parsed.data,
        amount: pricing.amount,
        currency: pricing.currency,
        paymentStatus: "PENDING",
      });
    }
  };

  const handleReset = () => {
    setValues(empty);
    setErrors({});
    setResult(null);
    setPaidInfo(null);
    setPaymentError(null);
  };

  if (result) {
    const isPaid = result.paymentStatus === "PAID" || paidInfo?.paymentId != null;
    const paymentRef = paidInfo?.paymentId || result.paymentReference;

    return (
      <Layout>
        <PageHeader
          eyebrow="Confirmation"
          title={isPaid ? "Registration & Payment Successful!" : "Registration Received"}
        />
        <Section>
          <div className="mx-auto max-w-xl rounded-2xl border border-border bg-card p-8 shadow-sm print:border-none print:shadow-none">
            <div className="flex justify-center">
              <div
                className={`flex h-16 w-16 items-center justify-center rounded-full ${
                  isPaid
                    ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400"
                    : "bg-amber-100 text-amber-600 dark:bg-amber-950 dark:text-amber-400"
                }`}
              >
                <CheckCircle2 className="h-9 w-9" aria-hidden="true" />
              </div>
            </div>

            <div className="mt-4 text-center">
              <h2 className="text-2xl font-bold tracking-tight text-foreground">
                {isPaid ? "Registration & Payment Successful" : "Registration Complete"}
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                {isPaid
                  ? `Thank you, ${values.firstName}! Your payment of ${currentPricing.formattedPrice} was successfully received via Razorpay.`
                  : `Thank you, ${values.firstName}! Your registration details have been received.`}
              </p>
            </div>

            <div className="mt-6 rounded-xl border border-border/80 bg-muted/30 p-5">
              <dl className="space-y-3.5 text-sm">
                <div className="flex justify-between gap-4 border-b border-border/60 pb-3">
                  <dt className="text-muted-foreground">Registration Number</dt>
                  <dd className="font-mono font-bold text-foreground">
                    {result.registrationNumber}
                  </dd>
                </div>
                <div className="flex justify-between gap-4 border-b border-border/60 pb-3">
                  <dt className="text-muted-foreground">Attendee</dt>
                  <dd className="font-medium text-foreground">
                    {values.firstName} {values.lastName}
                  </dd>
                </div>
                <div className="flex justify-between gap-4 border-b border-border/60 pb-3">
                  <dt className="text-muted-foreground">Email</dt>
                  <dd className="font-medium text-foreground">{result.email}</dd>
                </div>
                <div className="flex justify-between gap-4 border-b border-border/60 pb-3">
                  <dt className="text-muted-foreground">Category</dt>
                  <dd className="font-medium text-foreground">
                    {selectedCategory?.label || values.registrationCategory}
                  </dd>
                </div>
                <div className="flex justify-between gap-4 border-b border-border/60 pb-3">
                  <dt className="text-muted-foreground">Amount</dt>
                  <dd className="font-semibold text-foreground">
                    {currentPricing.formattedPrice} {currentPricing.currency}
                  </dd>
                </div>
                <div className="flex justify-between items-center gap-4 border-b border-border/60 pb-3">
                  <dt className="text-muted-foreground">Payment Status</dt>
                  <dd>
                    {isPaid ? (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-0.5 text-xs font-semibold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                        <ShieldCheck className="h-3.5 w-3.5" /> PAID (Razorpay)
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-3 py-0.5 text-xs font-semibold text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                        <Clock className="h-3.5 w-3.5" /> PENDING
                      </span>
                    )}
                  </dd>
                </div>
                {paymentRef ? (
                  <div className="flex justify-between gap-4 pt-1">
                    <dt className="text-muted-foreground">Razorpay Payment ID</dt>
                    <dd className="font-mono text-xs font-semibold text-primary">{paymentRef}</dd>
                  </div>
                ) : null}
              </dl>
            </div>

            {isPaid ? (
              <div className="mt-6 rounded-lg bg-emerald-500/10 p-3.5 text-center text-xs text-emerald-700 dark:text-emerald-400">
                A confirmation receipt with your registration pass has been recorded.
              </div>
            ) : result.paymentLink ? (
              <Button asChild size="lg" className="mt-6 w-full">
                <a href={result.paymentLink}>Proceed to Payment</a>
              </Button>
            ) : (
              <p className="mt-6 text-center text-xs text-muted-foreground">
                Your payment link will be sent to {result.email} by the conference secretariat.
              </p>
            )}

            <div className="mt-6 flex flex-col gap-3 sm:flex-row print:hidden">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => window.print()}
                type="button"
              >
                <Printer className="mr-2 h-4 w-4" /> Print Receipt
              </Button>
              <Button variant="outline" className="w-full" onClick={handleReset} type="button">
                <RotateCcw className="mr-2 h-4 w-4" /> Register Another
              </Button>
              <Button asChild className="w-full">
                <Link to="/">Home</Link>
              </Button>
            </div>
          </div>
        </Section>
      </Layout>
    );
  }

  return (
    <Layout>
      <PageHeader
        eyebrow="Participate"
        title="Registration"
        description="Register for WCCAUP2027. Select your category, view pricing, and pay online instantly with Razorpay."
      />
      <Section>
        <form onSubmit={onSubmit} noValidate className="mx-auto max-w-3xl space-y-10">
          <fieldset className="rounded-xl border border-border bg-card p-8">
            <legend className="px-2 text-sm font-semibold uppercase tracking-widest text-primary">
              Personal Information
            </legend>
            <div className="mt-4 grid gap-5 sm:grid-cols-2">
              <TextField
                id="firstName"
                label="First Name"
                required
                value={values.firstName}
                onChange={set("firstName")}
                error={errors.firstName}
              />
              <TextField
                id="lastName"
                label="Last Name"
                required
                value={values.lastName}
                onChange={set("lastName")}
                error={errors.lastName}
              />
              <TextField
                id="email"
                type="email"
                label="Email"
                required
                value={values.email}
                onChange={set("email")}
                error={errors.email}
              />
              <TextField
                id="phone"
                label="Phone"
                value={values.phone ?? ""}
                onChange={set("phone")}
                error={errors.phone}
              />
              <TextField
                id="country"
                label="Country"
                value={values.country ?? ""}
                onChange={set("country")}
                error={errors.country}
              />
            </div>
          </fieldset>

          <fieldset className="rounded-xl border border-border bg-card p-8">
            <legend className="px-2 text-sm font-semibold uppercase tracking-widest text-primary">
              Professional Information
            </legend>
            <div className="mt-4 grid gap-5 sm:grid-cols-2">
              <TextField
                id="organization"
                label="Organization"
                value={values.organization ?? ""}
                onChange={set("organization")}
                error={errors.organization}
              />
              <TextField
                id="designation"
                label="Designation"
                value={values.designation ?? ""}
                onChange={set("designation")}
                error={errors.designation}
              />
            </div>
          </fieldset>

          <fieldset className="rounded-xl border border-border bg-card p-8">
            <legend className="px-2 text-sm font-semibold uppercase tracking-widest text-primary">
              Registration Category
            </legend>
            <div className="mt-4 grid gap-5">
              <SelectField
                id="registrationCategory"
                label="Category"
                required
                value={values.registrationCategory}
                onChange={set("registrationCategory")}
                error={errors.registrationCategory}
                options={(categoriesQuery.data ?? []).map((category) => ({
                  value: category.code,
                  label: `${category.label} — ₹10`,
                }))}
              />

              {values.registrationCategory ? (
                <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 transition-all">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <Sparkles className="h-4 w-4 text-primary" />
                        <span className="font-semibold text-foreground">
                          {selectedCategory?.label || values.registrationCategory} Pass
                        </span>
                        <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                          {currentPricing.formattedPrice} {currentPricing.currency}
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {currentPricing.description ||
                          selectedCategory?.description ||
                          "Full conference access for the selected category."}
                      </p>
                    </div>
                    <div className="text-left sm:text-right">
                      <span className="text-2xl font-bold text-foreground">
                        {currentPricing.formattedPrice}
                      </span>
                      <span className="ml-1 text-xs text-muted-foreground">
                        {currentPricing.currency}
                      </span>
                    </div>
                  </div>
                </div>
              ) : null}

              <TextAreaField
                id="notes"
                label="Notes"
                rows={3}
                value={values.notes ?? ""}
                onChange={set("notes")}
                error={errors.notes}
              />
            </div>
          </fieldset>

          <fieldset className="rounded-xl border border-border bg-card p-8">
            <legend className="px-2 text-sm font-semibold uppercase tracking-widest text-primary">
              Payment Details
            </legend>

            {!values.registrationCategory ? (
              <div className="mt-4 rounded-xl border border-dashed border-border p-6 text-center text-muted-foreground">
                <CreditCard className="mx-auto h-8 w-8 opacity-40" />
                <p className="mt-2 text-sm font-medium text-foreground">
                  Select a category above to view payment options
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Each category is currently set to ₹10. Select your category to pay online via
                  Razorpay.
                </p>
              </div>
            ) : (
              <div className="mt-4 space-y-6">
                {/* Price Breakdown */}
                <div className="rounded-xl border border-border bg-muted/30 p-5">
                  <div className="flex justify-between border-b border-border/70 pb-2 text-sm">
                    <span className="text-muted-foreground">Category Pass Fee</span>
                    <span className="font-medium text-foreground">
                      {currentPricing.formattedPrice}
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-border/70 py-2 text-sm">
                    <span className="text-muted-foreground">Taxes & Processing Fee</span>
                    <span className="font-medium text-emerald-600 dark:text-emerald-400">
                      ₹0 (Waived)
                    </span>
                  </div>
                  <div className="flex justify-between pt-3 font-semibold">
                    <span className="text-base text-foreground">Total Amount to Pay</span>
                    <span className="text-xl text-primary">
                      {currentPricing.formattedPrice} {currentPricing.currency}
                    </span>
                  </div>
                </div>

                {/* Payment Method Selector */}
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-foreground">
                    Choose Payment Option
                  </label>

                  {/* Option 1: Razorpay */}
                  <div
                    onClick={() => setPaymentMode("razorpay")}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === "Enter" && setPaymentMode("razorpay")}
                    className={`flex cursor-pointer items-start justify-between rounded-xl border p-4 transition-all ${
                      paymentMode === "razorpay"
                        ? "border-primary bg-primary/5 ring-1 ring-primary"
                        : "border-border bg-card hover:border-primary/40"
                    }`}
                  >
                    <div className="flex items-start gap-3.5">
                      <input
                        type="radio"
                        id="pay-razorpay"
                        name="paymentMode"
                        value="razorpay"
                        checked={paymentMode === "razorpay"}
                        onChange={() => setPaymentMode("razorpay")}
                        className="mt-1 accent-primary"
                      />
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <label
                            htmlFor="pay-razorpay"
                            className="cursor-pointer text-sm font-semibold text-foreground"
                          >
                            Pay Online via Razorpay
                          </label>
                          <span className="rounded bg-primary/15 px-2 py-0.5 text-[11px] font-bold text-primary">
                            Instant Confirmation
                          </span>
                          <span className="rounded bg-amber-500/10 px-2 py-0.5 text-[11px] font-semibold text-amber-600 dark:text-amber-400">
                            Test Mode Active
                          </span>
                        </div>
                        <p className="mt-1 text-xs text-muted-foreground">
                          Supports UPI (Google Pay, PhonePe, Paytm), Credit & Debit Cards,
                          NetBanking, and Wallets.
                        </p>
                        <div className="mt-2.5 flex items-center gap-2 text-[11px] text-muted-foreground">
                          <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                          <span>Official Razorpay Gateway • 256-Bit SSL Encryption</span>
                        </div>
                      </div>
                    </div>
                    <span className="hidden font-bold text-primary sm:inline">
                      {currentPricing.formattedPrice}
                    </span>
                  </div>

                  {/* Option 2: Pay Later */}
                  <div
                    onClick={() => setPaymentMode("later")}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === "Enter" && setPaymentMode("later")}
                    className={`flex cursor-pointer items-start justify-between rounded-xl border p-4 transition-all ${
                      paymentMode === "later"
                        ? "border-primary bg-primary/5 ring-1 ring-primary"
                        : "border-border bg-card hover:border-primary/40"
                    }`}
                  >
                    <div className="flex items-start gap-3.5">
                      <input
                        type="radio"
                        id="pay-later"
                        name="paymentMode"
                        value="later"
                        checked={paymentMode === "later"}
                        onChange={() => setPaymentMode("later")}
                        className="mt-1 accent-primary"
                      />
                      <div>
                        <label
                          htmlFor="pay-later"
                          className="cursor-pointer text-sm font-semibold text-foreground"
                        >
                          Pay Later (Offline / Secretariat Invoice)
                        </label>
                        <p className="mt-1 text-xs text-muted-foreground">
                          Register today and receive a payment link via email from the conference
                          secretariat.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </fieldset>

          {paymentError ? (
            <div
              role="alert"
              className="flex items-start gap-3 rounded-xl border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive"
            >
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
              <span>{paymentError}</span>
            </div>
          ) : null}

          {mutation.error ? (
            <div
              role="alert"
              className="flex items-start gap-3 rounded-xl border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive"
            >
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
              <span>
                {mutation.error instanceof Error
                  ? mutation.error.message
                  : "Registration could not be completed."}
              </span>
            </div>
          ) : null}

          <Button
            type="submit"
            size="lg"
            className="w-full py-6 text-base font-semibold shadow-md"
            disabled={mutation.isPending || isPaying}
          >
            {isPaying ? (
              "Opening Razorpay Checkout…"
            ) : mutation.isPending ? (
              "Submitting Registration…"
            ) : paymentMode === "razorpay" && values.registrationCategory ? (
              <>
                <CreditCard className="mr-2 h-5 w-5" />
                Pay {currentPricing.formattedPrice} with Razorpay & Complete Registration
              </>
            ) : (
              "Complete Registration"
            )}
          </Button>
        </form>
      </Section>
    </Layout>
  );
}
