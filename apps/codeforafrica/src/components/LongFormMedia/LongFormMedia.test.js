import { createRender } from "@commons-ui/testing-library";
import React from "react";

import LongFormMedia from "./LongFormMedia";

import theme from "@/codeforafrica/theme";

const render = createRender({ theme });

const defaultProps = {
  mediaBlockFields: {
    image: {
      alt: "alt",
      src: "https://res.cloudinary.com/code-for-africa/image/upload/v1652705960/codeforafrica/images/Property_1_africanDRONE_y4surg.jpg",
    },
  },
};

describe("<LongFormMedia />", () => {
  it("renders unchanged", () => {
    const { container } = render(<LongFormMedia {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
