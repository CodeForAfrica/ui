import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import Link from "./Link";

describe("Link", () => {
  it("renders a next/router Link", () => {
    render(<Link href="/" />);
  });
});
