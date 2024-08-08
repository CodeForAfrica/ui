import {
  Dialog,
  DialogContent,
  Grid,
  IconButton,
  Slide,
  SvgIcon,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import React from "react";

import CloseIcon from "@/civicsignalblog/assets/icons/Type=x, Size=24, Color=CurrentColor.svg";
import menuIcon from "@/civicsignalblog/assets/menu-icon.svg?url";
import NavBarNavList from "@/civicsignalblog/components/NavBarNavList";
import NextImageButton from "@/civicsignalblog/components/NextImageButton";

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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const MobileNavBar = React.forwardRef(function MobileNavBar(props, ref) {
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
        <NextImageButton
          src={menuIcon}
          alt="menu icon"
          onClick={handleClickOpen}
          width={32}
          height={32}
        />
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
            onClose={handleClose}
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

MobileNavBar.propTypes = {
  direction: PropTypes.string,
  menus: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      href: PropTypes.string,
    }),
  ),
};

MobileNavBar.defaultProps = {
  direction: undefined,
  menus: undefined,
};

export default MobileNavBar;
