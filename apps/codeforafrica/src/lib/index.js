import fuse from "./api.fuse";
import {
  getContactForm,
  getCmsProjects,
  getFooter,
  getGetInTouch,
  getHeader,
  getHero,
  getMeetOurTeam,
  getOffices,
  getOurGuidingPrinciples,
  getOurImpact,
  getOurMission,
  getOurPartners,
  getOurTeam,
  getPartners,
  getTeam,
} from "./api.netlify-cms";

import {
  getAllOpportunities,
  getAllOpportunitiesTags,
  getAllStories,
  getAllStoriesTags,
  getStory,
  getRelatedStoriesByTags,
} from "@/codeforafrica/lib/api.ghost";
import equalsIgnoreCase from "@/codeforafrica/utils/equalsIgnoreCase";

export const partners = getPartners([
  "id",
  "slug",
  "name",
  "content",
  "href",
  "logo",
  "links",
]);

export const projects = getCmsProjects([
  "tag",
  "name",
  "slug",
  "tagLine",
  "icon",
  "title",
  "subtitle",
  "content",
  "thumbnail",
  "href",
  "externalHref",
  "badges",
  "partners",
  "donors",
  "links",
]);

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

const navbar = getHeader();

const footer = getFooter();

const meetOurTeam = getMeetOurTeam();

export const ourMission = {
  title: "Our Mission",
  subtitle:
    "Code for Africa is the continent’s largest network of civic technology and data journalism labs, with teams in 20 countries.",
  description:
    "We build digital democracy solutions that give citizens unfettered access to actionable information that empowers them to make informed decisions, and which strengthens civic engagement for improved public governance and accountability. This includes building infrastructure like the continent’s largest open data portals at openAFRICA and sourceAFRICA, as well as incubating initiatives as diverse as the africanDRONE network, the PesaCheck fact-checking initiative and the sensors.AFRICA air quality sensor network.",
  action: {
    href: "/imprint",
    label: "Read about our company legal structure",
  },
};

export const team = getTeam();

