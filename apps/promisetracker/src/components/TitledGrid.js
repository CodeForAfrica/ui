import React from 'react';
import { Typography, Grid } from '@material-ui/core';
import propTypes from './propTypes';

function TitledGrid({ variant, title, children, ...props }) {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Grid item {...props}>
      <Grid item xs={12}>
        <Typography variant={variant}>{title}</Typography>
      </Grid>
      {children}
    </Grid>
  );
}

TitledGrid.propTypes = {
  children: propTypes.children.isRequired,
  title: propTypes.string.isRequired,
  variant: Typography.propTypes.variant
};

TitledGrid.defaultProps = {
  variant: undefined
};

export default TitledGrid;
