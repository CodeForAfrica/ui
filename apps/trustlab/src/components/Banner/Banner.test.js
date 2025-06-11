import { createRender } from "@commons-ui/testing-library";
import React from "react";

import Banner from "./Banner";

import theme from "@/trustlab/theme";

const render = createRender({ theme });

const defaultProps = {
  backgroundColor: "#02041C",
  title: "About TrustLab",
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
              text: "TrustLab is a three-year EU-funded initiative by DW Akademie, Code for Africa (CfA), and Siasa Place. ",
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
    src: "/images/cms/blocks/banner.png",
    alt: "TrustLab Banner",
  },
  blockType: "page-header",
};

describe("<Banner />", () => {
  it("renders unchanged", () => {
    const { container } = render(<Banner {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
