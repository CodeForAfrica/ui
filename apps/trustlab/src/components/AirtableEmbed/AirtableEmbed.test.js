import { createRender } from "@commons-ui/testing-library";
import React from "react";

import AirtableEmbed from "./AirtableEmbed";

import theme from "@/trustlab/theme";

const render = createRender({ theme });

describe("<AirtableEmbed />", () => {
  it("renders an iframe embed", () => {
    const { container } = render(
      <AirtableEmbed
        embedCode='<iframe src="https://airtable.com/embed/form"></iframe>'
        title="Report"
      />,
    );

    const iframe = container.querySelector("iframe");
    expect(iframe).toHaveAttribute("src", "https://airtable.com/embed/form");
    expect(iframe).toHaveAttribute("title", "Report");
    expect(iframe).toHaveAttribute("referrerpolicy", "strict-origin");
    expect(iframe.getAttribute("sandbox")).not.toMatch(/allow-top-navigation/);
  });

  it("does not render embed code that isn't an https iframe", () => {
    const { container } = render(
      <AirtableEmbed embedCode='<img src="x" onerror="window.embedded = true">' />,
    );

    expect(container).toBeEmptyDOMElement();
  });
});
