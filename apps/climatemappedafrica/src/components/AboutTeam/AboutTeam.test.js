import { createRender } from "@commons-ui/testing-library";
import React from "react";

import AboutTeam from ".";

import theme from "@/climatemappedafrica/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

const defaultProps = {
  title: "About Team",
  members: [
    {
      alt: "Name",
      description: "Name, Country",
      image: "/media/member.jpg",
      title: "Name",
    },
  ],
};

describe("<AboutTeam />", () => {
  it("renders unchanged", () => {
    const { container } = render(<AboutTeam {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
