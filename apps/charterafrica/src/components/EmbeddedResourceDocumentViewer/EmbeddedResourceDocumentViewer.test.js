import { createRender } from "@commons-ui/testing-library";
import React from "react";

import EmbeddedResourceDocumentViewer from "./EmbeddedResourceDocumentViewer";

import theme from "@/charterafrica/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

const defaultProps = {
  title: "Document Title",
  html: `
  <iframe src="https://dc.sourceafrica.net/documents/120991-Case-Study-Drones-and-the-2017-Sierra-Leone.html" width="100%" height="1000px" frameborder="0" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>
  `,
  labels: {
    openDocument: "Open Document",
  },
};

describe("<EmbeddedResourceDocumentViewer />", () => {
  it("renders unchanged", () => {
    const { container } = render(
      <EmbeddedResourceDocumentViewer {...defaultProps} />
    );
    expect(container).toMatchSnapshot();
  });
});
