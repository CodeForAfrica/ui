import { Grid, Dialog, DialogContent, Slide, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import React from "react";

/* eslint-disable import/no-unresolved */
import cfaLogo from "@/codeforafrica/assets/CfA logo.svg?url";
import closebutton from "@/codeforafrica/assets/close-button.svg?url";
import menuIcon from "@/codeforafrica/assets/menu-icon.svg?url";
import NavBarNavList from "@/codeforafrica/components/NavBarNavList";
import NextImageButton from "@/codeforafrica/components/NextImageButton";

const DialogContainer = styled(Dialog)(({ theme: { palette, spacing } }) => ({
  "& .MuiDialog-container": {
    height: "100%",
  },
  "& .MuiBackdrop-root": {
    background: "transparent",
  },
  "& .MuiDialogContent-root": {
    padding: spacing(2),
    color: palette.text.secondary,
    background: palette.primary.main,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const MobileNavBar = React.forwardRef(function MobileNavBar(props, ref) {
  const { menu, direction, ...other } = props;

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
      direction="row"
      {...other}
      ref={ref}
    >
      <Grid item>
        <NextImageButton src={cfaLogo} alt="Logo" width="116px" height="50px" />
      </Grid>
      <Grid item>
        <Box sx={{ justifyContent: "flex-end" }}>
          <NextImageButton
            src={menuIcon}
            alt="menu icon"
            onClick={handleClickOpen}
            width="32px"
            height="32px"
          />
        </Box>
        <DialogContainer
          fullScreen
          onClose={handleClose}
          TransitionComponent={Transition}
          aria-labelledby="mobile-navbar-dialog-container"
          open={open}
        >
          <DialogContent
            id="mobile-navbar-dialog"
            sx={{
              m: 0,
              p: 2,
              display: "flex",
              color: "inherit",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
            onClose={handleClose}
          >
            <NavBarNavList menu={menu} direction={direction} />
            <NextImageButton
              src={closebutton}
              alt="Logo"
              width="40px"
              height="40px"
              onClick={handleClose}
            />
          </DialogContent>
        </DialogContainer>
      </Grid>
    </Grid>
  );
});

MobileNavBar.propTypes = {
  direction: PropTypes.string,
  menu: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      href: PropTypes.string,
    })
  ),
};

MobileNavBar.defaultProps = {
  direction: undefined,
  menu: undefined,
};

export default MobileNavBar;
