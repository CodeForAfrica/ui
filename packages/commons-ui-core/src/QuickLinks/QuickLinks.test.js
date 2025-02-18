import { render } from "@commons-ui/testing-library";
import React from "react";

import QuickLinks from "./QuickLinks";

describe("<QuickLinks />", () => {
  it("renders inchanged", () => {
    const { container } = render(
      <QuickLinks
        links={[
          {
            label: "Home",
            href: "/",
          },
          {
            label: "About",
            href: "/about",
          },
        ]}
        title="Quick Links"
      />,
    );
    expect(container).toMatchSnapshot();
  });
});
