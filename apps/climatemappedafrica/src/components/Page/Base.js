import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { NextSeo } from "next-seo";
import PropTypes from "prop-types";
import React from "react";

import Footer from "@/climatemappedafrica/components/Footer";
import Navigation from "@/climatemappedafrica/components/Navigation";

/**
 * Base page that can be used to build all other pages.
 */
function BasePage({ children, menus, variant, footer: footerProps }) {
  const seo = {};
  const theme = useTheme();

  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));

  const pageSeo = {};
  pageSeo.title = seo?.title || undefined;
  pageSeo.description = seo?.metaDesc || undefined;
  pageSeo.canonical = seo?.canonical || undefined;
  if (seo?.opengraphType || seo?.opengraphImage) {
    pageSeo.openGraph = {};
    if (seo.opengraphImage) {
      pageSeo.openGraph.images = [
        {
          url: seo.opengraphImage,
          alt: seo.title || undefined,
        },
      ];
    }
    if (seo.opengraphType) {
      pageSeo.openGraph.type = seo.opengraphType;
    }
  }

  return (
    <>
      <Navigation {...menus} variant={variant} />
      <NextSeo
        {...pageSeo}
        nofollow={seo?.metaRobotsNofollow !== "follow"}
        noindex={seo?.metaRobotsNoindex !== "index"}
      />
      {children}
      {!(variant === "explore" && isDesktop) && <Footer {...footerProps} />}
    </>
  );
}

BasePage.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  menus: PropTypes.shape({
    footerMenu: PropTypes.arrayOf(PropTypes.shape({})),
    primaryMenu: PropTypes.arrayOf(PropTypes.shape({})),
  }),
  variant: PropTypes.string,
};

export default BasePage;
