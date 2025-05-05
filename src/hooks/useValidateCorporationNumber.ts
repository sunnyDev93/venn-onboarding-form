import { useState } from "react";
import axios from "axios";

export const useValidateCorporationNumber = () => {
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);

  const validate = async (number: string) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://fe-hometask-api.qa.vault.tryvault.com/corporation-number/${number}`
      );
      setIsValid(response.data.valid);
      return response.data.valid;
    } catch (e) {
      setIsValid(false);
      console.error("Error validating corporation number:", e);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { validate, isValid, loading };
};
