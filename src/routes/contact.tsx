import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { Layout } from "@/components/common/Layout";
import { PageHeader } from "@/components/common/PageHeader";
import { ContactSection } from "@/components/conference/ContactSection";
import { Button } from "@/components/ui/button";
import { buildSeo } from "@/config/site";

export const Route = createFileRoute("/contact")({
  head: () =>
    buildSeo({
      title: "Contact",
      description:
        "Contact the WCCAUP2027 secretariat for programme, registration and sponsorship enquiries.",
      path: "/contact",
    }),
  component: ContactPage,
});

const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Please enter your name")
    .max(100, "Name must be under 100 characters"),
  email: z.string().trim().email("Enter a valid email address").max(255),
  subject: z.string().trim().min(1, "Please enter a subject").max(150),
  message: z
    .string()
    .trim()
    .min(1, "Please enter a message")
    .max(1000, "Message must be under 1000 characters"),
});

type ContactValues = z.infer<typeof contactSchema>;

function ContactPage() {
  const [values, setValues] = useState<ContactValues>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof ContactValues, string>>>({});
  const [sent, setSent] = useState(false);

  const update =
    (field: keyof ContactValues) =>
      (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
        setValues((current) => ({ ...current, [field]: event.target.value }));

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const result = contactSchema.safeParse(values);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof ContactValues, string>> = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0] as keyof ContactValues;
        fieldErrors[key] ??= issue.message;
      }
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    setSent(true);
  };

  return (
    <Layout>
      <PageHeader
        eyebrow="Contact"
        title="Contact the Secretariat"
        description="We aim to respond to all enquiries within three working days."
      />
      <ContactSection>
        {sent ? (
          <div className="rounded-xl border border-border bg-card p-8">
            <h2 className="text-lg font-semibold">Thank you for getting in touch</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Your message has been prepared. Contact-form delivery is handled by the conference
              backend, so please also email the secretariat directly if your enquiry is urgent.
            </p>
            <Button variant="outline" className="mt-6" onClick={() => setSent(false)}>
              Send another message
            </Button>
          </div>
        ) : (
          <form
            onSubmit={onSubmit}
            noValidate
            className="rounded-xl border border-border bg-card p-8"
          >
            <h2 className="text-lg font-semibold">Send a message</h2>
            <div className="mt-6 grid gap-5">
              <Field
                id="name"
                label="Name"
                value={values.name}
                onChange={update("name")}
                error={errors.name}
              />
              <Field
                id="email"
                type="email"
                label="Email"
                value={values.email}
                onChange={update("email")}
                error={errors.email}
              />
              <Field
                id="subject"
                label="Subject"
                value={values.subject}
                onChange={update("subject")}
                error={errors.subject}
              />
              <div>
                <label htmlFor="message" className="text-sm font-medium">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  value={values.message}
                  onChange={update("message")}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? "message-error" : undefined}
                  className="mt-2 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                />
                {errors.message ? (
                  <p id="message-error" className="mt-1 text-sm text-destructive">
                    {errors.message}
                  </p>
                ) : null}
              </div>
            </div>
            <Button type="submit" className="mt-6 w-full">
              Send Message
            </Button>
          </form>
        )}
      </ContactSection>
    </Layout>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  error,
  type = "text",
}: {
  id: string;
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string | undefined;
  type?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className="mt-2 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
      />
      {error ? (
        <p id={`${id}-error`} className="mt-1 text-sm text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  );
}
