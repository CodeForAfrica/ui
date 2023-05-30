import { createRender } from "@commons-ui/testing-library";
import React from "react";

import ContributorCard from "./ContributorCard";

import theme from "@/charterafrica/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

const defaultProps = {
  name: "Tool Name",
  description: "Sample description",
  image: "",
};

describe("<ContributorCard />", () => {
  it("renders unchanged", () => {
    const { container } = render(<ContributorCard {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
