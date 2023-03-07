import { createRender } from "@commons-ui/testing-library";
import React from "react";

import Grantees from "./Grantees";

import theme from "@/charterafrica/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

const defaultProps = {
  slug: "grantees",
  title: "Grantees",
  grantees: Array.from({ length: 30 }, (_, i) => ({
    id: i,
    name: "Grantee Name ".repeat((i % 2) + 1).trim(),
    description: [
      {
        children: [
          {
            text: "Lorem ipsum dolor sit amet con sectetur adipiscing elit mi, interdum blandit fring illa fus. adipiscing elit mi, adipiscing.",
          },
        ],
      },
    ],
    image: {
      id: "63d2622aafe25f6469605eae",
      alt: `Research ${i}`,
      prefix: "media",
      filename: "Rectangle 117.jpg",
      mimeType: "image/jpg",
      filesize: 257010,
      width: 1236,
      height: 696,
      createdAt: "2023-01-26T11:21:14.868Z",
      updatedAt: "2023-01-26T11:21:14.868Z",
      url: "http://localhost:3000/media/Rectangle 117.png",
    },
    tags: [
      {
        ig: 1,
        name: "Constitutional changes of government",
      },
      {
        ig: 1,
        name: "Constitutional changes of government",
      },
    ],
  })),
};
describe("<Grantees />", () => {
  it("renders unchanged", () => {
    const { container } = render(<Grantees {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
