import { Grid } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";

// eslint-disable-next-line import/no-unresolved
import cfaLogo from "@/codeforafrica/assets/CfA logo.svg";
import ImageIcon from "@/codeforafrica/components/ImageIcon";
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
      sx={{ display: { xs: "none", md: "flex" } }}
    >
      <Grid item xs={4}>
        <ImageIcon src={cfaLogo} alt="Logo" width="136px" height="61px" />
      </Grid>
      <Grid item xs={8} container justifyContent="flex-end">
        <Grid item>
          <NavBarNavList menu={menu} {...props} />
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
