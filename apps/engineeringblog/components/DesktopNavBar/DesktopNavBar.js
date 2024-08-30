import { Grid } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";

import Logo from "@/engineeringblog/components/Logo";

const DesktopNavBar = React.forwardRef(function DesktopNavBar(props, ref) {
  const { logo, sx } = props;

  return (
    <Grid
      container
      justifyContent="space-between"
      alignItems="center"
      sx={sx}
      ref={ref}
    >
      <Grid item>
        <Logo {...logo} />
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

export default DesktopNavBar;
