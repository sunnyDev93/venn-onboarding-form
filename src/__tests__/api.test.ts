import axios from "axios";
import { validateCorporationNumber, submitProfileDetails } from "../services/api";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

test("validates corporation number", async () => {
  mockedAxios.get.mockResolvedValueOnce({ data: { valid: true } });
  const result = await validateCorporationNumber("123456789");
  expect(result.valid).toBe(true);
});

test("handles submit profile", async () => {
  const payload = {
    firstName: "John",
    lastName: "Doe",
    phone: "+11234567890",
    corporationNumber: "123456789",
  };
  mockedAxios.post.mockResolvedValueOnce({ status: 200 });
  const response = await submitProfileDetails(payload);
  expect(response.status).toBe(200);
});
