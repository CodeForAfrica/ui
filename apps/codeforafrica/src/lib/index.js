/* eslint-disable import/prefer-default-export */

const menu = [
  {
    label: "Our work",
    href: "/our-work",
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
    label: "Opportunity",
    href: "/opportunity",
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

const team = [
  {
    name: "Justin Arenstein",
    title: "CEO of Code for Africa",
    thumbnail: {
      src: "https://res.cloudinary.com/code-for-africa/image/upload/v1653298218/codeforafrica/images/team/image_11_jb8a30.jpg",
    },
  },
  {
    name: "Tolulope Adeyemo",
    title: "Senior Programme Manager",
    thumbnail: {
      src: "https://res.cloudinary.com/code-for-africa/image/upload/v1653300741/codeforafrica/images/team/image_11_fdwgvv.jpg",
    },
  },
  {
    name: "Johnny Miller",
    title: "Co-Founder of africanDRONE",
    thumbnail: {
      src: "https://res.cloudinary.com/code-for-africa/image/upload/v1653300752/codeforafrica/images/team/image_11_mauuaw.png",
    },
  },
];

const articles = [
  {
    title: "Battle for gender equality in African media continues",
    summary:
      "Lorem ipsum dolor sit amet consectetur adipiscing elit mattis, vestibulum potenti rhoncus eget lacus fermentum taciti quam, quis curae accumsan viverra semper dapibus sed. ",
    date: "2022-01-06",
    src: "https://res.cloudinary.com/code-for-africa/image/upload/v1650885664/codeforafrica/unsplash_L6hr1BptcNc_of23p3.png",
    href: "/stories/article-1",
    tags: ["Africa", "Media", "Equality"],
  },
  {
    title:
      "Article title goes in hereArticle title goes in hereArticle title goes in here",
    date: "2022-01-06",
    src: "https://res.cloudinary.com/code-for-africa/image/upload/v1650885141/codeforafrica/unsplash_L85a1k-XqH8_1_g6nf2l.jpg",
    href: "/stories/article-2",
    tags: ["Kenya", "Water scarcity"],
  },
  {
    title: "Article title goes in here",
    date: "2022-01-06",
    src: "https://res.cloudinary.com/code-for-africa/image/upload/v1650885140/codeforafrica/unsplash_L85a1k-XqH8_jyvr9m.jpg",
    href: "/stories/article-3",
  },
  {
    title:
      "Article title goes in hereArticle title goes in hereArticle title goes in here",
    date: "2022-01-06",
    src: "https://res.cloudinary.com/code-for-africa/image/upload/v1650885141/codeforafrica/unsplash_L85a1k-XqH8_2_dkg9uz.jpg",
    href: "/stories/article-4",
    tags: ["Kenya", "Water scarcity"],
  },
  {
    title: "Article title goes in here",
    date: "2022-01-06",
    src: "https://res.cloudinary.com/code-for-africa/image/upload/v1650885141/codeforafrica/unsplash_L85a1k-XqH8_1_g6nf2l.jpg",
    href: "/stories/article-5",
    tags: ["Kenya"],
  },
  {
    title: "Article title goes in here",
    date: "2022-01-06",
    src: "https://res.cloudinary.com/code-for-africa/image/upload/v1650885140/codeforafrica/unsplash_L85a1k-XqH8_jyvr9m.jpg",
    href: "/stories/article-6",
    tags: ["Water scarcity"],
  },
  {
    title: "Article title goes in here",
    date: "2022-01-06",
    src: "https://res.cloudinary.com/code-for-africa/image/upload/v1650885141/codeforafrica/unsplash_L85a1k-XqH8_2_dkg9uz.jpg",
    href: "/stories/article-7",
  },
  {
    title: "Article title goes in here",
    date: "2022-01-06",
    src: "https://res.cloudinary.com/code-for-africa/image/upload/v1650885141/codeforafrica/unsplash_L85a1k-XqH8_1_g6nf2l.jpg",
    href: "/stories/article-8",
  },
  {
    title: "Article title goes in here",
    date: "2022-01-06",
    src: "https://res.cloudinary.com/code-for-africa/image/upload/v1650885140/codeforafrica/unsplash_L85a1k-XqH8_jyvr9m.jpg",
    href: "/stories/article-9",
  },
  {
    title: "Article title goes in here",
    date: "2022-01-06",
    src: "https://res.cloudinary.com/code-for-africa/image/upload/v1650885141/codeforafrica/unsplash_L85a1k-XqH8_2_dkg9uz.jpg",
    href: "/stories/article-10",
  },
  {
    title: "Article title goes in here",
    date: "2022-01-06",
    src: "https://res.cloudinary.com/code-for-africa/image/upload/v1650885141/codeforafrica/unsplash_L85a1k-XqH8_1_g6nf2l.jpg",
    href: "/stories/article-11",
  },
  {
    title: "Article title goes in here",
    date: "2022-01-06",
    src: "https://res.cloudinary.com/code-for-africa/image/upload/v1650885140/codeforafrica/unsplash_L85a1k-XqH8_jyvr9m.jpg",
    href: "/stories/article-12",
  },
  {
    title: "Article title goes in here",
    date: "2022-01-06",
    src: "https://res.cloudinary.com/code-for-africa/image/upload/v1650885141/codeforafrica/unsplash_L85a1k-XqH8_2_dkg9uz.jpg",
    href: "/stories/article-13",
    tags: ["Decision-making", "Empowerment citizens"],
  },
];

export const partners = [
  {
    name: "Meta",
    logo: {
      src: "https://res.cloudinary.com/code-for-africa/image/upload/v1652880227/codeforafrica/images/logos/meta_fkcccg.png",
    },
  },
  {
    name: "Google News Initiatives",
    logo: {
      src: "https://res.cloudinary.com/code-for-africa/image/upload/v1652880227/codeforafrica/images/logos/google-news-initiatives_wigxyj.png",
    },
  },
  {
    name: "AFD",
    logo: {
      src: "https://res.cloudinary.com/code-for-africa/image/upload/v1652880227/codeforafrica/images/logos/afd_urdyat.png",
    },
  },
  {
    name: "Deutsche Welle",
    logo: {
      src: "https://res.cloudinary.com/code-for-africa/image/upload/v1652880226/codeforafrica/images/logos/dw_isxfhn.png",
    },
  },
  {
    name: "GIZ",
    logo: {
      src: "https://res.cloudinary.com/code-for-africa/image/upload/v1652880227/codeforafrica/images/logos/giz_sx5mja.png",
    },
  },
  {
    name: "The World Bank",
    logo: {
      src: "https://res.cloudinary.com/code-for-africa/image/upload/v1652880227/codeforafrica/images/logos/the-world-bank_lbksih.png",
    },
  },
  {
    name: "Pulitzer Center",
    logo: {
      src: "https://res.cloudinary.com/code-for-africa/image/upload/v1652880227/codeforafrica/images/logos/pulitzer-center_gkg9s2.png",
    },
  },
  {
    name: "Unesco",
    logo: {
      src: "https://res.cloudinary.com/code-for-africa/image/upload/v1652880227/codeforafrica/images/logos/unesco_hvtpwf.png",
    },
  },
  {
    name: "ICJF",
    logo: {
      src: "https://res.cloudinary.com/code-for-africa/image/upload/v1652880227/codeforafrica/images/logos/icjf_o8asj2.png",
    },
  },
  {
    name: "Code for All",
    logo: {
      src: "https://res.cloudinary.com/code-for-africa/image/upload/v1652880227/codeforafrica/images/logos/code-for-all_l2vmvq.png",
    },
  },
];

export const projects = [
  {
    slug: "african-drone",
    name: "africanDRONE",
    tagLine: "Drones for good",
    title:
      'Empowering citizens through <span class="highlight">drone technology</span>',
    subtitle:
      "AfricanDRONE brings together communities of drone operators, enthusiasts, journalists, activists, and entrepreneurs in Africa who use drones for good.",
    description:
      "This award-winning initiative works to give citizens a new perspective on their lives. Using drone technology, africanDRONE empowers local pilots through a self-help network that offers seed funding, skills development, resource sharing, advocacy, and networking opportunities for members. The goal is to support the evolution of a vibrant and diverse drone ecosystem across Africa.",
    icon: {
      src: "https://res.cloudinary.com/code-for-africa/image/upload/v1652431239/codeforafrica/icons/Type_africanDRONE_exwdyu.svg",
    },
    thumbnail: {
      src: "https://res.cloudinary.com/code-for-africa/image/upload/v1652705960/codeforafrica/images/Property_1_africanDRONE_y4surg.jpg",
    },
    category: "Projects",
    href: "/projects/african-drone",
  },
  {
    slug: "wana-data",
    name: "WanaData",
    tagLine: "Women in Africa",
    title:
      'Uplifting <span class="highlight">women in Africa</span> with a focus on data-driven projects',
    subtitle:
      "The WanaData community drives collaborative work and supports members in achieving their professional goals. ",
    description:
      "<p>WanaData is a Pan-African network of female data scientists, journalists and technologists working to change the digital landscape by producing and promoting data-driven projects while applying digital technologies in storytelling. It has grown from an initial 6 members in Nigeria to more than 400 women across the continent.</p><p>WanaData members have collaborated on cross-border reporting projects that incorporate data visualisation, artificial intelligence, audience engagement strategies, social videos, drone journalism and other innovative approaches, to enhance news content on the continent.",
    icon: {
      src: "https://res.cloudinary.com/code-for-africa/image/upload/v1652431239/codeforafrica/icons/Type_WanaData_neqwtm.svg",
    },
    thumbnail: {
      src: "https://res.cloudinary.com/code-for-africa/image/upload/v1652705959/codeforafrica/images/Property_1_WanaData_t3tbex.jpg",
    },
    category: "Projects",
    href: "/projects/wana-data",
  },
  {
    slug: "pesa-check",
    name: "PesaCheck",
    tagLine: "Africa fact-checking",
    title:
      'Africa’s largest <span class="highlight">indigenous fact-checking</span> organisation',
    subtitle:
      "PesaCheck, a pioneering verification initiative, debunks misleading claims with full-time fact-checkers in 15 African countries.",
    description:
      "<p>PesaCheck is a pioneering verification initiative that is kickstarting fact-checking across Africa. Initially focused on verifying the financial and other statistical numbers quoted by public figures in Kenya, Tanzania and Uganda, PesaCheck is now Africa’s largest with full-time fact-checkers in 15 countries in both east and west Africa, as well as across the Sahel.</p><p>PesaCheck fact-checks in two international languages (English and French), as well as major African languages such as Kiswahili and Amharic. Our network helps track political promises by politicians (through our Wajibisha/PromiseTracker toolkit), helps unpack budget and census data (through our PesaYetu and TaxClock platforms), and builds machine learning/artificial intelligence tools (such as DebunkBot) to help automate verification.</p>",
    icon: {
      src: "https://res.cloudinary.com/code-for-africa/image/upload/v1652431239/codeforafrica/icons/Type_PesaCheck_rmswvg.svg",
    },
    thumbnail: {
      src: "https://res.cloudinary.com/code-for-africa/image/upload/v1652705959/codeforafrica/images/Property_1_PesaCheck_iahlrh.jpg",
    },
    category: "Projects",
    href: "/projects/pesa-check",
  },
  {
    slug: "open-africa",
    name: "openAFRICA",
    tagLine: "Volunteer open data",
    title:
      'Empowering citizens through <span class="highlight">drone technology</span>',
    subtitle:
      "AfricanDRONE brings together communities of drone operators, enthusiasts, journalists, activists, and entrepreneurs in Africa who use drones for good.",
    description:
      "This award-winning initiative works to give citizens a new perspective on their lives. Using drone technology, africanDRONE empowers local pilots through a self-help network that offers seed funding, skills development, resource sharing, advocacy, and networking opportunities for members. The goal is to support the evolution of a vibrant and diverse drone ecosystem across Africa.",
    icon: {
      src: "https://res.cloudinary.com/code-for-africa/image/upload/v1652431239/codeforafrica/icons/Type_openAFRICA_cczpuq.svg",
    },
    thumbnail: {
      src: "https://res.cloudinary.com/code-for-africa/image/upload/v1652705959/codeforafrica/images/Property_1_PesaCheck_iahlrh.jpg",
    },
    category: "Projects",
    href: "/projects/open-africa",
  },
  {
    slug: "civic-signal",
    name: "CivicSignal",
    tagLine: "Africa media ecosystem",
    title:
      'Empowering citizens through <span class="highlight">drone technology</span>',
    subtitle:
      "AfricanDRONE brings together communities of drone operators, enthusiasts, journalists, activists, and entrepreneurs in Africa who use drones for good.",
    description:
      "This award-winning initiative works to give citizens a new perspective on their lives. Using drone technology, africanDRONE empowers local pilots through a self-help network that offers seed funding, skills development, resource sharing, advocacy, and networking opportunities for members. The goal is to support the evolution of a vibrant and diverse drone ecosystem across Africa.",
    icon: {
      src: "https://res.cloudinary.com/code-for-africa/image/upload/v1652431239/codeforafrica/icons/Type_CivicSignal_ayzj31.svg",
    },
    thumbnail: {
      src: "https://res.cloudinary.com/code-for-africa/image/upload/v1652705959/codeforafrica/images/Property_1_PesaCheck_iahlrh.jpg",
    },
    category: "Projects",
    href: "/projects/civic-signal",
  },
  {
    slug: "source-africa",
    name: "sourceAfrica",
    tagLine: "Actionable documents",
    title:
      'Empowering citizens through <span class="highlight">drone technology</span>',
    subtitle:
      "AfricanDRONE brings together communities of drone operators, enthusiasts, journalists, activists, and entrepreneurs in Africa who use drones for good.",
    description:
      "This award-winning initiative works to give citizens a new perspective on their lives. Using drone technology, africanDRONE empowers local pilots through a self-help network that offers seed funding, skills development, resource sharing, advocacy, and networking opportunities for members. The goal is to support the evolution of a vibrant and diverse drone ecosystem across Africa.",
    icon: {
      src: "https://res.cloudinary.com/code-for-africa/image/upload/v1652431402/codeforafrica/icons/Type_SourceAfrica_m7yvmt.svg",
    },
    thumbnail: {
      src: "https://res.cloudinary.com/code-for-africa/image/upload/v1652705959/codeforafrica/images/Property_1_PesaCheck_iahlrh.jpg",
    },
    category: "Projects",
    href: "/projects/source-africa",
  },
  {
    slug: "initiative-africa",
    name: "initiativeAFRICA",
    tagLine: "Initiative tag line",
    title:
      'Empowering citizens through <span class="highlight">drone technology</span>',
    subtitle:
      "AfricanDRONE brings together communities of drone operators, enthusiasts, journalists, activists, and entrepreneurs in Africa who use drones for good.",
    description:
      "This award-winning initiative works to give citizens a new perspective on their lives. Using drone technology, africanDRONE empowers local pilots through a self-help network that offers seed funding, skills development, resource sharing, advocacy, and networking opportunities for members. The goal is to support the evolution of a vibrant and diverse drone ecosystem across Africa.",
    icon: {
      src: "https://res.cloudinary.com/code-for-africa/image/upload/v1652431402/codeforafrica/icons/Type_SourceAfrica_m7yvmt.svg",
    },
    thumbnail: {
      src: "https://res.cloudinary.com/code-for-africa/image/upload/v1652705959/codeforafrica/images/Property_1_PesaCheck_iahlrh.jpg",
    },
    category: "Initiatives",
    href: "/projects/initiative-africa",
  },
  {
    slug: "knowledge-africa",
    name: "knowledgeAFRICA",
    tagLine: "Knowledge tag line",
    title:
      'Empowering citizens through <span class="highlight">drone technology</span>',
    subtitle:
      "AfricanDRONE brings together communities of drone operators, enthusiasts, journalists, activists, and entrepreneurs in Africa who use drones for good.",
    description:
      "This award-winning initiative works to give citizens a new perspective on their lives. Using drone technology, africanDRONE empowers local pilots through a self-help network that offers seed funding, skills development, resource sharing, advocacy, and networking opportunities for members. The goal is to support the evolution of a vibrant and diverse drone ecosystem across Africa.",
    icon: {
      src: "https://res.cloudinary.com/code-for-africa/image/upload/v1652431402/codeforafrica/icons/Type_SourceAfrica_m7yvmt.svg",
    },
    thumbnail: {
      src: "https://res.cloudinary.com/code-for-africa/image/upload/v1652705959/codeforafrica/images/Property_1_PesaCheck_iahlrh.jpg",
    },
    category: "Knowedge",
    href: "/projects/knowledge-africa",
  },
];

const DEFAULT_REVALIDATE = 3 * 60; // 3 minutes

function getHomePageStaticProps() {
  return {
    props: {
      title: "Code for Africa",
      sections: [
        {
          slug: "projects",
          projects: projects.map(({ slug, name, tagLine, icon, category }) => ({
            name,
            tagLine,
            icon,
            category,
            href: `/projects/${slug}`,
          })),
        },
        {
          slug: "news-stories",
          title: "News and stories",
          articles: articles.slice(0, 4),
        },
        {
          slug: "our-partners",
          title:
            'We’ve partnered with <span class="highlight">100+ organisations</span> including',
          partners,
        },
      ],
      footer,
      navbar,
    },
    revalidate: DEFAULT_REVALIDATE,
  };
}

function getProjectsPageStaticProps() {
  return {
    props: {
      title: "Our Work | Code for Africa",
      sections: [
        {
          slug: "projects",
          projects,
        },
      ],
      footer,
      navbar,
    },
    revalidate: DEFAULT_REVALIDATE,
  };
}

function getProjectPageStaticProps(params) {
  const project = projects.find(
    ({ href }) =>
      href.localeCompare(params?.slug, undefined, {
        sensitivity: "accent",
      }) === 0
  );
  if (project) {
    return {
      props: {
        title: `${project.name} | Projects | Code for Africa`,
        project,
        sections: [
          {
            slug: "team",
            team: team.slice(0, 3),
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

function getStoriesPageStaticProps() {
  return {
    props: {
      title: "Stories | Code for Africa",
      sections: [
        {
          slug: "articles",
          title: "Articles",
          articles,
        },
      ],
      footer,
      navbar,
    },
    revalidate: DEFAULT_REVALIDATE,
  };
}

function getStoryPageStaticProps(params) {
  const article = articles.find(
    ({ href }) =>
      href.localeCompare(params?.slug, undefined, {
        sensitivity: "accent",
      }) === 0
  );
  if (article) {
    return {
      props: {
        title: `${article.title} | Stories | Code for Africa`,
        article,
        sections: [
          {
            slug: "related-stories",
            title: "News and Stories",
            articles: articles.slice(0, 3),
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

function getAboutPageStaticProps() {
  return {
    props: {
      title: "About | Code for Africa",
      sections: [
        {
          slug: "our-partners",
          title: "Our partners",
          partners,
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
    case "/projects": {
      return getProjectsPageStaticProps(params);
    }
    case "/stories": {
      return getStoriesPageStaticProps(params);
    }
    default:
      if (params?.slug?.startsWith("/projects/")) {
        return getProjectPageStaticProps(params);
      }
      if (params?.slug?.startsWith("/stories/")) {
        return getStoryPageStaticProps(params);
      }
      return { notFound: true };
  }
}