const imprint = `
  <h4>Chapter heading</h4>
  <p>Lorem ipsum dolor sit amet consectetur adipiscing, elit ac primis praesent tempor luctus libero, curae condimentum ultricies proin leo. Arcu ornare dis fermentum nisi consequat imperdiet porta viverra placerat nullam, dapibus molestie faucibus id mi lacinia orci magnis. Ridiculus aptent phasellus mus nisi porta rutrum tellus, ut venenatis feugiat massa volutpat.</p>
  <p>Duis maecenas per erat odio quisque accumsan, donec tempus class euismod vulputate fermentum imperdiet, suspendisse blandit lacinia semper cursus. Neque tristique posuere a feugiat convallis tempor cras nunc, leo faucibus cum aptent placerat aenean lobortis, nibh iaculis ac nascetur praesent mus quisque. Nullam leo rutrum augue urna cubilia morbi enim, arcu risus mus mauris elementum pulvinar, laoreet bibendum convallis senectus ullamcorper malesuada. Sapien congue tristique venenatis cras cum quisque et conubia felis lobortis, velit ullamcorper urna pharetra fermentum class tincidunt turpis placerat, porttitor senectus massa ridiculus semper vivamus at enim inceptos. Senectus cum torquent blandit odio class in, nullam sodales dapibus eleifend nec nisl convallis, maecenas rhoncus himenaeos non massa. Justo nulla integer dapibus phasellus felis sem aenean nibh volutpat nullam ullamcorper tempus suscipit ultricies, augue suspendisse ridiculus condimentum dui himenaeos torquent cubilia ut rhoncus taciti malesuada vivamus.</p>
  <hr/>
  <h4>Chapter heading</h4>
  <p>Lorem ipsum dolor sit amet consectetur adipiscing, elit ac primis praesent tempor luctus libero, curae condimentum ultricies proin leo. Arcu ornare dis fermentum nisi consequat imperdiet porta viverra placerat nullam, dapibus molestie faucibus id mi lacinia orci magnis. Ridiculus aptent phasellus mus nisi porta rutrum tellus, ut venenatis feugiat massa volutpat.</p>
  <p>Duis maecenas per erat odio quisque accumsan, donec tempus class euismod vulputate fermentum imperdiet, suspendisse blandit lacinia semper cursus. Neque tristique posuere a feugiat convallis tempor cras nunc, leo faucibus cum aptent placerat aenean lobortis, nibh iaculis ac nascetur praesent mus quisque. Nullam leo rutrum augue urna cubilia morbi enim, arcu risus mus mauris elementum pulvinar, laoreet bibendum convallis senectus ullamcorper malesuada. Sapien congue tristique venenatis cras cum quisque et conubia felis lobortis, velit ullamcorper urna pharetra fermentum class tincidunt turpis placerat, porttitor senectus massa ridiculus semper vivamus at enim inceptos. Senectus cum torquent blandit odio class in, nullam sodales dapibus eleifend nec nisl convallis, maecenas rhoncus himenaeos non massa. Justo nulla integer dapibus phasellus felis sem aenean nibh volutpat nullam ullamcorper tempus suscipit ultricies, augue suspendisse ridiculus condimentum dui himenaeos torquent cubilia ut rhoncus taciti malesuada vivamus.</p>
  <hr/>
  <h4>Chapter heading</h4>
  <p>Lorem ipsum dolor sit amet consectetur adipiscing, elit ac primis praesent tempor luctus libero, curae condimentum ultricies proin leo. Arcu ornare dis fermentum nisi consequat imperdiet porta viverra placerat nullam, dapibus molestie faucibus id mi lacinia orci magnis. Ridiculus aptent phasellus mus nisi porta rutrum tellus, ut venenatis feugiat massa volutpat.</p>
  <p>Duis maecenas per erat odio quisque accumsan, donec tempus class euismod vulputate fermentum imperdiet, suspendisse blandit lacinia semper cursus. Neque tristique posuere a feugiat convallis tempor cras nunc, leo faucibus cum aptent placerat aenean lobortis, nibh iaculis ac nascetur praesent mus quisque. Nullam leo rutrum augue urna cubilia morbi enim, arcu risus mus mauris elementum pulvinar, laoreet bibendum convallis senectus ullamcorper malesuada. Sapien congue tristique venenatis cras cum quisque et conubia felis lobortis, velit ullamcorper urna pharetra fermentum class tincidunt turpis placerat, porttitor senectus massa ridiculus semper vivamus at enim inceptos. Senectus cum torquent blandit odio class in, nullam sodales dapibus eleifend nec nisl convallis, maecenas rhoncus himenaeos non massa. Justo nulla integer dapibus phasellus felis sem aenean nibh volutpat nullam ullamcorper tempus suscipit ultricies, augue suspendisse ridiculus condimentum dui himenaeos torquent cubilia ut rhoncus taciti malesuada vivamus.</p>
  <hr/>
  <h4>Chapter heading</h4>
  <p>Lorem ipsum dolor sit amet consectetur adipiscing, elit ac primis praesent tempor luctus libero, curae condimentum ultricies proin leo. Arcu ornare dis fermentum nisi consequat imperdiet porta viverra placerat nullam, dapibus molestie faucibus id mi lacinia orci magnis. Ridiculus aptent phasellus mus nisi porta rutrum tellus, ut venenatis feugiat massa volutpat.</p>
  <p>Duis maecenas per erat odio quisque accumsan, donec tempus class euismod vulputate fermentum imperdiet, suspendisse blandit lacinia semper cursus. Neque tristique posuere a feugiat convallis tempor cras nunc, leo faucibus cum aptent placerat aenean lobortis, nibh iaculis ac nascetur praesent mus quisque. Nullam leo rutrum augue urna cubilia morbi enim, arcu risus mus mauris elementum pulvinar, laoreet bibendum convallis senectus ullamcorper malesuada. Sapien congue tristique venenatis cras cum quisque et conubia felis lobortis, velit ullamcorper urna pharetra fermentum class tincidunt turpis placerat, porttitor senectus massa ridiculus semper vivamus at enim inceptos. Senectus cum torquent blandit odio class in, nullam sodales dapibus eleifend nec nisl convallis, maecenas rhoncus himenaeos non massa. Justo nulla integer dapibus phasellus felis sem aenean nibh volutpat nullam ullamcorper tempus suscipit ultricies, augue suspendisse ridiculus condimentum dui himenaeos torquent cubilia ut rhoncus taciti malesuada vivamus.</p>
  <hr/>
`;

