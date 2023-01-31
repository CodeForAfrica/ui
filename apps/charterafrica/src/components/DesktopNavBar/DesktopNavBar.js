import { Button, Grid } from "@mui/material";
import React from "react";

import LanguageButton from "@/charterafrica/components/LanguageButton";
import Logo from "@/charterafrica/components/Logo";
import NavBarNavMenu from "@/charterafrica/components/NavBarNavMenu";
import SearchInput from "@/charterafrica/components/SearchInput";

const DesktopNavBar = React.forwardRef(function DesktopNavBar(props, ref) {
  const { actions, languages, logo, menus, sx } = props;

  return (
    <Grid
      justifyContent="space-between"
      alignItems="center"
      columnSpacing={1.75}
      ref={ref}
      sx={sx}
    >
      <Grid item>
        <Logo {...logo} width={230} height={58} />
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
            <NavBarNavMenu direction="row" menus={menus} />
          </Grid>
          {actions?.search?.enabled ? (
            <Grid item>
              <SearchInput
                placeholder={actions.search.placeholder}
                sx={{
                  py: 1.4375, // 12.5px - 1
                }}
              />
            </Grid>
          ) : null}
          {actions?.join?.enabled ? (
            <Grid item>
              <Button color="secondary" variant="contained">
                {actions.join.label}
              </Button>
            </Grid>
          ) : null}
          <Grid item>
            <LanguageButton languages={languages} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
});

export default DesktopNavBar;
