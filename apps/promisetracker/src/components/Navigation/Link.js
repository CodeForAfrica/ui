import React from 'react';
import { Link as MuiLink } from '@material-ui/core';

import { NavLink as RouterNavLink } from 'react-router-dom';

import { makeStyles } from '@material-ui/styles';
import propTypes from '../propTypes';

const useStyles = makeStyles({
  root: {
    lineHeight: '100%',
    margin: '2rem',
    color: 'white',
    '&:hover': {
      color: 'black'
    }
  }
});

function Link({ href, title, children, ...props }) {
  const classes = useStyles(props);
  return (
    <MuiLink className={classes.root} component={RouterNavLink} exact to={href}>
      {title || children}
    </MuiLink>
  );
}

Link.propTypes = {
  children: propTypes.children,
  title: propTypes.string,
  href: propTypes.string.isRequired
};

Link.defaultProps = {
  children: undefined,
  title: undefined
};

export default Link;
