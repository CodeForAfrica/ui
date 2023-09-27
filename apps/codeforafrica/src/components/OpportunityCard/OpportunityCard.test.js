import { createRender } from "@commons-ui/testing-library";
import React from "react";

import OpportunityCard from "./OpportunityCard";

import theme from "@/codeforafrica/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

const defaultProps = {
  href: "/opportunities/1",
  image: {
    src: "https://codeforafrica.org/wp-content/uploads/2021/09/Deputy-Investigative-Manager-1-1024x576.jpg",
    alt: "Deputy Investigative Manager",
  },
  title:
    "DEPUTY INVESTIGATIVE MANAGER: Support the fight against disinformation and transnational organised crime",
  excerpt:
    "Position in: Africa Do you want to help expose the puppet-masters behind disinformation networks, and expose transnational organised criminals? Code for Africa (CfA) has an immediate vacancy for a full-time Deputy Investigative Manager to join our pan-African forensic...",
  readMore: "Read more",
  tags: [
    {
      name: "Data Journalism",
      slug: "data-journalism",
    },
  ],
};

describe("<OpportunityCard />", () => {
  it("renders unchanged", () => {
    const { container } = render(<OpportunityCard {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
