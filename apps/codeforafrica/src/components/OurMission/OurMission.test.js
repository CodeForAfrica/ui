import { createRender } from "@commons-ui/testing-library";
import React from "react";

import OurMission from "./OurMission";

import theme from "@/codeforafrica/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });
const defaultProps = {
  title: "Our mission",
  subtitle: "Our mission",
  description: [
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
  ],
};

describe("<OurMission />", () => {
  it("renders unchanged", () => {
    const { container } = render(<OurMission {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
