import { createRender } from "@commons-ui/testing-library";
import React from "react";

import OurMission from "./OurMission";

import theme from "@/codeforafrica/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });
const defaultProps = {
  title: "Our mission",
  subtitle: "Our mission subtitle",
  description: [
    {
      children: [
        {
          text: "CfA builds digital democracy solutions that give citizens unfettered access to actionable information that empowers them to make informed decisions, which strengthens civic engagement for improved public governance and accountability. This includes building infrastructures like the continent’s largest open data portals at ",
          children: null,
        },
        {
          type: "link",
          newTab: false,
          url: "https://openafrica.net/",
          children: [
            {
              text: "openAFRICA",
              children: null,
            },
          ],
          href: "https://openafrica.net/",
        },
        {
          text: " and ",
          children: null,
        },
        {
          type: "link",
          newTab: false,
          url: "https://sourceafrica.net/",
          children: [
            {
              text: "sourceAFRICA",
              children: null,
            },
          ],
          href: "https://sourceafrica.net/",
        },
        {
          text: ". CfA incubates initiatives as diverse as the ",
          children: null,
        },
        {
          type: "link",
          newTab: false,
          url: "https://africandrone.org/",
          children: [
            {
              text: "africanDRONE",
              children: null,
            },
          ],
          href: "https://africandrone.org/",
        },
        {
          text: " network, the ",
          children: null,
        },
        {
          type: "link",
          newTab: false,
          url: "https://pesacheck.org/",
          children: [
            {
              text: "PesaCheck",
              children: null,
            },
          ],
          href: "https://pesacheck.org/",
        },
        {
          text: " fact-checking initiative and the ",
          children: null,
        },
        {
          type: "link",
          newTab: false,
          url: "https://sensors.africa/",
          children: [
            {
              text: "sensors.AFRICA",
              children: null,
            },
          ],
          href: "https://sensors.africa/",
        },
        {
          text: " air quality sensor network.",
          children: null,
        },
      ],
    },
    {
      children: [
        {
          text: "CfA manages the ",
          children: null,
        },
        {
          type: "link",
          newTab: false,
          url: "https://investigate.africa/",
          children: [
            {
              text: "African Network of Centres for Investigative Reporting",
              children: null,
            },
          ],
          href: "https://investigate.africa/",
        },
        {
          text: " (ANCIR), which gives the continent’s top muckraking newsrooms the best possible ",
          children: null,
        },
        {
          type: "link",
          newTab: false,
          url: "https://data.investigate.africa/",
          children: [
            {
              text: "forensic data tools",
              children: null,
            },
          ],
          href: "https://data.investigate.africa/",
        },
        {
          text: ", ",
          children: null,
        },
        {
          type: "link",
          newTab: false,
          url: "https://getoutline.org/",
          children: [
            {
              text: "digital security",
              children: null,
            },
          ],
          href: "https://getoutline.org/",
        },
        {
          text: " and ",
          children: null,
        },
        {
          type: "link",
          newTab: false,
          url: "https://afrileaks.org/",
          children: [
            {
              text: "whistleblower encryption",
              children: null,
            },
          ],
          href: "https://afrileaks.org/",
        },
        {
          text: " to help improve their ability to tackle crooked politicians, organised crime and predatory big business. CfA runs ",
          children: null,
        },
        {
          type: "link",
          newTab: false,
          url: "https://academy.africa/",
          children: [
            {
              text: "academy.AFRICA",
              children: null,
            },
          ],
          href: "https://academy.africa/",
        },
        {
          text: ", one of the continent’s largest ",
          children: null,
        },
        {
          type: "link",
          newTab: false,
          url: "https://courses.academy.africa/",
          children: [
            {
              text: "skills development",
              children: null,
            },
          ],
          href: "https://courses.academy.africa/",
        },
        {
          text: " initiatives for digital journalists, and seed funds cross-border collaboration. CfA’s research and analysis programme ",
          children: null,
        },
        {
          type: "link",
          newTab: false,
          url: "https://civicsignal.africa/#/home",
          children: [
            {
              text: "CivicSignal",
              children: null,
            },
          ],
          href: "https://civicsignal.africa/#/home",
        },
        {
          text: " offers actionable insights to help navigate Africa’s media ecosystem and emerging civic technology sector using machine learning tools and ‘big data’ resources.",
          children: null,
        },
      ],
    },
    {
      children: [
        {
          text: "CfA is non-partisan and does not support or oppose any political party or candidate. We do not undertake any advocacy work either for ourselves or on behalf of others.",
          children: null,
        },
      ],
    },
    {
      children: [
        {
          text: "CfA is registered as a non-profit organisation in South Africa, registration number 168–092, and in Kenya with registration number CPR/2016/220101.",
          children: null,
        },
      ],
    },
    {
      children: [
        {
          text: "Partnering for excellence",
          bold: true,
          children: null,
        },
      ],
    },
    {
      children: [
        {
          text: "Collaborations and partnerships are at the heart of our work. To build digital democracies, we partner with organisations aligned with CfA values, acting as a catalyst for new initiatives and strengthening the local ecosystem by investing in and working through these partnerships.",
          children: null,
        },
      ],
    },
    {
      children: [
        {
          text: "Guiding Principles",
          bold: true,
          children: null,
        },
      ],
    },
    {
      children: [
        {
          text: "CfA shares a covenant with the rest of the ",
          children: null,
        },
        {
          type: "link",
          newTab: false,
          url: "https://codeforall.org/",
          children: [
            {
              text: "Code for All",
              children: null,
            },
          ],
          href: "https://codeforall.org/",
        },
        {
          text: " federation, based on the following guiding principles:",
          children: null,
        },
      ],
    },
    {
      type: "ol",
      children: [
        {
          type: "li",
          children: [
            {
              text: "We show what’s possible. CfA seeks to be a catalyst by lowering the political risk of experimentation through creating successful proofs of concept for liberating civic data, for building enabling technologies and for pioneering sustainable revenue models. The organisation also endeavours to lower the financial costs for technology experimentation by creating and managing ‘shared’ backbone civic technology, and availing resources for rapid innovation.",
              children: null,
            },
          ],
        },
        {
          type: "li",
          children: [
            {
              text: "We empower citizens. Empowering citizens is central to CfA’s theory of change. Strong democracies rely on engaged citizens who have actionable information and easy-to-use channels for making their will known. CfA works primarily with citizen organisations and civic watchdogs, including the media and also supports government and social enterprises in developing their capacity to respond meaningfully to citizens and to collaborate effectively with them.",
              children: null,
            },
          ],
        },
        {
          type: "li",
          children: [
            {
              text: "We are action-oriented. African societies are asymmetric: the balance of power rests with governments and corporate institutions, at the expense of citizens who are treated as passive recipients of consultation or services. CfA seeks to change this by focusing on actionable data and action-oriented tools that give agency to citizens.",
              children: null,
            },
          ],
        },
        {
          type: "li",
          children: [
            {
              text: "We operate in public. CfA promotes openness in our operations and in the work of our partners. All digital tools utilised are open source, and the organisation’s information is open data. CfA actively encourages documentation, sharing and collaboration, in addition to reuse of our own tools, programmes and processes, as well as those of our partners.",
              children: null,
            },
          ],
        },
        {
          type: "li",
          children: [
            {
              text: "We help build ecosystems. CfA actively marshals resources to support the growth of a pan-African ecosystem of civic technologists. Whenever possible, this means reusing existing tools, standards and platforms, encouraging integration and extension. CfA operates as a pan-African federation of organisations who are active members of a global community, leveraging each other’s knowledge and resources.",
              children: null,
            },
          ],
        },
      ],
    },
  ],
};

describe("<OurMission />", () => {
  it("renders unchanged", () => {
    const { container } = render(<OurMission {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
