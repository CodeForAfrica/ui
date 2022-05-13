import { Grid, Dialog, DialogContent, Slide } from "@mui/material";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import React from "react";

import cfaLogo from "@/codeforafrica/assets/CfA logo.svg";
import menuIcon from "@/codeforafrica/assets/menu-icon.svg";
import ImageIcon from "@/codeforafrica/components/ImageIcon";
import NavBarNavList from "@/codeforafrica/components/NavBarNavList";

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

const MobileNavigation = React.forwardRef(function MobileNavigation(
  props,
  ref
) {
  const { menu } = props;

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
      ref={ref}
    >
      <Grid item xs={4} sx={{ ml: 2 }}>
        <ImageIcon src={cfaLogo} alt="Logo" width="116px" height="50px" />
      </Grid>
      <Grid item xs={6} container justifyContent="flex-end" sx={{ mr: 2 }}>
        <ImageIcon
          src={menuIcon}
          alt="menu icon"
          onClick={handleClickOpen}
          width="32px"
          height="32px"
        />
        <DialogContainer
          fullScreen
          onClose={handleClose}
          TransitionComponent={Transition}
          aria-labelledby="customized-dialog-title"
          open={open}
        >
          <DialogContent
            id="customized-dialog-title"
            ref={ref}
            {...props}
            sx={{ m: 0, p: 2 }}
            onClose={handleClose}
          >
            <NavBarNavList menu={menu} {...props} />
          </DialogContent>
        </DialogContainer>
      </Grid>
    </Grid>
  );
});

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
