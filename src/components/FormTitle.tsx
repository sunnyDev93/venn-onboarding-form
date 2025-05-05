import React from "react";

interface FormTitleProps {
  children: React.ReactNode;
}

export const FormTitle = ({ children }: FormTitleProps) => {
  return (
    <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">
      {children}
    </h2>
  );
};
