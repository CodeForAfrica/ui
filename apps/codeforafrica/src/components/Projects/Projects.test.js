import { createRender } from "@commons-ui/testing-library";
import React from "react";

import Projects from "./Projects";

import theme from "@/codeforafrica/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

const defaultProps = {
  projects: { pagination: {}, results: [] },
};

jest.mock("next/router", () => ({
  useRouter: jest.fn().mockImplementation(() => ({
    isReady: true,
    push: jest.fn(),
    query: {},
  })),
}));

describe("<Projects />", () => {
  it("renders unchanged", () => {
    const { container } = render(<Projects {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
