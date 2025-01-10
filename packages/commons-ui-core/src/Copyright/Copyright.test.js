import { render } from "@commons-ui/testing-library";
import React from "react";

import Copyright from "./Copyright";

describe("<Copyright />", () => {
  it("renders inchanged", () => {
    const { container } = render(
      <Copyright
        copyright="Code for Africa"
        year="2024"
        url="https://google.com"
      />,
    );
    expect(container).toMatchSnapshot();
  });
});
