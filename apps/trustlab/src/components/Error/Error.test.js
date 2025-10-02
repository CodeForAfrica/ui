import { createRender } from "@commons-ui/testing-library";
import React from "react";

import Error from "./Error";

import theme from "@/trustlab/theme";

const render = createRender({ theme });

const defaultProps = {
  title: "Test Error Page",
  image: { src: "", alt: "Error Icon" },
  link: { href: "/", label: "Go Home" },
};

describe("<Error />", () => {
  it("renders unchanged", () => {
    const { container } = render(<Error {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
