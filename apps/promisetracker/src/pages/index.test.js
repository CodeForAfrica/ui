import { render, screen } from "@commons-ui/testing-library";

import Index from "./index.page";

describe("Homepage", () => {
  it("renders unchanged", () => {
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
