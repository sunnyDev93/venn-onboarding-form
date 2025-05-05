import React from "react";

interface FormTitleProps {
  children: React.ReactNode;
  subtitle?: string;
  step?: {
    current: number;
    total: number;
  };
}

export const FormTitle = ({ children, subtitle, step }: FormTitleProps) => {
  return (
    <div className="text-center mb-6">
      {step && (
        <div className="text-sm text-gray-500 mb-1">
          Step {step.current} of {step.total}
        </div>
      )}
      <h2 className="text-2xl font-bold text-gray-800">{children}</h2>
      {subtitle && (
        <p className="text-gray-600 mt-1 text-sm">{subtitle}</p>
      )}
    </div>
  );
};
