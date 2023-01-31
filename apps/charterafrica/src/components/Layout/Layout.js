import { styled } from "@mui/material/styles";
import { NextSeo } from "next-seo";
import PropTypes from "prop-types";
import React from "react";

import Footer from "@/charterafrica/components/Footer";
import NavBar from "@/charterafrica/components/NavBar";
import PageSummary from "@/charterafrica/components/PageSummary";

const Main = styled("main")({
  flex: 1,
});

function Layout({ children, navbar, footer, seo, pageSummary }) {
  return (
    <>
      <NextSeo {...seo} />
      <NavBar {...navbar} />
      <PageSummary summary={pageSummary} />
      {children ? <Main>{children}</Main> : null}
      <Footer {...footer} />
    </>
  );
}

Layout.propTypes = {
  children: PropTypes.node,
  footer: PropTypes.shape({}),
  navbar: PropTypes.shape({}),
};

Layout.defaultProps = {
  children: undefined,
  footer: undefined,
  navbar: undefined,
};

export default Layout;