const DEFAULT_REVALIDATE = 3 * 60; // 3 minutes

const ALL_TAG = "All";

function getProjectTags(options = { includeAll: true }) {
  const tags = Array.from(
    new Set(projects?.flatMap((a) => a.tag || []))
  ).sort();
  if (options?.includeAll) {
    return [ALL_TAG, ...tags];
  }
  return tags;
}

function paginateResults(items, page, pageSize) {
  // We need to initialize to null for serialization.
  let count = null;
  let results = [];
  let pageNumber = null;
  let pageSizeNumber = null;
  if (items?.length) {
    // Need to ensure page, pageSize are numbers and not strings
    pageNumber = Number.parseInt(page, 10) || 1;
    pageSizeNumber = Number.parseInt(pageSize, 10) || 6;
    count = Math.ceil(items.length / pageSizeNumber);
    results = items.slice(
      (pageNumber - 1) * pageSizeNumber,
      pageNumber * pageSizeNumber
    );
  }
  return {
    pagination: {
      count,
      page: pageNumber,
      pageSize: pageSizeNumber,
    },
    results,
  };
}

export async function getStories(options) {
  const {
    tag: originalTag,
    page,
    "page-size": pageSize = 10,
    q,
  } = options || {};
  const tag = originalTag || ALL_TAG;

  let stories = await getAllStories();
  if (!equalsIgnoreCase(tag, ALL_TAG)) {
    stories = stories.filter((s) =>
      s.tags.some((t) => equalsIgnoreCase(t, tag))
    );
  }
  if (stories.length && q) {
    stories = fuse
      .stories(stories)
      .search(q)
      .map((p) => p.item);
  }

  return paginateResults(stories, page, pageSize);
}

async function getHomePageStaticProps() {
  const stories = await getStories();

  return {
    props: {
      title: "Code for Africa",
      sections: [
        {
          ...getHero("index"),
          slug: "hero",
        },
        {
          slug: "projects",
          projects,
          tags: getProjectTags({ includeAll: false }),
        },
        { ...meetOurTeam, slug: "meet-our-team" },
        {
          slug: "news-stories",
          title: "News and stories",
          articles: stories.results,
        },
        {
          slug: "our-partners",
          partners: getOurPartners(),
        },
        {
          ...getOurImpact(),
          slug: "our-impact",
        },
      ],
      footer,
      navbar,
    },
    revalidate: DEFAULT_REVALIDATE,
  };
}

export function getProjects(options) {
  const { tag: originalTag, page, "page-size": pageSize, q } = options || {};
  const tag = originalTag || ALL_TAG;

  let found = projects.filter(
    (p) => equalsIgnoreCase(tag, ALL_TAG) || equalsIgnoreCase(tag, p.tag)
  );
  if (found.length && q) {
    found = fuse
      .projects(found)
      .search(q)
      .map((p) => p.item);
  }

  return paginateResults(found, page, pageSize);
}

function getProjectsPageStaticProps() {
  return {
    props: {
      title: "Our Work | Code for Africa",
      sections: [
        {
          slug: "hero",
          ...getHero("our-work"),
        },
        {
          slug: "projects",
          tags: getProjectTags(),
          projects: getProjects(),
        },
      ],
      footer,
      navbar,
    },
    revalidate: DEFAULT_REVALIDATE,
  };
}

export async function getOpportunities(options) {
  const { tag: originalTag, page, "page-size": pageSize, q } = options || {};
  const tag = originalTag || ALL_TAG;

  let opportunities = await getAllOpportunities();
  if (!equalsIgnoreCase(tag, ALL_TAG)) {
    opportunities = opportunities.filter((opportunity) => {
      return opportunity.tags.some((t) => equalsIgnoreCase(t, tag));
    });
  }
  if (opportunities.length && q) {
    opportunities = fuse
      .opportunities(opportunities)
      .search(q)
      .map((p) => p.item);
  }

  return paginateResults(opportunities, page, pageSize);
}

