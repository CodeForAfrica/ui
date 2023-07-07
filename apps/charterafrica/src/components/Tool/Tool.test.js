import { createRender } from "@commons-ui/testing-library";
import React from "react";

import Tool from "./Tool";

import theme from "@/charterafrica/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

const defaultProps = {
  image:
    "https://opengraph.githubassets.com/cdea3047f304ac30905b3f49eb4abdb00f2972aab918177244a0f111ea1348c7/CodeForAfrica/ui",
  name: "Tool Name",
  topic: "Topic Name",
  link: { href: "https://git.com", label: "Go to Repo" },
  toolsTitle: "More tools",
  contributorsTitle: "Contributors",
  lastActive: "6 Months ago",
  linkText: "Go to Repo",
  donors: [],
  contributeText: "Contribute",
  organisationName: "organisationName",
  twitter: "https://twitter.com/johndoe",
  github: "https://github.com/johndoe",
  email: "johndoe@example.com",
  location: "Africa",
  description:
    "Lorem ipsum dolor sit amet consectetur adipiscing elit gravida, urna enim nulla iaculis taciti semper parturient laoreet luctus, orci ac ornare senectus posuere nam libero. Imperdiet turpis tortor nu. Lorem ipsum dolor sit amet consectetur adipiscing elit gravida, urna enim nulla iaculis taciti semper parturient laoreet luctus, orci ac ornare senectus posuere nam libero. Imperdiet turpis tortor nu.",
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
  contribute: {
    label: "Contribute",
    href: "",
  },
  goToRepo: {
    label: "Go to Repo",
    href: "",
  },
  lastCommit: {},
  contributors: Array(30)
    .fill({
      link: { href: "" },
      id: "643e5303d3a60641b5b6df8e",
      updatedAt: "2023-04-20T08:00:08.469Z",
      externalId: "Beta maṣāḥǝft: Manuscripts of Ethiopia and Eritrea",
      type: "Organisation",
      name: "Beta maṣāḥǝft",
      description:
        "The project Beta maṣāḥǝft: Manuscripts of Ethiopia and Eritrea (Schriftkultur des christlichen Äthiopiens: eine multimediale Forschungsumgebung) is a long-term ",
      location: "Hiob Ludolf Centre for Ethiopian Studies",
      twitter: null,
      createdAt: "2023-04-18T08:21:23.274Z",
      source: "github",
    })
    .map((item, id) => ({ ...item, id })),
};

describe("<Tool />", () => {
  it("renders unchanged", () => {
    const { container } = render(<Tool {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
