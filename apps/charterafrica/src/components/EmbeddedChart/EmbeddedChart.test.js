import { createRender } from "@commons-ui/testing-library";
import React from "react";

import EmbeddedChart from "./EmbeddedChart";

import theme from "@/charterafrica/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

const defaultProps = {
  backgroundColor: "#fff",
  html: "<div>Flourish Charts</div>",
  subtitle: "Flourish Charts",
  title: "Flourish Charts",
  width: {
    xs: "100%",
    sm: "100%",
    md: "100%",
  },
};

describe("<EmbeddedChart />", () => {
  const { container } = render(<EmbeddedChart {...defaultProps} />);

  it("renders unchanged", async () => {
    await expect(container).toMatchSnapshot();
  });
});
