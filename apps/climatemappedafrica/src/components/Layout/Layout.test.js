import { createRender } from "@commons-ui/testing-library";
import React from "react";

import Layout from "./Layout";

import theme from "@/climatemappedafrica/theme";

const render = createRender({ theme });

const defaultProps = {
  footer: {
    connect: {
      title: "Stay in Touch",
      links: [
        {
          platform: "Facebook",
          url: "https://www.google.com",
          id: "67050ad20d400b5e511b2871",
        },
        {
          platform: "Twitter",
          url: "https://Twitter.com",
          id: "6706844a6339b76017e6c782",
        },
        {
          platform: "Github",
          url: "https://github.com",
          id: "670684516339b76017e6c783",
        },
        {
          platform: "Instagram",
          url: "https://instagram.com",
          id: "6706845b6339b76017e6c784",
        },
      ],
    },
    description: [
      {
        children: [
          {
            text: "ClimateMapped.AFRICA is a data-driven project aiming to shed light on the impact of climate change across the African continent, allowing users to see temperature trends and anomalies at both local and regional scales. The platform’s data highlights the cyclical impact of climate change on communities and landscapes.",
            children: null,
          },
        ],
      },
      {
        children: [
          {
            text: "",
            children: null,
          },
        ],
      },
      {
        children: [
          {
            text: "This site is a DataLab project by ",
            children: null,
          },
          {
            newTab: true,
            type: "link",
            url: "https://medium.com/code-for-africa?source=logo-lo_97638efa0bec---90668e7fcbdb",
            children: [
              {
                text: "Code for Africa",
                children: null,
              },
            ],
            href: "https://medium.com/code-for-africa?source=logo-lo_97638efa0bec---90668e7fcbdb",
          },
          {
            text: ". All content is released under a Creative Commons 4.0 Attribution license. You are free to reuse it to help empower your own communication.",
            children: null,
          },
        ],
      },
    ],
    logo: {
      alt: "ClimateMappedAfrica",
      height: 225,
      src: "http://localhost:3000/media/Asset 2@144x.png",
      width: 501,
    },
    links: {
      title: "Resources",
      links: [
        {
          label: "About",
          url: "/",
          href: "/about",
          id: "67063751048cfcc79c43a6f9",
        },
        {
          label: "Privacy Policy",
          linkType: "custom",
          url: "/",
          href: "/",
          id: "6706375d048cfcc79c43a6fa",
        },
      ],
    },
    newsletter: {
      title: "Subscribe to the Newsletters",
      embedCode:
        '<!-- Begin Mailchimp Signup Form -->\n\n<div id="mc_embed_signup">\n  <form action="https://twitter.us6.list-manage.com/subscribe/post?u=65e5825507b3cec760f272e79&amp;id=c2ff751541" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate" target="_blank" novalidate>\n      <div id="mc_embed_signup_scroll">\n    <label for="MERGE1">Name</label>\n    <input type="text" name="MERGE1" id="MERGE1" size="25" value="" placeholder="Your name">\n    <label for="mce-EMAIL">Email</label>\n    <input type="email" value="" placeholder="example@email.com" name="EMAIL" class="email" id="mce-EMAIL" required>\n   <!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups-->\n      <div style="position: absolute; left: -5000px;" aria-hidden="true"><input type="text" name="b_65e5825507b3cec760f272e79_c2ff751541" tabindex="-1" value=""></div>\n      <div class="clear"><input type="submit" value="Sign up"  id="mc-embedded-subscribe" class="button"></div>\n      </div>\n  </form>\n</div>\n\n<!--End mc_embed_signup-->',
    },
    title: "ClimateMappedAfrica",
    variant: "default",
  },
  menus: {
    drawerLogo: {
      alt: "ClimateMappedAfrica",
      height: 262.77,
      src: "http://localhost:3000/media/Coloured_IBMPlex (2).svg",
      width: 877.7,
    },
    explorePagePath: "explore",
    locations: [],
    logo: {
      alt: "ClimateMappedAfrica",
      height: 262.77,
      src: "http://localhost:3000/media/Coloured_IBMPlex (2).svg",
      width: 877.7,
    },
    menus: [
      {
        label: "Explore",
        linkType: "custom",
        url: "/explore",
        href: "/explore",
        id: "6708c791a8f01f7a15786713",
      },
      {
        label: "About",
        url: "/data",
        href: "/about",
        id: "6708c7a3a8f01f7a15786714",
      },
      {
        label: "Temperature Forecasting",
        linkType: "custom",
        url: "https://temperatureforecasterpy-jbrpheew5e5u3fmom3wsq4.streamlit.app/",
        href: "https://temperatureforecasterpy-jbrpheew5e5u3fmom3wsq4.streamlit.app/",
        id: "6708c7ada8f01f7a15786715",
      },
    ],
    socialLinks: [
      {
        platform: "Facebook",
        url: "https://www.google.com",
        id: "67050ad20d400b5e511b2871",
      },
    ],
    tutorialEnabled: true,
    variant: "default",
  },
  blocks: [],
};

describe("<Layout />", () => {
  it("renders unchanged", () => {
    const { container } = render(<Layout {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
