import { render, screen } from "@testing-library/react";
import { FormTitle } from "../components/FormTitle";

test("renders FormTitle with subtitle and step", () => {
  render(
    <FormTitle step={{ current: 1, total: 3 }} subtitle="Step info">
      Title
    </FormTitle>
  );
  expect(screen.getByText("Title")).toBeInTheDocument();
  expect(screen.getByText(/Step 1 of 3/i)).toBeInTheDocument();
  expect(screen.getByText("Step info")).toBeInTheDocument();
});