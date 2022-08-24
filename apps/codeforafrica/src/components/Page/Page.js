import { NextSeo } from "next-seo";
import PropTypes from "prop-types";
import React from "react";

import Footer from "@/codeforafrica/components/Footer";
import NavBar from "@/codeforafrica/components/NavBar";

function Page({ children, footer, navbar, title, siteSettings = {} }) {
  return (
    <>
      <NextSeo
        title={siteSettings?.title || title}
        description={siteSettings?.description || null}
        images={siteSettings?.coverImage}
        twitter={{
          handle: siteSettings?.twitter,
        }}
      />
      {navbar ? <NavBar {...navbar} /> : null}
      {children ? <main>{children}</main> : null}
      {footer ? <Footer {...footer} /> : null}
    </>
  );
}

Page.propTypes = {
  children: PropTypes.node,
  sections: PropTypes.shape({}),
  footer: PropTypes.shape({}),
  navbar: PropTypes.shape({
    menu: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string,
        href: PropTypes.string,
      })
    ),
  }),
  title: PropTypes.string,
};

Page.defaultProps = {
  children: undefined,
  navbar: undefined,
  sections: undefined,
  footer: undefined,
  title: undefined,
};

export default Page;
