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
  socialMedia: [
    {
      name: "twitter",
      link: "https://twitter.com/johndoe",
      id: 1,
    },
    {
      name: "github",
      link: "https://github.com/johndoe",
      id: 2,
    },
  ],
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
  role: "Developer",
  currentOrganisation: "Charter Africa",
  repositories: Array.from({ length: 3 }, (_, i) => ({
    id: 1,
    name: `Repository ${i}`,
    stargazers: 100,
    visibility: "PUBLIC",
    description: "Charter Africa website",
    url: "https://charter.africa",
    updatedAt: "2021-10-01T00:00:00Z",
    techSkills: "React, Next.js, TypeScript",
  })),
  repositoriesTitle: "Repositories",
  organisations: Array.from({ length: 3 }, (_, i) => ({
    id: 1,
    name: `Organisation ${i}`,
    avatarUrl: "/static/images/charterafrica.png",
    link: {
      href: "https://charter.africa",
    },
  })),
  organisationsTitle: "Organisations",
};

describe("<OrgAndContributor />", () => {
  it("renders unchanged", () => {
    const { container } = render(<Entity {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
