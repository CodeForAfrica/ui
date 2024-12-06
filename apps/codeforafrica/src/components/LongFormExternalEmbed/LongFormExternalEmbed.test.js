import { createRender } from "@commons-ui/testing-library";
import React from "react";

import LongFormExternalEmbed from "./LongFormExternalEmbed";

import theme from "@/codeforafrica/theme";

const render = createRender({ theme });

const defaultProps = {
  embedBlockFields: {
    code: '<iframe width="560" height="315" src="https://www.youtube.com/embed/dQw4w9WgXcQ?si=68NbasVSpQ_wALKZ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>',
  },
  caption: "caption",
  url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
};

describe("<LongFormExternalEmbed />", () => {
  it("renders unchanged", () => {
    const { container } = render(<LongFormExternalEmbed {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
