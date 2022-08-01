import { Link } from "@commons-ui/next";
import { Grid, List, ListItem, Collapse, Typography } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import PropTypes from "prop-types";
import React, { useState } from "react";

const useStyles = makeStyles(({ breakpoints, typography, palette }) => ({
  root: {},
  collapse: {
    borderLeft: `1.5px solid white`,
    margin: 0,
    padding: 0,
    [breakpoints.up("md")]: {
      borderLeft: `1.5px solid white`,
    },
  },
  listItem: {
    padding: 0,
    paddingTop: typography.pxToRem(55),
    "&:hover": {
      backgroundColor: "unset",
    },
    "&:first-of-type": {
      paddingTop: typography.pxToRem(40),
    },
  },
  listItemText: {
    paddingTop: typography.pxToRem(50),
    color: palette.background.default,
    fontSize: typography.pxToRem(18),
    textTransform: "uppercase",
    fontWeight: 600,
    letterSpacing: "0.72px",
    fontFamily: typography.fontFamily,
    padding: "0rem 1rem",
  },
  mainNav: {
    padding: 0,
  },
  openTitle: {
    color: palette.secondary.main,
    fontSize: typography.pxToRem(13),
    fontWeight: 700,
    letterSpacing: "0.52px",
    padding: 0,
    opacity: 0.5,
    textTransform: "uppercase",
  },
  title: {
    color: palette.background.default,
    fontSize: typography.pxToRem(18),
    fontWeight: 600,
    padding: 0,
    textTransform: "uppercase",
  },
  items: {
    padding: "0rem 1.5rem",
    opacity: 0.5,
  },
}));

function ListItemLink(props) {
  return <Link {...props} variant="h4" />;
}

function NavigationList({ onNavigate, open: openProp, navigation, ...props }) {
  const classes = useStyles(props);
  const [open, setOpen] = useState(openProp);
  const handleClick = () => {
    setOpen(!open);
  };
  const {
    promises: promisesMenu,
    analysis: { navigation: analysisMenuNavigation, ...analysisMenu },
    actNow: actNowMenu,
  } = navigation;

  return (
    <Grid
      container
      direction="column"
      justifyContent="space-between"
      className={classes.root}
    >
      <List
        component="nav"
        aria-labelledby="nested-list-subheader"
        className={classes.mainNav}
      >
        <ListItem
          component="div"
          autoFocus={false}
          onClick={onNavigate}
          className={classes.listItem}
        >
          <ListItemLink underline="none" href={promisesMenu.href}>
            <Typography variant="h4" className={classes.title}>
              {promisesMenu.title}
            </Typography>
          </ListItemLink>
        </ListItem>

        {analysisMenuNavigation?.length > 0 ? (
          <>
            <ListItem
              autoFocus={false}
              button
              onClick={handleClick}
              className={classes.listItem}
            >
              <Typography
                variant="h4"
                className={open ? classes.openTitle : classes.title}
              >
                {analysisMenu.title}
              </Typography>
            </ListItem>

            <Collapse in={open} timeout="auto">
              <List component="nav" className={classes.collapse}>
                {analysisMenuNavigation.map((item) => (
                  <ListItemLink
                    key={item.title}
                    href={item.href}
                    onClick={onNavigate}
                    underline="none"
                  >
                    <Typography variant="h4" className={classes.listItemText}>
                      {item.title}
                    </Typography>
                  </ListItemLink>
                ))}
              </List>
            </Collapse>
          </>
        ) : null}

        {actNowMenu?.href ? (
          <ListItem
            component="div"
            autoFocus={false}
            onClick={onNavigate}
            className={classes.listItem}
          >
            <ListItemLink underline="none" href={actNowMenu.href}>
              <Typography variant="h4" className={classes.title}>
                {actNowMenu.title}
              </Typography>
            </ListItemLink>
          </ListItem>
        ) : null}
      </List>
    </Grid>
  );
}

NavigationList.propTypes = {
  navigation: PropTypes.shape({
    actNow: PropTypes.shape({
      href: PropTypes.string,
      title: PropTypes.string,
    }),
    analysis: PropTypes.shape({
      navigation: PropTypes.arrayOf(PropTypes.shape({})),
    }),
    promises: PropTypes.shape({
      href: PropTypes.string,
      title: PropTypes.string,
    }),
  }).isRequired,
  onNavigate: PropTypes.func,
  open: PropTypes.bool,
};

NavigationList.defaultProps = {
  onNavigate: undefined,
  open: undefined,
};

export default NavigationList;
