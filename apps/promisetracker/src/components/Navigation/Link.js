import React from 'react';
import { Link as MuiLink } from '@material-ui/core';

import { NavLink as RouterNavLink } from 'react-router-dom';

import { makeStyles } from '@material-ui/styles';
import propTypes from '../propTypes';

const useStyles = makeStyles(theme => ({
  root: {
    lineHeight: '100%',
    margin: '2rem',
    '&:hover': {
      color: theme.palette.action.active,
      fontWeight: 'bold',
      listStyleType: 'disc',
      '&:before': {
        opacity: 1
      }
    }
  },
  active: {
    color: theme.palette.action.active
  }
}));

function Link({ href, title, children, ...props }) {
  const classes = useStyles(props);
  return (
    <MuiLink
      className={classes.root}
      // activeClassName={classes.active}
      component={RouterNavLink}
      exact
      to={href}
    >
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
