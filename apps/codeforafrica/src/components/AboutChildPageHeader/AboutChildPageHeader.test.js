import { createRender } from "@commons-ui/testing-library";
import React from "react";

import AboutChildPageHeader from "./AboutChildPageHeader";

import theme from "@/codeforafrica/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

const defaultProps = {
  name: "Jacobo Ottaviani",
  title: "Chief Data Officer",
  thumbnail: {
    src: "https://res.cloudinary.com/code-for-africa/image/upload/v1655127335/codeforafrica/images/team/image_11_ch6dnb.jpg",
  },
};

describe("<AboutChildPageHeader />", () => {
  it("renders unchanged", () => {
    const { container } = render(<AboutChildPageHeader {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
