import React from "react";
import PropTypes from "prop-types";

import Error from "next/error";

import GoogleFonts from "next-google-fonts";
import { NextSeo } from "next-seo";

import { makeStyles } from "@material-ui/core/styles";

import Navigation from "@/promisetracker/components/Navigation";

const useStyles = makeStyles(() => ({
  root: {
    // Seems like you need height defined for AppBar position="sticky" to work
    // see: https://github.com/mui-org/material-ui/issues/16186
    height: "100vh",
    // font-boosting: https://stackoverflow.com/questions/13430897/how-to-override-font-boosting-in-mobile-chrome#comment61478376_16432702
    maxHeight: 999999,
    overflowX: "hidden",
  },
  section: {},
}));

function Page({ children, errorCode, title: titleProp, ...props }) {
  const classes = useStyles(props);

  if (errorCode) {
    return <Error statusCode={errorCode} />;
  }
  const title = `${titleProp ? `${titleProp} | ` : ""}PromiseTracker`;
  return (
    <div className={classes.root}>
      <GoogleFonts href="https://fonts.googleapis.com/css2?family=Amiri:ital,wght@0,400;0,700;1,400&family=Open+Sans:wght@300;400;600;700&family=Source+Sans+Pro:wght@200;300;400;600;700&display=swap" />
      <NextSeo title={title} {...props} />
      <Navigation classes={{ section: classes.section }} />
      {children}
    </div>
  );
}

Page.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  errorCode: PropTypes.number,
  title: PropTypes.string,
};

Page.defaultProps = {
  errorCode: undefined,
  title: undefined,
};

export default Page;
