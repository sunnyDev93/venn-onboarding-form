import axios from "axios";
import type { OnboardingFormData } from "../types/form";

const BASE_URL = "https://fe-hometask-api.qa.vault.tryvault.com";

export const validateCorporationNumber = async (number: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/corporation-number/${number}`);
    return response.data;
  } catch (error) {
    console.error("Error validating corporation number:", error);
    return {
      valid: false,
      message: "Validation failed",
    };
  }
};

export const submitProfileDetails = async (data: OnboardingFormData) => {
  return axios.post(`${BASE_URL}/profile-details`, data);
};
