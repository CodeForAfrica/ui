import React from 'react';
import { Grid, makeStyles } from '@material-ui/core';

import propTypes from './propTypes';

const useStyles = makeStyles({
  root: {
    width: '100%'
  },
  content: {
    width: '100%',
    maxWidth: '75rem' // 1200px
  }
});

function Layout({ children, ...props }) {
  const classes = useStyles(props);
  return (
    <Grid className={classes.root} container justify="center">
      <Grid container className={classes.content}>
        {children}
      </Grid>
    </Grid>
  );
}

Layout.propTypes = {
  children: propTypes.children.isRequired
};

export default Layout;
