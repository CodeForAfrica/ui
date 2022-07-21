import { createRender } from "@commons-ui/testing-library";
import GhostContentAPI from "@tryghost/content-api";
import React from "react";

import Index from "./[slug].page";

import theme from "@/codeforafrica/theme";

jest.mock("@tryghost/content-api");

// before each clear GhostContentAPI.__mocks__
beforeEach(() => {
  GhostContentAPI.mockClear();
});

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

const defaultProps = {
  sections: [],
};

describe("<Pages/Stories/[Slug] />", () => {
  it("renders unchanged", () => {
    const { container } = render(<Index {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
