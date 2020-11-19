import React from "react";
import PropTypes from "prop-types";

import { makeStyles } from "@material-ui/core/styles";

import Page from "@/promisetracker/components/Page";
import Subscribe from "@/promisetracker/components/Newsletter";
import ActNowComponent from "@/promisetracker/components/ActNow";
import PickPromise from "@/promisetracker/components/PickPromise";

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
}));

function ActNow({ actNow, description, ...props }) {
  const classes = useStyles(props);
  const actNowWithDesc = { ...actNow, description };

  return (
    <Page {...props} title="Act Now" classes={{ section: classes.section }}>
      <ActNowComponent
        {...actNowWithDesc}
        classes={{ section: classes.section }}
      />
      <PickPromise classes={{ section: classes.section }} />
      <Subscribe classes={{ section: classes.section }} />
    </Page>
  );
}

ActNow.propTypes = {
  actNow: PropTypes.shape({}),
  description: PropTypes.string,
};

ActNow.defaultProps = {
  actNow: null,
  description: null,
};

export async function getStaticProps({ locale }) {
  const _ = i18n();
  if (!_.locales.includes(locale)) {
    return {
      notFound: true,
    };
  }

  const page = await wp().pages({ slug: "act-now", locale }).first;
  const languageAlternates = _.languageAlternates("/act-now");

  return {
    props: {
      ...page,
      languageAlternates,
    },
    revalidate: 2 * 60, // seconds
  };
}

export default ActNow;
