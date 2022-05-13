import { Grid } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";

import cfaLogo from "@/codeforafrica/assets/CfA logo.svg";
import Logo from "@/codeforafrica/components/Logo";
import NavBarNavList from "@/codeforafrica/components/NavBarNavList";

const DesktopNavigation = React.forwardRef(function DesktopNavigation(
  props,
  ref
) {
  const { menu } = props;

  return (
    <Grid
      container
      justifyContent="space-between"
      alignItems="center"
      direction="row"
      ref={ref}
    >
      <Grid item xs={4}>
        <Logo src={cfaLogo} alt="Logo" />
      </Grid>
      <Grid item xs={8} container justifyContent="flex-end">
        <Grid item>
          <NavBarNavList menu={menu} />
        </Grid>
      </Grid>
    </Grid>
  );
});

DesktopNavigation.propTypes = {
  menu: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      href: PropTypes.string,
    })
  ),
};

DesktopNavigation.defaultProps = {
  menu: undefined,
};

export default DesktopNavigation;
