import { createRender } from "@commons-ui/testing-library";
import React from "react";

import OrganisationCard from "./OrganisationCard";

import theme from "@/charterafrica/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

const defaultProps = {
  name: "Tool Name",
  topic: "Topic Name",
  lastActive: "6 Months ago",
  description: "Sample description",
};

describe("<OrganisationCard />", () => {
  it("renders unchanged", () => {
    const { container } = render(<OrganisationCard {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
