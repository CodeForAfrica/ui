import { createRender } from "@commons-ui/testing-library";
import React from "react";

import CategoryCard from "./CategoryCard";

import theme from "@/trustlab/theme";

const render = createRender({ theme });

describe("<CategoryCard />", () => {
  it("renders unchanged", () => {
    const { container } = render(
      <CategoryCard
        title="Test Research Category"
        description={{
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
        }}
        image={{
          src: "/test-image.jpg",
          alt: "Test image",
        }}
        link={{
          href: "/test-link",
        }}
      />,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it("renders without image", () => {
    const { container } = render(
      <CategoryCard
        title="Test Research Category"
        description={{
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
        }}
      />,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it("renders without link", () => {
    const { container } = render(
      <CategoryCard
        title="Test Research Category"
        description={{
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
        }}
        image={{
          src: "/test-image.jpg",
          alt: "Test image",
        }}
      />,
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