async function getOpportunitiesPageStaticProps() {
  const allOpportunities = await getAllOpportunities();
  const tags = await getAllOpportunitiesTags();

  return {
    props: {
      title: "Opportunities | Code for Africa",
      sections: [
        {
          slug: "hero",
          ...getHero("opportunities"),
        },
        {
          slug: "opportunities",
          opportunities: paginateResults(allOpportunities),
          tags,
        },
      ],
      footer,
      navbar,
    },
    revalidate: DEFAULT_REVALIDATE,
  };
}

async function getOpportunityPageStaticProps(params) {
  // TODO: is this the best way to get the article slug?
  const actualSlug = params.slug.split("/")[2];

  const opportunity = await getStory(actualSlug);

  if (opportunity) {
    return {
      props: {
        title: `${opportunity.title} | Opportunities | Code for Africa`,
        opportunity,
        footer,
        navbar,
      },
      revalidate: DEFAULT_REVALIDATE,
    };
  }

  return { notFound: true };
}

function getImprintPageStaticProps() {
  return {
    props: {
      title: "Imprint | Code for Africa",
      content: imprint,
      sections: [
        {
          slug: "hero",
          ...getHero("imprint"),
        },
      ],
      footer,
      navbar,
    },
    revalidate: DEFAULT_REVALIDATE,
  };
}

function getPartnerPageStaticProps(params) {
  const partner = partners.find(({ slug }) =>
    equalsIgnoreCase(`/about/partners/${slug}`, params?.slug)
  );
  if (partner) {
    const startIndex = getRandomInt(projects.length - 3);
    return {
      props: {
        title: `${partner.name} | Partners | About | Code for Africa`,
        partner: { ...partner, image: partner.logo, title: "Partner" },
        sections: [
          {
            slug: "related-projects",
            title: "Projects",
            projects: projects.slice(startIndex, startIndex + 3),
          },
        ],
        footer,
        navbar,
      },
      revalidate: DEFAULT_REVALIDATE,
    };
  }

  return { notFound: true };
}

function getPrivacyPageStaticProps() {
  return {
    props: {
      title: "Privacy | Code for Africa",
      content: imprint,
      sections: [
        {
          slug: "hero",
          ...getHero("privacy-policy"),
        },
      ],
      footer,
      navbar,
    },
    revalidate: DEFAULT_REVALIDATE,
  };
}

async function getProjectPageStaticProps(params) {
  const project = projects.find(({ href }) =>
    equalsIgnoreCase(href, params?.slug)
  );
  if (project) {
    const relatedStories = await getRelatedStoriesByTags([project.name]);

    return {
      props: {
        title: `${project.name} | Projects | Code for Africa`,
        project,
        sections: [
          {
            slug: "team",
            title: "Team",
            team: team.slice(0, 3),
          },
          {
            slug: "related-stories",
            title: "Related stories",
            articles: relatedStories.slice(0, 3),
          },
          {
            slug: "related-projects",
            title: "Explore other projects",
            projects: projects
              .filter((p) => p.slug !== project.slug)
              .slice(0, 3),
          },
        ],
        footer,
        navbar,
      },
      revalidate: DEFAULT_REVALIDATE,
    };
  }

  return { notFound: true };
}

async function getStoriesPageStaticProps() {
  const articles = await getAllStories();
  const tags = await getAllStoriesTags();

  return {
    props: {
      title: "Stories | Code for Africa",
      sections: [
        {
          slug: "stories",
          title: "Stories",
          articles: paginateResults(articles),
          tags,
        },
      ],
      footer,
      navbar,
    },
    revalidate: DEFAULT_REVALIDATE,
  };
}

