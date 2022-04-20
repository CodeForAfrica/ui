import { render } from "@testing-library/react";
import React from "react";

import Page from "./Page";

describe("<Page />", () => {
  it("renders unchanged", () => {
    const { container } = render(<Page />);
    expect(container).toMatchSnapshot();
  });
});
