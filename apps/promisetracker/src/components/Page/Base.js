import { NextSeo } from "next-seo";
import Script from "next/script";
import PropTypes from "prop-types";
import React from "react";

import useStyles from "./useStyles";

import Footer from "@/promisetracker/components/Footer";
import Navigation from "@/promisetracker/components/Navigation";
import config from "@/promisetracker/config";

/**
 * Base page that can be used to build all other pages.
 */
const GTM_ID = process.env.GTM_ID || "GTM-P8QSVKT";
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
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${GTM_ID}');        
        `,
        }}
      />
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
