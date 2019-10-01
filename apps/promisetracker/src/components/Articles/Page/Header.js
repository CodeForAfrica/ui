import React from 'react';

import { Grid, Typography, makeStyles } from '@material-ui/core';

import propTypes from '../../propTypes';

const useStyles = makeStyles({
  img: {
    maxWidth: '100%',
    height: 'auto'
  }
});

function Header({ subtitle, date, title, mediaSrc }) {
  const classes = useStyles();
  return (
    <Grid item>
      <img alt="Header Thumbnail" className={classes.img} src={mediaSrc} />
      <Typography variant="h5" paragraph="true">
        {subtitle}
      </Typography>
      <Typography variant="h4" paragraph="true">
        {title}
      </Typography>
      <Typography variant="caption" paragraph="true">
        {date}
      </Typography>
    </Grid>
  );
}

Header.propTypes = {
  mediaSrc: propTypes.string.isRequired,
  title: propTypes.string.isRequired,
  subtitle: propTypes.string.isRequired,
  date: propTypes.oneOfType([propTypes.string, propTypes.instanceOf(Date)])
    .isRequired
};

export default Header;
