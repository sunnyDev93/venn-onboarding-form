import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { onboardingSchema } from "../../utils/validation";
import type { OnboardingFormData } from "../../types/form";
import { useValidateCorporationNumber } from "../../hooks/useValidateCorporationNumber";
import { submitProfileDetails } from "../../services/api";
import { InputField } from "../InputField";
import { useState } from "react";
import axios from "axios";
import { FormTitle } from "../FormTitle";

export const OnboardingForm = () => {
  const methods = useForm<OnboardingFormData>({
    resolver: yupResolver(onboardingSchema),
    mode: "onBlur",
  });

  const { handleSubmit, setError, clearErrors, reset } = methods;
  const { validate } = useValidateCorporationNumber();

  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (data: OnboardingFormData) => {
    setFormError(null);
    const isCorpValid = await validate(data.corporationNumber);

    if (!isCorpValid) {
      setError("corporationNumber", {
        type: "manual",
        message: "Invalid corporation number",
      });
      return;
    } else {
      clearErrors("corporationNumber");
    }

    try {
      setSubmitting(true);
      await submitProfileDetails(data);
      alert("Submitted successfully!");
      reset();
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const message = err.response?.data?.message || "Submission failed due to server error";
        setFormError(message);
      } else {
        setFormError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-xl mx-auto mt-10 p-8 border border-gray-200 shadow-lg rounded-lg bg-white space-y-6"
      >
        <FormTitle>Onboarding Form</FormTitle>

        {formError && (
          <div className="text-red-600 bg-red-50 border border-red-300 p-3 rounded">
            {formError}
          </div>
        )}

        <InputField name="firstName" label="First Name" />
        <InputField name="lastName" label="Last Name" />
        <InputField name="phone" label="Phone Number" placeholder="+11234567890" />
        <InputField
          name="corporationNumber"
          label="Corporation Number"
          onBlur={async () => {
            const input = document.querySelector("input[name=corporationNumber]") as HTMLInputElement;
            const isValid = await validate(input.value);
            if (!isValid) {
              setError("corporationNumber", {
                type: "manual",
                message: "Invalid corporation number",
              });
            } else {
              clearErrors("corporationNumber");
            }
          }}
        />

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {submitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    </FormProvider>
  );
};
