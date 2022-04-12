import { render } from "@testing-library/react";
import React from "react";

import ImageButton from "./ImageButton";

describe("ImageButton", () => {
  it("renders unchanged", () => {
    const { container } = render(
      <ImageButton height={62} src="/CfA logo.png" width={132} />
    );
    expect(container).toMatchSnapshot();
  });
});
