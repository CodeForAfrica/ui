import React, { useState } from "react";

import clsx from "clsx";

import { useRouter } from "next/router";

import {
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  IconButton,
  Slide,
  Typography,
} from "@material-ui/core";
import { Close as CloseIcon, Menu as MenuIcon } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";

import { Section } from "@commons-ui/core";

import Button from "@/promisetracker/components/Link/Button";
import Logo from "@/promisetracker/components/Navigation/Logo";
import NavigationList from "@/promisetracker/components/Navigation/MobileNavigation/NavigationList";
import SearchIcon from "@/promisetracker/icons/Search";

import config from "@/promisetracker/config";
import i18n from "@/promisetracker/lib/i18n";

const useStyles = makeStyles(({ palette, typography }) => ({
  root: {
    padding: `${typography.pxToRem(25 - 4)} 0 ${typography.pxToRem(27 - 4)} 0`,
  },
  section: {},
  closeButton: {
    marginRight: "-1rem",
  },
  dialog: {
    padding: 0,
  },
  dialogActions: {
    padding: `0 ${typography.pxToRem(21.5)} 0 ${typography.pxToRem(33)}`,
    transform: "matrix(-1, 0, 0, -1, 0, 0, )",
    background:
      "transparent linear-gradient(360deg, #202020 -200%, #005DFD 100%) 0% 0% no-repeat padding-box",
  },
  dialogContent: {
    padding: `0 ${typography.pxToRem(21.5)} 0 ${typography.pxToRem(33)}`,
    backgroundColor: "#005DFD",
  },
  menuButton: {
    color: palette.primary.main,
    padding: 0,
    paddingLeft: typography.pxToRem(12),
    "&:hover": {
      background: "inherit",
    },
  },
  searchButton: {
    paddingBottom: 0,
    paddingTop: 0,
    "&:hover": {
      background: "inherit",
    },
  },
  button: {
    color: palette.background.default,
    padding: "1rem",
  },
  buttonLanguage: {
    color: palette.primary.main,
    fontFamily: typography.fontFamily,
    fontSize: typography.pxToRem(14),
    fontWeight: 400,
    minWidth: 0,
    opacity: 0.5,
    textTransform: "capitalize",
    "&.active": {
      opacity: 1.0,
      color: palette.background.default,
    },
  },
  buttonLanguageFirst: {
    marginLeft: "-1rem",
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

function MobileNavigation(props) {
  const classes = useStyles(props);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { asPath, locale: activeLocale } = router;
  const { analysisMenu } = config;
  const _ = i18n();
  const { locales } = _;
  const currentPageUrl = asPath.split("/").slice(0, 2).join("/");
  const openAnalysisMenu = analysisMenu.url === currentPageUrl;
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
  const handleNavigate = () => {
    setOpen(false);
  };

  return (
    <Section classes={{ root: classes.section }}>
      <Grid
        container
        justify="space-between"
        alignItems="flex-end"
        className={classes.root}
      >
        <Grid item>
          <Logo />
        </Grid>
        <Grid item>
          <IconButton
            aria-label="Search"
            color="secondary"
            edge="start"
            className={classes.searchButton}
          >
            <SearchIcon viewBox="0 0 24 16" htmlColor="#D6D6D6" />
          </IconButton>
          <IconButton
            aria-label="Open drawer"
            edge="start"
            onClick={handleClickOpen}
            className={classes.menuButton}
          >
            <MenuIcon viewBox="0 0 24 16" />
          </IconButton>
        </Grid>

        <Dialog
          fullScreen
          open={open}
          onClose={handleClose}
          TransitionComponent={Transition}
          classes={{ root: classes.dialog, paper: classes.dialogPaper }}
        >
          <DialogActions className={classes.dialogActions}>
            <Grid container justify="space-between">
              <Grid
                item
                xs={10}
                container
                justify="flex-start"
                alignItems="center"
              >
                {locales.slice(0, 4).map((locale, i) => (
                  <Grid key={locale} item>
                    <Button
                      href={asPath}
                      locale={locale}
                      variant="text"
                      className={clsx(
                        classes.button,
                        classes.buttonLanguage,
                        {
                          active: locale === activeLocale,
                        },
                        {
                          [classes.buttonLanguageFirst]: i === 0,
                        }
                      )}
                    >
                      {_.language(locale)}
                    </Button>
                  </Grid>
                ))}
              </Grid>

              <Grid item xs={2} container justify="flex-end">
                <IconButton
                  aria-label="close drawer"
                  edge="start"
                  onClick={handleClose}
                  className={clsx(classes.button, classes.closeButton)}
                >
                  <CloseIcon fontSize="large" />
                </IconButton>
              </Grid>
            </Grid>
          </DialogActions>
          <DialogContent className={classes.dialogContent}>
            <Typography variant="body2" style={{ color: "white" }}>
              <NavigationList
                navigation={analysisMenu.subnav}
                onNavigate={handleNavigate}
                open={openAnalysisMenu}
              />
            </Typography>
          </DialogContent>
        </Dialog>
      </Grid>
    </Section>
  );
}

export default MobileNavigation;
