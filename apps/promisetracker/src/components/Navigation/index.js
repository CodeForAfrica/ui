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
import { isWidthUp, isWidthDown } from '@material-ui/core/withWidth';
import CloseIcon from '@material-ui/icons/Close';
import { Menu } from 'react-feather';
import propTypes from '../propTypes';

import Link from './Link';
import Layout from '../Layout';
import Brand from './Brand';

const navHeight = '5rem';

const useStyles = makeStyles(theme => ({
  root: {
    height: navHeight,
    zIndex: 999
  },
  layoutRoot: ({ fixed }) => ({
    zIndex: 999,
    position: fixed ? 'fixed' : 'relative',
    height: navHeight,
    background: 'white',
    boxShadow: '0 0.125rem 0.25rem 0 rgba(0,0,0,.21)'
  }),
  layoutContent: {
    flexWrap: 'nowrap',
    alignItems: 'center',
    height: navHeight
  },
  menuButton: {
    width: '1.75rem'
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
  },
  fa: {
    color: 'grey',
    ' &:hover': {
      color: '#257ca3'
    }
  }
}));

function Navigation({ width, ...props }) {
  const classes = useStyles(props);
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);
  const renderNavLinks = () => {
    return [
      { title: 'home', href: '/' },
      { title: 'promises', href: '/promises' },
      { title: 'reports', href: '/articles' },
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
            { title: 'reports', href: '/articles' },
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
        {isWidthDown('sm', width) && (
          <>
            <ButtonBase
              className={classes.menuButton}
              onClick={() => setDrawerIsOpen(!drawerIsOpen)}
            >
              <Menu className={classes.fa} />
            </ButtonBase>
            {renderDrawer()}
          </>
        )}

        <Brand classes={{ root: classes.brand }} href="/" />
        {isWidthUp('md', width) && renderNavLinks()}
      </Layout>
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
