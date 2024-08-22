import { Box } from "@mui/material";
import { NextSeo } from "next-seo";
import PropTypes from "prop-types";
import React from "react";

import Footer from "@/civicsignalblog/components/Footer";
import NavBar from "@/civicsignalblog/components/NavBar";

function Page({ children, footer, navbar, seo }) {
  return (
    <>
      <NextSeo {...seo} />
      {navbar ? <NavBar {...navbar} /> : null}
      {children ? (
        <Box component="main" sx={{ bgcolor: "background.main" }}>
          {children}
        </Box>
      ) : null}
      {footer ? <Footer {...footer} /> : null}
    </>
  );
}

Page.propTypes = {
  children: PropTypes.node,
  blocks: PropTypes.arrayOf(PropTypes.shape({})),
  footer: PropTypes.shape({}),
  navbar: PropTypes.shape({
    menu: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string,
        href: PropTypes.string,
      }),
    ),
  }),
  title: PropTypes.string,
};

Page.defaultProps = {
  children: undefined,
  navbar: undefined,
  blocks: undefined,
  footer: undefined,
  title: undefined,
};

export default Page;
