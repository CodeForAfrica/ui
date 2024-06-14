import {
  Dialog,
  DialogContent,
  Grid,
  Grid2Props,
  IconButton,
  Slide,
  SlideProps,
  SvgIcon,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import React, { ForwardedRef } from "react";

import menuIcon from "@/robots-generator/assets/icons/menu-icon.svg";
import CloseIcon from "@/robots-generator/assets/icons/Type=x, Size=24, Color=CurrentColor.svg";
import NavBarNavList from "@/robots-generator/components/NavBarNavList";
import NextImageButton from "@/robots-generator/components/NextImageButton";

interface SocialLinks {
  platform: string;
  url: string;
}

interface Menu {
  label: string;
  href: string;
}
interface Props extends Grid2Props {
  logo: any;
  menus: Menu[];
  socialLinks: SocialLinks[];
}

const DialogContainer = styled(Dialog)(({ theme: { palette, spacing } }) => ({
  "& .MuiDialog-container": {
    height: "100%",
  },
  "& .MuiBackdrop-root": {
    background: "transparent",
  },
  "& .MuiDialogContent-root": {
    padding: spacing(5),
    color: palette.text.secondary,
    background: palette.primary.main,
  },
}));

const Transition = React.forwardRef(function Transition(
  { children, ...props }: SlideProps,
  ref,
) {
  return (
    <Slide direction="down" ref={ref} {...props}>
      {children}
    </Slide>
  );
});

const MobileNavBar = React.forwardRef(function MobileNavBar(
  props: Props,
  ref: ForwardedRef<HTMLDivElement>,
) {
  const { logo, menus, socialLinks, sx } = props;
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Grid
      container
      justifyContent="space-between"
      alignItems="center"
      sx={sx}
      component="div"
      ref={ref}
    >
      <Grid item>
        <NextImageButton
          {...logo}
          href="/"
          alt="Logo"
          width={116}
          height={50}
          priority
        />
      </Grid>
      <Grid item>
        <IconButton color="inherit" onClick={handleClickOpen} sx={{ p: 0 }}>
          <SvgIcon
            component={menuIcon}
            sx={{
              fill: { xs: "none" },
              fontSize: 24,
            }}
          />
        </IconButton>
        <DialogContainer
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
          >
            <NavBarNavList
              menus={menus}
              socialLinks={socialLinks}
              NavListItemProps={{ onClick: handleClose }}
            />
            <IconButton color="inherit" onClick={handleClose} sx={{ p: 0 }}>
              <SvgIcon
                component={CloseIcon}
                sx={{
                  fill: { xs: "none" },
                  fontSize: 32,
                }}
              />
            </IconButton>
          </DialogContent>
        </DialogContainer>
      </Grid>
    </Grid>
  );
});

export default MobileNavBar;
