import { onboardingSchema } from "../utils/validation";

test("passes with valid data", async () => {
  const validData = {
    firstName: "John",
    lastName: "Doe",
    phone: "+11234567890",
    corporationNumber: "123456789",
  };
  await expect(onboardingSchema.validate(validData)).resolves.toBeTruthy();
});

test("fails with missing first name", async () => {
  const invalidData = {
    firstName: "",
    lastName: "Doe",
    phone: "+11234567890",
    corporationNumber: "123456789",
  };
  await expect(onboardingSchema.validate(invalidData)).rejects.toThrow(
    /First name is required/
  );
});
