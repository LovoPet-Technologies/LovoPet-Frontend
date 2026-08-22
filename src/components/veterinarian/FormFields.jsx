import React from "react";

const baseInput =
  "w-full rounded-lg border border-[#3D1E5C]/15 bg-white px-3.5 py-2.5 text-sm text-[#3D1E5C] placeholder:text-[#3D1E5C]/35 focus:border-[#E8752E] focus:outline-none focus:ring-2 focus:ring-[#E8752E]/25 transition-colors";

const errorInput = "border-red-400 focus:border-red-500 focus:ring-red-200";

function Label({ label, required, htmlFor }) {
  if (!label) return null;
  return (
    <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium text-[#3D1E5C]">
      {label}
      {required && <span className="ml-0.5 text-[#E8752E]">*</span>}
    </label>
  );
}

function ErrorText({ error }) {
  if (!error) return null;
  return <p className="mt-1 text-xs text-red-500">{error}</p>;
}

export function TextField({
  name,
  label,
  value,
  onChange,
  required,
  type = "text",
  placeholder,
  error,
}) {
  return (
    <div>
      <Label label={label} required={required} htmlFor={name} />
      <input
        id={name}
        name={name}
        type={type}
        value={value ?? ""}
        onChange={(e) => onChange(name, e.target.value)}
        placeholder={placeholder}
        className={`${baseInput} ${error ? errorInput : ""}`}
      />
      <ErrorText error={error} />
    </div>
  );
}

export function TextAreaField({ name, label, value, onChange, required, placeholder, rows = 4, error }) {
  return (
    <div>
      <Label label={label} required={required} htmlFor={name} />
      <textarea
        id={name}
        name={name}
        rows={rows}
        value={value ?? ""}
        onChange={(e) => onChange(name, e.target.value)}
        placeholder={placeholder}
        className={`${baseInput} resize-none ${error ? errorInput : ""}`}
      />
      <ErrorText error={error} />
    </div>
  );
}

export function SelectField({ name, label, value, onChange, required, options, placeholder = "Select", error }) {
  return (
    <div>
      <Label label={label} required={required} htmlFor={name} />
      <select
        id={name}
        name={name}
        value={value ?? ""}
        onChange={(e) => onChange(name, e.target.value)}
        className={`${baseInput} ${error ? errorInput : ""}`}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      <ErrorText error={error} />
    </div>
  );
}

export function CheckboxGroupField({ name, label, values = [], onChange, options, required, error, allowOther = true }) {
  const toggle = (option) => {
    const next = values.includes(option)
      ? values.filter((v) => v !== option)
      : [...values, option];
    onChange(name, next);
  };

  return (
    <div>
      <Label label={label} required={required} />
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {options.map((option) => (
          <label
            key={option}
            className="flex cursor-pointer items-center gap-2 rounded-lg border border-[#3D1E5C]/10 bg-white px-3 py-2 text-sm text-[#3D1E5C] hover:border-[#E8752E]/40"
          >
            <input
              type="checkbox"
              checked={values.includes(option)}
              onChange={() => toggle(option)}
              className="h-4 w-4 rounded border-[#3D1E5C]/30 text-[#E8752E] focus:ring-[#E8752E]/40"
            />
            {option}
          </label>
        ))}
      </div>
      <ErrorText error={error} />
    </div>
  );
}

export function FileField({ name, label, onChange, required, accept, fileName, error }) {
  return (
    <div>
      <Label label={label} required={required} htmlFor={name} />
      <label
        htmlFor={name}
        className={`flex cursor-pointer items-center justify-between rounded-lg border border-dashed px-3.5 py-2.5 text-sm transition-colors ${
          error ? "border-red-400" : "border-[#3D1E5C]/25 hover:border-[#E8752E]"
        }`}
      >
        <span className={fileName ? "text-[#3D1E5C]" : "text-[#3D1E5C]/40"}>
          {fileName || "Choose file"}
        </span>
        <span className="ml-3 shrink-0 rounded-md bg-[#E8752E]/10 px-2.5 py-1 text-xs font-medium text-[#E8752E]">
          Browse
        </span>
      </label>
      <input
        id={name}
        name={name}
        type="file"
        accept={accept}
        onChange={(e) => onChange(name, e.target.files?.[0] ?? null)}
        className="hidden"
      />
      <ErrorText error={error} />
    </div>
  );
}
