import articlesQLFn from "@/promisetracker/lib/jsonql/articles";
import factChecksQLFn from "@/promisetracker/lib/jsonql/factChecks";
import promisesQLFn from "@/promisetracker/lib/jsonql/promises";
import { formatDate } from "@/promisetracker/utils";

const DEFAULT_SITE = {
  slug: "sonko",
  entity: {
    id: "TMVMoe96qbi",
    name: "Mike Mbuvi",
    fullName: 'Mike "Sonko" Mbuvi',
    preferredName: "Mike Sonko",
    image:
      "https://res.cloudinary.com/code-for-africa/image/upload/v1631168164/pt/sonko/hero-sonko_2x_hxfqck.jpg",
    title: "Nairobi Governor",
  },
  lastUpdated: "2021-08-18",
  actNowEnabled: true,
  articlesEnabled: true,
  factChecksEnabled: true,
  resourcesEnabled: false,
  categories: [
    {
      name: "Road",
      description: "",
      title: "Road",
      slug: "road",
    },
    {
      name: "Housing",
      description: "",
      title: "Housing",
      slug: "housing",
    },
    {
      name: "Budgets",
      description: "",
      title: "Budgets",
      slug: "budgets",
    },
    {
      name: "Employment",
      description: "",
      title: "Employment",
      slug: "employment",
    },
  ],
  navigation: {
    promises: {
      href: "/promises",
      order: 0,
      title: "Promises",
    },
    analysis: {
      title: "Analysis",
      order: 1,
      navigation: [
        {
          href: "/analysis/articles",
          order: 0,
          title: "Articles",
        },
        {
          href: "/analysis/petitions",
          order: 1,
          title: "Petitions",
        },
        {
          href: "/analysis/fact-checks",
          order: 3,
          title: "Fact-Checks",
        },
      ],
    },
    actNow: {
      href: "/act-now",
      order: 2,
      title: "Act Now",
    },
  },
  statuses: [
    {
      ordinal: "0",
      name: "Unstarted",
      description:
        "Every promise begins at this level and retains this rating until evidence of progress or proof that it has been shelved.",
      color: "#EBEBEB",
      textColor: "#202020",
      title: "Unstarted",
      slug: "unstarted",
    },
    {
      ordinal: "1",
      name: "Stalled",
      description:
        "Could occur due to inaction by administration or lack of support from legislative branch.",
      color: "#FF5255",
      textColor: "#ffffff",
      title: "Stalled",
      slug: "stalled",
    },
    {
      ordinal: "2",
      name: "Behind Schedule",
      description:
        "No progress, perhaps due to financial limitations, opposition from lawmakers or a change in priorities.",
      color: "#FFB322",
      textColor: "#202020",
      title: "Behind Schedule",
      slug: "behind-schedule",
    },
    {
      ordinal: "3",
      name: "In Progress",
      description: "The promise is in the works or being considered.",
      color: "#90DAFF",
      textColor: "#202020",
      title: "In Progress",
      slug: "in-progress",
    },
    {
      ordinal: "4",
      name: "Inconclusive",
      description:
        "The promise is accomplished only in part, but has succeeded at least in part consistently with the goal of the promise.",
      color: "#909090",
      textColor: "#ffffff",
      title: "Inconclusive",
      slug: "inconclusive",
    },
    {
      ordinal: "5",
      name: "Completed",
      description: "The promise is mostly or completely fulfilled.",
      color: "#005DFD",
      textColor: "#ffffff",
      title: "Completed",
      slug: "completed",
    },
  ],
};

