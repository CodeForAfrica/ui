import { createRender } from "@commons-ui/testing-library";
import React from "react";

import EventsGrantsFellowshipsHeader from "./EventsGrantsFellowshipsHeader";

import theme from "@/charterafrica/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

const defaultProps = {
  title: "Grants and Fellowships",
};

describe("<EventsGrantsFellowshipsHeader />", () => {
  it("renders unchanged", () => {
    const { container } = render(
      <EventsGrantsFellowshipsHeader {...defaultProps} />
    );
    expect(container).toMatchSnapshot();
  });
});
