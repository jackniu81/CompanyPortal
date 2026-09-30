"use client";

import { useState } from "react";
import { api, type ContactPage } from "@/lib/api";
import type { Dictionary } from "@/lib/i18n";

type FieldName = ContactPage["formConfig"]["fields"][number];
type Labels = Dictionary["contact"];
type FieldErrors = Partial<Record<FieldName | "captcha", string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MESSAGE_MIN = 10;
const INPUT_TYPES: Partial<Record<FieldName, "email" | "tel">> = {
  email: "email",
  phone: "tel",
};

const initialValues: Record<FieldName, string> = {
  name: "",
  email: "",
  phone: "",
  company: "",
  message: "",
};

export function ContactForm({
  formConfig,
  labels,
}: {
  formConfig: ContactPage["formConfig"];
  labels: Labels;
}) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [captchaOk, setCaptchaOk] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<
    { kind: "success" } | { kind: "error"; message: string } | null
  >(null);

  const required = new Set(formConfig.required);

  function validate(field: FieldName, value: string): string | undefined {
    const v = value.trim();
    if (required.has(field) && !v) {
      return labels.errors.required.replace("%s", labels.fields[field]);
    }
    if (field === "email" && v && !EMAIL_RE.test(v)) {
      return labels.errors.email;
    }
    if (field === "message" && v && v.length < MESSAGE_MIN) {
      return labels.errors.messageTooShort.replace("%d", String(MESSAGE_MIN));
    }
    return undefined;
  }

  function handleChange(field: FieldName, value: string) {
    setValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev, [field]: validate(field, value) };
      if (next[field] === undefined) delete next[field];
      return next;
    });
    if (result) setResult(null);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors: FieldErrors = {};
    for (const field of formConfig.fields) {
      const error = validate(field, values[field]);
      if (error) nextErrors[field] = error;
    }
    if (!captchaOk) nextErrors.captcha = labels.errors.captcha;
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSubmitting(true);
    setResult(null);
    try {
      const response = await api.submitContactForm({
        name: values.name.trim(),
        email: values.email.trim(),
        phone: values.phone.trim() || undefined,
        company: values.company.trim() || undefined,
        message: values.message.trim(),
      });
      if (response.ok) {
        setValues(initialValues);
        setCaptchaOk(false);
        setResult({ kind: "success" });
      } else {
        setResult({ kind: "error", message: response.error ?? labels.errors.generic });
      }
    } catch {
      setResult({ kind: "error", message: labels.errors.generic });
    } finally {
      setSubmitting(false);
    }
  }

  const inputClass = (hasError: boolean) =>
    `mt-2 w-full rounded-field border bg-canvas px-4 py-2.5 text-sm text-ink transition-colors placeholder:text-ink-subtle focus:outline-none ${
      hasError
        ? "border-accent-500 focus:border-accent-600"
        : "border-line focus:border-brand-500"
    }`;

  return (
    <section aria-labelledby="contact-form-heading">
      <h2
        id="contact-form-heading"
        className="text-sm font-medium tracking-caps uppercase text-ink-subtle"
      >
        {labels.formHeading}
      </h2>
      <form noValidate onSubmit={handleSubmit} className="mt-6 grid gap-5 sm:grid-cols-2">
        {formConfig.fields.map((field) => {
          const id = `contact-${field}`;
          const error = errors[field];
          const describedBy = error ? `${id}-error` : undefined;
          return (
            <div key={field} className={field === "message" ? "sm:col-span-2" : undefined}>
              <label htmlFor={id} className="block text-sm font-medium text-ink">
                {labels.fields[field]}
                {!required.has(field) && (
                  <span className="ml-2 text-xs font-normal text-ink-subtle">
                    {labels.optional}
                  </span>
                )}
              </label>
              {field === "message" ? (
                <textarea
                  id={id}
                  name={field}
                  rows={6}
                  value={values[field]}
                  onChange={(e) => handleChange(field, e.target.value)}
                  aria-invalid={error ? true : undefined}
                  aria-describedby={describedBy}
                  className={inputClass(Boolean(error))}
                />
              ) : (
                <input
                  id={id}
                  name={field}
                  type={INPUT_TYPES[field] ?? "text"}
                  value={values[field]}
                  onChange={(e) => handleChange(field, e.target.value)}
                  aria-invalid={error ? true : undefined}
                  aria-describedby={describedBy}
                  className={inputClass(Boolean(error))}
                />
              )}
              {error && (
                <p id={`${id}-error`} className="mt-1.5 text-xs text-accent-600">
                  {error}
                </p>
              )}
            </div>
          );
        })}

        <div className="rounded-field border border-line bg-surface p-4 sm:col-span-2">
          <label className="flex items-center gap-3 text-sm text-ink-muted">
            <input
              type="checkbox"
              checked={captchaOk}
              onChange={(e) => {
                setCaptchaOk(e.target.checked);
                setErrors((prev) => {
                  if (!prev.captcha) return prev;
                  const next = { ...prev };
                  delete next.captcha;
                  return next;
                });
              }}
              className="size-4 accent-brand-600"
            />
            {labels.captchaLabel}
          </label>
          {errors.captcha && (
            <p className="mt-2 text-xs text-accent-600">{errors.captcha}</p>
          )}
        </div>

        <div className="flex flex-col gap-3 sm:col-span-2">
          <button
            type="submit"
            disabled={submitting}
            className="w-fit rounded-field bg-primary px-6 py-2.5 text-sm font-medium text-on-primary transition-opacity hover:opacity-90 disabled:pointer-events-none disabled:opacity-60"
          >
            {submitting ? labels.status.submitting : formConfig.submitLabel}
          </button>
          <div aria-live="polite" role="status" className="min-h-5">
            {result?.kind === "success" && (
              <p className="text-sm text-brand-700">{labels.status.success}</p>
            )}
            {result?.kind === "error" && (
              <p className="text-sm text-accent-600">{result.message}</p>
            )}
          </div>
        </div>
      </form>
    </section>
  );
}
