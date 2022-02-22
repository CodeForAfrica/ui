import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import React from "react";

import Page from "@/promisetracker/components/Page";
import Petition from "@/promisetracker/components/Petition";
import actnow from "@/promisetracker/lib/actnow";
import i18n from "@/promisetracker/lib/i18n";
import backendFn from "@/promisetracker/lib/backend";
import wp from "@/promisetracker/lib/wp";

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
  sectionTitle: {
    marginBottom: typography.pxToRem(21),
    marginTop: typography.pxToRem(46),
    [breakpoints.up("lg")]: {
      marginBottom: 0,
      marginTop: typography.pxToRem(96),
    },
  },
  footer: {
    marginTop: 0,
  },
  subscribe: {
    marginTop: typography.pxToRem(53),
    [breakpoints.up("lg")]: {
      marginTop: typography.pxToRem(28),
    },
  },
}));

/**
 * Since we wnat /analysis/articles to be different from /analysis/articles/[slug],
 * we need to make sure [slug] doesn't return "" from getStaticPaths.
 */
function Index({
  article,
  footer,
  navigation,
  petition,
  relatedArticles,
  subscribe,
  title: titleProp,
  ...props
}) {
  const classes = useStyles(props);
  const title = article?.title ? `${article.title} | ${titleProp}` : titleProp;

  return (
    <Page
      {...props}
      footer={footer}
      navigation={navigation}
      title={title}
      classes={{ section: classes.section, footer: classes.footer }}
    >
      <Petition petitionPost={petition} {...props} />
    </Page>
  );
}

Index.propTypes = {
  classes: PropTypes.shape({
    section: PropTypes.string,
    sectionTitle: PropTypes.string,
  }),
  article: PropTypes.shape({
    date: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string,
    title: PropTypes.string,
  }),
  footer: PropTypes.shape({}),
  navigation: PropTypes.shape({}),
  subscribe: PropTypes.shape({}),
  petition: PropTypes.shape({}),
  relatedArticles: PropTypes.arrayOf(PropTypes.shape({})),
  title: PropTypes.string,
};

Index.defaultProps = {
  article: undefined,
  classes: undefined,
  footer: undefined,
  navigation: undefined,
  relatedArticles: undefined,
  subscribe: undefined,
  title: undefined,
  petition: undefined,
};

export async function getStaticPaths() {
  const fallback = true;
  // replace
  const unlocalizedPaths = [
    { params: { slug: "1" } },
    { params: { slug: "2" } },
    { params: { slug: "3" } },
    { params: { slug: "4" } },
    { params: { slug: "5" } },
  ];

  const paths = i18n().localizePaths(unlocalizedPaths);

  return { fallback, paths };
}

export async function getStaticProps({ params: { slug: slugParam }, locale }) {
  const backend = backendFn();
  const wpApi = wp();

  const petition = await actnow().petition(slugParam).lists;
  const page = await wpApi.pages({ slug: "promises", locale }).first;
  const actNowPage = await wpApi.pages({ slug: "act-now", locale }).first;
  const site = await backend.sites().current;

  return {
    props: {
      ...page,
      ...actNowPage,
      ...site,
      petition,
    },
  };
}

export default Index;
