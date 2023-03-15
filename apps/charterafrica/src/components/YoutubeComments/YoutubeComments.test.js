import { createRender } from "@commons-ui/testing-library";
import React from "react";

import YoutubeComments from "./CommentsList";

import theme from "@/charterafrica/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

const defaultProps = {};

describe("<YoutubeComments />", () => {
  it("renders unchanged", () => {
    const { container } = render(<YoutubeComments {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
