import cc from "@/promisetracker/assets/cc.svg?url";
import facebook from "@/promisetracker/assets/footer-social-fb.svg?url";
import github from "@/promisetracker/assets/footer-social-gh.svg?url";
import instagram from "@/promisetracker/assets/footer-social-ig.svg?url";
import linkedIn from "@/promisetracker/assets/footer-social-ln.svg?url";
import twitter from "@/promisetracker/assets/footer-social-tw.svg?url";
import aboutProject from "@/promisetracker/assets/illo-aboutTheProject@2400x.png";
import aboutMethodology from "@/promisetracker/assets/illo-method@2400x.png";
import aboutPartners from "@/promisetracker/assets/illo-partners@2400x.png";
import logo from "@/promisetracker/assets/logo-C4A.svg?url";

const config = {
  MAPIT_URL: "https://mapit.hurumap.org",
  LANGUAGE_BY_LOCALE: { ar: "عربى" },
  I18N_LOCALES: ["en"],
  I18N_DEFAULT_LOCALE: "en",
  GRAPHQL_URI: "https://check-api.checkmedia.org/api/graphql",
  CHECK_ASSET_URI: "https://assets.checkmedia.org/uploads/dynamic",
  PROXY_URL: "https://corsanywhere.devops.codeforafrica.org",
  CHECK_PROJECT_DB_ID: 2831,
  CHECK_PROMISE_MAX_COUNT: 150,
  CKAN_BACKEND_URL: "https://openafrica.net",
  WP_DASHBOARD_URL: "https://dashboard.hurumap.org/promisetracker",
  FACT_CHECKS_URL: "https://pesacheck.org",
  FACT_CHECKS_TAG: "promise-tracker",
  ACTNOW_URL: "https://actnow.dev.codeforafrica.org",
  title: "PromiseTracker",
  name: "Promise Tracker",
  URL: "https://promisetracker.dev.codeforafrica.org",
  DATE_OPTIONS: {
    day: "numeric",
    month: "long",
    year: "numeric",
  },
  // Should be given in seconds
  CACHE_TIMEOUT: 5 * 60, // 5 minutes
  filterStatusItems: [
    {
      name: "Completed",
      slug: "completed",
    },

    {
      name: "In Progress",
      slug: "in-progress",
    },
    {
      name: "Stalled",
      slug: "stalled",
    },
    {
      name: "Behind Schedule",
      slug: "behind-schedule",
    },
    {
      name: "Inconclusive",
      slug: "inconclusive",
    },
    {
      name: "Unstarted",
      slug: "unstarted",
    },
  ],

  filterCategoryItems: [
    {
      name: "100 Days",
      slug: "100-days",
    },
    {
      name: "Environment and Sanitation",
      slug: "environment-and-sanitation",
    },
    {
      name: "Governance",
      slug: "governance",
    },
    {
      name: "Health",
      slug: "health",
    },
    {
      name: "Housing",
      slug: "housing",
    },
    {
      name: "Jobs and Business Creation",
      slug: "jobs-and-business-creation",
    },
    {
      name: "Traffic Management",
      slug: "traffic-management",
    },
    {
      name: "transport",
      slug: "transport",
    },
    {
      name: "Women,Youth and People With Disabilities",
      slug: "women-youth-and-people-with-disabilities",
    },
  ],
  sortByMostRecent: {
    name: "Most Recent",
    slug: "most-recent",
  },
  sortByDeadline: {
    name: "Promise Deadline",
    slug: "promise-deadline",
  },
  settings: {
    subscribe: {
      embedCode: `
        <!-- Begin Mailchimp Signup Form -->
        <link href="//cdn-images.mailchimp.com/embedcode/slim-10_7.css" rel="stylesheet" type="text/css">
        <style type="text/css">
          #mc_embed_signup{background:#fff; clear:left; font:14px Helvetica,Arial,sans-serif; }
        </style>
        <div id="mc_embed_signup">
        <form action="https://codeforafrica.us6.list-manage.com/subscribe/post?u=65e5825507b3cec760f272e79&amp;id=286e6e3985" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate" target="_blank" novalidate>
            <div id="mc_embed_signup_scroll">
          <label for="mce-EMAIL">Subscribe</label>
          <input type="email" value="" name="EMAIL" class="email" id="mce-EMAIL" placeholder="Enter your email address" required>
            <!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups-->
            <div style="position: relative; left: -5000px;" aria-hidden="true"><input type="text" name="b_65e5825507b3cec760f272e79_286e6e3985" tabindex="-1" value=""></div>
            <div class="clear"><input type="submit" value="" name="subscribe" id="mc-embedded-subscribe" class="button"></div>
            </div>
        </form>
        </div>
        <!--End mc_embed_signup-->
      `,
    },
  },
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
      children: "PROMISETRACKER",
      src: cc,
      alt: "Copyright",
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
            href: "/about/methodology",
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
            href: "/resources",
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
    social_media: [
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
        url: "https://twitter.com/Code4Africa?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor",
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
  promiseInterval: [2017, 2022],
  pages: {
    about: {
      pages: {
        project: {
          content: `
            <p>Engaging with governments needs data, to this end, this project not only develops a promise tracker but also showcases this information on an easy-to-understand platform, making the PromiseTracker a contributor to public discourse around service delivery by elected officials. This leads to a more robust dialogue and positive engagement with the elected officials or government bodies around this subject.
            <p>The PromiseTracker initial focus will be on Nairobi tracking progress on Governor Mike Sonko’s seven-point plan to improve the city in the first 100 days of his term and 5 year plan. The tracker will also focus on other county governors whose plans are elaborated in their manifestos, such as Makueni, Mombasa, Kisumu, Nakuru, Kitui and Nandi. While the promises made by the national government have been covered extensively, promises made by the governors have received less coverage, resulting in limited analysis around whether they are actually viable.
          `,
          description:
            "The promise tracker is a platform-based promise tracker where citizens can track various promises and services promised by governors, institutions, political parties in their manifestos during the campaigns leading up to the elections and in the post election period.",
          featuredImage: aboutProject,
          title: "The Project",
        },
        team: {
          content: `
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          `,
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.",
          title: "The Team",
        },
        partners: {
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.",
          featuredImage: aboutPartners,
          title: "The Partners",
        },
        methodology: {
          content: `
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          `,
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.",
          featuredImage: aboutMethodology,
          title: "Methodology",
        },
      },
    },
  },
  site: {
    header: {
      navigation: {
        promises: {
          href: "/promises",
          order: 0,
          title: "Promises",
        },
        analysis: {
          title: "Analysis",
          order: 1,
          navigation: {
            articles: {
              href: "/analysis/articles",
              order: 0,
              title: "Articles",
            },
            petitions: {
              href: "/analysis/petitions",
              order: 1,
              title: "Petitions",
            },
            resources: {
              href: "/analysis/resources",
              order: 2,
              title: "Resources",
            },
            factChecks: {
              href: "/analysis/fact-checks",
              order: 3,
              title: "Fact-Checks",
            },
          },
        },
        actNow: {
          href: "/act-now",
          order: 2,
          title: "Act Now",
        },
      },
    },
    footer: {
      navigation: {},
    },
  },
};

export default config;