const DEFAULT_ARTICLES = [
  {
    id: "kzdw46hebuqznkvaoa8",
    site: "sonko",
    date: "2020-12-01",
    title: "Codification of national sports and athletics law 4",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer euismod odio non leo pretium pellentesque. Curabitur blandit urna cursus, malesuada erat ut, egestas odio. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer euismod odio non leo pretium pellentesque. Curabitur blandit urna cursus, malesuada erat ut, egestas odio.",
    link: "https://promisetracker.dev.codeforafrica.org/analysis/articles/codification-of-national-sports-and-athletics-law-1-2",
    photo:
      "https://res.cloudinary.com/code-for-africa/image/upload/v1631788382/pt/sonko/articlepage-img_y58bgg.png",
    categories: [],
    image:
      "https://res.cloudinary.com/code-for-africa/image/upload/v1631788382/pt/sonko/articlepage-img_y58bgg.png",
  },
];
const DEFAULT_FACT_CHECKS = [
  {
    site: "sonko",
    date: "2019-02-04",
    title:
      "Are Governor Mike Sonko’s Plans to Decongest Nairobi doomed to fail?",
    description:
      "More than a year since Nairobi Governor Mike Sonko promised to move hawkers out of the city, what progress has been made?",
    link: "https://pesacheck.org/are-governor-mike-sonkos-plans-to-decongest-nairobi-doomed-to-fail-ba1c5a59fc43",
    photo:
      "https://cdn-images-1.medium.com/max/480/1*2CGe8Lqkvh6JyE7Z94wBgw.jpeg",
    image:
      "https://cdn-images-1.medium.com/max/480/1*2CGe8Lqkvh6JyE7Z94wBgw.jpeg",
  },
  {
    site: "sonko",
    date: "2019-02-04",
    title:
      "Are Governor Mike Sonko’s Plans to Decongest Nairobi doomed to fail?",
    description:
      "More than a year since Nairobi Governor Mike Sonko promised to move hawkers out of the city, what progress has been made?",
    link: "https://pesacheck.org/are-governor-mike-sonkos-plans-to-decongest-nairobi-doomed-to-fail-ba1c5a59fc43",
    photo:
      "https://cdn-images-1.medium.com/max/480/1*2CGe8Lqkvh6JyE7Z94wBgw.jpeg",
    image:
      "https://cdn-images-1.medium.com/max/480/1*2CGe8Lqkvh6JyE7Z94wBgw.jpeg",
  },
];

