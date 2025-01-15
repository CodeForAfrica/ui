import { createRender } from "@commons-ui/testing-library";
import React from "react";

import SocialMediaIconLink from "./SocialMediaIconLink";

import { createTheme } from "@/commons-ui/core/styles";

const render = createRender({ theme: createTheme() });

const defaultProps = {
  platform: "Github",
  href: "https://github.com/CodeForAfrica",
};

describe("<SocialMediaIconLink />", () => {
  it("renders unchanged", () => {
    const { container } = render(<SocialMediaIconLink {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
