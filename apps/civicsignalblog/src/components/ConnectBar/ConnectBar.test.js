import { createRender } from "@commons-ui/testing-library";
import React from "react";

import ConnectBar from "./ConnectBar";

import theme from "@/civicsignalblog/theme";

const render = createRender({ theme });

const defaultProps = {
  links: {
    facebook: "https://www.facebook.com/",
  },
};

describe("<ConnectBar />", () => {
  it("renders unchanged", () => {
    const { container } = render(<ConnectBar {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