const DEFAULT_PROMISES = [
  {
    id: "r9FXYaayMEg",
    title: "Codification of national sports and athletics law",
    image:
      "http://dashboard.hurumap.org/promisetracker/wp-content/uploads/sites/2/2021/08/adeboro-odunlami-bJgTryACMF0-unsplash.jpg",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer euismod odio non leo pretium pellentesque. Curabitur blandit urna cursus, malesuada erat ut, egestas odio. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer euismod odio non leo pretium pellentesque. Curabitur blandit urna cursus, malesuada erat ut, egestas odio.\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Integer euismod odio non leo pretium pellentesque. Curabitur blandit urna cursus, malesuada erat ut, egestas odio. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer euismod odio non leo pretium pellentesque. Curabitur blandit urna cursus, malesuada erat ut, egestas odio.",
    isKey: true,
    status: {
      ordinal: "2",
      name: "Behind Schedule",
      description:
        "No progress, perhaps due to financial limitations, opposition from lawmakers or a change in priorities.",
      color: "#FFB322",
      textColor: "#202020",
      title: "Behind Schedule",
      slug: "behind-schedule",
      date: "2020-11-27",
    },
    location: [-1.286389, 36.817223],
    promiseDeadline: "2022-01-27",
    categories: [
      {
        name: "Road",
        description: "",
        title: "Road",
        slug: "road",
      },
      {
        name: "Road",
        description: "",
        title: "Road",
        slug: "road",
      },
    ],
    date: "2020-11-27",
    events: [
      {
        name: "Event A",
        date: "2019-01-07",
      },
    ],
    slug: "codification-of-national-sports-and-athletics-law",
    statusHistory: [
      {
        ordinal: "2",
        name: "Behind Schedule",
        description:
          "No progress, perhaps due to financial limitations, opposition from lawmakers or a change in priorities.",
        color: "#FFB322",
        textColor: "#202020",
        title: "Behind Schedule",
        slug: "behind-schedule",
        date: "2020-11-27",
      },
    ],
  },
  {
    id: "i6TQcwQkk73",
    title: "Codification of national sports and athletics law 2",
    image:
      "http://dashboard.hurumap.org/promisetracker/wp-content/uploads/sites/2/2021/08/ayanfe-olarinde-5dhRUwGHMzM-unsplash.jpg",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer euismod odio non leo pretium pellentesque.",
    isKey: true,
    status: {
      ordinal: "3",
      name: "In Progress",
      description: "The promise is in the works or being considered.",
      color: "#90DAFF",
      textColor: "#202020",
      title: "In Progress",
      slug: "in-progress",
      date: "2020-10-02",
    },
    location: [-1.286389, 36.817224],
    promiseDeadline: "2022-01-28",
    categories: [],
    date: "2020-10-02",
    events: [],
    slug: "codification-of-national-sports-and-athletics-law-2",
    statusHistory: [
      {
        ordinal: "3",
        name: "In Progress",
        description: "The promise is in the works or being considered.",
        color: "#90DAFF",
        textColor: "#202020",
        title: "In Progress",
        slug: "in-progress",
        date: "2020-10-02",
      },
    ],
  },
  {
    id: "MexsNcKQ5vQ",
    title: "Codification of national sports and athletics law",
    image:
      "http://dashboard.hurumap.org/promisetracker/wp-content/uploads/sites/2/2021/08/jide-lambo-vDsrPPSuwD0-unsplash.jpg",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer euismod odio non leo pretium pellentesque.",
    isKey: false,
    status: {
      ordinal: "5",
      name: "Completed",
      description: "The promise is mostly or completely fulfilled.",
      color: "#005DFD",
      textColor: "#ffffff",
      title: "Completed",
      slug: "completed",
      date: "2020-11-27",
    },
    location: [-1.286389, 36.817225],
    promiseDeadline: "2022-01-29",
    categories: [
      {
        name: "Housing",
        description: "",
        title: "Housing",
        slug: "housing",
      },
    ],
    date: "2020-11-27",
    events: [],
    slug: "codification-of-national-sports-and-athletics-law",
    statusHistory: [
      {
        ordinal: "5",
        name: "Completed",
        description: "The promise is mostly or completely fulfilled.",
        color: "#005DFD",
        textColor: "#ffffff",
        title: "Completed",
        slug: "completed",
        date: "2020-11-27",
      },
    ],
  },
  {
    id: "zikKAfSid6n",
    title: "Codification of national sports and athletics law",
    image:
      "http://dashboard.hurumap.org/promisetracker/wp-content/uploads/sites/2/2021/08/doug-linstedt-jEEYZsaxbH4-unsplash.jpg",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer euismod odio non leo pretium pellentesque.",
    isKey: true,
    status: {
      ordinal: "1",
      name: "Stalled",
      description:
        "Could occur due to inaction by administration or lack of support from legislative branch.",
      color: "#FF5255",
      textColor: "#ffffff",
      title: "Stalled",
      slug: "stalled",
      date: "2020-11-27",
    },
    location: [-1.286389, 36.817226],
    promiseDeadline: "2022-01-30",
    categories: [],
    date: "2020-11-27",
    events: [],
    slug: "codification-of-national-sports-and-athletics-law",
    statusHistory: [
      {
        ordinal: "1",
        name: "Stalled",
        description:
          "Could occur due to inaction by administration or lack of support from legislative branch.",
        color: "#FF5255",
        textColor: "#ffffff",
        title: "Stalled",
        slug: "stalled",
        date: "2020-11-27",
      },
    ],
  },
  {
    id: "9gjNF5SakPy",
    title: "Codification of national sports and athletics law 2",
    image:
      "http://dashboard.hurumap.org/promisetracker/wp-content/uploads/sites/2/2021/08/oshomah-abubakar-80wYSpqSxX8-unsplash.jpg",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer euismod odio non leo pretium pellentesque.",
    isKey: false,
    status: {
      ordinal: "0",
      name: "Unstarted",
      description:
        "Every promise begins at this level and retains this rating until evidence of progress or proof that it has been shelved.",
      color: "#EBEBEB",
      textColor: "#202020",
      title: "Unstarted",
      slug: "unstarted",
      date: "2020-11-27",
    },
    location: [-1.286389, 36.817227],
    promiseDeadline: "2022-01-31",
    categories: [
      {
        name: "Housing",
        description: "",
        title: "Housing",
        slug: "housing",
      },
    ],
    date: "2020-11-27",
    events: [],
    slug: "codification-of-national-sports-and-athletics-law-2",
    statusHistory: [
      {
        ordinal: "0",
        name: "Unstarted",
        description:
          "Every promise begins at this level and retains this rating until evidence of progress or proof that it has been shelved.",
        color: "#EBEBEB",
        textColor: "#202020",
        title: "Unstarted",
        slug: "unstarted",
        date: "2020-11-27",
      },
    ],
  },
  {
    id: "jfgcNJqaHer",
    title: "Codification of national sports and athletics law",
    image:
      "http://dashboard.hurumap.org/promisetracker/wp-content/uploads/sites/2/2021/08/oshomah-abubakar-RD3lnWfG-sg-unsplash.jpg",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer euismod odio non leo pretium pellentesque.",
    isKey: false,
    status: {
      ordinal: "4",
      name: "Inconclusive",
      description:
        "The promise is accomplished only in part, but has succeeded at least in part consistently with the goal of the promise.",
      color: "#909090",
      textColor: "#ffffff",
      title: "Inconclusive",
      slug: "inconclusive",
      date: "2020-11-27",
    },
    location: [-1.286389, 36.817228],
    promiseDeadline: "2022-02-01",
    categories: [
      {
        name: "Road",
        description: "",
        title: "Road",
        slug: "road",
      },
      {
        name: "Housing",
        description: "",
        title: "Housing",
        slug: "housing",
      },
    ],
    date: "2020-11-27",
    events: [],
    slug: "codification-of-national-sports-and-athletics-law",
    statusHistory: [
      {
        ordinal: "4",
        name: "Inconclusive",
        description:
          "The promise is accomplished only in part, but has succeeded at least in part consistently with the goal of the promise.",
        color: "#909090",
        textColor: "#ffffff",
        title: "Inconclusive",
        slug: "inconclusive",
        date: "2020-11-27",
      },
    ],
  },
];

