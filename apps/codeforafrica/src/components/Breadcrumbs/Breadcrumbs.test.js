import { createRender } from "@commons-ui/testing-library";
import React from "react";

import Breadcrumbs from "./Breadcrumbs";

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
  crumbs: [{ label: "Our Work", href: "/projects" }, { label: "Initiatives" }],
};

describe("<Breadcrumbs />", () => {
  it("renders unchanged", () => {
    const { container } = render(<Breadcrumbs {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
