import { createRender } from "@commons-ui/testing-library";
import { screen } from "@testing-library/react";
import React from "react";

import Pagination from "./Pagination";

import theme from "@/trustlab/theme";

const render = createRender({ theme });

describe("<Pagination />", () => {
  it("renders pages", () => {
    const { container } = render(<Pagination page={2} count={5} />);
    expect(screen.getByRole("button", { name: "2" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "3" })).toBeInTheDocument();
    // expect to match snapshot
    expect(container).toMatchSnapshot();
  });
});
