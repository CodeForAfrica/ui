import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import Index from ".";

describe("Home", () => {
  it("renders homepage unchanged", () => {
    const { container } = render(<Index />);
    expect(container).toMatchSnapshot();
  });

  it("renders a heading", () => {
    render(<Index />);

    const heading = screen.getByRole("heading", {
      name: /Tracking Politician/i,
    });

    expect(heading).toBeInTheDocument();
  });
});
