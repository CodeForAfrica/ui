import React from "react";
import PropTypes from "prop-types";

import { makeStyles } from "@material-ui/core/styles";

import ActNow from "@/promisetracker/components/ActNow";
import Promises from "@/promisetracker/components/Promises";
import Page from "@/promisetracker/components/Page";
import Subscribe from "@/promisetracker/components/Newsletter";

import config from "@/promisetracker/config";
import { getSitePage } from "@/promisetracker/cms";

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
  actNow: {
    display: "none",
    [breakpoints.up("lg")]: {
      display: "flex",
    },
  },
  footer: {
    marginTop: 0,
  },
}));

function Index({ page, posts, actNow, subscribe, title, ...props }) {
  const classes = useStyles(props);

  return (
    <Page {...page} title={title} classes={{ section: classes.section }}>
      <Promises
        items={posts}
        title={title}
        classes={{
          section: classes.section,
        }}
      />
      <Hidden lgDown>
        <ActNow
          {...actNow}
          classes={{
            section: classes.section,
          }}
        />
      </Hidden>

      <Subscribe
        {...subscribe}
        classes={{
          section: classes.section,
        }}
      />
    </Page>
  );
}

Index.propTypes = {
  page: PropTypes.shape({}).isRequired,
  posts: PropTypes.shape({}),
  actNow: PropTypes.shape({}),
  subscribe: PropTypes.shape({}),
  title: PropTypes.string,
};

Index.defaultProps = {
  posts: undefined,
  actNow: undefined,
  subscribe: undefined,
  title: "Promises",
};

export default Index;

export async function getStaticProps({ query = {} }) {
  const { lang: pageLanguage } = query;
  const lang = pageLanguage || config.DEFAULT_LANG;
  const page = await getSitePage("promises", lang);
  const posts = page.page.posts.map((post, i) => ({
    image: post.featured_image,
    description: post.post_content.replace(/(<([^>]+)>)/gi, ""),
    date: new Date(post.post_date).toLocaleDateString(),
    title: post.post_title,
    status: config.promiseStatuses[i % config.promiseStatuses.length],
  }));
  delete page.page.posts;
  return {
    props: {
      page: page.page,
      posts,
      actNow: page.page.actNow,
      subscribe: page.page.subscribe,
      title: page.page.title.rendered,
    },
  };
}
