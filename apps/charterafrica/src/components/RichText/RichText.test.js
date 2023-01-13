import { createRender } from "@commons-ui/testing-library";
import React from "react";

import RichText from "./RichText";

import theme from "@/charterafrica/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

const defaultProps = {
  elements: [
    {
      children: [
        {
          text: "The Charter Project is a pan-African initiative by a coalition of watchdog organisations that use civic technologies to strengthen democracy.",
          children: null,
        },
      ],
    },
    {
      children: [
        {
          text: "We do this by helping digital activists and democracy changemakers leverage the African Union’s Charter on Democracy, Elections and Governance (ACDEG).",
          children: null,
        },
      ],
    },
    {
      children: [
        {
          text: "The project currently supports initiatives in 11 countries. Find out more ",
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
