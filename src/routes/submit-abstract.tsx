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
import { abstractService } from "@/api/abstractService";
import type { AbstractSubmissionRequest, AbstractSubmissionResponse } from "@/types/conference";
import { appConfig, buildSeo } from "@/config/site";

export const Route = createFileRoute("/submit-abstract")({
  head: () =>
    buildSeo({
      title: "Submit Abstract",
      description:
        "Submit an oral, poster or workshop abstract to the WCCAUP2027 scientific programme.",
      path: "/submit-abstract",
    }),
  component: SubmitAbstractPage,
});

const schema = z.object({
  firstName: z.string().trim().min(1, "Enter your first name").max(80),
  lastName: z.string().trim().min(1, "Enter your last name").max(80),
  email: z.string().trim().email("Enter a valid email address").max(255),
  phone: z.string().trim().max(40).optional(),
  organization: z.string().trim().max(150).optional(),
  country: z.string().trim().max(100).optional(),
  abstractTitle: z.string().trim().min(1, "Enter the abstract title").max(200),
  abstractBody: z
    .string()
    .trim()
    .min(50, "The abstract should be at least 50 characters")
    .max(4000),
  keywords: z.string().trim().max(200).optional(),
  presentationType: z.enum(["ORAL", "POSTER", "WORKSHOP", "OTHER"], {
    errorMap: () => ({ message: "Select a presentation type" }),
  }),
});

type Values = Omit<z.input<typeof schema>, "presentationType"> & {
  presentationType: "" | "ORAL" | "POSTER" | "WORKSHOP" | "OTHER";
};

const empty: Values = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  organization: "",
  country: "",
  abstractTitle: "",
  abstractBody: "",
  keywords: "",
  presentationType: "",
};

function SubmitAbstractPage() {
  const [values, setValues] = useState<Values>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof Values, string>>>({});
  const [result, setResult] = useState<AbstractSubmissionResponse | null>(null);

  const mutation = useMutation({
    mutationFn: (payload: AbstractSubmissionRequest) => abstractService.submitAbstract(payload),
    onSuccess: (response) => setResult(response),
  });

  const set = (field: keyof Values) => (value: string) =>
    setValues((current) => ({ ...current, [field]: value }) as Values);

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
        <PageHeader eyebrow="Submissions" title="Abstract Submitted Successfully" />
        <Section>
          <div className="mx-auto max-w-xl rounded-xl border border-border bg-card p-8 text-center">
            <CheckCircle2 className="mx-auto h-10 w-10 text-primary" aria-hidden="true" />
            <h2 className="mt-4 text-xl font-semibold">Abstract Submitted Successfully</h2>
            <dl className="mt-6 space-y-3 text-left text-sm">
              <div className="flex justify-between gap-4 border-b border-border pb-3">
                <dt className="text-muted-foreground">Abstract Number</dt>
                <dd className="font-semibold">{result.abstractNumber}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">Submission Status</dt>
                <dd className="font-semibold">{result.submissionStatus}</dd>
              </div>
            </dl>
            {appConfig.useMockData ? (
              <p className="mt-6 text-sm text-muted-foreground">
                Demo mode: the real abstract number is issued by the conference backend.
              </p>
            ) : null}
          </div>
        </Section>
      </Layout>
    );
  }

  return (
    <Layout>
      <PageHeader
        eyebrow="Call for Papers"
        title="Submit Abstract"
        description="Submissions are reviewed by the programme committee across all conference tracks."
      />
      <Section>
        <form onSubmit={onSubmit} noValidate className="mx-auto max-w-3xl space-y-10">
          <fieldset className="rounded-xl border border-border bg-card p-8">
            <legend className="px-2 text-sm font-semibold uppercase tracking-widest text-primary">
              Author Details
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
                id="organization"
                label="Organization"
                value={values.organization ?? ""}
                onChange={set("organization")}
                error={errors.organization}
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
              Abstract
            </legend>
            <div className="mt-4 grid gap-5">
              <TextField
                id="abstractTitle"
                label="Abstract Title"
                required
                value={values.abstractTitle}
                onChange={set("abstractTitle")}
                error={errors.abstractTitle}
              />
              <TextAreaField
                id="abstractBody"
                label="Abstract"
                required
                value={values.abstractBody}
                onChange={set("abstractBody")}
                error={errors.abstractBody}
              />
              <TextField
                id="keywords"
                label="Keywords"
                placeholder="Comma separated"
                value={values.keywords ?? ""}
                onChange={set("keywords")}
                error={errors.keywords}
              />
              <SelectField
                id="presentationType"
                label="Presentation Type"
                required
                value={values.presentationType}
                onChange={set("presentationType")}
                error={errors.presentationType}
                options={[
                  { value: "ORAL", label: "Oral" },
                  { value: "POSTER", label: "Poster" },
                  { value: "WORKSHOP", label: "Workshop" },
                  { value: "OTHER", label: "Other" },
                ]}
              />
            </div>
          </fieldset>

          {mutation.error ? (
            <p
              role="alert"
              className="rounded-md border border-destructive/30 bg-destructive/5 p-4 text-sm"
            >
              {mutation.error instanceof Error
                ? mutation.error.message
                : "Your abstract could not be submitted."}
            </p>
          ) : null}

          <Button type="submit" size="lg" className="w-full" disabled={mutation.isPending}>
            {mutation.isPending ? "Submitting…" : "Submit Abstract"}
          </Button>
        </form>
      </Section>
    </Layout>
  );
}
