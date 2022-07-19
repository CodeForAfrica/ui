import { createRender } from "@commons-ui/testing-library";
import React from "react";

import FilterBar from "./FilterBar";

import theme from "@/codeforafrica/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

const defaultProps = {
  tags: ["All"],
};

jest.mock("next/router", () => ({
  useRouter: jest.fn().mockImplementation(() => ({
    isReady: true,
    query: {},
  })),
}));

describe("<FilterBar />", () => {
  it("renders unchanged", () => {
    const { container } = render(<FilterBar {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
