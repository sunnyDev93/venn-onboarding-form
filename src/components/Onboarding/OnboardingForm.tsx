import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { onboardingSchema } from "../../utils/validation";
import type { OnboardingFormData } from "../../types/form";
import { useValidateCorporationNumber } from "../../hooks/useValidateCorporationNumber";
import { submitProfileDetails } from "../../services/api";
import { InputField } from "../InputField";
import axios from "axios";

export const OnboardingForm = () => {
  const methods = useForm<OnboardingFormData>({
    resolver: yupResolver(onboardingSchema),
    mode: "onBlur",
  });

  const {
    handleSubmit,
    setError,
    clearErrors,
  } = methods;

  const { validate } = useValidateCorporationNumber();

  const onSubmit = async (data: OnboardingFormData) => {
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
      await submitProfileDetails(data);
      alert("Submitted successfully!");
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        console.error(err.response?.data?.message || "Submission failed");
      } else {
        console.error("An unexpected error occurred");
      }
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-xl mx-auto mt-10 p-8 border border-gray-200 shadow-lg rounded-lg bg-white space-y-6"
      >
        <h2 className="text-2xl font-bold text-gray-800">Onboarding Form</h2>

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
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition"
        >
          Submit
        </button>
      </form>
    </FormProvider>
  );
};
