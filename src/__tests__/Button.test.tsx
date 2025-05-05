import { render, screen } from "@testing-library/react";
import { Button } from "../components/Button";

test("renders all variants", () => {
    const { rerender } = render(<Button variant="primary">Primary</Button>);
    expect(screen.getByText("Primary")).toBeInTheDocument();
  
    rerender(<Button variant="secondary">Secondary</Button>);
    expect(screen.getByText("Secondary")).toBeInTheDocument();
  
    rerender(<Button variant="danger">Danger</Button>);
    expect(screen.getByText("Danger")).toBeInTheDocument();
  });
  
  test("renders fullWidth button", () => {
    render(<Button fullWidth>Full Width</Button>);
    expect(screen.getByRole("button")).toHaveClass("w-full");
  });
  
  test("disables button", () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByRole("button")).toBeDisabled();
  });
  
