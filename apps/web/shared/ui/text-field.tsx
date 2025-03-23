import React from 'react';

interface TextFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  label: string;
  isTextArea?: boolean;
}

export function TextField({
  label,
  isTextArea = false,
  className,
  ...props
}: TextFieldProps) {
  return (
    <div className="mb-3">
      <label className="block text-sm font-medium">{label}</label>
      {isTextArea ? (
        <textarea
          {...props}
          className={`w-full rounded border p-2 ${className}`}
        />
      ) : (
        <input
          {...props}
          className={`w-full rounded border p-2 ${className}`}
        />
      )}
    </div>
  );
}
