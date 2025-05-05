import { render, screen } from "@testing-library/react";
import { FormErrorMessage } from "../components/FormErrorMessage";

test("renders error message when provided", () => {
  render(<FormErrorMessage message="Something went wrong" />);
  expect(screen.getByText("Something went wrong")).toBeInTheDocument();
});

test("renders nothing when no message provided", () => {
  const { container } = render(<FormErrorMessage message={null} />);
  expect(container).toBeEmptyDOMElement();
});
