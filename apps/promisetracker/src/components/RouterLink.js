import React from 'react';
import { Link as MuiLink } from '@material-ui/core';

import { Link as ReactRouterLink } from 'react-router-dom';

import propTypes from './propTypes';

function RouterLink({ children, ...props }) {
  return (
    <MuiLink
      component={ReactRouterLink}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    >
      {children}
    </MuiLink>
  );
}

RouterLink.propTypes = {
  children: propTypes.children,
  color: propTypes.string
};

RouterLink.defaultProps = {
  children: undefined,
  color: undefined
};

export default RouterLink;
