import { render } from "@commons-ui/testing-library";
import React from "react";

import Carousel from ".";

const defaultProps = {
  children: (
    <>
      <div>1</div>
      <div>2</div>
    </>
  ),
};

describe("<Carousel />", () => {
  it("renders unchanged", () => {
    const { container } = render(<Carousel {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
