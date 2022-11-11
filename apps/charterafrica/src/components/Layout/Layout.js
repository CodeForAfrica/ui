import { styled } from "@mui/material/styles";
import { NextSeo } from "next-seo";
import PropTypes from "prop-types";
import React from "react";

import Footer from "@/charterafrica/components/Footer";
import NavBarDropdown from "@/charterafrica/components/NavBarDropdown";

const Main = styled("main")({
  flex: 1,
});

function Layout({ children, footer, seo }) {
  return (
    <>
      <NextSeo {...seo} />
      <NavBarDropdown />
      {children ? <Main>{children}</Main> : null}
      <Footer {...footer} />
    </>
  );
}

Layout.propTypes = {
  children: PropTypes.node,
  footer: PropTypes.shape({}),
};

Layout.defaultProps = {
  children: undefined,
  footer: undefined,
};

export default Layout;
