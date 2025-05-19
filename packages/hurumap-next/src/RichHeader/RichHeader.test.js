import { render } from "@commons-ui/testing-library";
import React from "react";

import RichHeader from ".";

const defaultProps = {
  overline: "About",
  title: [
    {
      children: [
        {
          text: "Project  ",
          children: null,
        },
        {
          text: "background",
          bold: true,
          children: null,
        },
        {
          text: " and team",
          children: null,
        },
      ],
    },
  ],
  subtitle: [
    {
      children: [
        {
          text: "Learn more about ",
          children: null,
        },
        {
          text: "the team",
          bold: true,
          children: null,
        },
        {
          text: " behind the project,",
          children: null,
        },
        {
          text: " the development stages",
          italic: true,
          children: null,
        },
        {
          text: " and how you can help improve ",
          children: null,
        },
        {
          children: [
            {
              text: "ClimateMap",
              children: null,
            },
          ],
          linkType: "custom",
          type: "link",
          url: "/",
          href: "/",
        },
        {
          text: ".",
          children: null,
        },
      ],
    },
  ],
};

describe("<RichHeader />", () => {
  it("renders unchanged", () => {
    const { container } = render(<RichHeader {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
