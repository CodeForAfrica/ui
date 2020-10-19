import React from "react";
import PropTypes from "prop-types";

import { makeStyles, useTheme } from "@material-ui/core/styles";

import Hero from "@/promisetracker/components/Hero";
import ActNow from "@/promisetracker/components/ActNow";
import KeyPromises from "@/promisetracker/components/KeyPromises";
import LatestArticles from "@/promisetracker/components/LatestArticles";
import LatestPromises from "@/promisetracker/components/LatestPromises";
import Page from "@/promisetracker/components/Page";

import { getSitePage } from "@/promisetracker/cms";
import config from "@/promisetracker/config";
import check from "@/promisetracker/lib/check";
import promiseCarouselImage from "@/promisetracker/assets/promise-carusel-01.png";
import promiseImage from "@/promisetracker/assets/promise-thumb-01.png";

const useStyles = makeStyles(({ breakpoints, typography, widths }) => ({
  section: {
    padding: `0 ${typography.pxToRem(23)}`,
    margin: 0,
    width: "100%",
    [breakpoints.up("lg")]: {
      padding: 0,
      margin: "0 auto",
      width: typography.pxToRem(widths.values.lg),
    },
  },
  footer: {
    marginTop: 0,
  },
}));

function Index(props) {
  const classes = useStyles(props);
  /// console.log(props.promises)
  return (
    <Page classes={{ section: classes.section, footer: classes.footer }}>
      <Hero
        criteria={{
          items: config.promiseStatuses,
          title: "What do the ratings mean?",
        }}
        name="Mike “Sonko” Mbuvi"
        position="Nairobi Governor"
        title="Campaign promises made by Mike Mbuvi"
        classes={{ section: classes.section }}
      />
      <KeyPromises
        actionLabel="Learn More"
        interval={[2017, 2022]}
        items={Array(6)
          .fill(null)
          .map((_, i) => ({
            date: "2019-08-10",
            description: `
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer euismod odio non leo pretium pellentesque. Curabitur blandit urna cursus, malesuada erat ut, egestas odio. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer euismod odio non leo pretium pellentesque. Curabitur blandit urna cursus, malesuada erat ut, egestas odio.
            `,
            events: [
              {
                year: randomYear(),
                title: "Event A",
                color: "white",
                textColor: theme.palette.text.main,
              },
              {
                year: randomYear(),
                title: "Event B",
                color: "white",
                textColor: theme.palette.text.main,
              },
            ],
            image: promiseCarouselImage,
            title: `Codification of national sports and athletics law ${i + 1}`,
            statuses: [
              {
                ...config.promiseStatuses[i % config.promiseStatuses.length],
                year: randomYear(),
              },
            ],
          }))}
        title="Key Promises"
        classes={{
          section: classes.section,
        }}
      />
      <LatestPromises
        actionLabel="See All"
        items={Array(6)
          .fill(null)
          .map((_, i) => ({
            date: "2019-08-10",
            description: `
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
              euismod odio non leo pretium pellentesque.
            `,
            image: promiseImage,
            status: config.promiseStatuses[i % config.promiseStatuses.length],
            title: `Codification of national sports and athletics law ${i + 1}`,
          }))}
        title="Latest Promises"
        classes={{
          section: classes.section,
        }}
      />
      <ActNow
        {...actNow}
        classes={{
          section: classes.section,
        }}
      />
      <LatestArticles
        actionLabel="See All"
        items={Array(6)
          .fill(null)
          .map((_, i) => ({
            date: "2019-08-10",
            description: `
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
              euismod odio non leo pretium pellentesque.
            `,
            image: articleImage,
            title: `Codification of national sports and athletics law ${i + 1}`,
          }))}
        title="Latest Articles"
        classes={{
          section: classes.section,
        }}
      />
      <Partners
        items={config.partners}
        title="Partners"
        classes={{
          section: classes.section,
        }}
      />
      <Subscribe
        {...subscribe}
        classes={{
          section: classes.section,
        }}
      />
    </Page>
  );
}

export async function getStaticProps() {
  const promises = await check("pesacheck-promise-tracker").promises({
    limit: 6,
    query: `{ "projects": ["2831"] }`,
  });
  const promisesByCategories = await check(
    "pesacheck-promise-tracker"
  ).promisesByCategories({
    team: "pesacheck-promise-tracker",
  });
  const props = { promises, promisesByCategories };

  return {
    props,
    revalidate: 1,
  };
}

export default Index;

export async function getStaticProps({ query = {} }) {
  const { lang: pageLanguage } = query;
  const lang = pageLanguage || config.DEFAULT_LANG;
  const page = await getSitePage("analysis-articles", lang);
  const posts = page.page.posts.map((post) => ({
    image: post.featured_image,
    description: post.post_content.replace(/(<([^>]+)>)/gi, ""),
    date: new Date(post.post_date).toLocaleDateString(),
    title: post.post_title,
  }));
  delete page.page.posts;
  return {
    props: {
      page: page.page,
      posts,
      actNow: page.page.actNow,
      subscribe: page.page.subscribe,
    },
    revalidate: 2 * 60, // seconds
  };
}
