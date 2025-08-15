import { createRender } from "@commons-ui/testing-library";
import React from "react";

import IntelligenceBriefings from "./IntelligenceBriefings";

import theme from "@/trustlab/theme";

const render = createRender({ theme });

describe("<IntelligenceBriefings />", () => {
  it("renders unchanged", () => {
    const { container } = render(
      <IntelligenceBriefings
        title="Intelligence briefings"
        subtitle="Stakeholder round table to strengthen grass roots defenders"
        description={{
          root: {
            children: [
              {
                children: [
                  {
                    detail: 0,
                    format: 0,
                    mode: "normal",
                    style: "",
                    text: "This is a placeholder text that should be updated. Trustlab fact-checkers will help debunk false-claims or other smear campaigns against human rights defenders. Trustlab fact-checkers will help debunk false-claims or other smear campaigns against human rights defenders",
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
        }}
        ctaItems={[
          {
            icon: {
              url: "/api/media/file/screenshot-2025-07-21-at-20830-pm-1.png",
              alt: "Fact-checking icon",
            },
            title: "Expert Analysis",
          },
          {
            icon: {
              url: "/api/media/file/screenshot-2025-07-21-at-20830-pm-1.png",
              alt: "Fact-checking icon",
            },
            title: "Share Evidence",
          },
          {
            icon: {
              url: "/api/media/file/screenshot-2025-07-21-at-20830-pm-1.png",
              alt: "Fact-checking icon",
            },
            title: "Brainstorm Solutions",
          },
        ]}
      />,
    );
    expect(container).toMatchSnapshot();
  });
});
