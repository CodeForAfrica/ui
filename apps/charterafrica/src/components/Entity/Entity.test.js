import { createRender } from "@commons-ui/testing-library";
import React from "react";

import Entity from "./Entity";

import theme from "@/charterafrica/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

const defaultProps = {
  name: "John Doe",
  location: "San Francisco, CA",
  description: "Full-stack web developer with over 5 years of experience.",
  twitter: "https://twitter.com/johndoe",
  github: "https://github.com/johndoe",
  email: "johndoe@example.com",
  image: "/static/images/avatar/1.jpg",
  tools: [
    {
      id: 1,
      name: "React",
      topic: "Frontend",
      lastActive: "1 day ago",
      description: "A JavaScript library for building user interfaces",
      image: "/static/images/react.png",
    },
    {
      id: 2,
      name: "Node.js",
      topic: "Backend",
      lastActive: "2 days ago",
      description:
        "A JavaScript runtime built on Chrome's V8 JavaScript engine.",
      image: "/static/images/nodejs.png",
    },
  ],
  toolsTitle: "Favorite Tools",
};

describe("<OrgAndContributor />", () => {
  it("renders unchanged", () => {
    const { container } = render(<Entity {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
