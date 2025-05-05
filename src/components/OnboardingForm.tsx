import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { onboardingSchema } from "../utils/validation";
import type { OnboardingFormData } from "../types/form";
import { useValidateCorporationNumber } from "../hooks/useValidateCorporationNumber";
import { submitProfileDetails } from "../services/api";
import axios from "axios";

export const OnboardingForm = () => {
    const {
      register,
      handleSubmit,
      formState: { errors },
      setError,
      trigger,
    } = useForm<OnboardingFormData>({
      resolver: yupResolver(onboardingSchema),
      mode: "onBlur",
    });
  
    const { validate } = useValidateCorporationNumber();
  
    const onSubmit = async (data: OnboardingFormData) => {
      const isCorpValid = await validate(data.corporationNumber);
      if (!isCorpValid) {
        setError("corporationNumber", {
          type: "manual",
          message: "Invalid corporation number",
        });
        return;
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
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-xl mx-auto mt-10 p-8 border border-gray-200 shadow-lg rounded-lg bg-white space-y-6"
      >
        <h2 className="text-2xl font-bold text-gray-800 text-center">Onboarding Form</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
            <label className="block text-sm font-medium text-gray-700">First Name</label>
            <input
                {...register("firstName")}
                onBlur={() => trigger("firstName")}
                className="mt-1 w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-red-500 text-sm mt-1">{errors.firstName?.message}</p>
            </div>
    
            <div>
            <label className="block text-sm font-medium text-gray-700">Last Name</label>
            <input
                {...register("lastName")}
                onBlur={() => trigger("lastName")}
                className="mt-1 w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-red-500 text-sm mt-1">{errors.lastName?.message}</p>
            </div>
        </div>
  
        <div>
          <label className="block text-sm font-medium text-gray-700">Phone Number</label>
          <input
            {...register("phone")}
            onBlur={() => trigger("phone")}
            placeholder="+11234567890"
            className="mt-1 w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="text-red-500 text-sm mt-1">{errors.phone?.message}</p>
        </div>
  
        <div>
          <label className="block text-sm font-medium text-gray-700">Corporation Number</label>
          <input
            {...register("corporationNumber")}
            onBlur={async () => {
              const isValid = await validate(
                (document.querySelector("input[name=corporationNumber]") as HTMLInputElement).value
              );
              if (!isValid) {
                setError("corporationNumber", {
                  type: "manual",
                  message: "Invalid corporation number",
                });
              }
            }}
            className="mt-1 w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="text-red-500 text-sm mt-1">{errors.corporationNumber?.message}</p>
        </div>
  
        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition"
        >
          Submit
        </button>
      </form>
    );
  };
  