import React from "react";
import PropTypes from "prop-types";

import { makeStyles } from "@material-ui/core/styles";

import { RichTypography } from "@commons-ui/core";
import { Grid } from "@material-ui/core";

import Subscribe from "@/promisetracker/components/Newsletter";
import PickPromise from "@/promisetracker/components/PickPromise";
import ContentPage from "@/promisetracker/components/ContentPage";

import i18n from "@/promisetracker/lib/i18n";
import wp from "@/promisetracker/lib/wp";
import check from "@/promisetracker/lib/check";

import actNowImg from "@/promisetracker/assets/illo-actNow@2x.png";

const useStyles = makeStyles(({ breakpoints, typography, widths }) => ({
  section: {
    padding: `0 ${typography.pxToRem(23)}`,
    margin: 0,
    width: "100%",
    [breakpoints.up("lg")]: {
      padding: 0,
      margin: "0 auto",
      width: typography.pxToRem(widths.values.lg),
      position: "relative",
    },
  },
  image: {
    maxWidth: typography.pxToRem(314),
    minWidth: typography.pxToRem(314),
    objectFit: "cover",
    [breakpoints.up("lg")]: {
      maxWidth: typography.pxToRem(484),
      minWidth: typography.pxToRem(484),
      position: "absolute",
      top: 0,
    },
  },
  imageContainer: {
    [breakpoints.down("sm")]: {
      display: "flex",
      justifyContent: "center",
    },
  },
  footer: {
    marginTop: 0,
  },
  description: {
    paddingBottom: typography.pxToRem(50),
    [breakpoints.up("lg")]: {
      paddingBottom: typography.pxToRem(100),
    },
  },
  title: {
    padding: 0,
    textAlign: "left",
    fontWeight: "bold",
  },
  titleRoot: {
    "&::after": {
      content: "''",
      display: "block",
      height: "0.2em",
      width: "12%",
      borderBottom: "solid 5px",
      marginBottom: typography.pxToRem(20),
    },
  },
}));

function ActNow({
  promises,
  footer,
  title,
  navigation,
  description,
  ...props
}) {
  const classes = useStyles(props);

  return (
    <ContentPage
      {...props}
      footer={footer}
      navigation={navigation}
      title={title}
      classes={{
        section: classes.section,
        footer: classes.footer,
      }}
      aside={
        <Grid container classes={{ root: classes.imageContainer }}>
          <img src={actNowImg} alt="Act Now" className={classes.image} />
        </Grid>
      }
      content={
        description?.length ? (
          <>
            <RichTypography className={classes.description}>
              {description}
            </RichTypography>
          </>
        ) : null
      }
    >
      <PickPromise
        promises={promises}
        {...props}
        classes={{ section: classes.section }}
      />
      <Subscribe classes={{ section: classes.section }} />
    </ContentPage>
  );
}

ActNow.propTypes = {
  actNow: PropTypes.shape({}),
  description: PropTypes.string,
  title: PropTypes.string,
  promises: PropTypes.arrayOf(PropTypes.shape({})),
  footer: PropTypes.shape({}),
  navigation: PropTypes.shape({}),
};

ActNow.defaultProps = {
  actNow: null,
  description: null,
  promises: null,
  footer: null,
  navigation: null,
  title: null,
};

export async function getStaticProps({ locale }) {
  const _ = i18n();
  if (!_.locales.includes(locale)) {
    return {
      notFound: true,
    };
  }

  const page = await wp().pages({ slug: "act-now", locale }).first;

  const { promiseStatuses } = page;
  const checkApi = check({
    promiseStatuses,
    team: "pesacheck-promise-tracker",
  });

  const languageAlternates = _.languageAlternates("/act-now");

  const promises = await checkApi.promises({
    limit: 10000,
    query: `{ "projects": ["2831"] }`,
  });

  return {
    props: {
      ...page,
      promises,
      languageAlternates,
    },
    revalidate: 2 * 60, // seconds
  };
}

export default ActNow;
