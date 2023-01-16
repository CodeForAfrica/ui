import { createRender } from "@commons-ui/testing-library";
import React from "react";

import Footer from "./Footer";

import theme from "@/charterafrica/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

const defaultProps = {
  contact: {
    email: {
      href: "mailto:info@charter.africa",
      content: "info@charter.africa",
    },
  },
  copyright: "© 2022 European Partnership for Democracy (CC BY-NC 2.0)",
  links: [
    {
      href: "/",
      content: "Privacy Policy",
    },
    {
      href: "/",
      content: "Imprint",
    },
  ],
  logo: {
    alt: "EU",
    src: "/images/eu.png",
  },
  projectDescription: {
    children: [{ text: "Website designed and built by Code for Africa" }],
  },
  siteDescription: {
    children: [
      {
        text: "This website was created and maintained with the financial support of the European Union. Its contents are the sole responsibility of the European Partnership for Democracy, Africtivistes, Code for Africa, ECPDM, and Goree Institute and do not necessarily reflect the views of the European Union.",
      },
    ],
  },
};

describe("<Footer />", () => {
  it("renders unchanged", () => {
    const { container } = render(<Footer {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
