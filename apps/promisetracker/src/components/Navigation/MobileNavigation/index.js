import React from "react";

import clsx from "clsx";

import { makeStyles } from "@material-ui/core/styles";

import {
  Grid,
  Slide,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  Link,
  Typography,
} from "@material-ui/core";

import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";
import MenuIcon from "@material-ui/icons/Menu";

import IconButtonLink from "@/promisetracker/components/Link/IconButton";

import Logo from "@/promisetracker/components/Navigation/Logo";
import NavigationList from "@/promisetracker/components/Navigation/MobileNavigation/NavigationList";

import config from "@/promisetracker/config";

const useStyles = makeStyles(({ palette, typography }) => ({
  root: {
    padding: "0rem 2rem ",
  },
  dialog: {},
  dialogActions: {
    padding: "8px 24px",
    transform: "matrix(-1, 0, 0, -1, 0, 0, )",
    background:
      "transparent linear-gradient(360deg, #202020 -200%, #005DFD 100%) 0% 0% no-repeat padding-box",
  },
  dialogContent: {
    backgroundColor: "#005DFD",
  },
  menuIcon: {
    color: palette.primary.main,
  },
  searchIcon: {
    color: "#D6D6D6",
  },
  button: {
    color: palette.background.default,
    padding: "1rem",
  },
  languageButton: {
    fontWeight: "normal",
    color: palette.primary.main,
    fontFamily: typography.fontFamily,
    textTransform: "capitalize",
    fontSize: typography.pxToRem(14),
    opacity: 0.5,
    "&.active": {
      opacity: 1.0,
      color: palette.background.default,
    },
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

function MobileNavigation(props) {
  const classes = useStyles(props);
  const [open, setOpen] = React.useState(false);
  const { navigationMenu } = config;

  const activeclassName = clsx(
    classes.button,
    classes.languageButton,
    "active"
  );
  const className = clsx(classes.button, classes.languageButton);

  const handleClickOpen = (e) => {
    if (e) {
      e.preventDefault();
    }
    setOpen(true);
  };
  const handleClose = (e) => {
    if (e) {
      e.preventDefault();
    }
    setOpen(false);
  };

  return (
    <Grid
      container
      justify="space-between"
      alignItems="center"
      className={classes.root}
    >
      <Grid item xs={3}>
        <Logo />
      </Grid>
      <Grid item>
        <IconButtonLink
          aria-label="Open drawer"
          color="secondary"
          edge="start"
          href="/#"
          className={classes.searchIcon}
        >
          <SearchIcon fontSize="large" />
        </IconButtonLink>

        <IconButtonLink
          aria-label="Open drawer"
          edge="start"
          href="/#"
          onClick={handleClickOpen}
          className={classes.menuIcon}
        >
          <MenuIcon fontSize="large" />
        </IconButtonLink>

        <Dialog
          fullScreen
          open={open}
          onClose={handleClose}
          TransitionComponent={Transition}
          classes={{ root: classes.dialog, paper: classes.dialogPaper }}
        >
          <DialogActions className={classes.dialogActions}>
            <Grid
              container
              justify="space-between"
              alignItems="center"
              spacing={1}
            >
              <Grid item>
                <Link
                  href="/#"
                  variant="overline"
                  underline="none"
                  className={activeclassName}
                >
                  En
                </Link>
                <Link
                  href="/#"
                  variant="overline"
                  underline="none"
                  className={className}
                >
                  Am
                </Link>
                <Link
                  href="/#"
                  variant="overline"
                  underline="none"
                  className={className}
                >
                  Fr
                </Link>
                <Link
                  href="/#"
                  variant="overline"
                  underline="none"
                  className={className}
                >
                  عربى
                </Link>
              </Grid>
            </Grid>

            <Grid item>
              <IconButton
                aria-label="close drawer"
                edge="start"
                onClick={handleClose}
                className={classes.button}
              >
                <CloseIcon fontSize="large" />
              </IconButton>
            </Grid>
          </DialogActions>
          <DialogContent className={classes.dialogContent}>
            <Typography variant="body2" style={{ color: "white" }}>
              <NavigationList navigation={navigationMenu} />
            </Typography>
          </DialogContent>
        </Dialog>
      </Grid>
    </Grid>
  );
}

export default MobileNavigation;
