import { render } from "@commons-ui/testing-library";
import React from "react";

import IndicatorTitle from "./IndicatorTitle";

const defaultProps = {
  children: <div>Children</div>,
  description: "Description",
  title: "Title",
  view: {},
  actions: [],
};

describe("IndicatorTitle", () => {
  it("renders unchanged", () => {
    const { container } = render(<IndicatorTitle {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
