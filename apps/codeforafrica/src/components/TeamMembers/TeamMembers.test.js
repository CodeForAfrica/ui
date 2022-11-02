import { createRender } from "@commons-ui/testing-library";
import React from "react";

import TeamMembers from "./TeamMembers";

import { team } from "@/codeforafrica/lib";
import theme from "@/codeforafrica/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

jest.mock("next/router", () => ({
  useRouter: jest.fn().mockImplementation(() => ({
    asPath: "",
    isReady: true,
  })),
}));

const defaultProps = {
  title: "Team",
  team: team.slice(0, 3),
};

describe("<TeamMembers />", () => {
  it("renders unchanged", () => {
    const { container } = render(<TeamMembers {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
