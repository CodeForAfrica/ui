import { Grid, Button } from "@mui/material";
import React from "react";

import { neutral, secondary } from "@/charterafrica/colors";
import LanguageButton from "@/charterafrica/components/LanguageButton";
import Logo from "@/charterafrica/components/Logo";
import NavBarNavList from "@/charterafrica/components/NavBarNavList";

const DesktopNavBar = React.forwardRef(function DesktopNavBar(props, ref) {
  const { languages, logo, menus, sx } = props;

  return (
    <Grid justifyContent="space-between" alignItems="center" ref={ref} sx={sx}>
      <Grid item>
        <Grid
          container
          alignItems="center"
          justifyContent="flex-start"
          wrap="nowrap"
        >
          <Grid item>
            <Logo {...logo} width={230} height={58} />
          </Grid>
          <Grid item>
            <LanguageButton languages={languages} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Grid
          container
          justifyContent="flex-end"
          columnSpacing={3.75}
          wrap="nowrap"
        >
          <Grid item>
            <NavBarNavList direction="row" menus={menus} sx={{ gap: 0 }} />
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
    </Grid>
  );
});

export default DesktopNavBar;
