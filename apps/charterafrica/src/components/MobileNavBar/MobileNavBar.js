import { Grid } from "@mui/material";
import SvgIcon from "@mui/material/SvgIcon";
import Image from "next/image";
import React from "react";

import MenuIcon from "@/charterafrica/assets/icons/Type=menu, Size=32, Color=White.svg";
import { neutral } from "@/charterafrica/colors";

const MobileNavBar = React.forwardRef(function MobileNavBar(props, ref) {
  const { logo, sx } = props;

  const handleClickOpen = () => {
    // TODO: update this to use the state
  };

  return (
    <Grid
      container
      justifyContent="space-between"
      alignItems="center"
      sx={{ px: { xs: 5, sm: 0 }, py: { xs: 1 }, ...sx }}
      ref={ref}
      backgroundColor={neutral[900]}
    >
      <Grid item>
        <Image
          src={logo.src}
          width={logo.width}
          height={logo.height}
          alt={logo.alt}
        />
      </Grid>
      <Grid item>
        <SvgIcon
          onClick={handleClickOpen}
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
