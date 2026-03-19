import { createRender } from "@commons-ui/testing-library";
import React from "react";

import OpportunityList from "./OpportunityList";

import theme from "@/trustlab/theme";

const render = createRender({ theme });

const mockItems = [
  {
    id: "1",
    title: "Test Item 1",
    description: {
      root: {
        children: [
          {
            text: "Description for item 1",
            type: "text",
          },
        ],
      },
    },
    image: {
      src: "/images/item1.jpg",
      alt: "Item 1",
    },
    link: {
      href: "/items/1",
    },
    caption: "Category | Type",
    location: "Nairobi, Kenya",
    date: "15-01-2024",
  },
  {
    id: "2",
    title: "Test Item 2",
    description: {
      root: {
        children: [
          {
            text: "Description for item 2",
            type: "text",
          },
        ],
      },
    },
    image: {
      src: "/images/item2.jpg",
      alt: "Item 2",
    },
    link: {
      href: "/items/2",
    },
    caption: "Category | Report",
    location: "Mombasa, Kenya",
    date: "20-01-2024",
  },
];

// Mock the useOpportunities hook
jest.mock("./useOpportunities", () => ({
  __esModule: true,
  default: jest.fn(() => ({
    items: mockItems,
    pagination: { page: 1, count: 5 },
  })),
}));
describe("OpportunityList", () => {
  it("renders without crashing", () => {
    const { getByTestId } = render(<OpportunityList />);
    expect(getByTestId("opportunity-list")).toBeInTheDocument();
  });

  it("renders with custom testId", () => {
    const { getByTestId } = render(<OpportunityList testId="barazas-list" />);
    expect(getByTestId("barazas-list")).toBeInTheDocument();
  });

  it("renders items when provided", () => {
    const { getByText } = render(<OpportunityList items={mockItems} />);
    expect(getByText("Test Item 1")).toBeInTheDocument();
    expect(getByText("Test Item 2")).toBeInTheDocument();
  });

  it("renders pagination when hasPagination is true", () => {
    const { container } = render(
      <OpportunityList
        items={mockItems}
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
      <OpportunityList items={mockItems} hasPagination={false} />,
    );
    const pagination = container.querySelector(
      '[aria-label="pagination navigation"]',
    );
    expect(pagination).not.toBeInTheDocument();
  });

  it("does not render filters when hasFilters is false", () => {
    const { container } = render(
      <OpportunityList items={mockItems} hasFilters={false} />,
    );
    expect(container.querySelector("form")).not.toBeInTheDocument();
  });

  it("renders correct number of cards", () => {
    const { getAllByRole } = render(<OpportunityList items={mockItems} />);
    const cards = getAllByRole("link");
    expect(cards).toHaveLength(mockItems.length);
  });
});
