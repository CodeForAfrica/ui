import React from 'react';
import { Link as MuiLink } from '@material-ui/core';

import { Link as ReactRouterLink } from 'react-router-dom';

import { makeStyles } from '@material-ui/styles';
import propTypes from './propTypes';

const useStyles = makeStyles({
  root: {
    display: 'inline-flex'
  }
});

function RouterLink({ children, ...props }) {
  const classes = useStyles(props);
  return (
    <MuiLink
      classes={{ root: classes.root }}
      component={ReactRouterLink}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    >
      {children}
    </MuiLink>
  );
}

RouterLink.propTypes = {
  children: propTypes.children
};

RouterLink.defaultProps = {
  children: undefined
};

export default RouterLink;
