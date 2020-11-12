import React from "react";
import PropTypes from "prop-types";

import { Grid, useMediaQuery } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";

import ActNow from "@/promisetracker/components/ActNow";
import FactCheckCard from "@/promisetracker/components/FactCheckCard";
import Page from "@/promisetracker/components/Page";
import PostCardGrid from "@/promisetracker/components/PostCardGrid";
import Subscribe from "@/promisetracker/components/Newsletter";

import i18n from "@/promisetracker/lib/i18n";
import pc from "@/promisetracker/lib/pc";
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

function FactChecks({
  actNow,
  factChecks,
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
        component={FactCheckCard}
        items={factChecks}
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
        <Grid item>
          <ActNow
            {...actNow}
            classes={{
              section: classes.section,
              root: classes.actNow,
            }}
          />
        </Grid>
      </Grid>
    </Page>
  );
}

FactChecks.propTypes = {
  actNow: PropTypes.shape({}),
  factChecks: PropTypes.arrayOf(PropTypes.shape({})),
  footer: PropTypes.shape({}),
  navigation: PropTypes.shape({}),
  subscribe: PropTypes.shape({}),
  title: PropTypes.string,
};

FactChecks.defaultProps = {
  actNow: undefined,
  factChecks: undefined,
  footer: undefined,
  navigation: undefined,
  subscribe: undefined,
  title: undefined,
};

export async function getStaticProps({ locale }) {
  const _ = i18n();
  if (!_.locales.includes(locale)) {
    return {
      notFound: true,
    };
  }

  const page = await wp().pages({ slug: "analysis-fact-checks", locale }).first;
  const factChecks = await pc().factChecks().latest;
  const languageAlternates = _.languageAlternates("/analysis/fact-checks");

  return {
    props: {
      ...page,
      factChecks,
      languageAlternates,
    },
    revalidate: 2 * 60, // seconds
  };
}

export default FactChecks;
