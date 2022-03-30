import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import RichTypography from ".";

describe("RichTypography", () => {
  it("renders a richtypography", () => {
    render(<RichTypography />);
  });

  it("Should return richtypography with html element", () => {
    const { container } = render(
      <RichTypography>
        <b>this is an example</b>
      </RichTypography>
    );
    const node = container.querySelector("b");
    expect(node).toBeTruthy();
  });
});
