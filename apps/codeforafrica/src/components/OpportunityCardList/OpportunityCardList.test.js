import { createRender } from "@commons-ui/testing-library";
import React from "react";

import OpportunityCardList from "./OpportunityCardList";

import theme from "@/codeforafrica/theme";

const render = createRender({ theme });

const defaultProps = {
  opportunities: [
    {
      id: 1,
      href: "/opportunities/1",
      title:
        "DEPUTY INVESTIGATIVE MANAGER: Support the fight against disinformation and transnational organised crime",
      excerpt:
        "Position in: Africa Do you want to help expose the puppet-masters behind disinformation networks, and expose transnational organised criminals? Code for Africa (CfA) has an immediate vacancy for a full-time Deputy Investigative Manager to join our pan-African forensic...",
      readMore: "Read more",
      image: {
        src: "https://codeforafrica.org/wp-content/uploads/2021/09/Deputy-Investigative-Manager-1-1024x576.jpg",
        alt: "Deputy Investigative Manager",
      },
      tags: [
        {
          name: "Data Journalism",
          slug: "data-journalism",
        },
      ],
    },
  ],
};

describe("<OpportunityCardList />", () => {
  it("renders unchanged", () => {
    const { container } = render(<OpportunityCardList {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
