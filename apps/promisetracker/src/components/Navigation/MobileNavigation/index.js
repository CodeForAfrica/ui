import { Section } from "@commons-ui/core";
import { Link } from "@commons-ui/next";
import { Close as CloseIcon } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  IconButton,
  Slide,
  Typography,
} from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import clsx from "clsx";
import Image from "next/image";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import React, { useState } from "react";

import hamburgerIcon from "@/promisetracker/assets/hamburger-icon.svg?url";
import searchIcon from "@/promisetracker/assets/search-icon.svg?url";
import Logo from "@/promisetracker/components/Navigation/Logo";
import NavigationList from "@/promisetracker/components/Navigation/MobileNavigation/NavigationList";
import i18n from "@/promisetracker/lib/i18n";

const useStyles = makeStyles(({ palette, typography }) => ({
  root: {},
  section: {},
  navigation: {
    padding: `${typography.pxToRem(25 - 4)} 0 ${typography.pxToRem(27 - 4)} 0`,
  },
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

function MobileNavigation({ navigation, ...props }) {
  const classes = useStyles(props);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { asPath, locale: activeLocale } = router;
  const { analysis: analysisMenu } = navigation;
  const _ = i18n();
  const { locales } = _;
  const currentPageUrl = asPath.split("/").slice(0, 2).join("/");
  const openAnalysisMenu = analysisMenu.href === currentPageUrl;
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
    <div className={classes.root}>
      <Section classes={{ root: classes.section }}>
        <Grid
          container
          justifyContent="space-between"
          alignItems="space-between"
          className={classes.navigation}
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
              size="large"
            >
              <Image src={searchIcon} width={21.561} height={21.561} />
            </IconButton>
            <IconButton
              aria-label="Open drawer"
              edge="start"
              onClick={handleClickOpen}
              className={classes.menuButton}
              size="large"
            >
              <Image src={hamburgerIcon} width={25} height={18} />
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
              <Grid container justifyContent="space-between">
                <Grid
                  item
                  xs={10}
                  container
                  justifyContent="flex-start"
                  alignItems="center"
                >
                  {locales.slice(0, 4).map((locale, i) => (
                    <Grid key={locale} item>
                      <Button
                        component={Link}
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

                <Grid item xs={2} container justifyContent="flex-end">
                  <IconButton
                    aria-label="close drawer"
                    edge="start"
                    onClick={handleClose}
                    className={clsx(classes.button, classes.closeButton)}
                    size="large"
                  >
                    <CloseIcon fontSize="large" />
                  </IconButton>
                </Grid>
              </Grid>
            </DialogActions>
            <DialogContent className={classes.dialogContent}>
              <Typography variant="body2" style={{ color: "white" }}>
                <NavigationList
                  navigation={navigation}
                  onNavigate={handleNavigate}
                  open={openAnalysisMenu}
                />
              </Typography>
            </DialogContent>
          </Dialog>
        </Grid>
      </Section>
    </div>
  );
}

MobileNavigation.propTypes = {
  navigation: PropTypes.shape({
    actNow: PropTypes.shape({
      href: PropTypes.string,
    }),
    analysis: PropTypes.shape({
      href: PropTypes.string,
      navigation: PropTypes.arrayOf(PropTypes.shape({})),
    }),
    promises: PropTypes.shape({
      href: PropTypes.string,
    }),
  }),
};

MobileNavigation.defaultProps = {
  navigation: undefined,
};

export default MobileNavigation;
