import type { ReactNode } from "react";

interface BaseProps {
  id: string;
  label: string;
  error?: string | undefined;
  required?: boolean;
  children?: ReactNode;
}

export function FieldWrapper({ id, label, error, required, children }: BaseProps) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium">
        {label}
        {required ? (
          <span className="ml-1 text-destructive" aria-hidden="true">
            *
          </span>
        ) : null}
      </label>
      <div className="mt-2">{children}</div>
      {error ? (
        <p id={`${id}-error`} className="mt-1 text-sm text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  );
}

const inputClass = "w-full rounded-md border border-input bg-background px-3 py-2 text-sm";

export function TextField({
  id,
  label,
  value,
  onChange,
  error,
  required,
  type = "text",
  placeholder,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string | undefined;
  required?: boolean;
  type?: string;
  placeholder?: string;
}) {
  return (
    <FieldWrapper id={id} label={label} error={error} required={required ?? false}>
      <input
        id={id}
        type={type}
        value={value}
        placeholder={placeholder ?? ""}
        onChange={(event) => onChange(event.target.value)}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={inputClass}
      />
    </FieldWrapper>
  );
}

export function TextAreaField({
  id,
  label,
  value,
  onChange,
  error,
  required,
  rows = 6,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string | undefined;
  required?: boolean;
  rows?: number;
}) {
  return (
    <FieldWrapper id={id} label={label} error={error} required={required ?? false}>
      <textarea
        id={id}
        rows={rows}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={inputClass}
      />
    </FieldWrapper>
  );
}

export function SelectField({
  id,
  label,
  value,
  onChange,
  error,
  required,
  options,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string | undefined;
  required?: boolean;
  options: { value: string; label: string }[];
}) {
  return (
    <FieldWrapper id={id} label={label} error={error} required={required ?? false}>
      <select
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={inputClass}
      >
        <option value="">Please select…</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </FieldWrapper>
  );
}
