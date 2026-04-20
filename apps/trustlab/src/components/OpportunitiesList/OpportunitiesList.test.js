import { createRender } from "@commons-ui/testing-library";

import OpportunitiesList from "./OpportunitiesList";

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

describe("<OpportunitiesList />", () => {
  it("renders unchanged", () => {
    const { container } = render(<OpportunitiesList testId="barazas-list" />);
    expect(container).toMatchSnapshot();
  });

  it("renders items when provided", () => {
    const { getByText } = render(<OpportunitiesList items={mockItems} />);
    expect(getByText("Test Item 1")).toBeInTheDocument();
    expect(getByText("Test Item 2")).toBeInTheDocument();
  });

  it("renders pagination when hasPagination is true", () => {
    const { container } = render(
      <OpportunitiesList
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
      <OpportunitiesList items={mockItems} hasPagination={false} />,
    );
    const pagination = container.querySelector(
      '[aria-label="pagination navigation"]',
    );
    expect(pagination).not.toBeInTheDocument();
  });

  it("does not render filters when hasFilters is false", () => {
    const { container } = render(
      <OpportunitiesList items={mockItems} hasFilters={false} />,
    );
    expect(container.querySelector("form")).not.toBeInTheDocument();
  });

  it("renders correct number of cards", () => {
    const { getAllByRole } = render(<OpportunitiesList items={mockItems} />);
    const cards = getAllByRole("link");
    expect(cards).toHaveLength(mockItems.length);
  });
});
