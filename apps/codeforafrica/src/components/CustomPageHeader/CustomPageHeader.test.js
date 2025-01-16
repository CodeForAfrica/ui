import { createRender } from "@commons-ui/testing-library";
import React from "react";

import CustomPageHeader from "./CustomPageHeader";

import theme from "@/codeforafrica/theme";

const render = createRender({ theme });

const defaultProps = {
  title: "About Us",
  subtitle:
    "We are Africa’s largest network of civic technology and data journalism labs",
  image: {
    src: "https://res.cloudinary.com/code-for-africa/image/upload/v1656064173/codeforafrica/images/1_IgrT4_1tGZh1WnpYzvZN1A_1_twneqf.jpg",
  },
};

describe("<CustomPageHeader />", () => {
  it("renders unchanged", () => {
    const { container } = render(<CustomPageHeader {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
