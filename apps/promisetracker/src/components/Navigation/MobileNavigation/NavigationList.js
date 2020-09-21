import React, { useState } from "react";
import PropTypes from "prop-types";

import { Grid, List, ListItem, Collapse, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import Link from "@/promisetracker/components/Link";

const useStyles = makeStyles(({ typography, palette }) => ({
  root: {},
  collapse: {
    borderLeft: `1.5px solid #707070`,
    margin: 0,
    padding: 0,
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

  if (!navigation?.length) {
    return null;
  }
  return (
    <Grid
      container
      direction="column"
      justify="space-between"
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
          <ListItemLink underline="none" href="/promises">
            <Typography variant="h4" className={classes.title}>
              Promises
            </Typography>
          </ListItemLink>
        </ListItem>

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
            Analysis
          </Typography>
        </ListItem>

        <Collapse in={open} timeout="auto">
          <List component="nav" className={classes.collapse}>
            {navigation.map((item) => (
              <ListItemLink
                key={item.name}
                href={item.href}
                onClick={onNavigate}
                underline="none"
              >
                <Typography variant="h4" className={classes.listItemText}>
                  {item.name}
                </Typography>
              </ListItemLink>
            ))}
          </List>
        </Collapse>

        <ListItem
          component="div"
          autoFocus={false}
          onClick={onNavigate}
          className={classes.listItem}
        >
          <ListItemLink underline="none" href="/act-now">
            <Typography variant="h4" className={classes.title}>
              Act Now
            </Typography>
          </ListItemLink>
        </ListItem>
      </List>
    </Grid>
  );
}

NavigationList.propTypes = {
  navigation: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      href: PropTypes.string.isRequired,
    })
  ).isRequired,
  onNavigate: PropTypes.func,
  open: PropTypes.bool,
};

NavigationList.defaultProps = {
  onNavigate: undefined,
  open: undefined,
};

export default NavigationList;
