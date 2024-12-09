import { createRender } from "@commons-ui/testing-library";
import React from "react";

import LongFormMediaBlock from "./LongFormMediaBlock";

import theme from "@/charterafrica/theme";

const render = createRender({ theme });

const defaultProps = {
  mediaBlockFields: {
    image: {
      id: "63e238816b52a21599ce6c70",
      alt: "Featured Post",
      url: "https://charterafrica.dev.codeforafrica.org/media/a20443263ce3904ad42cc5c7934e1040.jpeg",
    },
    caption: "Image caption.",
  },
  id: "63fc4ec5aca2d71a6679674f",
  slug: "mediaBlock",
};

describe("<LongFormMediaBlock />", () => {
  it("renders unchanged", () => {
    const { container } = render(<LongFormMediaBlock {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
