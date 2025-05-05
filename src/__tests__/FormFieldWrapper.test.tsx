import { render, screen } from "@testing-library/react";
import { FormFieldWrapper } from "../components/FormFieldWrapper";

test("renders FormFieldWrapper with error", () => {
  render(
    <FormFieldWrapper label="Label" error="Error message">
      <input id="test" />
    </FormFieldWrapper>
  );
  expect(screen.getByText("Label")).toBeInTheDocument();
  expect(screen.getByText("Error message")).toBeInTheDocument();
});