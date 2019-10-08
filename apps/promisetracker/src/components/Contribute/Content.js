import React from 'react';

import { Typography } from '@material-ui/core';

import propTypes from '../propTypes';

function Content({ title, subtitle, description }) {
  return (
    <div>
      <Typography variant="h2">{title}</Typography>
      <Typography variant="h3">{subtitle}</Typography>
      <Typography>{description}</Typography>
    </div>
  );
}

Content.propTypes = {
  title: propTypes.string.isRequired,
  subtitle: propTypes.string.isRequired,
  description: propTypes.string.isRequired
};

export default Content;
