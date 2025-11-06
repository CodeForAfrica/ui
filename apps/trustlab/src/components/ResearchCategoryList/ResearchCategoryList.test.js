import { createRender } from "@commons-ui/testing-library";
import React from "react";

import ResearchCategoryList from "./ResearchCategoryList";

import theme from "@/trustlab/theme";

const render = createRender({ theme });

const mockCategories = [
  {
    id: "1",
    title: "Research Category 1",
    description: {
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
    },
    image: {
      src: "/test-image-1.jpg",
      alt: "Test image 1",
    },
    link: {
      href: "/category-1",
    },
  },
  {
    id: "2",
    title: "Research Category 2",
    description: {
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
    },
    image: {
      src: "/test-image-2.jpg",
      alt: "Test image 2",
    },
    link: {
      href: "/category-2",
    },
  },
  {
    id: "3",
    title: "Research Category 3",
    description: {
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
    },
    image: {
      src: "/test-image-3.jpg",
      alt: "Test image 3",
    },
    link: {
      href: "/category-3",
    },
  },
];

describe("<ResearchCategoryList />", () => {
  it("renders unchanged", () => {
    const { container } = render(
      <ResearchCategoryList categories={mockCategories} />,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it("renders empty list when no categories", () => {
    const { container } = render(<ResearchCategoryList categories={[]} />);
    expect(container.firstChild).toBeNull();
  });

  it("renders correct number of cards", () => {
    const { getAllByRole } = render(
      <ResearchCategoryList categories={mockCategories} />,
    );
    const cards = getAllByRole("heading", { level: 3 });
    expect(cards).toHaveLength(mockCategories.length);
  });
});
