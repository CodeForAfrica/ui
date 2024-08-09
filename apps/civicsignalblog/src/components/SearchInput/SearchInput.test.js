import { createRender } from "@commons-ui/testing-library";
import React from "react";

import SearchInput from "./SearchInput";

import theme from "@/civicsignalblog/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

describe("<SearchInput />", () => {
  it("renders unchanged", () => {
    const { container } = render(<SearchInput />);
    expect(container).toMatchSnapshot();
  });
});
