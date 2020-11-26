import React from "react";
import PropTypes from "prop-types";

import GoogleFonts from "next-google-fonts";
import { NextSeo } from "next-seo";

import Footer from "@/promisetracker/components/Footer";
import Navigation from "@/promisetracker/components/Navigation";
import config from "@/promisetracker/config";

import useStyles from "./useStyles";

/**
 * Base page that can be used to build all other pages.
 */
function BasePage({
  children,
  footer,
  navigation,
  title: titleProp,
  description: descriptionProp,
  ...props
}) {
  const classes = useStyles(props);
  const { title: defaultTitle } = config;
  const pageTitle = titleProp ? `${titleProp} | ` : "";
  const title = `${pageTitle}${defaultTitle}`;
  const description = descriptionProp || config.description;

  return (
    <div className={classes.root}>
      <GoogleFonts href="https://fonts.googleapis.com/css2?family=Amiri:ital,wght@0,400;0,700;1,400&family=Open+Sans:wght@300;400;600;700&family=Source+Sans+Pro:wght@200;300;400;600;700&display=swap" />
      <NextSeo title={title} description={description} {...props} />
      <Navigation {...navigation} classes={{ section: classes.section }} />
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
  description: PropTypes.string,
};

BasePage.defaultProps = {
  footer: undefined,
  navigation: undefined,
  title: undefined,
  description: undefined,
};

export default BasePage;
