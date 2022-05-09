/* eslint-disable import/prefer-default-export */
import facebook from "@/codeforafrica/assets/images/facebook.png";
import github from "@/codeforafrica/assets/images/github.png";
import instagram from "@/codeforafrica/assets/images/instagram.png";
import linkedin from "@/codeforafrica/assets/images/linkedin.png";
import slack from "@/codeforafrica/assets/images/slack.png";
import twitter from "@/codeforafrica/assets/images/twitter.png";

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

const footer = {
  socialMedia: [
    {
      url: "https://twitter.com/Code4Africa",
      image: { alt: "Twitter", url: twitter.src },
    },
    {
      url: "https://cfa.slack.com",
      image: { alt: "Slack", url: slack.src },
    },
    {
      url: "https://ke.linkedin.com/company/code-for-africa",
      image: { alt: "LinkedIn", url: linkedin.src },
    },
    {
      url: "https://www.facebook.com/CodeForAfrica/",
      image: { alt: "Facebook", url: facebook.src },
    },
    {
      url: "https://www.instagram.com/code4africa__/",
      image: { alt: "Instagram", url: instagram.src },
    },
    {
      url: "https://github.com/CodeForAfrica",
      image: { alt: "Github", url: github.src },
    },
  ],
  footerLinks: {
    main: [
      { name: "Our Work", href: "www.work.com" },
      { name: "About", href: "www.about.com" },
      { name: "Stories", href: "www.stories.com" },
      { name: "Opportunities", href: "www.opportunities.com" },
      { name: "Contact", href: "www.contact.com" },
    ],
    secondary: [
      { name: "Imprint", href: "www.imprint.com" },
      { name: "Privacy policy", href: "www.policy.com" },
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

const articles = [
  {
    title: "Battle for gender equality in African media continues",
    summary:
      "Lorem ipsum dolor sit amet consectetur adipiscing elit mattis, vestibulum potenti rhoncus eget lacus fermentum taciti quam, quis curae accumsan viverra semper dapibus sed. ",
    date: "2022-01-06",
    src: "https://res.cloudinary.com/code-for-africa/image/upload/v1650885664/codeforafrica/unsplash_L6hr1BptcNc_of23p3.png",
    href: "/stories/article-1",
  },
  {
    title:
      "Article title goes in hereArticle title goes in hereArticle title goes in here",
    date: "2022-01-06",
    src: "https://res.cloudinary.com/code-for-africa/image/upload/v1650885141/codeforafrica/unsplash_L85a1k-XqH8_1_g6nf2l.jpg",
    href: "/stories/article-2",
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
  },
  {
    title: "Article title goes in here",
    date: "2022-01-06",
    src: "https://res.cloudinary.com/code-for-africa/image/upload/v1650885141/codeforafrica/unsplash_L85a1k-XqH8_1_g6nf2l.jpg",
    href: "/stories/article-5",
  },
  {
    title: "Article title goes in here",
    date: "2022-01-06",
    src: "https://res.cloudinary.com/code-for-africa/image/upload/v1650885140/codeforafrica/unsplash_L85a1k-XqH8_jyvr9m.jpg",
    href: "/stories/article-6",
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
  },
];

const DEFAULT_REVALIDATE = 3 * 60; // 3 minutes

function getHomePageStaticProps() {
  return {
    props: {
      title: "Code for Africa",
      sections: [
        {
          slug: "news-stories",
          title: "News and stories",
          articles: articles.slice(0, 4),
        },
      ],
      footer,
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
          cta: {},
        },
      ],
      footer,
    },
    revalidate: DEFAULT_REVALIDATE,
  };
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
      return { notFound: true };
  }
}
