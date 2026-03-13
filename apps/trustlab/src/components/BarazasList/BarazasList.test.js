import { createRender } from "@commons-ui/testing-library";
import React from "react";

import BarazasList from "./BarazasList";

import theme from "@/trustlab/theme";

// Mock next/router
jest.mock("next/router", () => ({
  useRouter: () => ({
    push: jest.fn(),
    query: {},
    pathname: "/barazas",
  }),
}));

const render = createRender({ theme });

const mockBarazas = [
  {
    id: "1",
    title: "Baraza Event 1",
    description: {
      root: {
        children: [
          {
            children: [{ text: "Description for baraza 1" }],
            type: "paragraph",
          },
        ],
      },
    },
    image: {
      src: "/images/baraza1.jpg",
      alt: "Baraza 1",
    },
    link: {
      href: "/barazas/1",
    },
    caption: "Community Event",
    location: "Nairobi, Kenya",
    date: "15-01-2024",
  },
  {
    id: "2",
    title: "Baraza Event 2",
    description: {
      root: {
        children: [
          {
            children: [{ text: "Description for baraza 2" }],
            type: "paragraph",
          },
        ],
      },
    },
    image: {
      src: "/images/baraza2.jpg",
      alt: "Baraza 2",
    },
    link: {
      href: "/barazas/2",
    },
    caption: "Workshop",
    location: "Mombasa, Kenya",
    date: "20-01-2024",
  },
];

// Mock the useBarazas hook
jest.mock("./useBarazas", () => ({
  __esModule: true,
  default: jest.fn(() => ({
    barazas: mockBarazas,
    pagination: { page: 1, count: 5 },
  })),
}));

describe("BarazasList", () => {
  it("renders without crashing", () => {
    const { getByTestId } = render(<BarazasList />);
    expect(getByTestId("barazas-list")).toBeInTheDocument();
  });

  it("renders barazas when provided", () => {
    const { getByText } = render(<BarazasList barazas={mockBarazas} />);
    expect(getByText("Baraza Event 1")).toBeInTheDocument();
    expect(getByText("Baraza Event 2")).toBeInTheDocument();
  });

  it("renders pagination when hasPagination is true", () => {
    const { container } = render(
      <BarazasList
        barazas={mockBarazas}
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
      <BarazasList barazas={mockBarazas} hasPagination={false} />,
    );
    const pagination = container.querySelector(
      '[aria-label="pagination navigation"]',
    );
    expect(pagination).not.toBeInTheDocument();
  });

  it("does not render filters when hasFilters is false", () => {
    const { container } = render(
      <BarazasList barazas={mockBarazas} hasFilters={false} />,
    );
    expect(container.querySelector("form")).not.toBeInTheDocument();
  });

  it("renders correct number of baraza cards", () => {
    const { getAllByRole } = render(<BarazasList barazas={mockBarazas} />);
    const cards = getAllByRole("link");
    expect(cards).toHaveLength(mockBarazas.length);
  });
});
