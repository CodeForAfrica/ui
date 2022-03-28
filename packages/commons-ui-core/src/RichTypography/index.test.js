import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import RichTypography from "./index";

describe("Button", () => {
  it("renders a richtypography", () => {
    render(<RichTypography />);
  });
});
