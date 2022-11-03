import { render } from "@commons-ui/testing-library";
import React from "react";

import Link from "./Link";

jest.mock("next/router", () => ({
  useRouter: jest.fn().mockImplementation(() => ({
    asPath: "",
    isReady: true,
  })),
}));

describe("<Link />", () => {
  it("renders unchanged", () => {
    const { container } = render(<Link href="/">Home</Link>);
    expect(container).toMatchSnapshot();
  });
});
