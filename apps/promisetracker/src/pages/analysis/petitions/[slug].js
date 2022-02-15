import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import React from "react";

import Page from "@/promisetracker/components/Page";
import Petition from "@/promisetracker/components/Petition";

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
  relatedArticles,
  subscribe,
  title: titleProp,
  ...props
}) {
  const classes = useStyles(props);
  const title = article?.title ? `${article.title} | ${titleProp}` : titleProp;

  const footer = {
    about: {
      about:
        "PromiseTracker, is a tool to help journalists and civil society watchdogs more easily track campaign promises and other political / government pledges, using official evidence / data, as well as crowdsourced information, with a transparent and defensible methodology, to help inject accountability and honesty into the often cavalier way that promises are made to citizens to win their support for elections, policies and contracts but are seldom honoured. ",
      initiative:
        "This site is an openAFRICA project of Code for Africa. All content is released under a Creative Commons 4 Attribution Licence. Reuse it to help empower your own community. The code is available on GitHub and data is available on openAFRICA.",
    },
    copyright: {
      children: "PROMISETRACKER",
      src: {
        src: "/_next/static/media/cc.89a4f96d.svg",
        height: 19,
        width: 19,
      },
      alt: "Copyright",
    },
    initiativeLogo: {
      image:
        "https://dashboard.hurumap.org/wp-content/uploads/2020/05/pulitzer.png",
      link: "#",
      alt: "Pulitzer Center",
    },
    legalLinks: [],
    organizationLogo: {},
    quickLinks: [
      {
        title: "About Us",
        links: [
          {
            label: "The project",
            href: "/about/project",
          },
          {
            label: "The team",
            href: "/about/team",
          },
          {
            label: "The partners",
            href: "/about/partners",
          },
          {
            label: "Methodology",
            href: "/about/methodology",
          },
        ],
      },
      {
        title: "More",
        links: [
          {
            label: "Subscribe",
            href: "/subscribe",
          },
          {
            label: "Join Us",
            href: "/join",
          },
          {
            label: "FAQ",
            href: "/faq",
          },
          {
            label: "Resources",
            href: "/resources",
          },
        ],
      },
    ],
    social: [],
  };

  const navigation = {
    actNow: { href: "/act-now", order: 2, title: "Act Now" },
    analysis: {
      title: "Analysis",
      order: 1,
      navigation: {
        0: { href: "/analysis/articles", order: 0, title: "Articles" },
        1: { href: "/analysis/petitions", order: 1, title: "Petitions" },
        2: { href: "/analysis/fact-checks", order: 3, title: "Fact-Checks" },
      },
    },
    promises: { href: "/promises", order: 0, title: "Promises" },
  };

  return (
    <Page
      // {...props}
      footer={footer}
      navigation={navigation}
      title={title}
      classes={{ section: classes.section, footer: classes.footer }}
    >
      <Petition />
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
};

export default Index;
