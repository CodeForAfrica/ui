import { createRender } from "@commons-ui/testing-library";
import React from "react";

import OpportunityOverview from "./OpportunityOverview";

import theme from "@/trustlab/theme";

const render = createRender({ theme });

const defaultProps = {
  content: [
    {
      type: "paragraph",
      children: [{ text: "This is a test paragraph." }],
    },
  ],
  image: {
    url: "https://example.com/image.jpg",
    alt: "Overview Image",
  },
  backgroundColor: "#FFFFFF",
  textColor: "#000000",
};

describe("<OpportunityOverview />", () => {
  it("renders unchanged", () => {
    const { container } = render(<OpportunityOverview {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });

  it("renders with metrics", () => {
    const { container } = render(
      <OpportunityOverview
        {...defaultProps}
        metrics={[
          { id: "1", value: "3", label: "Completed" },
          { id: "2", value: "13", label: "Organisations" },
          { id: "3", value: "6", label: "Counties" },
        ]}
      />,
    );
    expect(container).toMatchSnapshot();
  });

  it("returns null when both content and image are missing", () => {
    const { container } = render(
      <OpportunityOverview content={null} image={null} />,
    );
    expect(container.firstChild).toBeNull();
  });
});
