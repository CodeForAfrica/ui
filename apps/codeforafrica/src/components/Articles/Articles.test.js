import { createRender } from "@commons-ui/testing-library";
import React from "react";

import Articles from "./Articles";

import theme from "@/codeforafrica/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

const defaultProps = {
  articles: [],
};

jest.mock("next/router", () => ({
  useRouter: jest.fn().mockImplementation(() => ({
    isReady: true,
    query: {},
  })),
}));

describe("<Articles />", () => {
  it("renders unchanged", () => {
    const { container } = render(<Articles {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
