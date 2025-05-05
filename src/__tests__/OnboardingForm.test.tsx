/* eslint-disable @typescript-eslint/no-require-imports */
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { FormProvider, useForm } from "react-hook-form";
import { OnboardingForm } from "../components/Onboarding/OnboardingForm";

jest.mock("../hooks/useValidateCorporationNumber.ts", () => ({
  useValidateCorporationNumber: () => ({
    validate: jest.fn(() => Promise.resolve(true)),
  }),
}));

jest.mock("../services/api.ts", () => ({
  submitProfileDetails: jest.fn(() => Promise.resolve()),
}));

jest.spyOn(require("../services/api"), "submitProfileDetails").mockImplementation(() => {
  const error = new Error("Request failed") as Error & { isAxiosError?: boolean; response?: { data: { message: string } } };
  error.isAxiosError = true;
  error.response = { data: { message: "An unexpected error occurred. Please try again." } };
  return Promise.reject(error);
});

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  const methods = useForm();
  return <FormProvider {...methods}>{children}</FormProvider>;
};

beforeAll(() => {
  window.alert = jest.fn();
});

describe("OnboardingForm", () => {
  test("renders all fields and submit button", () => {
    render(<OnboardingForm />, { wrapper: Wrapper });

    expect(screen.getByLabelText(/First Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Last Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Phone Number/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Corporation Number/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Submit/i })).toBeInTheDocument();
  });

  test("displays error if invalid corporation number", async () => {
    const validateMock = jest.fn(() => Promise.resolve(false));
    jest.spyOn(require("../hooks/useValidateCorporationNumber.ts"), "useValidateCorporationNumber").mockReturnValue({
      validate: validateMock,
    });

    render(<OnboardingForm />, { wrapper: Wrapper });

    const corpInput = screen.getByLabelText(/Corporation Number/i);
    fireEvent.blur(corpInput);

    await waitFor(() => {
      expect(screen.getByText(/Invalid corporation number/i)).toBeInTheDocument();
    });
  });

  test("submits the form with valid data", async () => {
    const validateMock = jest.fn(() => Promise.resolve(true));
    const submitMock = require("../services/api").submitProfileDetails;

    jest.spyOn(require("../hooks/useValidateCorporationNumber"), "useValidateCorporationNumber").mockReturnValue({
      validate: validateMock,
    });

    render(<OnboardingForm />, { wrapper: Wrapper });

    fireEvent.input(screen.getByLabelText(/First Name/i), {
      target: { value: "John" },
    });
    fireEvent.input(screen.getByLabelText(/Last Name/i), {
      target: { value: "Doe" },
    });
    fireEvent.input(screen.getByLabelText(/Phone Number/i), {
      target: { value: "+11234567890" },
    });
    fireEvent.input(screen.getByLabelText(/Corporation Number/i), {
      target: { value: "826417395" },
    });

    fireEvent.blur(screen.getByLabelText(/Corporation Number/i));

    const submitButton = screen.getByRole("button", { name: /Submit/i });

    await waitFor(() => expect(validateMock).toHaveBeenCalled());

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(submitMock).toHaveBeenCalled();
    });
  });

  test("shows form error if API fails", async () => {
    const validateMock = jest.fn(() => Promise.resolve(true));
  
    jest
      .spyOn(require("../hooks/useValidateCorporationNumber"), "useValidateCorporationNumber")
      .mockReturnValue({ validate: validateMock });
  
    jest
      .spyOn(require("../services/api"), "submitProfileDetails")
      .mockImplementation(() =>
        Promise.reject({ response: { data: { message: "Invalid phone number" } } })
      );
  
    render(<OnboardingForm />, { wrapper: Wrapper });
  
    const firstName = screen.getByLabelText(/First Name/i);
    const lastName = screen.getByLabelText(/Last Name/i);
    const phone = screen.getByLabelText(/Phone Number/i);
    const corpNumber = screen.getByLabelText(/Corporation Number/i);
  
    fireEvent.input(firstName, { target: { value: "John" } });
    fireEvent.input(lastName, { target: { value: "Doe" } });
    fireEvent.input(phone, { target: { value: "+11234567890" } });
    fireEvent.input(corpNumber, { target: { value: "826417395" } });
  
    fireEvent.blur(firstName);
    fireEvent.blur(lastName);
    fireEvent.blur(phone);
    fireEvent.blur(corpNumber);
  
    await waitFor(() => {
      expect(validateMock).toHaveBeenCalled();
    });
  
    const submitButton = screen.getByRole("button", { name: /Submit/i });
  
    fireEvent.click(submitButton);
  
    await waitFor(() => {
      expect(screen.getByRole("alert")).toHaveTextContent("An unexpected error occurred. Please try again.");
    });
  });
});
