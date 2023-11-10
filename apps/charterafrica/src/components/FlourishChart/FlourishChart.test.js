import { createRender } from "@commons-ui/testing-library";
import React from "react";

import FlourishChart from "./FlourishChart";

import theme from "@/charterafrica/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

const defaultProps = {
  backgroundColor: "#fff",
  chartId: "story/1946372",
  subtitle: "Flourish Charts",
  title: "Flourish Charts",
};

describe("<FlourishChart />", () => {
  const { container } = render(<FlourishChart {...defaultProps} />);

  it("renders unchanged", async () => {
    await expect(container).toMatchSnapshot();
  });
});
