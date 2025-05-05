import { useState } from "react";
import { validateCorporationNumber } from "../services/api";

export const useValidateCorporationNumber = () => {
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);

  const validate = async (number: string) => {
    setLoading(true);
    const result = await validateCorporationNumber(number);
    setIsValid(result.valid);
    setLoading(false);
    return result.valid;
  };

  return { validate, isValid, loading };
};
