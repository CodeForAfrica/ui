import { Section } from "@commons-ui/core";
import { Box, Button, Grid } from "@mui/material";
import React from "react";

import LanguageButton from "@/charterafrica/components/LanguageButton";
import NavBarNavList from "@/charterafrica/components/NavBarNavList";
import NavBarNavMenu from "@/charterafrica/components/NavBarNavMenu";
import SearchInput from "@/charterafrica/components/SearchInput";

const MobileDrawer = React.forwardRef(function MobileDrawer(props, ref) {
  const { actions, languages, menus, sx } = props;

  return (
    <Box
      sx={{
        bgcolor: "neutral.dark",
        py: 3.75,
        ...sx,
      }}
    >
      <Section
        sx={{
          px: { xs: 2.5, sm: 0 },
        }}
      >
        <Grid container direction="column" gap={2.5} ref={ref}>
          <Grid item>
            <Grid
              container
              alignItems="center"
              justifyContent="space-between"
              wrap="nowrap"
              columnGap={1.25}
              sx={sx}
            >
              <Grid item>
                <LanguageButton languages={languages} />
              </Grid>
              {actions?.search?.enabled ? (
                <Grid item xs sm="auto">
                  <SearchInput
                    placeholder={actions.search.placeholder}
                    sx={{
                      py: 1.4375, // 12.5px - 1
                      width: { xs: "100%", sm: "525px" },
                      ml: { xs: -1.25, sm: 0 },
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
            </Grid>
          </Grid>
          <Grid item sx={{ display: { xs: "flex", sm: "none" } }}>
            <NavBarNavList direction="row" menus={menus} />
          </Grid>
          <Grid item sx={{ display: { xs: "none", sm: "flex" } }}>
            <NavBarNavMenu
              direction="row"
              menus={menus}
              sx={{
                flex: 1,
                justifyContent: "space-between",
              }}
            />
          </Grid>
        </Grid>
      </Section>
    </Box>
  );
});

export default MobileDrawer;
