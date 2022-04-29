import Head from "next/head";
import PropTypes from "prop-types";
import React from "react";

import Footer from "@/codeforafrica/components/Footer";

function Page({ children, footer, title }) {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      {children}
      {footer ? <Footer {...footer} /> : null}
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
