import { createRender } from "@commons-ui/testing-library";
import React from "react";

import Testimonial from "./Testimonial";

import theme from "@/trustlab/theme";

const render = createRender({ theme });

const richTextContent = [
  {
    type: "paragraph",
    children: [
      {
        text: "Participants reflected on how online harassment and impersonation affect civic life.",
      },
    ],
  },
];

const defaultProps = {
  title: "Testimonial/Participants Reflection",
  content: richTextContent,
};

describe("<Testimonial />", () => {
  it("renders unchanged", () => {
    const { container } = render(<Testimonial {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });

  it("renders with logo", () => {
    const { container } = render(
      <Testimonial
        {...defaultProps}
        logo={{ url: "https://example.com/logo.png", alt: "Organisation Logo" }}
      />,
    );
    expect(container).toMatchSnapshot();
  });

  it("renders with logo and decorative image", () => {
    const { container } = render(
      <Testimonial
        {...defaultProps}
        logo={{ url: "https://example.com/logo.png", alt: "Organisation Logo" }}
        image={{ url: "https://example.com/circles.png", alt: "Decorative" }}
      />,
    );
    expect(container).toMatchSnapshot();
  });

  it("returns null when content is missing", () => {
    const { container } = render(<Testimonial title="Title" content={null} />);
    expect(container.firstChild).toBeNull();
  });
});
