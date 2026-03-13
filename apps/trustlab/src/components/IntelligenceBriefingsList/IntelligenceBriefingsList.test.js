import { createRender } from "@commons-ui/testing-library";
import React from "react";

import IntelligenceBriefingsList from "./IntelligenceBriefingsList";

import theme from "@/trustlab/theme";

// Mock next/router
jest.mock("next/router", () => ({
  useRouter: () => ({
    push: jest.fn(),
    query: {},
    pathname: "/intelligence-briefings",
  }),
}));

const render = createRender({ theme });

const mockBriefings = [
  {
    id: "1",
    title: "Weekly Threat Assessment",
    description: {
      root: {
        children: [
          {
            children: [{ text: "Analysis of emerging threats in the region." }],
            type: "paragraph",
          },
        ],
      },
    },
    image: {
      src: "/images/briefing1.jpg",
      alt: "Threat Assessment",
    },
    link: {
      href: "/briefings/1",
    },
    caption: "Security | Analysis",
    location: "East Africa",
    date: "15-01-2024",
  },
  {
    id: "2",
    title: "Disinformation Report",
    description: {
      root: {
        children: [
          {
            children: [{ text: "Monthly report on disinformation trends." }],
            type: "paragraph",
          },
        ],
      },
    },
    image: {
      src: "/images/briefing2.jpg",
      alt: "Disinformation Report",
    },
    link: {
      href: "/briefings/2",
    },
    caption: "Media | Report",
    location: "West Africa",
    date: "20-01-2024",
  },
];

// Mock the useIntelligenceBriefings hook
jest.mock("./useIntelligenceBriefings", () => ({
  __esModule: true,
  default: jest.fn(() => ({
    briefings: mockBriefings,
    pagination: { page: 1, count: 5 },
  })),
}));

describe("IntelligenceBriefingsList", () => {
  it("renders without crashing", () => {
    const { getByTestId } = render(<IntelligenceBriefingsList />);
    expect(getByTestId("intelligence-briefings-list")).toBeInTheDocument();
  });

  it("renders briefings when provided", () => {
    const { getByText } = render(
      <IntelligenceBriefingsList briefings={mockBriefings} />,
    );
    expect(getByText("Weekly Threat Assessment")).toBeInTheDocument();
    expect(getByText("Disinformation Report")).toBeInTheDocument();
  });

  it("renders pagination when hasPagination is true", () => {
    const { container } = render(
      <IntelligenceBriefingsList
        briefings={mockBriefings}
        hasPagination
        pagination={{ page: 1, count: 5 }}
      />,
    );
    const pagination = container.querySelector(
      '[aria-label="pagination navigation"]',
    );
    expect(pagination).toBeInTheDocument();
  });

  it("does not render pagination when hasPagination is false", () => {
    const { container } = render(
      <IntelligenceBriefingsList
        briefings={mockBriefings}
        hasPagination={false}
      />,
    );
    const pagination = container.querySelector(
      '[aria-label="pagination navigation"]',
    );
    expect(pagination).not.toBeInTheDocument();
  });

  it("does not render filters when hasFilters is false", () => {
    const { container } = render(
      <IntelligenceBriefingsList
        briefings={mockBriefings}
        hasFilters={false}
      />,
    );
    expect(container.querySelector("form")).not.toBeInTheDocument();
  });

  it("renders correct number of briefing cards", () => {
    const { getAllByRole } = render(
      <IntelligenceBriefingsList briefings={mockBriefings} />,
    );
    const cards = getAllByRole("link");
    expect(cards).toHaveLength(mockBriefings.length);
  });
});
