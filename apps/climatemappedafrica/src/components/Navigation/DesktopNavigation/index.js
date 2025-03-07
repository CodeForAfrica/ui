import { NextImageButton } from "@commons-ui/next";
import { Menu } from "@hurumap/next";
import { Grid } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";

function DesktopNavigation({ explorePagePath, logo, menus, socialLinks, sx }) {
  return (
    <Grid container alignItems="center" sx={sx}>
      <Grid item xs={3}>
        <NextImageButton
          {...logo}
          href="/"
          style={{
            height: 64,
            width: "auto",
          }}
          priority
        />
      </Grid>
      <Grid
        item
        xs={9}
        container
        direction="row"
        justifyContent="flex-end"
        alignItems="center"
      >
        <Menu
          explorePagePath={explorePagePath}
          links={menus}
          socialLinks={socialLinks}
        />
      </Grid>
      <Grid />
    </Grid>
  );
}

DesktopNavigation.propTypes = {
  logo: PropTypes.shape({}),
  menus: PropTypes.arrayOf(PropTypes.shape({})),
  socialLinks: PropTypes.arrayOf(PropTypes.shape({})),
};

export default DesktopNavigation;
