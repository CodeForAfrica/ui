import { RichTypography } from "@commons-ui/core";
import makeStyles from "@mui/styles/makeStyles";
import PropTypes from "prop-types";
import React from "react";

import ActNow from "@/promisetracker/components/ActNow";
import ContentPage from "@/promisetracker/components/ContentPage";
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
  description: {
    marginBottom: typography.pxToRem(40),
    [breakpoints.up("lg")]: {
      marginBottom: typography.pxToRem(86),
    },
  },
  footer: {
    marginTop: 0,
  },
}));

function Resources({
  actNow,
  actNowEnabled,
  description,
  footer,
  navigation,
  ...props
}) {
  const classes = useStyles(props);

  return (
    <ContentPage
      {...props}
      footer={footer}
      navigation={navigation}
      classes={{
        section: classes.section,
        footer: classes.footer,
      }}
      content={
        description?.length ? (
          <RichTypography className={classes.description}>
            {description}
          </RichTypography>
        ) : null
      }
    >
      {actNowEnabled ? (
        <ActNow
          {...actNow}
          classes={{
            section: classes.section,
          }}
        />
      ) : null}
    </ContentPage>
  );
}

Resources.propTypes = {
  actNow: PropTypes.shape({}),
  actNowEnabled: PropTypes.bool,
  description: PropTypes.string,
  footer: PropTypes.shape({}),
  navigation: PropTypes.shape({}),
};

Resources.defaultProps = {
  actNow: undefined,
  actNowEnabled: undefined,
  description: undefined,
  footer: undefined,
  navigation: undefined,
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
  const page = await wp().pages({ slug: "resources", locale }).first;
  const languageAlternates = _.languageAlternates("/resources");

  return {
    props: {
      ...page,
      ...site,
      languageAlternates,
    },
    revalidate: 2 * 60, // seconds
  };
}

export default Resources;
