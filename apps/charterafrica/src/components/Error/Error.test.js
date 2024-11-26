import { createRender } from "@commons-ui/testing-library";
import React from "react";

import Error from "./Error";

import theme from "@/charterafrica/theme";

const render = createRender({ theme });

const defaultProps = {
  title: "NOT FOUND",
  statusCode: 404,
  description: [{ children: [{ text: "Description Text" }] }],
  link: { label: "NOT FOUND", href: "/" },
};
describe("<Error />", () => {
  it("renders unchanged", () => {
    const { container } = render(<Error {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
