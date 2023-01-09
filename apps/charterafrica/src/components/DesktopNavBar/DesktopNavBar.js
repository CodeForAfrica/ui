import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import React from "react";

import LanguageButton from "@/charterafrica/components/LanguageButton";
import Logo from "@/charterafrica/components/Logo";
import NavBarNavList from "@/charterafrica/components/NavBarNavList";
import SearchInput from "@/charterafrica/components/SearchInput";

const DesktopNavBar = React.forwardRef(function DesktopNavBar(props, ref) {
  const { languages, logo, menus, sx } = props;

  return (
    <Grid
      justifyContent="space-between"
      alignItems="center"
      columnSpacing={1.75}
      ref={ref}
      sx={sx}
    >
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
          alignItems="center"
          justifyContent="space-between"
          columnSpacing={1.75}
          wrap="nowrap"
        >
          <Grid item>
            <NavBarNavList direction="row" menus={menus} />
          </Grid>
          <Grid item>
            <SearchInput
              sx={{
                py: 1.4375, // 12.5px - 1
              }}
            />
          </Grid>
          <Grid item>
            <Button color="secondary" variant="contained">
              Join
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
});

export default DesktopNavBar;
