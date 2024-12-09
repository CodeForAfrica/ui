import { createRender } from "@commons-ui/testing-library";
import React from "react";

import OrganisationImageLink from "./OrganisationImageLink";

import theme from "@/charterafrica/theme";

const render = createRender({ theme });

const defaultProps = {
  name: "Organisation Name",
  avatarUrl: "/static/images/avatar/1.jpg",
  link: {
    href: "https://charter.africa",
  },
};

describe("<OrganisationImageCard />", () => {
  it("renders unchanged", () => {
    const { container } = render(<OrganisationImageLink {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
