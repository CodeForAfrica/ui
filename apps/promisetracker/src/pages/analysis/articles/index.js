import React from "react";
import PropTypes from "prop-types";

import { makeStyles } from "@material-ui/core/styles";

import ActNow from "@/promisetracker/components/ActNow";
import Articles from "@/promisetracker/components/Articles";
import Page from "@/promisetracker/components/Page";
import Subscribe from "@/promisetracker/components/Newsletter";
import { getSitePage } from "@/promisetracker/cms";
import config from "@/promisetracker/config";

const useStyles = makeStyles(
  ({ breakpoints, typography, widths, palette }) => ({
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
    sectionTitle: {
      width: "4.5rem",
      fontWeight: 600,
      marginBottom: 0,
      borderBottom: `.4rem solid ${palette.primary.dark}`,
      paddingRight: "1.5rem",
      marginTop: typography.pxToRem(64),
      [breakpoints.up("lg")]: {
        width: "5rem",
        marginBottom: typography.pxToRem(32),
        marginTop: typography.pxToRem(35),
      },
    },
    actNow: {
      display: "none",
      [breakpoints.up("lg")]: {
        display: "flex",
      },
    },
    footer: {
      marginTop: 0,
    },
  })
);

function Index({ page, posts, ...props }) {
  const classes = useStyles(props);
  const {
    page: { title: pageTitle },
  } = page;

  return (
    <Page {...page} title={pageTitle} classes={{ section: classes.section }}>
      <Articles
        items={posts}
        title={pageTitle}
        classes={{
          section: classes.section,
          sectionTitle: classes.sectionTitle,
        }}
      />
      <ActNow
        classes={{
          section: classes.section,
          root: classes.actNow,
        }}
      />
      <Subscribe
        classes={{
          section: classes.section,
        }}
      />
    </Page>
  );
}

Index.propTypes = {
  page: PropTypes.shape({
    page: PropTypes.shape({
      title: PropTypes.string,
    }),
  }).isRequired,
  posts: PropTypes.shape({}),
};

Index.defaultProps = {
  posts: undefined,
};

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
      page,
      posts,
    },
  };
}
