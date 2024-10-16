import { createRender } from "@commons-ui/testing-library";
import React from "react";

import RichText from "./RichText";

import theme from "@/climatemappedafrica/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

const defaultProps = {
  elements: [
    {
      children: [
        {
          text: "The Richtext First Paragraph",
          children: null,
        },
      ],
    },
    {
      children: [
        {
          text: "The Richtext Second Paragraph",
          children: null,
        },
      ],
    },
    {
      children: [
        {
          text: "The Richtext Third Paragraph",
          children: null,
        },
        {
          type: "link",
          linkType: "internal",
          doc: {
            value: "63887cf05bc566facccee049",
            relationTo: "pages",
          },
          children: [
            {
              text: "here",
              children: null,
            },
          ],
          href: "/",
        },
        {
          text: "",
          children: null,
        },
      ],
    },
  ],
};

describe("<RichText />", () => {
  it("renders unchanged", () => {
    const { container } = render(<RichText {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
