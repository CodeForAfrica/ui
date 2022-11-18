import { Grid, Button } from "@mui/material";
import React from "react";

import { neutral, secondary } from "@/charterafrica/colors";
import Logo from "@/charterafrica/components/Logo";
import NavBarNavList from "@/charterafrica/components/NavBarNavList";

const DesktopNavBar = React.forwardRef(function DesktopNavBar(props, ref) {
  const { logo, menus, sx } = props;

  return (
    <Grid justifyContent="space-between" alignItems="center" ref={ref} sx={sx}>
      <Grid item>
        <Logo {...logo} width={230} height={58} />
      </Grid>
      <Grid container justifyContent="flex-end" columnSpacing={3.75}>
        <Grid item>
          <NavBarNavList direction="row" menus={menus} sx={{ gap: 2.5 }} />
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
    </Grid>
  );
});

export default DesktopNavBar;
