import React from 'react';
import { Link as MuiLink } from '@material-ui/core';

import { Link as ReactRouterLink } from 'react-router-dom';

import propTypes from './propTypes';

function RouterLink({ children, ...props }) {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <MuiLink component={ReactRouterLink} {...props}>
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
