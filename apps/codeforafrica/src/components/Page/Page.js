import Head from "next/head";
import PropTypes from "prop-types";
import React from "react";

import Footer from "@/codeforafrica/components/Footer";
import config from "@/codeforafrica/config";


function Page({ children, sections, title }) {
  const { footer } = sections;
  const { menu } = config;
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      {children}
      {footer ? <Footer {...footer} menu={menu} /> : null}
    </>
  );
}

Page.propTypes = {
  children: PropTypes.node,
  footer: PropTypes.shape({}),
  title: PropTypes.string,
};

Page.defaultProps = {
  children: undefined,
  footer: undefined,
  title: undefined,
};

export default Page;
