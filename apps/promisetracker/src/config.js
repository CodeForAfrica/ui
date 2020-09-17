import instagram from "@/promisetracker/assets/footer-social-ig.svg";
import facebook from "@/promisetracker/assets/footer-social-fb.svg";
import twitter from "@/promisetracker/assets/footer-social-tw.svg";
import linkedIn from "@/promisetracker/assets/footer-social-ln.svg";
import github from "@/promisetracker/assets/footer-social-gh.svg";
import cc from "@/promisetracker/assets/cc.svg";

import logo from "@/promisetracker/assets/logo-C4A.svg";

const config = {
  page: {
    about: {
      about:
        "PromiseTracker, is a tool to help journalists and civil society watchdogs more easily track campaign promises and other political / government pledges, using official evidence / data, as well as crowdsourced information, with a transparent and defensible methodology, to help inject accountability and honesty into the often cavalier way that promises are made to citizens to win their support for elections, policies and contracts but are seldom honoured. ",
      initiative:
        "This site is an openAFRICA project of Code for Africa. All content is released under a Creative Commons 4 Attribution Licence. Reuse it to help empower your own community. The code is available on GitHub and data is available on openAFRICA.",
    },
    organization_logo: {
      image: logo,
      link: "//codeforafrica.org",
      alt: "CodeforAfrica",
    },
    copyright: {
      copyright: "PROMISE TRACKER",
      copyright_logo: {
        image: cc,
        link: "#",
        alt: "PROMISE TRACKER",
      },
    },

    initiative_logo: {
      image:
        "https://dashboard.hurumap.org/wp-content/uploads/2020/05/pulitzer.png",
      link: "#",
      alt: "Pulitzer Center",
    },
    quick_links: [
      {
        title: "About Us",
        links: [
          {
            label: "The project",
            href: "/about/project",
          },
          {
            label: "The team",
            href: "/about/team",
          },
          {
            label: "The partners",
            href: "/about/partners",
          },
          {
            label: "Methodology",
            href: "/methodology",
          },
        ],
      },
      {
        title: "More",
        links: [
          {
            label: "Subscribe",
            href: "/subscribe",
          },
          {
            label: "Join Us",
            href: "/join",
          },
          {
            label: "FAQ",
            href: "/join",
          },
          {
            label: "Resources",
            href: "/join",
          },
        ],
      },
    ],
    legal_links: [
      {
        label: "PRIVACY POLICY",
        href: "/legal/privacy",
      },
      {
        label: "TERMS OF SERVICE",
        href: "/legal/terms",
      },
    ],
    contacts: {
      socialMedia: [
        {
          url: "https://github.com/codeforafrica",
          image: {
            url: instagram,
            alt: "",
          },
        },
        {
          url: "https://www.linkedin.com/company/code-for-africa/",
          image: {
            url: linkedIn,
            alt: "",
          },
        },
        {
          url:
            "https://twitter.com/Code4Africa?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor",
          image: {
            url: twitter,
            alt: "",
          },
        },
        {
          url: "https://www.facebook.com/CodeForAfrica/",
          image: {
            url: facebook,
            alt: "",
          },
        },
        {
          url: "https://github.com/codeforafrica",
          image: {
            url: github,
            alt: "",
          },
        },
      ],
    },
  },
};

export default config;
