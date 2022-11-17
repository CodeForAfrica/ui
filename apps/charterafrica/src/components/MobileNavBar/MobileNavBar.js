import { Grid } from "@mui/material";
import SvgIcon from "@mui/material/SvgIcon";
import React from "react";

import MenuIcon from "@/charterafrica/assets/icons/Type=menu, Size=32, Color=White.svg";
import Logo from "@/charterafrica/components/Logo";

const MobileNavBar = React.forwardRef(function MobileNavBar(props, ref) {
  const { logo, sx } = props;
  return (
    <Grid
      container
      justifyContent="space-between"
      alignItems="center"
      ref={ref}
      sx={sx}
    >
      <Grid item>
        <Logo {...logo} />
      </Grid>
      <Grid item>
        <SvgIcon
          component={MenuIcon}
          viewBox="0 0 32 32"
          sx={{
            fill: "none",
            fontSize: "32px",
          }}
        />
      </Grid>
    </Grid>
  );
});

export default MobileNavBar;
