import { createRender } from "@commons-ui/testing-library";
import React from "react";

import Document from "./Document";

import theme from "@/charterafrica/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

const defaultProps = {
  html: `
  <iframe src="https://dc.sourceafrica.net/documents/120991-Case-Study-Drones-and-the-2017-Sierra-Leone.html" width="100%" height="1000px" frameborder="0" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>
  `,
  labels: {
    openDocument: "Open Document",
  },
  title: "Document Title",
  url: "/",
};

describe("<Document />", () => {
  it("renders unchanged", () => {
    const { container } = render(<Document {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
