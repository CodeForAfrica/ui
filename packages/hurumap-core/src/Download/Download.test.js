import { render } from "@commons-ui/testing-library";
import React from "react";

import Download from "./Download";

const defaultProps = {
  backgroundColor: "#fff",
  cfalogo: "cfalogo",
  chartSubtitle: "chartSubtitle",
  chartTitle: "chartTitle",
  chartValue: "chartValue",
  currentFilters: [],
  data: [],
  disableToggle: false,
  fileTypes: [],
  handleChartValueChange: jest.fn(),
  height: 100,
  imageTypes: [],
  isCompare: false,
  layouts: [],
  projectlogo: "projectlogo",
  profileNames: [],
  scaleFactor: 1,
  spec: {},
  source: "source",
  title: "title",
  values: [],
  view: {},
};

describe("Download", () => {
  it("renders unchanged", () => {
    const { container } = render(<Download {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
