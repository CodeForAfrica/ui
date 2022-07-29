import { createRender } from "@commons-ui/testing-library";
import React from "react";

import Opportunities from "./Opportunities";

import theme from "@/codeforafrica/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

const defaultProps = {
  opportunities: { pagination: {}, results: [] },
};

jest.mock("next/router", () => ({
  useRouter: jest.fn().mockImplementation(() => ({
    isReady: true,
    push: jest.fn(),
    query: {},
  })),
}));

describe("<Opportunities />", () => {
  it("renders unchanged", () => {
    const { container } = render(<Opportunities {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
