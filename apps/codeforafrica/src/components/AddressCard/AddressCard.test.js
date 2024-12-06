import { createRender } from "@commons-ui/testing-library";
import React from "react";

import AddressCard from "./AddressCard";

import theme from "@/codeforafrica/theme";

const render = createRender({ theme });

describe("<AddressCard />", () => {
  it("renders unchanged", () => {
    const { container } = render(<AddressCard />);
    expect(container).toMatchSnapshot();
  });
});
