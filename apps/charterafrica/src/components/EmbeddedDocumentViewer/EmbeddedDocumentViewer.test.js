import { createRender } from "@commons-ui/testing-library";
import React from "react";

import EmbeddedDocumentViewer from "./EmbeddedDocumentViewer";

import theme from "@/charterafrica/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

const defaultProps = {
  title: "Document Title",
  excerpt: [
    {
      children: [
        {
          text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent auctor purus luctus enim egestas, ac scelerisque ante pulvinar. Donec ut rhoncus ex. Suspendisse ac rhoncus nisl, eu tempor urna. Curabitur vel bibendum lorem. Morbi convallis convallis diam sit amet lacinia.",
        },
      ],
    },
  ],
  html: `
  <iframe src="https://dc.sourceafrica.net/documents/120991-Case-Study-Drones-and-the-2017-Sierra-Leone.html" width="100%" height="1000px" frameborder="0" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>
  `,
};

describe("<EmbeddedDocumentViewer />", () => {
  it("renders unchanged", () => {
    const { container } = render(<EmbeddedDocumentViewer {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
