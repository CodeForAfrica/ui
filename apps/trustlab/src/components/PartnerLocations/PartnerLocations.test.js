import { createRender } from "@commons-ui/testing-library";
import React from "react";

import PartnerLocations from "./PartnerLocations";

import theme from "@/trustlab/theme";

const render = createRender({ theme });

describe("<PartnerLocations />", () => {
  it("renders unchanged", () => {
    const { container } = render(
      <PartnerLocations
        title="Partner Locations"
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
                    text: "This is a placeholder text that should be updated.",
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
        image={{
          alt: "Map of partner locations",
          url: "/api/media/file/screenshot-2025-07-21-at-20830-pm-1.png",
        }}
      />,
    );
    expect(container).toMatchSnapshot();
  });
});
