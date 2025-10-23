import { createRender } from "@commons-ui/testing-library";
import React from "react";

import Incubator from "./Incubator";

import theme from "@/trustlab/theme";

const render = createRender({ theme });

const defaultProps = {
  content: null,
  title: "Incubator",
  image: {
    url: "https://example.com/image.jpg",
    alt: "Incubator Image",
  },
  buttonLink: {
    href: "/apply",
  },
  backgroundColor: "common.white",
  textColor: "text.primary",
};

describe("<Incubator />", () => {
  it("renders unchanged", () => {
    const { container } = render(<Incubator {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
