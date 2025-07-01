import { createRender } from "@commons-ui/testing-library";
import React from "react";

import PostCard from "./PostCard";

import theme from "@/trustlab/theme";

const render = createRender({ theme });

const defaultProps = {
  deadline: "17 June 2025",
  deadlineLabel: "Deadline On",
  closedLabel: "Closed",
  excerpt:
    "The TrustLab supports Kenyan CSOs/CBOs to counter digital threats that affect them and the communities they serve",
  title: "TrustLab Incubator Programme",
  href: "/opportunities/trustlab-incubator-programme",
  linkLabel: "Apply Now",
  isClosed: false,
  image: {
    alt: "Resources 1",
    src: "/resources-1.jpg",
  },
};

describe("<PostCard />", () => {
  it("renders unchanged", () => {
    const { container } = render(<PostCard {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
