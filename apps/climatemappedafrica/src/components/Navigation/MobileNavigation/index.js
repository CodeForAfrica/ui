import {
  Grid,
  Slide,
  Dialog,
  DialogActions,
  IconButton,
  DialogContent,
  SvgIcon,
} from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import React, { useState } from "react";

import SearchIcon from "@/climatemappedafrica/assets/icons/search-open.svg";
import MenuCloseIcon from "@/climatemappedafrica/assets/menu_close.svg";
import MenuOpenIcon from "@/climatemappedafrica/assets/menu_open.svg";
import DropdownSearch from "@/climatemappedafrica/components/DropdownSearch";
import Menu from "@/climatemappedafrica/components/Menu";
import NextImageButton from "@/climatemappedafrica/components/NextImageButton";
import Section from "@/climatemappedafrica/components/Section";

const useStyles = makeStyles(({ breakpoints, typography, palette }) => ({
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
  },
  dialogContent: {
    overflow: "hidden",
    padding: `${typography.pxToRem(40)} 0`,
  },
  dialogMenu: {
    padding: `${typography.pxToRem(10.35)} 0`,
  },
  dialogPaper: {
    background: palette.primary.main,
    maxHeight: typography.pxToRem(844),
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
      fontWeight: 600,
      letterSpacing: "1.6px",
      fontSize: typography.pxToRem(20),
    },
  },
  buttonMenu: {
    margin: 0,
  },
  menuLinks: {
    color: palette.text.secondary,
    margin: `${typography.pxToRem(10)} ${typography.pxToRem(-8)}`,
    "&:hover, &:focus, &:focus-within": {
      backgroundColor: "transparent",
      textDecoration: "none",
      color: palette.text.secondary,
    },
  },
  mainMenu: {
    [breakpoints.up("lg")]: {
      flexDirection: "column",
      justifyContent: "flex-start",
      "& > div:nth-of-type(2)": {
        order: 4,
      },
      "& > div:nth-of-type(3)": {
        order: 5,
      },
      "& > div:nth-of-type(4)": {
        order: 3,
      },
      "& > div:nth-of-type(5)": {
        order: 2,
      },
      "& > div:nth-of-type(6)": {
        order: 5,
      },
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
  drawerLogo,
  explorePagePath,
  logo,
  menus,
  socialLinks,
  ...props
}) {
  const classes = useStyles(props);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleClickOpen = (e) => {
    e?.preventDefault();
    setOpen(true);
  };
  const handleClose = (e) => {
    e?.preventDefault();
    setOpen(false);
  };

  const handleClickSearch = (code) => {
    setOpen(false);
    if (code) {
      router.push(`explore/${code}`);
    }
  };

  return (
    <div>
      <Section>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item xs={10}>
            <NextImageButton
              href="/"
              {...logo}
              width={180}
              height={80}
              priority
            />
          </Grid>
          <Grid item>
            <IconButton
              aria-label="Open drawer"
              edge="start"
              size="medium"
              onClick={handleClickOpen}
              sx={(theme) => ({
                color: theme.palette.grey.dark,
                background: "#F0F0F0",
                borderRadius: theme.typography.pxToRem(50),
                height: theme.typography.pxToRem(34),
                padding: 0,
                width: theme.typography.pxToRem(34),
                "&:hover": {
                  background: "#F0F0F0",
                  borderRadius: theme.typography.pxToRem(50),
                },
              })}
            >
              <SvgIcon
                component={MenuOpenIcon}
                viewBox="0 0 24 24"
                sx={{
                  width: 24,
                  height: 24,
                }}
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
                    <NextImageButton
                      href="/"
                      {...drawerLogo}
                      width={180}
                      height={80}
                      priority
                    />
                  </Grid>
                  <Grid item>
                    <IconButton
                      aria-label="Close drawer"
                      edge="end"
                      size="medium"
                      onClick={handleClose}
                      className={classes.closeButton}
                    >
                      <SvgIcon
                        component={MenuCloseIcon}
                        viewBox="0 0 48 48"
                        sx={{
                          width: 32,
                          height: 32,
                        }}
                      />
                    </IconButton>
                  </Grid>
                </Grid>
              </Section>
            </DialogActions>
            <DialogContent className={classes.dialogContent}>
              <Section className={classes.section}>
                <Menu
                  links={menus}
                  socialLinks={socialLinks}
                  classes={{
                    root: classes.mainMenu,
                    menuLinks: classes.menuLinks,
                    label: classes.label,
                    menu: classes.buttonMenu,
                  }}
                >
                  <DropdownSearch
                    href={explorePagePath}
                    classes={{
                      root: classes.search,
                      inputRoot: classes.searchInput,
                    }}
                    icon={SearchIcon}
                    onClick={handleClickSearch}
                    {...props}
                  />
                </Menu>
              </Section>
            </DialogContent>
          </Dialog>
        </Grid>
      </Section>
    </div>
  );
}

MobileNavigation.propTypes = {
  drawerLogo: PropTypes.shape({}),
  logo: PropTypes.shape({}),
  menus: PropTypes.arrayOf(PropTypes.shape({})),
  socialLinks: PropTypes.arrayOf(PropTypes.shape({})),
};

export default MobileNavigation;
