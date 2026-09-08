import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { CheckCircle2 } from "lucide-react";
import { Layout } from "@/components/common/Layout";
import { PageHeader } from "@/components/common/PageHeader";
import { Section } from "@/components/common/Section";
import { SelectField, TextAreaField, TextField } from "@/components/registration/FormField";
import { Button } from "@/components/ui/button";
import { registrationService } from "@/api/registrationService";
import { useRegistrationCategories } from "@/hooks/useConferenceData";
import type { RegistrationRequest, RegistrationResponse } from "@/types/conference";
import { appConfig, buildSeo } from "@/config/site";

export const Route = createFileRoute("/registration")({
  head: () =>
    buildSeo({
      title: "Registration",
      description:
        "Register for WCCAUP2027 across delegate, student, researcher, author, speaker and exhibitor categories.",
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
  const categoriesQuery = useRegistrationCategories();

  const mutation = useMutation({
    mutationFn: (payload: RegistrationRequest) => registrationService.createRegistration(payload),
    onSuccess: (response) => setResult(response),
  });

  const set = (field: keyof Values) => (value: string) =>
    setValues((current) => ({ ...current, [field]: value }));

  const onSubmit = (event: React.FormEvent) => {
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
    mutation.mutate(parsed.data);
  };

  if (result) {
    return (
      <Layout>
        <PageHeader eyebrow="Registration" title="Registration Successful" />
        <Section>
          <div className="mx-auto max-w-xl rounded-xl border border-border bg-card p-8 text-center">
            <CheckCircle2 className="mx-auto h-10 w-10 text-primary" aria-hidden="true" />
            <h2 className="mt-4 text-xl font-semibold">Registration Successful</h2>
            <dl className="mt-6 space-y-3 text-left text-sm">
              <div className="flex justify-between gap-4 border-b border-border pb-3">
                <dt className="text-muted-foreground">Registration Number</dt>
                <dd className="font-semibold">{result.registrationNumber}</dd>
              </div>
              <div className="flex justify-between gap-4 border-b border-border pb-3">
                <dt className="text-muted-foreground">Email</dt>
                <dd className="font-semibold">{result.email}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">Payment status</dt>
                <dd className="font-semibold">{result.paymentStatus}</dd>
              </div>
            </dl>
            {result.paymentLink ? (
              <Button asChild size="lg" className="mt-8 w-full">
                <a href={result.paymentLink}>Proceed to Payment</a>
              </Button>
            ) : (
              <p className="mt-8 text-sm text-muted-foreground">
                {appConfig.useMockData
                  ? "Demo mode: the payment link is issued by the conference backend once it is connected."
                  : "Your payment link will be sent by the conference secretariat."}
              </p>
            )}
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
        description="Complete the form below to register for WCCAUP2027. Payment is completed through the conference payment provider."
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
                  label: category.label,
                }))}
              />
              <TextAreaField
                id="notes"
                label="Notes"
                rows={4}
                value={values.notes ?? ""}
                onChange={set("notes")}
                error={errors.notes}
              />
            </div>
          </fieldset>

          <fieldset className="rounded-xl border border-border bg-card p-8">
            <legend className="px-2 text-sm font-semibold uppercase tracking-widest text-primary">
              Payment
            </legend>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              After your registration is created, the conference backend issues a secure payment
              link. No payment details are collected or stored by this website.
            </p>
          </fieldset>

          {mutation.error ? (
            <p
              role="alert"
              className="rounded-md border border-destructive/30 bg-destructive/5 p-4 text-sm"
            >
              {mutation.error instanceof Error
                ? mutation.error.message
                : "Registration could not be completed."}
            </p>
          ) : null}

          <Button type="submit" size="lg" className="w-full" disabled={mutation.isPending}>
            {mutation.isPending ? "Submitting…" : "Complete Registration"}
          </Button>
        </form>
      </Section>
    </Layout>
  );
}
