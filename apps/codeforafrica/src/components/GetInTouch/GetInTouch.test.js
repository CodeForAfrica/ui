import { createRender } from "@commons-ui/testing-library";
import React from "react";

import GetInTouch from "./GetInTouch";

import theme from "@/codeforafrica/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

jest.mock("next/router", () => ({
  useRouter: jest.fn().mockImplementation(() => ({
    asPath: "",
    isReady: true,
  })),
}));

const defaultProps = {
  title: "Are you looking to start a new project?",
  subtitle: "We'd love to hear more.",
  action: {
    href: "/contact",
    label: "Get in touch",
  },
};

describe("<GetInTouch />", () => {
  it("renders unchanged", () => {
    const { container } = render(<GetInTouch {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
