import { createRender } from "@commons-ui/testing-library";
import React from "react";

import Project from "./Project";

import theme from "@/codeforafrica/theme";

const render = createRender({ theme });

const defaultProps = {
  relatedProjects: {},
  slug: "knowledge-africa",
  name: "knowledgeAFRICA",
  tagLine: "Knowledge tag line",
  title: [
    {
      text: 'Empowering citizens through <span class="highlight">drone technology</span>',
    },
  ],
  subtitle: [
    {
      text: "AfricanDRONE brings together communities of drone operators, enthusiasts, journalists, activists, and entrepreneurs in Africa who use drones for good.",
    },
  ],
  description: [
    {
      text: "This award-winning initiative works to give citizens a new perspective on their lives. Using drone technology, africanDRONE empowers local pilots through a self-help network that offers seed funding, skills development, resource sharing, advocacy, and networking opportunities for members. The goal is to support the evolution of a vibrant and diverse drone ecosystem across Africa.",
    },
  ],
  icon: {
    alt: "knowledgeAFRICA",
    src: "https://res.cloudinary.com/code-for-africa/image/upload/v1652431402/codeforafrica/icons/Type_SourceAfrica_m7yvmt.svg",
  },
  thumbnail: {
    alt: "knowledgeAFRICA",
    src: "https://res.cloudinary.com/code-for-africa/image/upload/v1652705959/codeforafrica/images/Property_1_PesaCheck_iahlrh.jpg",
  },
  tag: "Knowedge",
  link: { href: "/projects/knowledge-africa" },
  externalLink: { href: "https://codeforafrica.org" },
};

describe("<Project />", () => {
  it("renders unchanged", () => {
    const { container } = render(<Project {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
