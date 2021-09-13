import { NextSeo } from "next-seo";
import PropTypes from "prop-types";
import React from "react";

import useStyles from "./useStyles";

import Footer from "@/promisetracker/components/Footer";
import Navigation from "@/promisetracker/components/Navigation";
import config from "@/promisetracker/config";

/**
 * Base page that can be used to build all other pages.
 */
function BasePage({
  children,
  footer,
  navigation,
  title: titleProp,
  ...props
}) {
  const classes = useStyles(props);
  const { title: defaultTitle } = config;
  const pageTitle = titleProp ? `${titleProp} | ` : "";
  const title = `${pageTitle}${defaultTitle}`;

  return (
    <div className={classes.root}>
      <NextSeo title={title} {...props} />
      <Navigation
        navigation={navigation}
        classes={{ section: classes.section }}
      />
      {children}
      <Footer {...footer} classes={{ root: classes.footer }} />
    </div>
  );
}

BasePage.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  footer: PropTypes.shape({}),
  navigation: PropTypes.shape({}),
  title: PropTypes.string,
};

BasePage.defaultProps = {
  footer: undefined,
  navigation: undefined,
  title: undefined,
};

export default BasePage;
