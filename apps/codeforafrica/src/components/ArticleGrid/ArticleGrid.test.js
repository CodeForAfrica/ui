import { createRender } from "@commons-ui/testing-library";
import React from "react";

import ArticleGrid from "./ArticleGrid";

import theme from "@/codeforafrica/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

jest.mock("next/router", () => ({
  useRouter: jest.fn().mockImplementation(() => ({
    isReady: true,
    push: jest.fn(),
    query: {},
  })),
}));

describe("<ArticleGrid />", () => {
  it("renders unchanged", () => {
    const { container } = render(<ArticleGrid />);
    expect(container).toMatchSnapshot();
  });
});
