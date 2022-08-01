import fuse from "./api.fuse";
import {
  getPartners,
  getCmsProjects,
  getHero,
  getMeetOurTeam,
  getTeam,
  getOurImpact,
  getOurMission,
  getOurPartners,
  getOurGuidingPrinciples,
} from "./api.netlify-cms";

import {
  getAllOpportunities,
  getAllStories,
  getStory,
} from "@/codeforafrica/lib/api.ghost";
import equalsIgnoreCase from "@/codeforafrica/utils/equalsIgnoreCase";

export const partners = getPartners([
  "id",
  "slug",
  "name",
  "content",
  "href",
  "logo",
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

const menu = [
  {
    label: "Our work",
    href: "/projects",
  },
  {
    label: "About",
    href: "/about",
  },
  {
    label: "Stories",
    href: "/stories",
  },
  {
    label: "Opportunities",
    href: "/opportunities",
  },
  {
    label: "Contact",
    href: "/contact",
  },
];

const navbar = {
  menu,
};

const footer = {
  socialMedia: [
    {
      url: "https://twitter.com/Code4Africa",
      image: {
        alt: "Twitter",
        url: "/icons/Type=twitter, Size=32, Color=White.svg",
      },
    },
    {
      url: "https://cfa.slack.com",
      image: {
        alt: "Slack",
        url: "/icons/Type=slack, Size=32, Color=White.svg",
      },
    },
    {
      url: "https://ke.linkedin.com/company/code-for-africa",
      image: {
        alt: "LinkedIn",
        url: "/icons/Type=linkedin, Size=32, Color=White.svg",
      },
    },
    {
      url: "https://www.facebook.com/CodeForAfrica/",
      image: {
        alt: "Facebook",
        url: "/icons/Type=facebook, Size=32, Color=White.svg",
      },
    },
    {
      url: "https://www.instagram.com/code4africa__/",
      image: {
        alt: "Instagram",
        url: "/icons/Type=instagram, Size=32, Color=White.svg",
      },
    },
    {
      url: "https://github.com/CodeForAfrica",
      image: {
        alt: "Github",
        url: "/icons/Type=github, Size=32, Color=White.svg",
      },
    },
  ],
  additionalLinks: {
    secondary: [
      { name: "Imprint", href: "/imprint" },
      { name: "Privacy policy", href: "/privacy" },
    ],
  },
  description:
    "This site is a project of Code for Africa, the continent's largest network of civic technology and data journalism labs. All content is released under a Creative Commons 4 Attribution Licence. Reuse it to help empower your own community.",
  menu,
  subscription: {
    embedCode: `
          <!-- Begin Mailchimp Signup Form -->
          <div id="mc_embed_signup">
            <form action="https://twitter.us6.list-manage.com/subscribe/post?u=65e5825507b3cec760f272e79&amp;id=c2ff751541" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate" target="_blank" novalidate>
                <div id="mc_embed_signup_scroll">
              <label for="MERGE1">Name</label>
              <input type="text" name="MERGE1" id="MERGE1" size="25" value="">
              <label for="mce-EMAIL">Email</label>
              <input type="email" value="" name="EMAIL" class="email" id="mce-EMAIL" required>
             <!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups-->
                <div style="position: absolute; left: -5000px;" aria-hidden="true"><input type="text" name="b_65e5825507b3cec760f272e79_c2ff751541" tabindex="-1" value=""></div>
                <div class="clear"><input type="submit" value="Sign up"  id="mc-embedded-subscribe" class="button"></div>
                </div>
            </form>
          </div>
          <!--End mc_embed_signup-->
    `,
  },
};

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

  // if tag is present, filter stories by tag
  if (tag !== ALL_TAG) {
    // filter stories by tag
    stories = stories.filter((story) =>
      story.tags.some((t) => t.name.toLowerCase() === tag.toLowerCase())
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
          ...getHero(),
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
          slug: "our-impact",
          impact: getOurImpact(),
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
          title: "Our Work",
          subtitle:
            "We launch data-driven initiatives to achieve impactful results",
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

  // if tag is not provided or set to ALL, we will return all opportunities
  if (tag !== ALL_TAG) {
    // return opportunities that have the tag
    opportunities = opportunities.filter((opportunity) => {
      return opportunity.tags.some(
        (t) => t.name.toLowerCase() === tag.toLowerCase()
      );
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
  const tags = allOpportunities.flatMap((a) => a.tags);
  const uniqueTags = ["All", ...new Set(tags)];

  return {
    props: {
      title: "Opportunities | Code for Africa",
      sections: [
        {
          slug: "hero",
          title: "Opportunities",
          subtitle: "Come build digital democracies with Code for Africa",
        },
        {
          slug: "opportunities",
          opportunities: paginateResults(allOpportunities),
          tags: uniqueTags,
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
          title: "Imprint",
          subtitle: "Code for Africa organisation structure",
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
          title: "Privacy",
          subtitle: "Code for Africa privacy policy",
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
            articles: [],
          },
          {
            slug: "related-projects",
            title: "Explore other projects",
            projects: projects.slice(0, 3),
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
  const tags = articles.flatMap((a) => a.tags);
  const uniqueTags = ["All", ...new Set(tags)];

  return {
    props: {
      title: "Stories | Code for Africa",
      sections: [
        {
          slug: "articles",
          title: "Articles",
          articles: paginateResults(articles),
          tags: uniqueTags,
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
  const article = await getStory(actualSlug);
  // check for empty obj
  if (article && Object.keys(article).length > 0) {
    return {
      props: {
        title: `${article.title} | Stories | Code for Africa`,
        article,
        sections: [
          {
            slug: "related-stories",
            title: "News and Stories",
            articles: [],
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
          slug: "our-team",
          title: "Our team",
          tags: getMembersFieldTags(),
          team: getMembers(),
          pathname: "/about/members",
        },
        {
          slug: "get-in-touch",
          title: "Are you looking to start a new project?",
          subtitle: "We'd love to hear more.",
          action: {
            href: "/contact",
            label: "Get in touch",
          },
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
          slug: "guiding-principles",
          title: "Guiding Principles",
          principles: getOurGuidingPrinciples(),
        },

        {
          slug: "our-team",
          title: "Our team",
          tags: getMembersFieldTags(),
          team: getMembers(),
        },
        {
          slug: "our-partners",
          partners: getOurPartners("about"),
        },
        {
          slug: "our-impact",
          impact: getOurImpact("about"),
        },
        {
          slug: "get-in-touch",
          title: "Are you looking to start a new project?",
          subtitle: "We'd love to hear more.",
          action: {
            href: "/contact",
            label: "Get in touch",
          },
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
          title: "Our partners",
          partners,
        },
        {
          slug: "get-in-touch",
          title: "Are you looking to start a new project?",
          subtitle: "We'd love to hear more.",
          action: {
            href: "/contact",
            label: "Get in touch",
          },
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
          title: "Contact",
          subtitle: "Let’s start something together!",
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
          addresses: [
            {
              title: "Nairobi",
              address:
                "Address Line 1<br />Address Line 2<br />Zipcode, City<br />Country",
              map: {
                center: { lat: -1.2983425, lng: 36.7907414 },
                position: { lat: -1.2983425, lng: 36.7907414 },
              },
            },
            {
              title: "Lagos",
              address:
                "Address Line 1<br />Address Line 2<br />Zipcode, City<br />Country",
              map: {
                center: { lat: 9.058377, lng: 7.5020761 },
                position: { lat: 9.058377, lng: 7.5020761 },
              },
            },
            {
              title: "Abuja",
              address:
                "Address Line 1<br />Address Line 2<br />Zipcode, City<br />Country",
              map: {
                center: { lat: 9.058377, lng: 7.5020761 },
                position: { lat: 9.058377, lng: 7.5020761 },
              },
            },
            {
              title: "Dar es Salaam",
              address:
                "Address Line 1<br />Address Line 2<br />Zipcode, City<br />Country",
              map: {
                center: { lat: -6.7788438, lng: 39.2526559 },
                position: { lat: -6.7788438, lng: 39.2526559 },
              },
            },
            {
              title: "Cape Town",
              address:
                "Address Line 1<br />Address Line 2<br />Zipcode, City<br />Country",
              map: {
                center: { lat: -33.9225301, lng: 18.2775593 },
                position: { lat: -33.9225301, lng: 18.2775593 },
                zoom: 10,
              },
            },
          ],
          map: {
            apiKey: process.env.GOOGLE_MAPS_API_KEY ?? null,
            icon: "/icons/Type=map-pin, Size=64, Color=Primary.svg",
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
