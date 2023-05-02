import { createRender } from "@commons-ui/testing-library";
import React from "react";

import DatasetsChart from "./DatasetsChart";

import theme from "@/charterafrica/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

const defaultProps = {
  data: [
    {
      id: "datasets",
      label: "Datasets",
      value: 40,
      color: "#D3C5CC",
    },
    {
      id: "document",
      label: "Documents",
      value: 20,
      color: "#FBE49A",
    },
  ],
};

describe("<DatasetsChart />", () => {
  it("renders unchanged", () => {
    const { container } = render(<DatasetsChart {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
