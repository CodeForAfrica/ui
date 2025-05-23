import LogoButton from "@commons-ui/core/LogoButton";
import {
  Grid,
  Slide,
  Dialog,
  DialogActions,
  IconButton,
  DialogContent,
} from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import PropTypes from "prop-types";
import React, { useState } from "react";

import MenuCloseIcon from "@/twoopstracker/assets/close_black_24dp.svg";
import MenuOpenIcon from "@/twoopstracker/assets/menu_open.svg";
import Image from "@/twoopstracker/components/Image";
import Link from "@/twoopstracker/components/Link";
import Menu from "@/twoopstracker/components/Menu";
import Section from "@/twoopstracker/components/Section";

const useStyles = makeStyles(({ breakpoints, typography, palette }) => ({
  root: {
    marginBottom: typography.pxToRem(10),
    marginTop: typography.pxToRem(10),
  },
  logoButton: {
    padding: 0,
    "&:hover, &:focus, &:focus-within": {
      backgroundColor: "transparent",
      textDecoration: "none",
    },
  },
  section: {},
  dialog: {
    padding: 0,
  },
  firstTitle: {
    color: palette.background.default,
    fontWeight: "normal",
    [breakpoints.up("lg")]: {
      fontWeight: "bold",
    },
  },
  secondTitle: {
    color: palette.background.default,
  },
  subtitle: {
    color: palette.background.default,
  },
  logoSection: {
    borderBottom: `2px solid ${palette.background.default}`,
    padding: `${typography.pxToRem(10)} 0`,
  },
  backdrop: {
    backgroundColor: "transparent",
    maxHeight: typography.pxToRem(844),
  },
  dialogActions: {
    padding: 0,
    borderBottom: "1px solid black",
  },
  dialogContent: {
    overflow: "hidden",
    padding: `${typography.pxToRem(40)} 0`,
  },
  dialogMenu: {
    padding: `${typography.pxToRem(10.35)} 0`,
  },
  dialogPaper: {
    background: "white",
    maxHeight: "100%",
    position: "absolute",
    left: 0,
    top: 0,
    overflow: "hidden",
  },
  menuButton: {
    color: palette.grey.dark,
    background: "#F0F0F0",
    borderRadius: typography.pxToRem(50),
    height: typography.pxToRem(34),
    padding: 0,
    width: typography.pxToRem(34),
    "&:hover": {
      background: "#F0F0F0",
      borderRadius: typography.pxToRem(50),
    },
  },
  closeButton: {
    color: palette.background.main,
    height: typography.pxToRem(34),
    padding: 0,
    width: typography.pxToRem(34),
    "&:hover": {
      background: "none",
    },
  },
  menuItems: {
    padding: `${typography.pxToRem(20)} 0 ${typography.pxToRem(71)}`,
  },
  button: {
    color: palette.background.dark,
    padding: typography.pxToRem(16),
  },
  open: {
    fontSize: typography.pxToRem(32),
  },
  close: {
    color: palette.background.default,
    fontSize: typography.pxToRem(32),
  },
  label: {
    [breakpoints.up("lg")]: {
      letterSpacing: "1.6px",
      fontSize: typography.pxToRem(20),
    },
  },
  buttonMenu: {
    margin: 0,
  },
  menuLinks: {
    color: "black",
    margin: `${typography.pxToRem(10)} ${typography.pxToRem(-8)}`,
    "&:hover, &:focus, &:focus-within": {
      backgroundColor: "transparent",
      textDecoration: "none",
      color: "black",
    },
  },
  mainMenu: {
    [breakpoints.up("lg")]: {
      flexDirection: "column",
      justifyContent: "flex-start",
    },
  },
  search: {
    margin: `${typography.pxToRem(20)} 0 ${typography.pxToRem(60)}`,
  },
  searchInput: {
    border: `2px solid ${palette.background.default}`,
    backgroundColor: palette.background.default,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" timeout={1000} ref={ref} {...props} />;
});

function MobileNavigation({
  logo,
  main,
  login,
  profilePages,
  accountLink,
  logOutLabel,
  ...props
}) {
  const classes = useStyles(props);
  const [open, setOpen] = useState(false);

  const handleClickOpen = (e) => {
    e?.preventDefault();
    setOpen(true);
  };
  const handleClose = (e) => {
    e?.preventDefault();
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <Section className={classes.section}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item xs={10}>
            <LogoButton
              href="/"
              component={Link}
              className={classes.logoButton}
            >
              <Image height={40} width={164} {...logo} />
            </LogoButton>
          </Grid>
          <Grid item>
            <IconButton
              aria-label="Open drawer"
              edge="start"
              size="medium"
              onClick={handleClickOpen}
              className={classes.menuButton}
            >
              <Image
                src={MenuOpenIcon}
                width={24}
                height={24}
                className={classes.open}
              />
            </IconButton>
          </Grid>
          <Dialog
            fullScreen
            open={open}
            onClose={handleClose}
            BackdropProps={{
              classes: {
                root: classes.backdrop,
              },
            }}
            TransitionComponent={Transition}
            classes={{ root: classes.dialog, paper: classes.dialogPaper }}
          >
            <DialogActions className={classes.dialogActions}>
              <Section className={classes.section}>
                <Grid
                  container
                  direction="row"
                  justifyContent="space-between"
                  className={classes.logoSection}
                >
                  <Grid item xs={10}>
                    <LogoButton
                      href="/"
                      component={Link}
                      className={classes.logoButton}
                    >
                      <Image height={40} width={254} {...logo} />
                    </LogoButton>
                  </Grid>
                  <Grid item>
                    <IconButton
                      aria-label="Close drawer"
                      edge="end"
                      size="medium"
                      onClick={handleClose}
                      className={classes.closeButton}
                    >
                      <Image src={MenuCloseIcon} width={24} height={24} />
                    </IconButton>
                  </Grid>
                </Grid>
              </Section>
            </DialogActions>
            <DialogContent className={classes.dialogContent}>
              <Section className={classes.section}>
                <Menu
                  main={main}
                  login={login}
                  profilePages={profilePages}
                  accountLink={accountLink}
                  logOutLabel={logOutLabel}
                  classes={{
                    root: classes.mainMenu,
                    menuLinks: classes.menuLinks,
                    label: classes.label,
                    menu: classes.buttonMenu,
                  }}
                />
              </Section>
            </DialogContent>
          </Dialog>
        </Grid>
      </Section>
    </div>
  );
}

MobileNavigation.propTypes = {
  logOutLabel: PropTypes.string,
  profilePages: PropTypes.arrayOf(PropTypes.shape({})),
  accountLink: PropTypes.arrayOf(PropTypes.shape({})),
  login: PropTypes.arrayOf(PropTypes.shape({})),
  logo: PropTypes.shape({
    alt: PropTypes.string,
    href: PropTypes.string,
    src: PropTypes.oneOfType([PropTypes.shape({}), PropTypes.string]),
    width: PropTypes.number,
    height: PropTypes.number,
  }),
  main: PropTypes.arrayOf(PropTypes.shape({})),
};

MobileNavigation.defaultProps = {
  logOutLabel: undefined,
  login: undefined,
  logo: undefined,
  main: undefined,
  profilePages: undefined,
  accountLink: undefined,
};

export default MobileNavigation;
