import { createRender } from "@commons-ui/testing-library";
import React from "react";

import FeatureList from "./FeatureList";

import theme from "@/trustlab/theme";

const render = createRender({ theme });

const defaultProps = {
  items: [
    {
      id: "1",
      title: "Purpose-Driven",
      description:
        "TrustLab exists to address a critical gap in African media development.",
    },
    {
      id: "2",
      title: "Cohort Learning",
      description:
        "Participants engage in a cohort model that facilitates peer learning.",
    },
    {
      id: "3",
      title: "Evidence of Impact",
      description: "Every TrustLab cohort produces measurable outcomes.",
    },
  ],
};

describe("<FeatureList />", () => {
  it("renders unchanged", () => {
    const { container } = render(<FeatureList {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });

  it("renders with title and description", () => {
    const { container } = render(
      <FeatureList
        {...defaultProps}
        title="Who Attends Our Briefings"
        description="TrustLab briefings bring together a carefully curated cross-section of stakeholders united by a common purpose."
      />,
    );
    expect(container).toMatchSnapshot();
  });

  it("renders with 4 items", () => {
    const { container } = render(
      <FeatureList
        {...defaultProps}
        items={[
          ...defaultProps.items,
          {
            id: "4",
            title: "Media Development Actors",
            description: "Organisations supporting journalist training.",
          },
        ]}
      />,
    );
    expect(container).toMatchSnapshot();
  });

  it("returns null when items are missing", () => {
    const { container } = render(<FeatureList items={[]} />);
    expect(container.firstChild).toBeNull();
  });
});
