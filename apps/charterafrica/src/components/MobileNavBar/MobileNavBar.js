import { Drawer, Grid, IconButton, SvgIcon, Toolbar } from "@mui/material";
import React, { useState } from "react";

import MobileDrawer from "./MobileDrawer";

import MenuIcon from "@/charterafrica/assets/icons/Type=menu, Size=32, Color=White.svg";
import XIcon from "@/charterafrica/assets/icons/Type=x, Size=32, Color=White.svg";
import Logo from "@/charterafrica/components/Logo";

const MobileNavBar = React.forwardRef(function MobileNavBar(props, ref) {
  const { actions, languages, logo, menus, sx } = props;
  const [open, setOpen] = useState(false);
  const handleClick = () => setOpen((prev) => !prev);
  const handleClose = () => setOpen(false);

  const Icon = open ? XIcon : MenuIcon;
  return (
    <React.Fragment ref={ref}>
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        sx={sx}
      >
        <Grid item>
          <Logo {...logo} width={147.29} height={38} />
        </Grid>
        <Grid item>
          <IconButton aria-label="navigation" onClick={handleClick}>
            <SvgIcon
              component={Icon}
              viewBox="0 0 32 32"
              sx={{
                fill: "none",
                fontSize: "32px",
              }}
            />
          </IconButton>
        </Grid>
      </Grid>
      <Drawer
        anchor="top"
        open={open}
        onClose={handleClose}
        PaperProps={{
          square: true,
          sx: { overflowY: { xs: "scroll", sm: "visible" } },
        }}
      >
        <Toolbar />
        <MobileDrawer actions={actions} languages={languages} menus={menus} />
      </Drawer>
    </React.Fragment>
  );
});

export default MobileNavBar;
