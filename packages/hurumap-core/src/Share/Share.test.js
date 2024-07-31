import { render } from "@commons-ui/testing-library";
import * as React from "react";

import Share from "./Share";

describe("Share", () => {
  it("renders unchanged", () => {
    const { container } = render(
      <Share
        title="Area of agricultural land in hectares"
        chartType="treemap"
        codeData={{
          src: "http://localhost:3001/embed/ke/1087",
          className: "chart",
        }}
        geoCode="KE"
        indicatorId={1087}
        isCompare={false}
        shareData={[]}
        url="http://localhost:3001/embed/ke/1087"
      />,
    );
    expect(container).toMatchSnapshot();
  });
});
