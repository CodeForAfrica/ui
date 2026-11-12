import { createRender } from "@commons-ui/testing-library";
import React from "react";

import ActionBanner from "./ActionBanner";

import theme from "@/trustlab/theme";

const render = createRender({ theme });

const defaultProps = {
  button: { label: "Test Page" },
};

describe("<Page />", () => {
  it("renders unchanged", () => {
    const { container } = render(<ActionBanner {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });

  it("links to the button page when the embed code isn't an iframe", () => {
    const { getByRole } = render(
      <ActionBanner
        {...defaultProps}
        buttonLink={{ href: "/report", label: "Report" }}
        embedCode="<div>Not an iframe</div>"
      />,
    );

    expect(getByRole("link", { name: "Report" })).toHaveAttribute(
      "href",
      "/report",
    );
  });
});
