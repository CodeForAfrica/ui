import { createRender } from "@commons-ui/testing-library";
import React from "react";

import RapidResponse from "./RapidResponse";

import theme from "@/trustlab/theme";

const render = createRender({ theme });

const defaultProps = {
  title: "Rapid Response",
  briefs: [
    {
      icon: {
        url: "/api/media/file/screenshot-2025-07-21-at-20830-pm-1.png",
        alt: "Rapid Response icon",
      },
      title: "Rapid Response Briefing",
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
                  text: "This is a placeholder text that should be updated. Trustlab fact-checkers will help debunk false-claims or other smear campaigns against human rights defenders.",
                  type: "text",
                  version: 1,
                },
              ],
              direction: "ltr",
              format: "",
              indent: 0,
              type: "paragraph",
              version: 1,
            },
          ],
          direction: "ltr",
          format: "",
          indent: 0,
          type: "root",
          version: 1,
        },
      },
    },
    {
      icon: {
        url: "/api/media/file/screenshot-2025-07-21-at-20830-pm-1.png",
        alt: "Rapid Response icon",
      },
      title: "Rapid Response Briefing",
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
                  text: "This is a placeholder text that should be updated. Trustlab fact-checkers will help debunk false-claims or other smear campaigns against human rights defenders.",
                  type: "text",
                  version: 1,
                },
              ],
              direction: "ltr",
              format: "",
              indent: 0,
              type: "paragraph",
              version: 1,
            },
          ],
          direction: "ltr",
          format: "",
          indent: 0,
          type: "root",
          version: 1,
        },
      },
    },
    {
      icon: {
        url: "/api/media/file/screenshot-2025-07-21-at-20830-pm-1.png",
        alt: "Rapid Response icon",
      },
      title: "Rapid Response Briefing",
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
                  text: "This is a placeholder text that should be updated. Trustlab fact-checkers will help debunk false-claims or other smear campaigns against human rights defenders.",
                  type: "text",
                  version: 1,
                },
              ],
              direction: "ltr",
              format: "",
              indent: 0,
              type: "paragraph",
              version: 1,
            },
          ],
          direction: "ltr",
          format: "",
          indent: 0,
          type: "root",
          version: 1,
        },
      },
    },
  ],
};

describe("<RapidResponse />", () => {
  it("renders unchanged", () => {
    const { container } = render(<RapidResponse {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
