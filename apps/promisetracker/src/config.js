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
      copyrightLogo: {
        image: { url: cc },
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
            href: "/faq",
          },
          {
            label: "Resources",
            href: "/analysis/resources",
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
  analysisMenu: {
    subnav: [
      {
        name: "Articles",
        href: "/analysis/articles",
      },
      {
        name: "Resources",
        href: "/analysis/resources",
      },
      {
        name: "Fact-checks",
        href: "/analysis/fact-checks",
      },
    ],
    title: "Analysis",
    url: "/analysis",
  },
};

export default config;
