import { createRender } from "@commons-ui/testing-library";
import React from "react";

import Partners from "./Partners";

import theme from "@/charterafrica/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

const defaultProps = {
  slug: "partners",
  title: "Partners",
  consortium: {
    description:
      "A consortium of African and European organisations is supporting the implementation of the Fund. Each organisation brings in specific expertise to the initiative, ranging from grassroots digital activism, to civic technology development and data science, policy analysis and democracy support. The consortium can ensure a presence across the African continent and leverage existing networks and partnerships.",
    partners: [
      {
        name: "Code for Africa",
        logo: {
          src: "/images/codeforafrica.jpg",
        },
        link: {
          href: "https://codeforafrica.org",
        },
      },
      {
        name: "Africtivistes",
        logo: {
          src: "/images/africtivistes.jpg",
        },
        link: {
          href: "https://www.africtivistes.com",
        },
      },
      {
        name: "Democracy Works Foundation",
        logo: {
          src: "/images/dwf.jpg",
        },
        link: {
          href: "https://www.democracyworks.org.za",
        },
      },
      {
        name: "Goree Institute",
        logo: {
          src: "/images/goree.jpg",
        },
        link: {
          href: "https://goreeinstitut.org/",
        },
      },
      {
        name: "ECDPM",
        logo: {
          src: "/images/ecdpm.jpg",
        },
        link: {
          href: "https://ecdpm.org",
        },
      },
      {
        name: "EPD",
        logo: {
          src: "/images/epd.jpg",
        },
        link: {
          href: "https://epd.eu",
        },
      },
    ],
  },
  project: {
    description:
      "The Fund was first conceived in the context of the Charter Project Africa, a pan-African project focused on the commitments contained in the African Charter for Democracy, Elections and Governance (ACDEG). The project, implemented by the six organisations mentioned above, promotes the usage of civic technology to amplify citizen voices. It is co-funded by the European Union.",
    partners: [
      {
        name: "The Charter Project Africa",
        logo: {
          src: "/images/the-charter-project-africa_brandguide_guidedemarque-2-2.jpg",
        },
        link: {
          href: "https://codeforafrica.org",
        },
      },
      {
        name: "The European Union",
        logo: {
          src: "/images/eu.png",
        },
        link: {
          href: "https://europa.eu",
        },
      },
    ],
  },
  fund: {
    description:
      "The Fund further integrates the African Union Civic Tech Fund, hosted by the African Union. Both the Charter Project Africa and the African Union Civic Tech Fund share common goals and, in particular, both emphasise the use of civic technology to improve inclusive public decision-making and strengthen democratic governance throughout Africa. The African Union Civic Tech Fund is financially supported by the Deutsche Gesellschaft für Internationale Zusammenarbeit (GIZ), and managed by the European Partnership for Democracy.",
    partners: [
      {
        name: "African Union Civic Tech Fund",
        logo: {
          src: "/images/african-union-civic-tech-fund.jpg",
        },
        link: {
          href: "https://civictechfund.africa/auctf/",
        },
      },
      {
        name: "African Union",
        logo: {
          src: "/images/african-union.jpg",
        },
        link: {
          href: "https://au.int",
        },
      },
      {
        name: "GIZ",
        logo: {
          src: "/images/giz.jpg",
        },
        link: {
          href: "https://www.giz.de",
        },
      },
    ],
  },
};

describe("<Partners />", () => {
  it("renders unchanged", () => {
    const { container } = render(<Partners {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
