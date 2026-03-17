import { createRender } from "@commons-ui/testing-library";
import React from "react";

import ContentOverview from "./ContentOverview";

import theme from "@/trustlab/theme";

const render = createRender({ theme });

const defaultProps = {
  content: [
    {
      type: "heading",
      tag: "h2",
      children: [{ text: "About This Cohort" }],
    },
    {
      type: "paragraph",
      children: [
        {
          text: "The second TrustLab Incubator cohort convened in Lagos, Nigeria.",
        },
      ],
    },
  ],
  card: {
    title: "Cohort at a Glance",
    items: [
      { id: "1", label: "Programme", value: "TrustLab Incubator" },
      { id: "2", label: "Cohort Number", value: "Cohort 2" },
      { id: "3", label: "Cohort Location", value: "Mombasa" },
      { id: "4", label: "Date", value: "1-10-2025 to 23-10-2025" },
      { id: "5", label: "Organisations", value: "5 participants" },
      { id: "6", label: "Status", value: "Completed" },
    ],
  },
};

describe("<ContentOverview />", () => {
  it("renders unchanged", () => {
    const { container } = render(<ContentOverview {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });

  it("renders with linked item", () => {
    const { container } = render(
      <ContentOverview
        {...defaultProps}
        card={{
          title: "Organisation Details",
          items: [
            { id: "1", label: "Organisation", value: "Organisation Name" },
            {
              id: "2",
              label: "Theme",
              value: "Fact-checking & digital literacy",
            },
            { id: "3", label: "Organisation Location", value: "Lamu" },
            {
              id: "4",
              label: "Cohort",
              value: "TrustLab Incubator Cohort 2",
              href: "/cohorts/2",
            },
          ],
        }}
      />,
    );
    expect(container).toMatchSnapshot();
  });

  it("renders items without labels", () => {
    const { container } = render(
      <ContentOverview
        {...defaultProps}
        card={{
          title: "Key Highlights",
          items: [
            {
              id: "1",
              value: "Explored AI's role in amplifying ethnic divisions online",
            },
            {
              id: "2",
              value: "Identified 47 coordinated inauthentic behaviour networks",
            },
            {
              id: "3",
              value: "Developed community-level counter-speech playbooks",
            },
          ],
        }}
      />,
    );
    expect(container).toMatchSnapshot();
  });

  it("returns null when content or card is missing", () => {
    const { container } = render(
      <ContentOverview content={null} card={null} />,
    );
    expect(container.firstChild).toBeNull();
  });
});
