import React, { useState } from 'react';

import { Menu } from 'react-feather';

import Link from 'components/Link';

import {
  AppBar,
  Grid,
  makeStyles,
  withWidth,
  ButtonBase,
  Drawer,
  MenuList,
  Toolbar,
  IconButton
} from '@material-ui/core';
import { isWidthUp, isWidthDown } from '@material-ui/core/withWidth';
import CloseIcon from '@material-ui/icons/Close';
import propTypes from 'components/propTypes';
import Brand from 'components/Navigation/Brand';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  drawerPaper: {
    width: '50vw'
  },
  itemGrid: {
    margin: '0rem 2rem'
  },
  menuList: {
    display: 'flex',
    flexDirection: 'column'
  },
  a: {
    lineHeight: '100%',
    margin: '2rem',
    color: theme.palette.common.white,
    textDecoration: 'none'
  },
  drawerA: {
    lineHeight: '100%',
    margin: '2rem',
    color: theme.palette.primary,
    textDecoration: 'none'
  }
}));

function Navigation({ width, ...props }) {
  const classes = useStyles(props);

  const [drawerIsOpen, setDrawerIsOpen] = useState(false);
  const renderNavLinks = () => {
    return [
      { title: 'home', href: '/' },
      { title: 'promises', href: '/promises' },
      {
        title: 'reports',
        href: 'https://pesacheck.org/tagged/promise-tracker'
      },
      { title: 'about us', href: '/about' }
    ].map(nav =>
      nav.title === 'reports' ? (
        <Link
          key={nav.href}
          href={nav.href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes.a}
        >
          {nav.title}
        </Link>
      ) : (
        <Link key={nav.href} href={nav.href} className={classes.a}>
          {nav.title}
        </Link>
      )
    );
  };
  const renderDrawer = () => {
    return (
      <Drawer
        anchor="left"
        open={drawerIsOpen}
        onBackdropClick={() => setDrawerIsOpen(!drawerIsOpen)}
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <Toolbar>
          <IconButton onClick={() => setDrawerIsOpen(!drawerIsOpen)}>
            <CloseIcon color="action" />
          </IconButton>
        </Toolbar>

        <MenuList className={classes.menuList}>
          {[
            { title: 'home', href: '/' },
            { title: 'promises', href: '/promises' },
            {
              title: 'reports',
              href: 'https://pesacheck.org/tagged/promise-tracker'
            },
            { title: 'about us', href: '/about' }
          ].map(nav =>
            nav.title === 'reports' ? (
              <Link
                key={nav.href}
                href={nav.href}
                target="_blank"
                rel="noopener noreferrer"
                className={classes.a}
              >
                {nav.title}
              </Link>
            ) : (
              <Link key={nav.href} href={nav.href} className={classes.a}>
                {nav.title}
              </Link>
            )
          )}
        </MenuList>
      </Drawer>
    );
  };
  return (
    <div className={classes.root}>
      <AppBar>
        <Toolbar>
          {isWidthDown('sm', width) && (
            <Grid item className={classes.itemGrid}>
              <ButtonBase onClick={() => setDrawerIsOpen(!drawerIsOpen)}>
                <Menu />
              </ButtonBase>
              {renderDrawer()}
            </Grid>
          )}
          <Brand href="/" />
          <Grid item className={classes.itemGrid}>
            {isWidthUp('md', width) && renderNavLinks()}
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
}

Navigation.propTypes = {
  fixed: propTypes.bool,
  width: propTypes.string.isRequired
};

Navigation.defaultProps = {
  fixed: false
};

export default withWidth()(Navigation);
