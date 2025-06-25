import { createRender } from "@commons-ui/testing-library";
import React from "react";

import PostList from "./PostList";

import theme from "@/trustlab/theme";

const render = createRender({ theme });

const defaultProps = {
  posts: [
    {
      id: 1,
      deadline: "17 June 2025",
      excerpt:
        "The TrustLab supports Kenyan CSOs/CBOs to counter digital threats that affect them and the communities they serve",
      title: "TrustLab Incubator Programme",
      href: "/opportunities/trustlab-incubator-programme",
      image: {
        alt: "Resources 1",
        src: "/resources-1.jpg",
      },
      deadlineLabel: "Deadline On",
      linkLabel: "Apply Now",
    },
  ],
};

describe("<PostList />", () => {
  it("renders unchanged", () => {
    const { container } = render(<PostList {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
