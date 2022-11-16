import { createRender } from "@commons-ui/testing-library";
import React from "react";

import Ecosystem from "./Ecosystem";

import theme from "@/charterafrica/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

const defaultProps = {
  slug: "ecosystem",
  items: [
    {
      title: "Tools",
      data: [
        { id: "elections", label: "Elections", value: 26, color: "#4E2037" },
        {
          id: "rule-of-law",
          label: "Rule of law",
          value: 4,
          color: "#F7CE46",
        },
        {
          id: "civic-space",
          label: "Civic space",
          value: 71,
          color: "#F29D88",
        },
        { id: "media", label: "Media", value: 53, color: "#AAD4A9" },
        {
          id: "civic-values",
          label: "Civic values",
          value: 61,
          color: "#A88D99",
        },
        {
          id: "decentralisation",
          label: "Decentralisation",
          value: 23,
          color: "#FBE7A3",
        },
        {
          id: "multilateralism",
          label: "Multilateralism",
          value: 10,
          color: "#602773",
        },
        {
          id: "economic-governance",
          label: "Economic governance",
          value: 99,
          color: "#A7F3D0",
        },
        {
          id: "corporate-governance",
          label: "Corporate governance",
          value: 17,
          color: "#836070",
        },
        {
          id: "gender-equality",
          label: "Gender equality",
          value: 40,
          color: "#F48E93;",
        },
        {
          id: "constitutional-changes-government",
          label: "Constitutional changes of government",
          value: 38,
          color: "#947C2A",
        },
      ],
    },
    {
      title: "People",
      data: [
        {
          id: "experts",
          label: "Experts",
          value: 20,
          color: "#F7CE46",
        },
        {
          id: "organisations",
          label: "Organisations",
          value: 28,
          color: "#A88D99",
        },
      ],
    },
  ],
};

describe("<Ecosystem />", () => {
  it("renders unchanged", () => {
    const { container } = render(<Ecosystem {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
