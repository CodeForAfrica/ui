import { Section } from "@commons-ui/core";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import React from "react";

import LanguageButton from "@/charterafrica/components/LanguageButton";
import NavBarNavList from "@/charterafrica/components/NavBarNavList";
import NavBarNavMenu from "@/charterafrica/components/NavBarNavMenu";
import SearchInput from "@/charterafrica/components/SearchInput";

const MobileDrawer = React.forwardRef(function MobileDrawer(props, ref) {
  const { languages, menus, sx } = props;

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
              <Grid item xs sm="auto">
                <SearchInput
                  sx={{
                    py: 1.4375, // 12.5px - 1
                    width: { xs: "100%", sm: "525px" },
                    ml: { xs: -1.25, sm: 0 },
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
