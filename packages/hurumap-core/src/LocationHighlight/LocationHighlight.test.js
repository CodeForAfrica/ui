import { render } from "@commons-ui/testing-library";
import * as React from "react";

import LocationHighlight from "./LocationHighlight";

describe("LocationHighlight", () => {
  it("renders unchanged", () => {
    const { container } = render(
      <LocationHighlight title="Population" value="1,000,000" />,
    );
    expect(container).toMatchSnapshot();
  });
});
