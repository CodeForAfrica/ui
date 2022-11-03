import { createRender } from "@commons-ui/testing-library";
import React from "react";

import MeetOurTeam from "./MeetOurTeam";

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
  slug: "our-team",
  title: "title",
  description: "description",
  logo: "/images/Africa@2400x 1",
  href: "/about#our-team",
};

describe("<MeetOurTeam />", () => {
  it("renders unchanged", () => {
    const { container } = render(<MeetOurTeam {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
