import { createRender } from "@commons-ui/testing-library";
import React from "react";

import NextPreviousPagination from "./NextPreviousPagination";

import theme from "@/codeforafrica/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

const defaultProps = {
  count: 1,
};

jest.mock("next/router", () => ({
  useRouter: jest.fn().mockImplementation(() => ({
    isReady: true,
  })),
}));

describe("<NextPreviousPagination />", () => {
  it("renders unchanged", () => {
    const { container } = render(<NextPreviousPagination {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
