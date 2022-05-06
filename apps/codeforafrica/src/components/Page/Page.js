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
      {footer ? <Footer {...footer} menu={menu} /> : null}
    </>
  );
}

Page.propTypes = {
  children: PropTypes.node,
  sections: PropTypes.shape({}),
  footer: PropTypes.shape({}),
  menu: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      href: PropTypes.string,
    })
  ),
  title: PropTypes.string,
};

Page.defaultProps = {
  children: undefined,
  menu: undefined,
  sections: undefined,
  footer: undefined,
  title: undefined,
};

export default Page;
