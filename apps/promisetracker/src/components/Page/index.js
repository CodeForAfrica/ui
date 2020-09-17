import React from "react";
import PropTypes from "prop-types";

import Error from "next/error";
import GoogleFonts from "next-google-fonts";
import { NextSeo } from "next-seo";
import Footer from "@/promisetracker/components/Footer";
import config from "@/promisetracker/config";

function Page({ children, errorCode, ...props }) {
  if (errorCode) {
    return <Error statusCode={errorCode} />;
  }

  return (
    <>
      <GoogleFonts href="https://fonts.googleapis.com/css2?family=Amiri:ital,wght@0,400;0,700;1,400&family=Open+Sans:wght@300;400;600;700&family=Source+Sans+Pro:wght@200;300;400;600;700&display=swap" />
      <NextSeo {...props} />
      {children}
      <Footer page={config.page} />
    </>
  );
}

Page.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  errorCode: PropTypes.number,
};

Page.defaultProps = {
  errorCode: undefined,
};

export default Page;
