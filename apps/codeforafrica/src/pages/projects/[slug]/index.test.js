import { createRender } from "@commons-ui/testing-library";
import React from "react";

import Index from "./index.page";

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
  project: {
    slug: "knowledge-africa",
    name: "knowledgeAFRICA",
    tagLine: "Knowledge tag line",
    title:
      'Empowering citizens through <span class="highlight">drone technology</span>',
    subtitle:
      "AfricanDRONE brings together communities of drone operators, enthusiasts, journalists, activists, and entrepreneurs in Africa who use drones for good.",
    description:
      "This award-winning initiative works to give citizens a new perspective on their lives. Using drone technology, africanDRONE empowers local pilots through a self-help network that offers seed funding, skills development, resource sharing, advocacy, and networking opportunities for members. The goal is to support the evolution of a vibrant and diverse drone ecosystem across Africa.",
    icon: {
      src: "https://res.cloudinary.com/code-for-africa/image/upload/v1652431402/codeforafrica/icons/Type_SourceAfrica_m7yvmt.svg",
    },
    thumbnail: {
      src: "https://res.cloudinary.com/code-for-africa/image/upload/v1652705959/codeforafrica/images/Property_1_PesaCheck_iahlrh.jpg",
    },
    tag: "Knowedge",
    href: "/projects/knowledge-africa",
    externalHref: "https://codeforafrica.org",
  },
  sections: [],
};

describe("<Pages/Projects/[Slug] />", () => {
  it("renders unchanged", () => {
    const { container } = render(<Index {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
