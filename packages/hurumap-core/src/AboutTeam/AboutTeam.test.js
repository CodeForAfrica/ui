import { render } from "@commons-ui/testing-library";
import React from "react";

import AboutTeam from ".";

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
