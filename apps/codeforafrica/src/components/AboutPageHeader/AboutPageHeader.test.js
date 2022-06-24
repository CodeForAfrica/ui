import { createRender } from "@commons-ui/testing-library";
import React from "react";

import AboutPageHeader from "./AboutPageHeader";

import theme from "@/codeforafrica/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

const defaultProps = {
  title: "About Us",
  subtitle:
    "We are Africa’s largest network of civic technology and data journalism labs",
  image: {
    src: "https://res.cloudinary.com/code-for-africa/image/upload/v1656064173/codeforafrica/images/1_IgrT4_1tGZh1WnpYzvZN1A_1_twneqf.jpg",
  },
};

describe("<AboutPageHeader />", () => {
  it("renders unchanged", () => {
    const { container } = render(<AboutPageHeader {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
