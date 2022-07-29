import { createRender } from "@commons-ui/testing-library";
import React from "react";

import AboutMembers from "./index.page";

import theme from "@/codeforafrica/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

jest.mock("next/router", () => ({
  useRouter: jest.fn().mockImplementation(() => ({
    isReady: true,
    push: jest.fn(),
    query: {},
  })),
}));

const defaultProps = {
  sections: [
    {
      slug: "hero",
      title: "About Us",
      subtitle:
        "We are Africa’s largest network of civic technology and data journalism labs",
      image: {
        src: "https://res.cloudinary.com/code-for-africa/image/upload/v1656064173/codeforafrica/images/1_IgrT4_1tGZh1WnpYzvZN1A_1_twneqf.jpg",
      },
    },
    {
      slug: "our-team",
      title: "Our team",
      team: {
        pagination: {},
        results: [],
      },
      pathname: "/about/members",
    },
    {
      slug: "get-in-touch",
      title: "Are you looking to start a new project?",
      subtitle: "We'd love to hear more.",
      action: {
        href: "/contact",
        label: "Get in touch",
      },
    },
  ],
};

describe("<Pages/About/Members />", () => {
  it("renders unchanged", () => {
    const { container } = render(<AboutMembers {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
