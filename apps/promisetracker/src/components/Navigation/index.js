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
  Link as MuiLink,
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
    color: theme.palette.primary.light,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'none',
      color: theme.palette.common.white
    }
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
  const renderNavLinks = linkClassName => {
    return [
      { title: 'Home', href: '/' },
      { title: 'Promises', href: '/promises' },
      {
        title: 'Articles',
        href: 'https://pesacheck.org/tagged/promise-tracker'
      },
      { title: 'About', href: '/about' }
    ].map(nav =>
      nav.href.startsWith('/') ? (
        <Link key={nav.href} href={nav.href} className={linkClassName}>
          {nav.title}
        </Link>
      ) : (
        <MuiLink
          key={nav.href}
          href={nav.href}
          target="_blank"
          rel="noopener noreferrer"
          className={linkClassName}
        >
          {nav.title}
        </MuiLink>
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
          {renderNavLinks(classes.drawerA)}
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
            {isWidthUp('md', width) && renderNavLinks(classes.a)}
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
