import { createRender } from "@commons-ui/testing-library";
import { screen } from "@testing-library/react";
import React from "react";

import PlaybooksList from "./PlaybooksList";

import theme from "@/trustlab/theme";

const render = createRender({ theme });
// Mock SWR to rely on initial data
jest.mock("swr", () => ({
  __esModule: true,
  default: () => ({ data: null, isLoading: false }),
}));

const richTextMock = {
  root: {
    type: "root",
    version: 1,
    children: [
      {
        type: "paragraph",
        version: 1,
        indent: 0,
        format: "",
        direction: "ltr",
        textFormat: 0,
        textStyle: "",
        children: [
          {
            type: "text",
            version: 1,
            text: "Playbook description",
            detail: 0,
            format: 0,
            mode: "normal",
            style: "",
          },
        ],
      },
    ],
    indent: 0,
    format: "",
    direction: "ltr",
  },
};

const samplePlaybooks = [
  {
    id: "p1",
    title: "Playbook A",
    description: richTextMock,
    image: { src: "/img/a.jpg", alt: "A" },
    link: { href: "/playbooks/a", label: "Download" },
  },
  {
    id: "p2",
    title: "Playbook B",
    description: richTextMock,
    image: { src: "/img/b.jpg", alt: "B" },
    link: { href: "/playbooks/b", label: "Download" },
  },
];

describe("<PlaybooksList />", () => {
  it("renders initial playbooks using RowCard", () => {
    const { container } = render(
      <PlaybooksList playbooks={samplePlaybooks} hasPagination={false} />,
    );
    expect(screen.getByText("Playbook A")).toBeInTheDocument();
    expect(screen.getByText("Playbook B")).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it("renders filters when hasFilters is true", () => {
    render(
      <PlaybooksList
        playbooks={samplePlaybooks}
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
      <PlaybooksList
        playbooks={samplePlaybooks}
        hasPagination
        pagination={{ page: 1, count: 5 }}
      />,
    );
    // page 2 button should exist
    expect(screen.getByRole("button", { name: "2" })).toBeInTheDocument();
  });
});
