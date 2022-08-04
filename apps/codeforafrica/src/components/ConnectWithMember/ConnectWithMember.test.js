import { createRender } from "@commons-ui/testing-library";
import React from "react";

import ConnectWithMember from "./ConnectWithMember";

import theme from "@/codeforafrica/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

const defaultProps = {
  links: {
    facebook: "https://www.facebook.com/",
  },
};

describe("<ConnectWithMember />", () => {
  it("renders unchanged", () => {
    const { container } = render(<ConnectWithMember {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
