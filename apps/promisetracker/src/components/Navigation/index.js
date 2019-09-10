import React, { useState } from 'react';
import {
  makeStyles,
  withWidth,
  ButtonBase,
  Drawer,
  MenuList,
  Toolbar,
  IconButton
} from '@material-ui/core';
import { isWidthUp } from '@material-ui/core/withWidth';
import CloseIcon from '@material-ui/icons/Close';
import Link from './Link';

import Layout from '../Layout';
import propTypes from '../propTypes';
import Brand from './Brand';

const navHeight = '5rem';

const useStyles = makeStyles(theme => ({
  root: {
    height: navHeight
  },
  layoutRoot: {
    position: 'fixed',
    padding: '0 1rem',
    height: navHeight,
    background: 'white',
    boxShadow: '0 0.125rem 0.25rem 0 rgba(0,0,0,.21)'
  },
  layoutContent: {
    flexWrap: 'nowrap',
    alignItems: 'center',
    height: navHeight
  },
  menu: {
    width: '28px',
    [theme.breakpoints.up('md')]: {
      display: 'none'
    }
  },
  brand: {
    margin: '0 auto',
    [theme.breakpoints.up('md')]: {
      margin: 0,
      marginRight: '1rem'
    }
  },
  link: {
    marginLeft: '1rem'
  },
  drawerPaper: {
    width: '12.5rem'
  },
  drawerToolbar: {
    height: navHeight
  },
  drawerLink: {
    width: '11.4375rem',
    height: '3rem',
    marginLeft: '1rem'
  }
}));

function Navigation({ width, ...props }) {
  const classes = useStyles(props);
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);
  const renderNavLinks = () => {
    return [
      { title: 'home', href: '/' },
      { title: 'promises', href: '/promises' },
      { title: 'reports', href: '/reports' },
      { title: 'about us', href: '/about' }
    ].map(nav => (
      <Link classes={{ root: classes.link }} key={nav.href} href={nav.href}>
        {nav.title}
      </Link>
    ));
  };
  const renderDrawer = () => {
    return (
      <Drawer
        anchor="left"
        open={drawerIsOpen}
        classes={{ paper: classes.drawerPaper }}
        onBackdropClick={() => setDrawerIsOpen(!drawerIsOpen)}
      >
        <Toolbar className={classes.drawerToolbar}>
          <IconButton onClick={() => setDrawerIsOpen(!drawerIsOpen)}>
            <CloseIcon color="action" />
          </IconButton>
        </Toolbar>
        <MenuList>
          {[
            { title: 'home', href: '/' },
            { title: 'promises', href: '/promises' },
            { title: 'reports', href: '/reports' },
            { title: 'about us', href: '/about' }
          ].map(nav => (
            <Link
              key={nav.href}
              href={nav.href}
              classes={{ root: classes.drawerLink }}
            >
              {nav.title}
            </Link>
          ))}
        </MenuList>
      </Drawer>
    );
  };
  return (
    <div className={classes.root}>
      <Layout
        classes={{ root: classes.layoutRoot, content: classes.layoutContent }}
      >
        <ButtonBase
          className={classes.menu}
          onClick={() => setDrawerIsOpen(!drawerIsOpen)}
        >
          Menu
        </ButtonBase>
        <Brand classes={{ root: classes.brand }} href="/" />
        {isWidthUp('md', width) && renderNavLinks()}
        {renderDrawer()}
      </Layout>
    </div>
  );
}

Navigation.propTypes = {
  width: propTypes.string.isRequired
};

export default withWidth()(Navigation);
