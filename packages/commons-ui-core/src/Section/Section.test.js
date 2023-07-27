import { createRender, screen } from "@commons-ui/testing-library";
import React from "react";

import Section from "./Section";

import { createTheme } from "@/commons-ui/core/styles";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme: createTheme() });

const defaultProps = {
  // Needs accessible name for role to be defined: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/section
  "aria-label": "section",
  children: <h2>Section heading</h2>,
  component: "section",
};

describe("<Section />", () => {
  describe("prop fixed=true (default)", () => {
    it("renders unchanged", () => {
      const { container } = render(<Section {...defaultProps} />);
      expect(container).toMatchSnapshot();
    });
  });

  describe("prop fixed=false", () => {
    it("should act as MUI <Container />", () => {
      const { rerender } = render(<Section {...defaultProps} fixed={false} />);
      expect(screen.getByRole("region")).toHaveClass("MuiContainer-maxWidthLg");
      rerender(<Section {...defaultProps} fixed={false} maxWidth={false} />);
      expect(screen.getByRole("region")).not.toHaveClass(
        "MuiContainer-maxWidthLg"
      );
    });
  });
});
