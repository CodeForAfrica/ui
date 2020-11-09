import React from "react";
import PropTypes from "prop-types";

import { makeStyles } from "@material-ui/core/styles";

import ActNow from "@/promisetracker/components/ActNow";
import Articles from "@/promisetracker/components/Articles";
import Page from "@/promisetracker/components/Page";
import Subscribe from "@/promisetracker/components/Newsletter";

import i18n from "@/promisetracker/lib/i18n";
import wp from "@/promisetracker/lib/wp";

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

function Index({ actNow, articles, footer, navigation, subscribe, ...props }) {
  const classes = useStyles(props);

  return (
    <Page
      {...props}
      footer={footer}
      navigation={navigation}
      classes={{ section: classes.section, footer: classes.footer }}
    >
      <Articles
        items={articles}
        classes={{
          section: classes.section,
          sectionTitle: classes.sectionTitle,
        }}
      />
      <ActNow
        {...actNow}
        classes={{
          section: classes.section,
          root: classes.actNow,
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

Index.propTypes = {
  actNow: PropTypes.shape({}),
  articles: PropTypes.arrayOf(PropTypes.shape({})),
  footer: PropTypes.shape({}),
  navigation: PropTypes.shape({}),
  subscribe: PropTypes.shape({}),
};

Index.defaultProps = {
  articles: undefined,
  actNow: undefined,
  footer: undefined,
  navigation: undefined,
  subscribe: undefined,
};

export async function getStaticProps({ locale }) {
  if (!i18n().locales.includes(locale)) {
    return {
      notFound: true,
    };
  }

  const page = await wp().pages({ slug: "analysis-articles", locale }).first;
  const articles =
    page.posts?.map((post) => ({
      image: post.featured_image,
      description: post.post_content.replace(/(<([^>]+)>)/gi, ""),
      date: new Date(post.post_date).toLocaleDateString(),
      title: post.post_title,
    })) || null;
  page.posts = null;

  return {
    props: {
      ...page,
      articles,
    },
  };
}

export default Index;
