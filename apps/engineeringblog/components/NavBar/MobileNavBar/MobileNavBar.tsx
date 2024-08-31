import {
  Dialog,
  DialogContent,
  Grid,
  IconButton,
  Slide,
  SlideProps,
  SvgIcon,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";

import type NavBarProps from "@/engineeringblog/components/NavBar/NavBarProps";
import Logo from "@/engineeringblog/components/Logo";
import CloseIcon from "@/engineeringblog/assets/icons/Type=x, Size=24, Color=CurrentColor.svg";
import MenuIcon from "@/engineeringblog/assets/icons/Type=menu, Size=24, Color=CurrentColor.svg";

const DialogContainer = styled(Dialog)(({ theme: { palette, spacing } }) => ({
  marginTop: "49px", // NavBar has 1px bottom border
  "& .MuiDialog-container": {
    height: "100%",
  },
  "& .MuiBackdrop-root": {
    background: "transparent",
  },
  "& .MuiDialogContent-root": {
    padding: spacing(5),
    color: palette.text.primary,
    background: palette.background.default,
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
  const { logo, sx } = props;
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
          PaperProps={{ elevation: 0 }}
          fullScreen
          onClose={handleClose}
          TransitionComponent={Transition}
          aria-labelledby="mobile-navbar-dialog"
          open={open}
        >
          <DialogContent
            id="mobile-navbar-dialog"
            sx={{
              m: 0,
              p: 0,
              display: "flex",
              color: "inherit",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          ></DialogContent>
        </DialogContainer>
      </Grid>
    </Grid>
  );
});

export default MobileNavBar;
