import { createRender } from "@commons-ui/testing-library";
import React from "react";

import HelplinesOverviewList from "./HelplinesOverviewList";

import theme from "@/trustlab/theme";

const render = createRender({ theme });

const defaultProps = {
  title: "Resources",
  linkLabel: "Learn More",
  resources: [
    {
      title: "Anti Trolling",
      slug: "anti-trolling",
      shortDescription:
        "Our fact-checkers & forensic investigators are on standby to verify claims or expose the puppet masters behind smear campaigns.",
      description: {
        root: {
          children: [
            {
              children: [
                {
                  detail: 0,
                  format: 0,
                  mode: "normal",
                  style: "",
                  text: "CfA has Africa’s largest teams working to debunk disinformation and expose the hidden networks coordinating the abuse. Here’s how they can help you:",
                  type: "text",
                  version: 1,
                },
                {
                  type: "linebreak",
                  version: 1,
                },
                {
                  type: "linebreak",
                  version: 1,
                },
                {
                  detail: 0,
                  format: 0,
                  mode: "normal",
                  style: "",
                  text: "Fact-checking false claims",
                  type: "text",
                  version: 1,
                },
                {
                  type: "linebreak",
                  version: 1,
                },
                {
                  type: "linebreak",
                  version: 1,
                },
                {
                  detail: 0,
                  format: 0,
                  mode: "normal",
                  style: "",
                  text: "CfA’s PesaCheck is the continent’s largest fact-checking newsroom, with full-time researchers in 21 African countries. It is an accredited member of the IFCN (International Fact Checking Network), and adheres to a strict ethical code. PesaCheck’s fact-checks are published by a wide network of partner media across Africa, and are also used by social media platforms such as Facebook, Instagram and TikTok to combat toxic content. Facebook alone uses PesaCheck debunks to label over two million posts per year as harmful or misleading content. PesaCheck may help research and debunk any misleading claims being used to target or harass you, if the claims meet PesaCheck’s eligibility criteria.",
                  type: "text",
                  version: 1,
                },
                {
                  type: "linebreak",
                  version: 1,
                },
                {
                  type: "linebreak",
                  version: 1,
                },
                {
                  detail: 0,
                  format: 0,
                  mode: "normal",
                  style: "",
                  text: "Identifying troll networks",
                  type: "text",
                  version: 1,
                },
                {
                  type: "linebreak",
                  version: 1,
                },
                {
                  type: "linebreak",
                  version: 1,
                },
                {
                  detail: 0,
                  format: 0,
                  mode: "normal",
                  style: "",
                  text: "CfA’s iLAB at the African Network of Centres for Investigative Reporting (ANCIR) work alongside PesaCheck, as the continent’s largest network of forensic analysts who ‘connect the dots’. They do this by exposing the coordinated networks behind the abuse, mapping the influencers, diagnosing the techniques they use, and tracking the narratives. Their analyses help watchdog organisations determine whether the social media platform policies have been violated, or whether other safeguards against amplified hate speech and toxic content have been violated. iLAB’ss dossiers serve as evidence for investigative media, and contribute to remedial action by both platforms and regulators who take down or de-platform entire networks of inauthentic accounts on social media.",
                  type: "text",
                  version: 1,
                },
              ],
              direction: "ltr",
              format: "",
              indent: 0,
              type: "paragraph",
              version: 1,
              textFormat: 0,
              textStyle: "",
            },
          ],
          direction: "ltr",
          format: "",
          indent: 0,
          type: "root",
          version: 1,
        },
      },
      image: {
        alt: "Resources 1",
        src: "/resources-1.jpg",
      },
      id: 1,
    },
  ],
};

describe("<ResourcesOverViewList />", () => {
  it("renders unchanged", () => {
    const { container } = render(<HelplinesOverviewList {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
