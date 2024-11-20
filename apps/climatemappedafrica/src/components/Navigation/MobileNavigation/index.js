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
  links: {
    display: "inline-block",
  },
  menuLinks: {
    color: palette.text.secondary,
    display: "inline-block",
    margin: `${typography.pxToRem(10)} 0`,
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
    },
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
  sx,
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
      router.push(`/${explorePagePath}/${code}`);
    }
  };

  return (
    <Grid
      container
      alignItems="center"
      justifyContent="space-between"
      className={classes.logoSection}
      sx={sx}
    >
      <Grid item xs={10}>
        <NextImageButton
          {...logo}
          href="/"
          style={{
            height: 44,
            width: "auto",
          }}
          priority
        />
      </Grid>
      <Grid item>
        <IconButton
          aria-label="Open drawer"
          size="medium"
          onClick={handleClickOpen}
          sx={(theme) => ({
            color: theme.palette.grey.dark,
            padding: 0,
          })}
        >
          <SvgIcon
            component={MenuOpenIcon}
            sx={{
              fontSize: 32,
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
              alignItems="center"
              justifyContent="space-between"
              className={classes.logoSection}
            >
              <Grid item xs={10}>
                <NextImageButton
                  {...logo}
                  href="/"
                  style={{
                    height: 44,
                    width: "auto",
                  }}
                  priority
                />
              </Grid>
              <Grid item>
                <IconButton
                  aria-label="Close drawer"
                  size="medium"
                  onClick={handleClose}
                  sx={{
                    color: "text.secondary",
                  }}
                >
                  <SvgIcon
                    component={MenuCloseIcon}
                    sx={{
                      fontSize: 32,
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
              explorePagePath={explorePagePath}
              links={menus}
              socialLinks={socialLinks}
              classes={{
                root: classes.mainMenu,
                links: classes.links,
                menuLinks: classes.menuLinks,
                label: classes.label,
                menu: classes.buttonMenu,
              }}
            >
              <DropdownSearch
                IconButtonProps={{
                  sx: ({ palette }) => ({
                    borderRadius: "50%",
                    border: `2px solid ${palette.background.default}`,
                  }),
                }}
                InputBaseProps={{
                  sx: ({ palette, typography }) => ({
                    border: `2px solid ${palette.background.default}`,
                    backgroundColor: palette.background.default,
                    height: typography.pxToRem(44), // match search button
                    margin: 0,
                  }),
                }}
                TypographyProps={{
                  sx: ({ palette }) => ({
                    color: palette.text.secondary,
                  }),
                }}
                href={explorePagePath}
                icon={SearchIcon}
                label="Search for a location"
                onClick={handleClickSearch}
                sx={{
                  mb: 1,
                  mt: 2,
                  order: 0,
                }}
                {...props}
              />
            </Menu>
          </Section>
        </DialogContent>
      </Dialog>
    </Grid>
  );
}

MobileNavigation.propTypes = {
  drawerLogo: PropTypes.shape({}),
  logo: PropTypes.shape({}),
  menus: PropTypes.arrayOf(PropTypes.shape({})),
  socialLinks: PropTypes.arrayOf(PropTypes.shape({})),
};

export default MobileNavigation;
