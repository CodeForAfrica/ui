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
  it("renders nothing when no description provided", () => {
    const { container } = render(<Testimonial />);
    expect(container.firstChild).toBeNull();
  });

  it("renders testimonial when description is provided", () => {
    const { getByTestId } = render(
      <Testimonial description={mockDescription} />,
    );
    expect(getByTestId("testimonial")).toBeInTheDocument();
  });

  it("renders title when provided", () => {
    const { getByText } = render(
      <Testimonial
        title="Testimonial/Participants Reflection"
        description={mockDescription}
      />,
    );
    expect(
      getByText("Testimonial/Participants Reflection"),
    ).toBeInTheDocument();
  });

  it("renders description text", () => {
    const { getByText } = render(<Testimonial description={mockDescription} />);
    expect(
      getByText(/Participants reflected on how online harassment/),
    ).toBeInTheDocument();
  });

  it("renders image when provided", () => {
    const { getByAltText } = render(
      <Testimonial
        description={mockDescription}
        image={{
          src: "/images/testimonial.png",
          alt: "Testimonial illustration",
        }}
      />,
    );
    expect(getByAltText("Testimonial illustration")).toBeInTheDocument();
  });

  it("renders signature icon when provided", () => {
    const { getByAltText } = render(
      <Testimonial
        description={mockDescription}
        signatureIcon={{
          src: "/images/signature.png",
          alt: "Siasa Place Logo",
        }}
      />,
    );
    expect(getByAltText("Siasa Place Logo")).toBeInTheDocument();
  });

  it("uses default alt text for image when not provided", () => {
    const { getByAltText } = render(
      <Testimonial
        description={mockDescription}
        image={{
          src: "/images/testimonial.png",
        }}
      />,
    );
    expect(getByAltText("Testimonial illustration")).toBeInTheDocument();
  });

  it("uses default alt text for signature when not provided", () => {
    const { getByAltText } = render(
      <Testimonial
        description={mockDescription}
        signatureIcon={{
          src: "/images/signature.png",
        }}
      />,
    );
    expect(getByAltText("Signature")).toBeInTheDocument();
  });

  it("applies custom sx prop", () => {
    const { getByTestId } = render(
      <Testimonial
        description={mockDescription}
        sx={{ backgroundColor: "red" }}
      />,
    );
    expect(getByTestId("testimonial")).toHaveStyle({ backgroundColor: "red" });
  });
});
