import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { NextSeo } from "next-seo";
import PropTypes from "prop-types";
import React from "react";

import Footer from "@/climatemappedafrica/components/Footer";
import Navigation from "@/climatemappedafrica/components/Navigation";
import { navigationArgs } from "@/climatemappedafrica/config";
import getFooterMenu from "@/climatemappedafrica/functions/menus/getFooterMenu";
import getNavigationMenu from "@/climatemappedafrica/functions/menus/getNavigationMenu";

/**
 * Base page that can be used to build all other pages.
 */
function BasePage({ children, menus, variant, ...props }) {
  const seo = {};
  const footerProps = getFooterMenu(menus?.footerMenu || []);
  const navigation = getNavigationMenu(menus?.primaryMenu || []);
  const { menuProps, socialLinks } = navigation;
  const { desktopLogoProps, mobileLogoProps, drawerLogoProps } = navigationArgs;
  const theme = useTheme();

  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));
  const navigationProps = {
    ...props,
    ...menus,
    menuProps,
    socialLinks,
    desktopLogoProps,
    mobileLogoProps,
    drawerLogoProps,
  };

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
      <Navigation {...navigationProps} variant={variant} />
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
