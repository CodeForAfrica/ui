import { createRender } from "@commons-ui/testing-library";
import React from "react";

import Facilitators from "./Facilitators";

import theme from "@/trustlab/theme";

const render = createRender({ theme });

const defaultProps = {
  content: [
    {
      type: "paragraph",
      children: [{ text: "Facilitators" }],
    },
  ],
  facilitators: [
    { id: "1", name: "Nahila Habade", avatar: null },
    { id: "2", name: "Monica Atieno", avatar: null },
    { id: "3", name: "Kimberly Michaels", avatar: null },
  ],
};

describe("<Facilitators />", () => {
  it("renders unchanged", () => {
    const { container } = render(<Facilitators {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });

  it("renders with avatar images", () => {
    const { container } = render(
      <Facilitators
        {...defaultProps}
        facilitators={[
          {
            id: "1",
            name: "Nahila Habade",
            avatar: { url: "https://example.com/avatar.jpg" },
          },
        ]}
      />,
    );
    expect(container).toMatchSnapshot();
  });

  it("returns null when both content and facilitators are missing", () => {
    const { container } = render(
      <Facilitators content={null} facilitators={[]} />,
    );
    expect(container.firstChild).toBeNull();
  });
});
