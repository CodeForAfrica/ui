import React, { useState } from 'react';
import { Menu } from 'react-feather';

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
import propTypes from '../propTypes';

import Link from './Link';
import Brand from './Brand';

const useStyles = makeStyles({
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
    // color: 'black'
  }
});

function Navigation({ width, ...props }) {
  const classes = useStyles(props);
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);
  const renderNavLinks = () => {
    return [
      { title: 'home', href: '/' },
      { title: 'promises', href: '/promises' },
      { title: 'about us', href: '/about' }
    ].map(nav => (
      <Link key={nav.href} href={nav.href}>
        {nav.title}
      </Link>
    ));
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
            { title: 'about us', href: '/about' }
          ].map(nav => (
            <Link key={nav.href} href={nav.href}>
              {nav.title}
            </Link>
          ))}
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
