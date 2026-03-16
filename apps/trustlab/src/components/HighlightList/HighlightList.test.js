import { createRender } from "@commons-ui/testing-library";
import React from "react";

import HighlightList from "./HighlightList";

import theme from "@/trustlab/theme";

const render = createRender({ theme });

const richTextContent = [
  {
    type: "paragraph",
    children: [{ text: "This is a highlight item." }],
  },
];

const defaultProps = {
  title: "Highlights / Key Outcomes",
  items: [
    { id: "1", content: richTextContent },
    { id: "2", content: richTextContent },
    { id: "3", content: richTextContent },
  ],
};

describe("<HighlightList />", () => {
  it("renders unchanged", () => {
    const { container } = render(<HighlightList {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });

  it("renders with a single item", () => {
    const { container } = render(
      <HighlightList
        title="Highlights"
        items={[{ id: "1", content: richTextContent }]}
      />,
    );
    expect(container).toMatchSnapshot();
  });

  it("returns null when items are missing", () => {
    const { container } = render(
      <HighlightList title="Highlights" items={[]} />,
    );
    expect(container.firstChild).toBeNull();
  });
});
