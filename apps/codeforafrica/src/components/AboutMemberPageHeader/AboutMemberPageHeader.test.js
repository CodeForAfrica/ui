import { createRender } from "@commons-ui/testing-library";
import React from "react";

import AboutMemberPageHeader from "./AboutMemberPageHeader";

import theme from "@/codeforafrica/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

const defaultProps = {
  slug: "member-4",
  name: "Jacobo Ottaviani",
  title: "Chief Data Officer",
  thumbnail: {
    src: "https://res.cloudinary.com/code-for-africa/image/upload/v1655127335/codeforafrica/images/team/image_11_ch6dnb.jpg",
  },
  href: "/about/members/member-4",
};

describe("<AboutMemberPageHeader />", () => {
  it("renders unchanged", () => {
    const { container } = render(<AboutMemberPageHeader {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
