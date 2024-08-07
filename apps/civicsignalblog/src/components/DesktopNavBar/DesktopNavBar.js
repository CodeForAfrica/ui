import { Grid, Box } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";

import NavBarNavList from "@/civicsignalblog/components/NavBarNavList";
import NextImageButton from "@/civicsignalblog/components/NextImageButton";

const DesktopNavBar = React.forwardRef(function DesktopNavBar(props, ref) {
  const { logo, menus, socialLinks, sx } = props;

  return (
    <Grid
      container
      justifyContent="space-between"
      alignItems="center"
      sx={sx}
      ref={ref}
    >
      <Grid item>
        <NextImageButton
          {...logo}
          href="/"
          alt="Logo"
          width={136}
          height={61}
          priority
        />
      </Grid>
      <Grid item>
        <Box component="nav" sx={{ justifyContent: "flex-end" }}>
          <NavBarNavList
            menus={menus}
            socialLinks={socialLinks}
            direction="row"
          />
        </Box>
      </Grid>
    </Grid>
  );
});

DesktopNavBar.propTypes = {
  direction: PropTypes.string,
  menu: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      href: PropTypes.string,
    }),
  ),
};

DesktopNavBar.defaultProps = {
  direction: undefined,
  menu: undefined,
};

export default DesktopNavBar;
