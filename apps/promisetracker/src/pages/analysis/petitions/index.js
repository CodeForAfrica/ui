import { Grid, useMediaQuery } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import React from "react";

import ActNow from "@/promisetracker/components/ActNow";
import ContentSection from "@/promisetracker/components/ContentPage/Section";
import Subscribe from "@/promisetracker/components/Newsletter";
import Page from "@/promisetracker/components/Page";
import PetitionCard from "@/promisetracker/components/PetitionCard";
import config from "@/promisetracker/config";
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
        content={petitions?.map((petition) => (
          <PetitionCard key={petition.id} {...petition} />
        ))}
        contentProps={{ lg: 8 }}
        title={title}
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
  footer: PropTypes.shape({}),
  navigation: PropTypes.shape({}),
  petitions: PropTypes.arrayOf(PropTypes.shape({})),
  subscribe: PropTypes.shape({}),
  title: PropTypes.string,
};

Index.defaultProps = {
  actNow: undefined,
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
  const wpApi = wp();
  const page = await wpApi.pages({ slug: "analysis-petitions", locale }).first;
  const { petitions } = config;
  page.posts = null;
  const languageAlternates = _.languageAlternates("/analysis/petitions");

  return {
    props: {
      ...page,
      petitions,
      languageAlternates,
    },
  };
}

export default Index;
