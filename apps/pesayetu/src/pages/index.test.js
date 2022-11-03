import { render, screen } from "@commons-ui/testing-library";

import Index from "./index.page";

jest.mock("next/router", () => ({
  useRouter: jest.fn().mockImplementation(() => ({
    asPath: "",
    isReady: true,
  })),
}));

describe("Homepage", () => {
  it("renders unchanged", () => {
    const { container } = render(<Index />);
    expect(container).toMatchSnapshot();
  });

  it("renders a heading", () => {
    render(<Index />);

    const heading = screen.getByRole("heading", {
      name: /Data to hold your government accountable/i,
    });

    expect(heading).toBeInTheDocument();
  });
});
