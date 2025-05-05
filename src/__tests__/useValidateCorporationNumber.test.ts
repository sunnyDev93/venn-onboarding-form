import { renderHook } from "@testing-library/react";
import { useValidateCorporationNumber } from "../hooks/useValidateCorporationNumber";
import axios from "axios";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

test("returns true for valid corporation number", async () => {
  mockedAxios.get.mockResolvedValueOnce({ data: { valid: true } });
  const { result } = renderHook(() => useValidateCorporationNumber());
  const isValid = await result.current.validate("123456789");
  expect(isValid).toBe(true);
});

test("returns false for invalid corporation number", async () => {
  mockedAxios.get.mockResolvedValueOnce({ data: { valid: false } });
  const { result } = renderHook(() => useValidateCorporationNumber());
  const isValid = await result.current.validate("000000000");
  expect(isValid).toBe(false);
});