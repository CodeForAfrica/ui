import { createRender } from "@commons-ui/testing-library";
import React from "react";

import Index from "./index.page";

import theme from "@/codeforafrica/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

const defaultProps = {
  member: {
    slug: "member-1",
    name: "Justin Arenstein",
    title: "CEO of Code for Africa",
    thumbnail: {
      src: "https://res.cloudinary.com/code-for-africa/image/upload/v1653298218/codeforafrica/images/team/image_11_jb8a30.jpg",
    },
    href: "/about/members/member-1",
  },
  sections: [],
};

describe("<Pages/About/[Unit]/[Slug] />", () => {
  it("renders unchanged", () => {
    const { container } = render(<Index {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
