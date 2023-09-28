import { createRender } from "@commons-ui/testing-library";
import React from "react";

import CMSContent from "./CMSContent";

import theme from "@/codeforafrica/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

const defaultProps = {
  children: [
    {
      blockType: "richText",
      id: "1",
      richTextBlockFields: {
        content: [
          {
            children: [
              {
                text: "Women make up only 22% of the people seen, heard or read about in the news in Africa, the results of the ",
                children: null,
              },
              {
                type: "link",
                newTab: false,
                url: "https://whomakesthenews.org/gmmp-2020-final-reports/",
                children: [
                  {
                    text: "Global Media Monitoring Project",
                    children: null,
                  },
                ],
                href: "https://whomakesthenews.org/gmmp-2020-final-reports/",
              },
              {
                text: " report launched on 14 July show. The performance of the continent’s news media has stagnated in comparison to the media in the rest of the world which has improved in the quarter century that the research has been running.",
                children: null,
              },
            ],
          },
          {
            children: [
              {
                text: "“At the world level, women are only 1 in 4 of subjects and sources in the news. This proportion is marginally better in the digital news space but at the cumulative pace of change over time, it will take at least 67 more years to close the average global gender equality gap in news media content,” Sarah Macharia, Coordinator of WACC’s Global Media Monitoring Project (GMMP) said.",
                children: null,
              },
            ],
          },
          {
            children: [
              {
                text: "However, in a more positive development, women in Africa tend to be featured more as subjects on science and health stories at 30%. Interestingly, this topic is also covered by more women reporters than average. The positive correlation supports the idea that having a more diverse newsroom leads to more diverse stories.",
                children: null,
              },
            ],
          },
          {
            children: [
              {
                text: "Taking place every five years, the GMMP study is the largest and longest longitudinal study on gender in the world’s media. The 6th edition took place in 2020, in the midst of the pandemic and some adjustments had to be made on the schedule and data capture, including offline coding tools.",
                children: null,
              },
            ],
          },
        ],
      },
    },
    {
      blockType: "mediaBlock",
      id: "2",
      mediaBlockFields: {
        image: {
          alt: "alt",
          src: "https://res.cloudinary.com/code-for-africa/image/upload/v1652705960/codeforafrica/images/Property_1_africanDRONE_y4surg.jpg",
        },
      },
    },
    {
      blockType: "external-embed",
      id: "3",
      embedBlockFields: {
        code: '<iframe width="560" height="315" src="https://www.youtube.com/embed/dQw4w9WgXcQ?si=68NbasVSpQ_wALKZ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>',
      },
      caption: "caption",
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    },
  ],
};

describe("<CMSContent />", () => {
  it("renders unchanged", () => {
    const { container } = render(<CMSContent {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
