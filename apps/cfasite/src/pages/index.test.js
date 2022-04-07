import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import Index from ".";

describe("Homepage", () => {
  it("renders unchanged", () => {
    const { container } = render(<Index />);
    expect(container).toMatchSnapshot();
  });

  it("renders a heading", () => {
    render(<Index />);

    const heading = screen.getByRole("heading", {
      name: /This is the official CFA website/i,
    });

    expect(heading).toBeInTheDocument();
  });
});
