import { createRender } from "@commons-ui/testing-library";
import React from "react";

import EventsFellowshipsGrantsHeader from "./EventsFellowshipsGrantsHeader";

import theme from "@/charterafrica/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

const defaultProps = {
  title: "Grants and Fellowships",
};

describe("<EventsFellowshipsGrantsHeader />", () => {
  it("renders unchanged", () => {
    const { container } = render(
      <EventsFellowshipsGrantsHeader {...defaultProps} />
    );
    expect(container).toMatchSnapshot();
  });
});
