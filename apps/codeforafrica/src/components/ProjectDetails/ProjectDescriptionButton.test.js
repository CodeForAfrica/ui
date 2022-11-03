import { createRender } from "@commons-ui/testing-library";
import React from "react";

import ProjectDescriptionButton from "./ProjectDescriptionButton";

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
  content: "Github",
  href: "https://github.com/CodeForAfrica",
  slug: "github",
};

describe("<ProjectDescriptionButton />", () => {
  it("renders unchanged", () => {
    const { container } = render(
      <ProjectDescriptionButton {...defaultProps} />
    );
    expect(container).toMatchSnapshot();
  });
});
