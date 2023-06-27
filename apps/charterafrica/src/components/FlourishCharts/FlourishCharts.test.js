import { createRender } from "@commons-ui/testing-library";
import React from "react";

import FlourishCharts from "./FlourishCharts";

import theme from "@/charterafrica/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

const defaultProps = {
  code: "<div>Flourish Charts</div>",
};

describe("<FlourishCharts />", () => {
  const { container } = render(<FlourishCharts {...defaultProps} />);

  it("renders unchanged", async () => {
    await expect(container).toMatchSnapshot();
  });
});
