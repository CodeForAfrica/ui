import React from 'react';
import { makeStyles } from '@material-ui/core';

import Link from './Link';

import Layout from '../Layout';
import Brand from './Brand';

const navHeigt = '5rem';

const useStyles = makeStyles({
  root: {
    height: navHeigt
  },
  layoutRoot: {
    position: 'fixed',
    height: navHeigt,
    background: 'white',
    boxShadow: '0 0.125rem 0.25rem 0 rgba(0,0,0,.21)'
  },
  layoutContent: {
    alignItems: 'center',
    height: navHeigt
  },
  brand: {
    marginRight: '1rem'
  },
  link: {
    marginLeft: '1rem'
  }
});

function Navigation({ ...props }) {
  const classes = useStyles(props);
  return (
    <div className={classes.root}>
      <Layout
        classes={{ root: classes.layoutRoot, content: classes.layoutContent }}
      >
        <Brand classes={{ root: classes.brand }} href="/" />
        {[
          { title: 'home', href: '/' },
          { title: 'promises', href: '/promises' },
          { title: 'reports', href: '/reports' },
          { title: 'about us', href: '/about' }
        ].map(nav => (
          <Link classes={{ root: classes.link }} key={nav.href} href={nav.href}>
            {nav.title}
          </Link>
        ))}
      </Layout>
    </div>
  );
}

export default Navigation;
