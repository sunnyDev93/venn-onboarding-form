import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { onboardingSchema } from "../utils/validation";
import type { OnboardingFormData } from "../types/form";
import { useValidateCorporationNumber } from "../hooks/useValidateCorporationNumber";
import axios from "axios";
import { submitProfileDetails } from "../services/api";

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
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>First Name</label>
        <input {...register("firstName")} onBlur={() => trigger("firstName")} />
        <p>{errors.firstName?.message}</p>
      </div>

      <div>
        <label>Last Name</label>
        <input {...register("lastName")} onBlur={() => trigger("lastName")} />
        <p>{errors.lastName?.message}</p>
      </div>

      <div>
        <label>Phone</label>
        <input {...register("phone")} onBlur={() => trigger("phone")} placeholder="+11234567890" />
        <p>{errors.phone?.message}</p>
      </div>

      <div>
        <label>Corporation Number</label>
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
        />
        <p>{errors.corporationNumber?.message}</p>
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};