function staticBackend() {
  function formatSiteAsProjectMeta(site) {
    const { entity } = site;
    const description = `Campaign Promises made by ${entity.name}`;
    const fullName = entity.fullName || null;
    const name = entity.preferredName || entity.name || null;
    const photo = entity.image || null;
    const position = entity.title || null;
    const promiseLabel = "promises";
    const tagline = `<span class="highlight">Tracking</span> ${name}`;
    const tags = site.categories;
    const trailText = "at a glance";
    const updatedAt = formatDate(site.lastUpdated || Date.now);
    const updatedAtLabel = "Updated";
    return {
      description,
      fullName,
      name,
      photo,
      position,
      promiseLabel,
      tagline,
      tags,
      trailText,
      updatedAt,
      updatedAtLabel,
    };
  }

  async function articlesQL() {
    return articlesQLFn(DEFAULT_ARTICLES);
  }

  async function factChecksQL() {
    return factChecksQLFn(DEFAULT_FACT_CHECKS);
  }

  async function promisesQL() {
    return promisesQLFn(DEFAULT_PROMISES);
  }

  const api = {
    sites: () => ({
      get current() {
        return (async () => DEFAULT_SITE)();
      },
    }),
    // TODO(kilemensi): This should be replaced by current but it requires
    //                  changing components first.
    project: () => ({
      get meta() {
        return (async () => {
          const site = await api.sites().current;
          return formatSiteAsProjectMeta(site);
        })();
      },
    }),
    articles: (options) => {
      return {
        get all() {
          return (async () => {
            const site = await api.sites().current;
            if (!site.articlesEnabled) {
              return null;
            }
            const ql = await articlesQL();
            return ql.getArticles(options);
          })();
        },
        get first() {
          return (async () => {
            const site = await api.sites().current;
            if (!site.articlesEnabled) {
              return null;
            }
            const ql = await articlesQL();
            return ql.getArticle(options);
          })();
        },
      };
    },
    factChecks: (options) => {
      return {
        get all() {
          return (async () => {
            const site = await api.sites().current;
            if (!site.factChecksEnabled) {
              return null;
            }
            const ql = await factChecksQL();
            return ql.getFactChecks(options);
          })();
        },
      };
    },
    promises: (options) => {
      return {
        get all() {
          return (async () => {
            const ql = await promisesQL();
            return ql.getPromises(options);
          })();
        },
        get categories() {
          return (async () => {
            const ql = await promisesQL();
            return ql.getCategories();
          })();
        },
        get first() {
          return (async () => {
            const ql = await promisesQL();
            const articles = (await articlesQL()).getArticles();
            return ql.getPromise({ articles, ...options });
          })();
        },
        get key() {
          return (async () => {
            const ql = await promisesQL();
            return ql.getPromises({ ...options, isKey: true });
          })();
        },
        get statuses() {
          return (async () => {
            const ql = await promisesQL();
            return ql.getStatuses();
          })();
        },
      };
    },
  };

  return api;
}

export default staticBackend;
