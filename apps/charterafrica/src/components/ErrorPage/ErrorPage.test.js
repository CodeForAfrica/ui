import { createRender } from "@commons-ui/testing-library";
import React from "react";

import ErrorPage from "./ErrorPage";

import theme from "@/charterafrica/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

const defaultProps = {
  blocks: [
    {
      slug: "error",
      title: "NOT FOUND",
      statusCode: 404,
      description: [{ children: [{ text: "Description Text" }] }],
      link: { label: "NOT FOUND", href: "/" },
    },
  ],
};

describe("<ErrorPage />", () => {
  it("renders unchanged", () => {
    const { container } = render(<ErrorPage {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