async function getStoryPageStaticProps(slug) {
  // TODO: is this the best way to get the article slug?
  const actualSlug = slug.slug.split("/")[2];
  const story = await getStory(actualSlug);
  const relatedArticles = await getRelatedStoriesByTags(story.tags, story);

  // check for empty obj
  if (story) {
    return {
      props: {
        title: `${story.title} | Stories | Code for Africa`,
        article: story,
        sections: [
          {
            slug: "related-stories",
            title: "News and Stories",
            articles: relatedArticles?.slice(0, 3) ?? null,
          },
        ],
        footer,
        navbar,
      },
      revalidate: DEFAULT_REVALIDATE,
    };
  }

  return { notFound: true };
}

function getMembersFieldTags(options = { includeAll: true }) {
  let countries = Array.from(
    new Set(team?.flatMap((m) => m.country || []))
  ).sort();
  let teams = Array.from(new Set(team?.flatMap((m) => m.team || []))).sort();
  if (options?.includeAll) {
    countries = [ALL_TAG, ...countries];
    teams = [ALL_TAG, ...teams];
  }
  return [
    { field: "Country", tags: countries },
    { field: "Team", tags: teams },
  ];
}

export function getMembers(options) {
  const {
    field,
    page,
    "page-size": pageSize = 18,
    q,
    tag: originalTag,
  } = options || {};
  const tag = originalTag || ALL_TAG;

  let found = team.filter(
    (m) =>
      equalsIgnoreCase(tag, ALL_TAG) ||
      (field && equalsIgnoreCase(tag, m[field]))
  );
  if (found.length && q) {
    found = fuse
      .members(found)
      .search(q)
      .map((p) => p.item);
  }

  return paginateResults(found, page, pageSize);
}

function getAboutMembersPageStaticProps() {
  return {
    props: {
      unit: "members",
      title: "Members | About | Code for Africa",
      crumbs: [{ href: "/about", label: "About us" }, { label: "Members" }],
      sections: [
        {
          ...getHero("about"),
          slug: "hero",
        },
        {
          ...getOurTeam(),
          pathname: "/about/members",
          tags: getMembersFieldTags(),
          team: getMembers(),
          slug: "our-team",
        },
        {
          ...getGetInTouch(),
          slug: "get-in-touch",
        },
      ],
      footer,
      navbar,
    },
    revalidate: DEFAULT_REVALIDATE,
  };
}

function getAboutPageStaticProps() {
  return {
    props: {
      title: "About | Code for Africa",
      sections: [
        {
          ...getHero("about"),
          slug: "hero",
        },
        {
          ...getOurMission(),
          slug: "our-mission",
        },
        {
          ...getOurGuidingPrinciples(),
          slug: "guiding-principles",
        },

        {
          ...getOurTeam(),
          tags: getMembersFieldTags(),
          team: getMembers(),
          slug: "our-team",
        },
        {
          slug: "our-partners",
          partners: { ...getOurPartners("about") },
        },
        {
          ...getOurImpact("about"),
          slug: "our-impact",
        },
        {
          ...getGetInTouch(),
          slug: "get-in-touch",
        },
      ],
      footer,
      navbar,
    },
    revalidate: DEFAULT_REVALIDATE,
  };
}

function getAboutPartnersPageStaticProps() {
  return {
    props: {
      unit: "partners",
      title: "Partners | About | Code for Africa",
      crumbs: [{ href: "/about", label: "About us" }, { label: "Partners" }],
      sections: [
        {
          ...getHero("about"),
          slug: "hero",
        },
        {
          slug: "our-partners",
          // reuse title from /about but show *all* partners
          partners: { ...getOurPartners("about"), list: partners },
        },
        {
          ...getGetInTouch(),
          slug: "get-in-touch",
        },
      ],
      footer,
      navbar,
    },
    revalidate: DEFAULT_REVALIDATE,
  };
}

function getTeamMemberPageStaticProps(params) {
  const member = team.find(({ href }) => equalsIgnoreCase(href, params?.slug));
  if (member) {
    const startIndex = getRandomInt(projects.length - 3);
    return {
      props: {
        title: `${member.name} | Members | About | Code for Africa`,
        member,
        sections: [
          {
            slug: "related-projects",
            title: "Projects",
            projects: projects.slice(startIndex, startIndex + 3),
          },
        ],
        footer,
        navbar,
      },
      revalidate: DEFAULT_REVALIDATE,
    };
  }

  return { notFound: true };
}

