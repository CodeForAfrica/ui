import {
  Dialog,
  DialogContent,
  Grid,
  IconButton,
  Slide,
  SvgIcon,
} from "@mui/material";
import React from "react";

import NavBarNavList from "@/commons-ui/core/NavBarNavList";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const MobileNavBar = React.forwardRef(function MobileNavBar(props, ref) {
  const {
    logo,
    menus,
    socialLinks,
    sx,
    CloseIcon,
    menuIcon,
    NextImageButton = React.Fragment,
  } = props;
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
        <Dialog
          fullScreen
          onClose={handleClose}
          TransitionComponent={Transition}
          aria-labelledby="mobile-navbar-dialog"
          open={open}
          sx={({ palette, spacing }) => ({
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
          })}
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
        </Dialog>
      </Grid>
    </Grid>
  );
});

export default MobileNavBar;
