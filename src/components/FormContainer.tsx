import React from "react";

interface Props {
  children: React.ReactNode;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export const FormContainer = ({ children, onSubmit }: Props) => {
  return (
    <form
      onSubmit={onSubmit}
      className="max-w-xl mx-auto mt-10 p-8 border border-gray-200 shadow-lg rounded-lg bg-white space-y-6"
    >
      {children}
    </form>
  );
};
