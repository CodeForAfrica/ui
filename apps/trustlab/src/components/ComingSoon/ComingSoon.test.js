import { createRender } from "@commons-ui/testing-library";
import React from "react";

import ComingSoon from "./ComingSoon";

import theme from "@/trustlab/theme";

const render = createRender({ theme });

const defaultProps = {
  title: "Test Coming soon Page",
  form: { id: "test-form", fields: [] },
  image: { src: "", alt: "Error Icon" },
  link: { href: "/", label: "Go Home" },
};

describe("<ComingSoon />", () => {
  it("renders unchanged", () => {
    const { container } = render(<ComingSoon {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
