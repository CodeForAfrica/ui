import { createRender } from "@commons-ui/testing-library";
import React from "react";

import OurTeam from "./OurTeam";

import theme from "@/codeforafrica/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

const defaultProps = {
  team: { pagination: {}, results: [] },
  title: "Our team",
};

jest.mock("next/router", () => ({
  useRouter: jest.fn().mockImplementation(() => ({
    isReady: true,
    push: jest.fn(),
    query: {},
  })),
}));

describe("<OurTeam />", () => {
  it("renders unchanged", () => {
    const { container } = render(<OurTeam {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
