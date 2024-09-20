import { Section } from "@commons-ui/core";
import {
  Dialog,
  DialogContent,
  Grid,
  IconButton,
  Slide,
  SlideProps,
  SvgIcon,
} from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import React from "react";

import MenuIcon from "@/techlabblog/assets/icons/Type=menu, Size=24, Color=CurrentColor.svg";
import CloseIcon from "@/techlabblog/assets/icons/Type=x, Size=24, Color=CurrentColor.svg";
import Logo from "@/techlabblog/components/Logo";
import type NavBarProps from "@/techlabblog/components/NavBar/NavBarProps";
import NavBarNavList from "@/techlabblog/components/NavBarNavList";

const DialogContainer = styled(Dialog)(({ theme: { palette, spacing } }) => ({
  marginTop: "48px", // NavBar has 1px bottom border
  "& .MuiDialog-container": {
    height: "100%",
  },
  "& .MuiBackdrop-root": {
    background: "transparent",
  },
  "& .MuiDialogContent-root": {
    color: palette.text.primary,
    background: alpha(palette.background.default, 0.95),
  },
}));

interface TransitionProps extends SlideProps {}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps,
  ref,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const MobileNavBar = React.forwardRef(function MobileNavBar(
  props: NavBarProps,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  const { logo, menus, socialLinks, sx } = props;
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const MenuActionIcon = open ? CloseIcon : MenuIcon;

  return (
    <Grid
      container
      justifyContent="space-between"
      alignItems="center"
      sx={{
        color: "text.primary",
        ...sx,
      }}
      ref={ref}
    >
      <Grid item>
        <Logo {...logo} />
      </Grid>
      <Grid item>
        <IconButton color="inherit" onClick={handleClickOpen} sx={{ p: 0 }}>
          <SvgIcon
            sx={{
              fill: { xs: "none" },
              fontSize: 32,
            }}
          >
            <MenuActionIcon />
          </SvgIcon>
        </IconButton>
        <DialogContainer
          PaperProps={{ elevation: 0, sx: { background: "transparent" } }}
          fullScreen
          onClose={handleClose}
          TransitionComponent={Transition}
          aria-labelledby="mobile-navbar-dialog"
          open={open}
        >
          <DialogContent
            id="mobile-navbar-dialog"
            sx={(theme) => ({
              alignItems: "flex-start",
              borderTop: `1px solid ${theme.palette.divider}`,
              color: "inherit",
              display: "flex",
              justifyContent: "space-between",
              m: 0,
              p: 0,
            })}
          >
            <Section sx={{ px: { xs: 2.5, sm: 0 } }}>
              <NavBarNavList
                menus={menus}
                socialLinks={socialLinks}
                NavListItemProps={{ onClick: handleClose }}
              />
            </Section>
          </DialogContent>
        </DialogContainer>
      </Grid>
    </Grid>
  );
});

export default MobileNavBar;
