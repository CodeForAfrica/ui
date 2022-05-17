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
    href: "/about",
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

const projects = [
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
    category: "Projects",
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
    category: "Projects",
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
    category: "Projects",
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
    category: "Projects",
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
    category: "Projects",
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
    category: "Projects",
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
      ],
      footer,
      navbar,
    },
    revalidate: DEFAULT_REVALIDATE,
  };
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
      },
      revalidate: DEFAULT_REVALIDATE,
    };
  }

  return { notFound: true };
}

export async function getPageStaticProps(params) {
  switch (params?.slug) {
    case "/": {
      return getHomePageStaticProps(params);
    }
    case "/stories": {
      return getStoriesPageStaticProps(params);
    }
    default:
      if (params?.slug?.startsWith("/stories/")) {
        return getStoryPageStaticProps(params);
      }
      return { notFound: true };
  }
}
