import { createRender } from "@commons-ui/testing-library";
import React from "react";

import Error from "./Error";

import theme from "@/charterafrica/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

const defaultProps = {
  title: "NOT FOUND",
  statusCode: 404,
  description: [{ children: [{ text: "Description Text" }] }],
  action: { title: "NOT FOUND" },
};
describe("<ErrorPage />", () => {
  it("renders unchanged", () => {
    const { container } = render(<Error {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
