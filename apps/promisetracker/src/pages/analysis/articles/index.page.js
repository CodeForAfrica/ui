import { Grid, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import makeStyles from "@mui/styles/makeStyles";
import PropTypes from "prop-types";
import React from "react";

import ActNow from "@/promisetracker/components/ActNow";
import ArticleCard from "@/promisetracker/components/ArticleCard";
import Subscribe from "@/promisetracker/components/Newsletter";
import Page from "@/promisetracker/components/Page";
import PostCardGrid from "@/promisetracker/components/PostCardGrid";
import backendFn from "@/promisetracker/lib/backend";
import i18n from "@/promisetracker/lib/i18n";
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
  sectionTitle: {},
  actNow: {},
  footer: {
    marginTop: 0,
  },
}));

function Index({
  actNow,
  actNowEnabled,
  articles,
  footer,
  navigation,
  subscribe,
  title,
  ...props
}) {
  const classes = useStyles(props);
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));
  const direction = isDesktop ? "column-reverse" : "column";

  return (
    <Page
      {...props}
      footer={footer}
      navigation={navigation}
      title={title}
      classes={{ section: classes.section, footer: classes.footer }}
    >
      <PostCardGrid
        component={ArticleCard}
        items={articles}
        title={title}
        classes={{
          section: classes.section,
          sectionTitle: classes.sectionTitle,
        }}
      />
      <Grid container direction={direction}>
        <Grid item>
          <Subscribe
            {...subscribe}
            classes={{
              section: classes.section,
            }}
          />
        </Grid>
        {actNowEnabled ? (
          <Grid item>
            <ActNow
              {...actNow}
              classes={{
                section: classes.section,
                root: classes.actNow,
              }}
            />
          </Grid>
        ) : null}
      </Grid>
    </Page>
  );
}

Index.propTypes = {
  actNow: PropTypes.shape({}),
  actNowEnabled: PropTypes.bool,
  articles: PropTypes.arrayOf(PropTypes.shape({})),
  footer: PropTypes.shape({}),
  navigation: PropTypes.shape({}),
  subscribe: PropTypes.shape({}),
  title: PropTypes.string,
};

export async function getStaticProps({ locale }) {
  const _ = i18n();
  if (!_.locales.includes(locale)) {
    return {
      notFound: true,
    };
  }

  const backend = backendFn();
  const site = await backend.sites().current;
  if (!site.articlesEnabled) {
    return {
      notFound: true,
    };
  }

  const wpApi = wp();
  const page = await wpApi.pages({ slug: "analysis-articles", locale }).first;
  const posts = await wpApi.pages({ page }).posts;
  const articles = posts?.slice(0, 4) || null;
  page.posts = null;
  const languageAlternates = _.languageAlternates("/analysis/articles");

  return {
    props: {
      ...page,
      ...site,
      articles,
      languageAlternates,
    },
    revalidate: 2 * 60, // seconds
  };
}

export default Index;
