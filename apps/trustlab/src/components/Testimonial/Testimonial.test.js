import { createRender } from "@commons-ui/testing-library";
import React from "react";

import Testimonial from "./Testimonial";

import theme from "@/trustlab/theme";

const render = createRender({ theme });

const mockDescription = {
  root: {
    children: [
      {
        text: "Participants reflected on how online harassment and impersonation disproportionately affect women and public-facing individuals.",

        type: "text",
      },
    ],
  },
};

describe("Testimonial", () => {
  it("renders nothing when no description and image provided", () => {
    const { container } = render(<Testimonial />);
    expect(container.firstChild).toBeNull();
  });

  it("renders title when provided", () => {
    const { getByText } = render(
      <Testimonial
        title="Testimonial/Participants Reflection"
        description={mockDescription}
        image={{
          height: 300,
          src: "/images/testimonial.png",
          width: 300,
        }}
      />,
    );
    expect(
      getByText("Testimonial/Participants Reflection"),
    ).toBeInTheDocument();
  });

  it("renders description text", () => {
    const { getByText } = render(
      <Testimonial
        description={mockDescription}
        image={{
          height: 300,
          src: "/images/testimonial.png",
          width: 300,
        }}
      />,
    );
    expect(
      getByText(/Participants reflected on how online harassment/),
    ).toBeInTheDocument();
  });

  it("renders image when provided", () => {
    const { getByAltText } = render(
      <Testimonial
        description={mockDescription}
        image={{
          alt: "Testimonial",
          height: 300,
          src: "/images/testimonial.png",
          width: 300,
        }}
      />,
    );
    expect(getByAltText("Testimonial")).toBeInTheDocument();
  });

  it("renders signature icon when provided", () => {
    const { getByAltText } = render(
      <Testimonial
        description={mockDescription}
        image={{
          height: 300,
          src: "/images/testimonial.png",
          width: 300,
        }}
        signatureIcon={{
          src: "/images/signature.png",
          alt: "Signature icon",
        }}
      />,
    );
    expect(getByAltText("Signature icon")).toBeInTheDocument();
  });

  it("uses default alt text for image when not provided", () => {
    const { getByAltText } = render(
      <Testimonial
        description={mockDescription}
        image={{
          height: 300,
          src: "/images/testimonial.png",
          width: 300,
        }}
      />,
    );
    expect(getByAltText("Testimonial illustration")).toBeInTheDocument();
  });

  it("uses default alt text for signature when not provided", () => {
    const { getByAltText } = render(
      <Testimonial
        description={mockDescription}
        image={{
          height: 300,
          src: "/images/testimonial.png",
          width: 300,
        }}
        signatureIcon={{
          src: "/images/signature.png",
        }}
      />,
    );
    expect(getByAltText("Signature")).toBeInTheDocument();
  });
});
