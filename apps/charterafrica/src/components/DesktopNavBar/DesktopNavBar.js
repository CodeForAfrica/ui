import { Grid, Button } from "@mui/material";
import React from "react";

import { neutral, secondary } from "@/charterafrica/colors";
import Logo from "@/charterafrica/components/Logo";

const DesktopNavBar = React.forwardRef(function DesktopNavBar(props, ref) {
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
        <Logo {...logo} width={230} height={58} />
      </Grid>
      <Grid item>
        <Button
          variant="contained"
          sx={{
            backgroundColor: secondary[500],
            color: neutral[900],
            "&:hover": {
              backgroundColor: secondary[600],
            },
          }}
        >
          Join
        </Button>
      </Grid>
    </Grid>
  );
});

export default DesktopNavBar;
