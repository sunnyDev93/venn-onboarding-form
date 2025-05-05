import React from "react";

interface Props {
  label: string;
  error?: string;
  children: React.ReactNode;
}

export const FormFieldWrapper = ({ label, error, children }: Props) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    {children}
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);
