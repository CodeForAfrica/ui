import { createRender } from "@commons-ui/testing-library";
import React from "react";

import EmbeddedChart from "./EmbeddedChart";

import theme from "@/charterafrica/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

const defaultProps = {
  html: "<div>Flourish Charts</div>",
  height: 500,
  width: 100,
  backgroundColor: "#fff",
  title: "Flourish Charts",
  subtitle: "Flourish Charts",
};

describe("<EmbeddedChart />", () => {
  const { container } = render(<EmbeddedChart {...defaultProps} />);

  it("renders unchanged", async () => {
    await expect(container).toMatchSnapshot();
  });
});
