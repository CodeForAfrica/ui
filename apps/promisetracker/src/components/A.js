import React from 'react';
import PropTypes from 'prop-types';

import { Link } from '@material-ui/core';

function A({ children, className, href, variant, ...props }) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      variant={variant}
      underline="always"
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    >
      {children}
    </Link>
  );
}
A.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  href: PropTypes.string.isRequired,
  className: PropTypes.string,
  variant: PropTypes.string
};

A.defaultProps = {
  className: null,
  variant: 'inherit'
};

export default A;
