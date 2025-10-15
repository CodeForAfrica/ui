import { createRender } from "@commons-ui/testing-library";
import React from "react";

import AirtableEmbed from "./AirtableEmbed";

import theme from "@/trustlab/theme";

const render = createRender({ theme });

const embedCode =
  '<iframe class="airtable-embed" src="https://airtable.com/embed/apps7IekDLK2Z8PgZ/pagxXcTiuQ82MQnlX/form" frameborder="0" onmousewheel="" width="100%" height="533" style="background: transparent; border: 1px solid #ccc;"></iframe>';

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
      embedCode,
      embedButtonLabel: "View Rapid Response embed",
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
      embedCode,
      embedButtonLabel: "View Rapid Response embed",
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
      embedCode,
      embedButtonLabel: "View Rapid Response embed",
    },
  ],
};

describe("<AirtableEmbed />", () => {
  it("renders unchanged", () => {
    const { container } = render(<AirtableEmbed {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
