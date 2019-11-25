import React from 'react';
import { Grid, makeStyles } from '@material-ui/core';

import propTypes from 'components/propTypes';

const useStyles = makeStyles({
  root: {
    padding: '0 1rem',
    height: '100%'
  },
  content: {
    height: '100%',
    width: '100%',
    maxWidth: '75rem' // 1200px
  }
});

function Layout({ children, justify, alignItems, spacing, ...props }) {
  const classes = useStyles(props);
  return (
    <Grid className={classes.root} container justify="center">
      <Grid
        item
        xs={12}
        container
        className={classes.content}
        justify={justify}
        alignItems={alignItems}
        spacing={spacing}
      >
        {children}
      </Grid>
    </Grid>
  );
}

Layout.propTypes = {
  children: propTypes.children.isRequired,
  justify: propTypes.string,
  alignItems: propTypes.string,
  spacing: propTypes.number
};

Layout.defaultProps = {
  justify: undefined,
  alignItems: undefined,
  spacing: undefined
};

export default Layout;
