import { createRender } from "@commons-ui/testing-library";
import React from "react";

import OrganisationImageCard from "./OrganisationImageCard";

import theme from "@/charterafrica/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
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
    const { container } = render(<OrganisationImageCard {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
