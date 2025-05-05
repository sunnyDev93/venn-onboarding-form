import { render, screen } from "@testing-library/react";
import { FormProvider, useForm } from "react-hook-form";
import { OnboardingForm } from "../components/Onboarding/OnboardingForm";

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  const methods = useForm();
  return <FormProvider {...methods}>{children}</FormProvider>;
};

test("renders all fields and submit button", () => {
  render(<OnboardingForm />, { wrapper: Wrapper });

  expect(screen.getByLabelText(/First Name/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Last Name/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Phone Number/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Corporation Number/i)).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /Submit/i })).toBeInTheDocument();
});
