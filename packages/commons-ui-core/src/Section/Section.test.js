import { render } from "@testing-library/react";
import React from "react";

import Section from ".";

import { createTheme } from "@/commons-ui/core/styles";

const defaultProps = {
  theme: createTheme(),
  children: <div />,
};

describe("<Section />", () => {
  describe("prop fixed=true (default)", () => {
    it("renders unchanged", () => {
      const { container } = render(<Section {...defaultProps} />);
      expect(container).toMatchSnapshot();
    });
  });

  describe("prop fixed=false", () => {
    it("should act as normal <Container />", () => {
      const { container: firstContainer } = render(
        <Section {...defaultProps} fixed={false} />
      );
      const firstClassName = firstContainer.firstChild.className;
      expect(firstClassName.includes("maxWidthLg")).toBe(true);
      const { container: secondContainer } = render(
        <Section {...defaultProps} fixed={false} maxWidth={false} />
      );
      const secondClassName = secondContainer.firstChild.className;
      expect(secondClassName.includes("maxWidthLg")).toBe(false);
    });
  });
});
