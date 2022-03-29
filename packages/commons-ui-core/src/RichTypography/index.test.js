import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import RichTypography from ".";

describe("RichTypography", () => {
  it("renders a richtypography", () => {
    render(<RichTypography />);
  });
});
