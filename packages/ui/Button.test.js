import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import Button from "./Button";

describe("Button", () => {
  it("renders a button", () => {
    render(<Button />);
  });
});
