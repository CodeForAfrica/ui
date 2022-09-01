import fuse from "./api.fuse";
import {
  getBody,
  getContactForm,
  getCmsProjects,
  getFooter,
  getGetInTouch,
  getHeader,
  getHero,
  getMeetOurTeam,
  getNewsAndStories,
  getOffices,
  getOurGuidingPrinciples,
  getOurImpact,
  getOurMission,
  getOurPartners,
  getOurTeam,
  getPartners,
  getTeam,
  getSeo,
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
  "team",
  "links",
]);

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

const navbar = getHeader();

const footer = getFooter();

const meetOurTeam = getMeetOurTeam();

export const team = getTeam();

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

function prioritiseFeaturedStory(stories) {
  const index = stories.findIndex((s) => s.featured);
  // If we have a featured story and it's not the first story,
  if (index > 0) {
    // we need to "push" the featured story to the top of list.
    const featuredStory = stories[index];
    return [featuredStory, ...stories.filter((_, i) => i !== index)];
  }
  return stories;
}

export async function getStories(options) {
  const {
    tag: originalTag,
    page = 1,
    "page-size": pageSize = 10,
    q,
  } = options || {};
  const tag = originalTag || ALL_TAG;

  let stories = await getAllStories();
  if (equalsIgnoreCase(tag, ALL_TAG) && page === 1 && !q) {
    stories = prioritiseFeaturedStory(stories);
  } else {
    if (!equalsIgnoreCase(tag, ALL_TAG)) {
      stories = stories.filter((s) =>
        s.tags.some((t) => equalsIgnoreCase(t, tag))
      );
    }
    if (q && stories.length) {
      stories = fuse
        .stories(stories)
        .search(q)
        .map((p) => p.item);
    }
  }

  return paginateResults(stories, page, pageSize);
}

async function getProcessedNewsAndStories() {
  const { title, count = 4 } = getNewsAndStories("index");
  const allStories = await getAllStories();
  const articles = prioritiseFeaturedStory(allStories).slice(0, count);

  return { title, articles };
}

async function getHomePageStaticProps() {
  const seo = getSeo("index");
  return {
    props: {
      seo,
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
          ...(await getProcessedNewsAndStories()),
          slug: "news-stories",
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
  const seo = getSeo("opportunities");

  return {
    props: {
      seo,
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
  const actualSlug = params.slug.split("/")[2];
  const foundOpportunity = await getStory(actualSlug);

  if (foundOpportunity) {
    const { seo: pageSeo, ...opportunity } = foundOpportunity;
    const seo = getSeo("opportunities-individual", pageSeo);
    return {
      props: {
        seo,
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
  const seo = getSeo("imprint");

  return {
    props: {
      seo,
      ...getBody("imprint"),
      sections: [
        {
          ...getHero("imprint"),
          slug: "hero",
        },
      ],
      footer,
      navbar,
    },
    revalidate: DEFAULT_REVALIDATE,
  };
}

function getPrivacyPageStaticProps() {
  const seo = getSeo("privacy-policy");

  return {
    props: {
      seo,
      ...getBody("privacy-policy"),
      sections: [
        {
          ...getHero("privacy-policy"),
          slug: "hero",
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
    const seo = getSeo("our-work-individual", {
      title: project.name,
      description:
        // subtitle could contain html content
        project.subtitle.replace(/<[^>]*>/g, "").trim() || project.title,
    });
    return {
      props: {
        seo,
        project,
        sections: [
          {
            slug: "team",
            title: "Team",
            team: project?.team?.list,
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

function getProjectsPageStaticProps() {
  const seo = getSeo("our-work");
  return {
    props: {
      seo,
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

async function getStoriesPageStaticProps() {
  const articles = await getAllStories();
  const tags = await getAllStoriesTags();
  const seo = getSeo("stories");

  return {
    props: {
      seo,
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
    const { seo: pageSeo, ...article } = story;
    const seo = getSeo("stories-individual", pageSeo);
    return {
      props: {
        seo,
        article,
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

function getAboutImpactPageStaticProps() {
  const seo = getSeo("about-impact");

  return {
    props: {
      seo,
      unit: "impact",
      crumbs: [{ href: "/about", label: "About us" }, { label: "Impact" }],
      sections: [
        {
          ...getHero("about"),
          slug: "hero",
        },
        {
          slug: "our-impact",
          ...getOurImpact("about"),
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

function getAboutMemberPageStaticProps(params) {
  const member = team.find(({ href }) => equalsIgnoreCase(href, params?.slug));

  if (member) {
    const seo = getSeo("about-members-individual", {
      title: member.name,
      description: member.title,
    });
    const startIndex = getRandomInt(projects.length - 3);
    return {
      props: {
        seo,
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

function getAboutMembersPageStaticProps() {
  const seo = getSeo("about-members");

  return {
    props: {
      seo,
      unit: "members",
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
  const seo = getSeo("about");

  return {
    props: {
      seo,
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
          partners: getOurPartners("about"),
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

function getAboutPartnerPageStaticProps(params) {
  const partner = partners.find(({ slug }) =>
    equalsIgnoreCase(`/about/partners/${slug}`, params?.slug)
  );

  if (partner) {
    const seo = getSeo("about-partners-individual", {
      title: partner.name,
      // TODO(kilemens): Add short description to each partner
    });
    const startIndex = getRandomInt(projects.length - 3);

    return {
      props: {
        seo,
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

function getAboutPartnersPageStaticProps() {
  const seo = getSeo("about-partners");

  return {
    props: {
      seo,
      unit: "partners",
      crumbs: [{ href: "/about", label: "About us" }, { label: "Partners" }],
      sections: [
        {
          ...getHero("about"),
          slug: "hero",
        },
        {
          slug: "our-partners",
          partners: getOurPartners("about"),
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

function getContactPageStaticProps() {
  const seo = getSeo("contact");

  return {
    props: {
      seo,
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

async function getProcessedRecentStories(page) {
  const allStories = await getAllStories();
  const { title, count = 3 } = getNewsAndStories(page);
  const articles = allStories.slice(0, count);
  return { title, articles };
}

async function getErrorPageStaticProps() {
  const seo = getSeo("error");

  return {
    props: {
      seo,
      sections: [
        {
          ...getHero("error"),
          slug: "hero",
        },
        {
          ...(await getProcessedRecentStories("error")),
          slug: "news-stories",
        },
      ],
      footer,
      navbar,
    },
    revalidate: DEFAULT_REVALIDATE,
  };
}

async function get404PageStaticProps() {
  const seo = getSeo("404");

  return {
    props: {
      seo,
      sections: [
        {
          ...getHero("404"),
          slug: "hero",
        },
        {
          ...(await getProcessedRecentStories("404")),
          slug: "news-stories",
          title: "Recent Stories",
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
    case "/about/impact": {
      return getAboutImpactPageStaticProps();
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
        return getAboutMemberPageStaticProps(params);
      }
      if (params?.slug?.startsWith("/about/partners/")) {
        return getAboutPartnerPageStaticProps(params);
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
