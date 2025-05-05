import * as yup from "yup";

export const onboardingSchema = yup.object().shape({
  firstName: yup.string().required("First name is required").max(50),
  lastName: yup.string().required("Last name is required").max(50),
  phone: yup
    .string()
    .required("Phone number is required")
    .matches(/^\+1\d{10}$/, "Must be valid Canadian phone number"),
  corporationNumber: yup
    .string()
    .required("Corporation number is required")
    .length(9, "Must be 9 characters"),
});
