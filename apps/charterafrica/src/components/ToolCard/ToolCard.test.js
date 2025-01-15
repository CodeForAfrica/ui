import { createRender } from "@commons-ui/testing-library";
import React from "react";

import ToolCard from "./ToolCard";

import theme from "@/charterafrica/theme";

const render = createRender({ theme });

const defaultProps = {
  description: "Sample description",
  image: "/image.jpg",
  lastActive: "6 Months ago",
  name: "Tool Name",
  topic: "Topic Name",
};

describe("<ToolCard />", () => {
  it("renders unchanged", () => {
    const { container } = render(<ToolCard {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
