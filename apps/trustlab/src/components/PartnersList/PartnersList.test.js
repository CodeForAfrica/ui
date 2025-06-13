import { createRender } from "@commons-ui/testing-library";
import React from "react";

import PartnersList from "./PartnersList";

import theme from "@/trustlab/theme";

const render = createRender({ theme });

const defaultProps = {
  slug: "partners-list",
  partners: [
    {
      connect: [],
      id: "1",
      logo: {
        alt: "Partner Logo",
        url: "/images/cms/blocks/partners.png",
        height: "100px",
        width: 280,
      },
      name: "Example Partner",
      description: null,
    },
  ],
};

describe("<PartnersList />", () => {
  it("renders unchanged", () => {
    const { container } = render(<PartnersList {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
