import { render, screen } from "@testing-library/react";
import React from "react";

import ToolkitList from "./ToolkitList";

// Mock SWR to return empty data (we rely on initialToolkits)
jest.mock("swr", () => ({
  __esModule: true,
  default: () => ({ data: null, isLoading: false }),
}));

const sampleToolkits = [
  {
    id: "t1",
    title: "Toolkit A",
    description: [{ type: "paragraph", children: [{ text: "Desc A" }] }],
    image: { src: "/img/a.jpg", alt: "A" },
    link: { href: "/toolkits/a", label: "Learn More" },
  },
  {
    id: "t2",
    title: "Toolkit B",
    description: [{ type: "paragraph", children: [{ text: "Desc B" }] }],
    image: { src: "/img/b.jpg", alt: "B" },
    link: { href: "/toolkits/b", label: "Learn More" },
  },
];

describe("ToolkitList", () => {
  it("renders initial toolkits", () => {
    const { container } = render(
      <ToolkitList toolkits={sampleToolkits} hasPagination={false} />,
    );
    expect(screen.getByText("Toolkit A")).toBeInTheDocument();
    expect(screen.getByText("Toolkit B")).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it("renders filters when hasFilters is true", () => {
    render(
      <ToolkitList
        toolkits={sampleToolkits}
        hasFilters
        filters={[{ type: "year", label: "Year" }]}
        filterByLabel="Filter By"
        hasPagination={false}
      />,
    );
    expect(screen.getByText("Filter By")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Year/ })).toBeInTheDocument();
  });

  it("renders pagination when hasPagination is true", () => {
    render(
      <ToolkitList
        toolkits={sampleToolkits}
        hasPagination
        pagination={{ page: 1, count: 5 }}
      />,
    );
    expect(screen.getByRole("button", { name: /2/ })).toBeInTheDocument();
  });
});
