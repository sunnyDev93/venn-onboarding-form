import { render, screen } from "@testing-library/react";
import { InputField } from "../components/InputField";
import { useForm, FormProvider } from "react-hook-form";

test("renders input field with label", () => {
  const Wrapper = () => {
    const methods = useForm();
    return (
      <FormProvider {...methods}>
        <InputField name="firstName" label="First Name" />
      </FormProvider>
    );
  };

  render(<Wrapper />);
  expect(screen.getByLabelText("First Name")).toBeInTheDocument();
});
