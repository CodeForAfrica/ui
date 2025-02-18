import { createRender } from "@commons-ui/testing-library";
import React from "react";

import YoutubeVideoPlayer from "./YoutubeVideoPlayer";

import theme from "@/charterafrica/theme";

const render = createRender({ theme });

const defaultProps = {
  videoId: "vAaz45dSF4Y",
  width: 1024,
};

describe("<YoutubeVideoPlayer />", () => {
  it("renders unchanged", () => {
    const { container } = render(<YoutubeVideoPlayer {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