function getContactPageStaticProps() {
  return {
    props: {
      title: "Contact | Code for Africa",
      sections: [
        {
          slug: "hero",
          ...getHero("contact"),
        },
        {
          ...getContactForm(),
          slug: "contact-form",
        },
        {
          slug: "join-our-slack",
          title: "We are on Slack!",
          subtitle: "Join us",
          action: {
            label: "Join our Slack",
            href: "https://docs.google.com/forms/d/e/1FAIpQLSdkfLU2yi2S1_7D27Z0I1TumkWy5brlam809Od9cc6CnXGA-A/viewform",
          },
        },
        {
          slug: "office-addresses",
          title: "Our Offices",
          addresses: getOffices(),
          map: {
            apiKey: process.env.GOOGLE_MAPS_API_KEY ?? null,
            zoom: 20,
            zoomControl: false,
            mapTypeControl: false,
            scaleControl: false,
            streetViewControl: false,
            rotateControl: false,
            fullscreenControl: false,
          },
        },
      ],
      footer,
      navbar,
    },
    revalidate: DEFAULT_REVALIDATE,
  };
}

async function getErrorPageStaticProps() {
  const stories = await getStories();
  const { title, subtitle } = getHero("error");

  return {
    props: {
      sections: [
        {
          slug: "hero",
          title,
          subtitle,
        },
        {
          slug: "news-stories",
          title: "Recent Stories",
          articles: stories.results,
        },
      ],
      footer,
      navbar,
    },
    revalidate: DEFAULT_REVALIDATE,
  };
}

async function get404PageStaticProps() {
  const stories = await getStories();
  const { title, subtitle } = getHero("404");

  return {
    props: {
      sections: [
        {
          slug: "hero",
          title,
          subtitle,
        },
        {
          slug: "news-stories",
          title: "Recent Stories",
          articles: stories.results,
        },
      ],
      footer,
      navbar,
    },
    revalidate: DEFAULT_REVALIDATE,
  };
}

export async function getPageStaticProps(params) {
  switch (params?.slug) {
    case "/": {
      return getHomePageStaticProps(params);
    }
    case "/about": {
      return getAboutPageStaticProps(params);
    }
    case "/about/members": {
      return getAboutMembersPageStaticProps(params);
    }
    case "/about/partners": {
      return getAboutPartnersPageStaticProps(params);
    }
    case "/contact": {
      return getContactPageStaticProps(params);
    }
    case "/imprint": {
      return getImprintPageStaticProps(params);
    }
    case "/opportunities": {
      return getOpportunitiesPageStaticProps(params);
    }
    case "/privacy": {
      return getPrivacyPageStaticProps(params);
    }
    case "/projects": {
      return getProjectsPageStaticProps(params);
    }
    case "/stories": {
      return getStoriesPageStaticProps(params);
    }
    case "/404": {
      return get404PageStaticProps();
    }
    case "/_error": {
      return getErrorPageStaticProps();
    }
    default:
      if (params?.slug?.startsWith("/about/members/")) {
        return getTeamMemberPageStaticProps(params);
      }
      if (params?.slug?.startsWith("/about/partners/")) {
        return getPartnerPageStaticProps(params);
      }
      if (params?.slug?.startsWith("/opportunities/")) {
        return getOpportunityPageStaticProps(params);
      }
      if (params?.slug?.startsWith("/projects/")) {
        return getProjectPageStaticProps(params);
      }
      if (params?.slug?.startsWith("/stories/")) {
        return getStoryPageStaticProps(params);
      }
      return { notFound: true };
  }
}

export async function getPageStaticPaths(primaryTag) {
  const posts =
    primaryTag === "stories"
      ? await getAllStories()
      : await getAllOpportunities();

  // filter out items with slug to remove pagination
  const actualPosts = posts.filter((post) => post.slug);
  const path = actualPosts.map((post) => ({
    params: { slug: post.slug },
  }));

  return path;
}
