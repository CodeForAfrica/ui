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
  options: {
    url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    showNotes: false,
    search: false,
    text: false,
    zoom: false,
  },
};

describe("<EmbeddedDocumentViewer />", () => {
  it("renders unchanged", () => {
    const { container } = render(<EmbeddedDocumentViewer {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
