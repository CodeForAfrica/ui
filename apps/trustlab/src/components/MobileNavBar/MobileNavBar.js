import { NavBarNavList, Section } from "@commons-ui/core";
import { Link, NextImageButton } from "@commons-ui/next";
import { Drawer, Grid } from "@mui/material";
import React, { useState } from "react";

// eslint-disable-next-line import/no-unresolved
import XIcon from "@/trustlab/assets/icons/Type=x, Size=24, Color=currentColor.svg?url";
// eslint-disable-next-line import/no-unresolved
import MenuIcon from "@/trustlab/assets/menu-icon.svg?url";

const MobileNavBar = React.forwardRef(function MobileNavBar(props, ref) {
  const { logo, menus, socialLinks } = props;
  const [open, setOpen] = useState(false);
  const handleClick = () => setOpen((prev) => !prev);
  const handleClose = () => setOpen(false);

  const Icon = open ? XIcon : MenuIcon;
  return (
    <Grid
      container
      justifyContent="space-between"
      alignItems="center"
      sx={{ display: { xs: "flex", md: "none" } }}
      ref={ref}
    >
      <Grid item>
        <NextImageButton
          {...logo}
          href="/"
          alt="Logo"
          width={136}
          height={61}
          priority
        />
      </Grid>
      <Grid item>
        <NextImageButton
          src={Icon}
          alt="menu icon"
          onClick={handleClick}
          width={32}
          height={32}
        />
      </Grid>
      <Drawer
        anchor="top"
        open={open}
        onClose={handleClose}
        hideBackdrop
        slotProps={{
          paper: {
            onClick: handleClick,
            square: true,
            sx: {
              overflowY: { xs: "scroll", sm: "visible" },
              top: 64,
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
          />
        </Section>
      </Drawer>
    </Grid>
  );
});

export default MobileNavBar;
