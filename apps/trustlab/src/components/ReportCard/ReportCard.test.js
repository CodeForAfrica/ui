import { createRender } from "@commons-ui/testing-library";
import React from "react";

import ReportCard from "./ReportCard";

import theme from "@/trustlab/theme";

const render = createRender({ theme });

const mockDescription = {
  root: {
    children: [
      {
        children: [
          {
            detail: 0,
            format: 0,
            mode: "normal",
            style: "",
            text: "This report is a baseline Information Ecosystem Assessment (IEA) of online communities in Kenya, mapping digital harms and malign actors, using the DISARM and D-RAIL frameworks for analysing weaponised hate speech, information manipulation and other forms of illicit influence operations.",
            type: "text",
            version: 1,
          },
        ],
        direction: "ltr",
        format: "",
        indent: 0,
        type: "paragraph",
        version: 1,
        textFormat: 0,
        textStyle: "",
      },
    ],
    direction: "ltr",
    format: "",
    indent: 0,
    type: "root",
    version: 1,
  },
};

describe("<ReportCard />", () => {
  it("renders unchanged", () => {
    const { container } = render(
      <ReportCard
        title="Test Report"
        overview={mockDescription}
        image={{
          src: "/test-image.jpg",
          alt: "Test image",
        }}
        link={{
          href: "/test-report",
        }}
        actionLabel="Download Report"
      />,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it("renders without image", () => {
    const { container } = render(
      <ReportCard
        title="Test Report"
        overview={mockDescription}
        actionLabel="Download Report"
      />,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it("renders in condensed mode", () => {
    const { container } = render(
      <ReportCard
        title="Test Report"
        overview={mockDescription}
        condensed
        actionLabel="Download Report"
      />,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it("renders without link", () => {
    const { container } = render(
      <ReportCard
        title="Test Report"
        overview={mockDescription}
        image={{
          src: "/test-image.jpg",
          alt: "Test image",
        }}
        actionLabel="Download Report"
      />,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it("renders with custom action label", () => {
    const { getByText } = render(
      <ReportCard
        title="Test Report"
        overview={mockDescription}
        actionLabel="View Full Report"
      />,
    );
    expect(getByText("View Full Report")).toBeInTheDocument();
  });

  it("renders with default action label", () => {
    const { getByText } = render(
      <ReportCard title="Test Report" overview={mockDescription} />,
    );
    expect(getByText("Download Report")).toBeInTheDocument();
  });
});
