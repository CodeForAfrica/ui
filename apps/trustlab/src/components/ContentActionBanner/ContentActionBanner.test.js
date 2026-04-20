import { createRender } from "@commons-ui/testing-library";
import React from "react";

import ContentActionBanner from "./ContentActionBanner";

import theme from "@/trustlab/theme";

const render = createRender({ theme });

const mockContent = {
  root: {
    children: [
      {
        text: "Join our community today",
        type: "text",
      },
    ],
  },
};

describe("ContentActionBanner", () => {
  it("renders title text", () => {
    const { getByText } = render(<ContentActionBanner content={mockContent} />);
    expect(getByText("Join our community today")).toBeInTheDocument();
  });

  it("renders button with link when buttonLink is provided", () => {
    const { getByRole } = render(
      <ContentActionBanner
        content={mockContent}
        buttonLink={{
          href: "/contact",
          label: "Contact Us",
        }}
      />,
    );
    const button = getByRole("link", { name: "Contact Us" });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("href", "/contact");
  });

  it("renders default button label when label not provided", () => {
    const { getByRole } = render(
      <ContentActionBanner
        content={mockContent}
        buttonLink={{
          href: "/contact",
        }}
      />,
    );
    expect(getByRole("link", { name: "Learn More" })).toBeInTheDocument();
  });

  it("does not render button when buttonLink is not provided", () => {
    const { queryByRole } = render(
      <ContentActionBanner content={mockContent} />,
    );
    expect(queryByRole("link")).not.toBeInTheDocument();
  });

  it("does not render button when buttonLink.href is not provided", () => {
    const { queryByRole } = render(
      <ContentActionBanner
        content={mockContent}
        buttonLink={{ label: "Click me" }}
      />,
    );
    expect(queryByRole("link")).not.toBeInTheDocument();
  });

  it("applies button border color from buttonProps", () => {
    const { container } = render(
      <ContentActionBanner
        content={mockContent}
        buttonLink={{
          href: "/contact",
          label: "Contact Us",
        }}
        button={{
          borderColor: "#123456",
        }}
      />,
    );
    expect(container.querySelector("a")).toBeInTheDocument();
  });
});
