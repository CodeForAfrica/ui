import { Grid, IconButton, Dialog, DialogContent, Slide } from "@mui/material";
import { styled } from "@mui/material/styles";
import Image from "next/image";
import PropTypes from "prop-types";
import React from "react";

import cfaLogo from "@/codeforafrica/assets/CfA logo.svg";
import menuIcon from "@/codeforafrica/assets/menu-icon.svg";
import Logo from "@/codeforafrica/components/Logo";
import NavigationNavList from "@/codeforafrica/components/NavigationNavList";

const DialogContainer = styled(Dialog)(({ theme: { palette, spacing } }) => ({
  "& .MuiDialog-container": {
    height: "50%",
  },
  "& .MuiBackdrop-root": {
    background: "transparent",
  },
  "& .MuiDialogContent-root": {
    padding: spacing(2),
    background: palette.primary.main,
  },
}));

function DialogMenu(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogContent sx={{ m: 0, p: 2 }} {...other}>
      {children}
    </DialogContent>
  );
}

DialogMenu.propTypes = {
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
};

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

function MobileNavigation({ menu }) {
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
    >
      <Grid item xs={4}>
        <Logo src={cfaLogo} alt="Logo" />
      </Grid>
      <Grid item xs={6} sx={{ display: "flex", justifyContent: "flex-end" }}>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={handleClickOpen}
          sx={{ mr: 2 }}
        >
          <Image src={menuIcon} alt="menu icon" />
        </IconButton>

        <DialogContainer
          fullScreen
          onClose={handleClose}
          TransitionComponent={Transition}
          aria-labelledby="customized-dialog-title"
          open={open}
        >
          <DialogMenu id="customized-dialog-title" onClose={handleClose}>
            <NavigationNavList menu={menu} />
          </DialogMenu>
        </DialogContainer>
      </Grid>
    </Grid>
  );
}

MobileNavigation.propTypes = {
  menu: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      href: PropTypes.string,
    })
  ),
};

MobileNavigation.defaultProps = {
  menu: undefined,
};

export default MobileNavigation;
