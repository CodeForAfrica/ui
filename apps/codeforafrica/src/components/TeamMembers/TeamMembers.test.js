import { createRender } from "@commons-ui/testing-library";
import GhostContentAPI from "@tryghost/content-api";
import React from "react";

import TeamMembers from "./TeamMembers";

import { team } from "@/codeforafrica/lib";
import theme from "@/codeforafrica/theme";

jest.mock("@tryghost/content-api");

// before each clear GhostContentAPI.__mocks__
beforeEach(() => {
  GhostContentAPI.mockClear();
});
// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

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
