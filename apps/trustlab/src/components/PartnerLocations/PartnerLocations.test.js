import { createRender } from "@commons-ui/testing-library";
import React from "react";

import PartnerLocations from "./PartnerLocations";

import theme from "@/trustlab/theme";

const render = createRender({ theme });

const defaultProps = {
  blockType: "partner-locations",
  title: "Where we work",

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
              text: "We go where we are needed and work with partner organizations to protect and preserve wildlife in various parts of the world",
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

  locations: [
    {
      locationName: "Nairobi, Kenya",
      streetAddress: "Ngong Road, Prestige Plaza",
      country: "KE",

      location: [35, -2],
      id: "68889841a61987cea02b63b0",
    },
  ],
  id: "68889828a61987cea02b63ae",
};

describe("<Page />", () => {
  it("renders unchanged", () => {
    const { container } = render(<PartnerLocations {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
