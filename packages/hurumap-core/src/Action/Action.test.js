import { render } from "@commons-ui/testing-library";
import React from "react";

import Action from "./Action";

const defaultProps = {
  id: "1",
  title: "Action",
  icon: (
    <svg width="100" height="100">
      <circle
        cx="50"
        cy="50"
        r="40"
        stroke="black"
        strokeWidth="3"
        fill="red"
      />
    </svg>
  ),
  header: "Header",
  children: <div>Children</div>,
};

describe("Action", () => {
  it("renders unchanged", () => {
    const { container } = render(<Action {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
