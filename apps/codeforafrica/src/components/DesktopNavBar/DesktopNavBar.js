import { Grid, Box } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";

/* eslint-disable import/no-unresolved */
import cfaLogo from "@/codeforafrica/assets/CfA logo.svg?url";
import NavBarNavList from "@/codeforafrica/components/NavBarNavList";
import NextImageButton from "@/codeforafrica/components/NextImageButton";

const DesktopNavBar = React.forwardRef(function DesktopNavBar(props, ref) {
  const { menu, direction, ...other } = props;

  return (
    <Grid
      container
      justifyContent="space-between"
      alignItems="center"
      direction="row"
      {...other}
      ref={ref}
    >
      <Grid item>
        <NextImageButton
          href="/"
          src={cfaLogo}
          alt="Logo"
          width="136px"
          height="61px"
        />
      </Grid>
      <Grid item>
        <Box component="nav" sx={{ justifyContent: "flex-end" }}>
          <NavBarNavList menu={menu} direction={direction} />
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
    })
  ),
};

DesktopNavBar.defaultProps = {
  direction: undefined,
  menu: undefined,
};

export default DesktopNavBar;
