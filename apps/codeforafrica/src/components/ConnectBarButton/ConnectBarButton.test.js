import { createRender } from "@commons-ui/testing-library";
import React from "react";

import ConnectBarButton from "./ConnectBarButton";

import theme from "@/codeforafrica/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

const defaultProps = {
  tooltipProps: { title: "Title" },
};

describe("<ConnectBarButton />", () => {
  it("renders unchanged", () => {
    const { container } = render(<ConnectBarButton {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
