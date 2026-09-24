import { NavBarNavList, Section } from "@commons-ui/core";
import { Link, NextImageButton } from "@commons-ui/next";
import { Drawer, Grid2 as Grid, IconButton, SvgIcon } from "@mui/material";
import React, { useState } from "react";

import XIcon from "@/trustlab/assets/icons/Type=x, Size=24, Color=CurrentColor.svg";
import MenuIcon from "@/trustlab/assets/menu-icon.svg";

const MobileNavBar = React.forwardRef(function MobileNavBar(props, ref) {
  const { logo, menus, socialLinks, children } = props;
  const [open, setOpen] = useState(false);
  const handleClick = () => setOpen((prev) => !prev);
  const handleClose = () => setOpen(false);

  const Icon = open ? XIcon : MenuIcon;
  return (
    <Grid
      container
      justifyContent="space-between"
      alignItems="center"
      sx={{ display: { xs: "flex", md: "none" }, height: 94 }}
      ref={ref}
    >
      <Grid>
        <NextImageButton
          {...logo}
          href="/"
          alt="Logo"
          width={136}
          height={61}
          // The logo comes from Payload with no intrinsic dimensions, so the
          // width/height above are nominal. Scaling by width with height: auto
          // keeps the uploaded asset's aspect ratio; maxHeight stops a tall
          // upload from overflowing the 94px bar.
          style={{
            width: "100%",
            height: "auto",
            maxHeight: 61,
          }}
        />
      </Grid>
      <Grid>
        <IconButton
          onClick={handleClick}
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
        >
          <SvgIcon
            component={Icon}
            sx={{
              fill: "transparent",
              color: "common.white",
            }}
          />
        </IconButton>
      </Grid>
      <Drawer
        anchor="top"
        open={open}
        onClose={handleClose}
        hideBackdrop
        slotProps={{
          paper: {
            onClick: handleClose,
            square: true,
            sx: {
              overflowY: { xs: "scroll", sm: "visible" },
              top: 94,
              py: 2,
            },
            elevation: 0,
          },
        }}
        sx={(theme) => ({
          zIndex: theme.zIndex.appBar - 1,
        })}
      >
        <Section sx={{ px: { xs: 2.5, sm: 0 } }}>
          <NavBarNavList
            menus={menus}
            socialLinks={socialLinks}
            slotProps={{
              typography: {
                sx: {
                  color: "common.black",
                  variant: "h3",
                },
                onClick: handleClose,
              },
              item: {
                sx: {
                  mb: { xs: 5 },
                },
              },
            }}
            Component={Link}
          >
            {children}
          </NavBarNavList>
        </Section>
      </Drawer>
    </Grid>
  );
});

export default MobileNavBar;
