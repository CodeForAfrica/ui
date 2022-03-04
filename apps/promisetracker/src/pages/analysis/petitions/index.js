import { Grid, useMediaQuery } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import React from "react";

import ActNow from "@/promisetracker/components/ActNow";
import ContentSection from "@/promisetracker/components/ContentPage/Section";
import Subscribe from "@/promisetracker/components/Newsletter";
import Page from "@/promisetracker/components/Page";
import Petitions from "@/promisetracker/components/Petitions";
import actnow from "@/promisetracker/lib/actnow";
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
  sectionTitle: {
    marginBottom: typography.pxToRem(70),
    marginTop: typography.pxToRem(28),
    [breakpoints.up("lg")]: {
      marginBottom: typography.pxToRem(53),
      marginTop: typography.pxToRem(50),
    },
  },
  contentSection: {
    margin: 0,
  },
  petitionCard: {
    marginBottom: typography.pxToRem(20),
  },
  actNow: {},
  footer: {
    marginTop: 0,
  },
}));

function Index({
  actNow,
  footer,
  navigation,
  petitions,
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
      <ContentSection
        content={<Petitions items={petitions} />}
        contentProps={{ lg: 8 }}
        title={title}
        classes={{
          section: classes.section,
          sectionTitle: classes.sectionTitle,
          grid: classes.contentSection,
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

Index.propTypes = {
  actNow: PropTypes.shape({}),
  actNowEnabled: PropTypes.bool,
  footer: PropTypes.shape({}),
  navigation: PropTypes.shape({}),
  petitions: PropTypes.arrayOf(PropTypes.shape({})),
  subscribe: PropTypes.shape({}),
  title: PropTypes.string,
};

Index.defaultProps = {
  actNow: undefined,
  actNowEnabled: undefined,
  footer: undefined,
  navigation: undefined,
  petitions: undefined,
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

  const backend = backendFn();
  const site = await backend.sites().current;
  if (!site.actNowEnabled) {
    return {
      notFound: true,
    };
  }

  const wpApi = wp();
  const page = await wpApi.pages({ slug: "analysis-petitions", locale }).first;
  page.posts = null;
  const petitions = await actnow().petitions().fetchAll();
  const languageAlternates = _.languageAlternates("/analysis/petitions");

  return {
    props: {
      ...page,
      ...site,
      languageAlternates,
      petitions,
    },
  };
}

export default Index;
