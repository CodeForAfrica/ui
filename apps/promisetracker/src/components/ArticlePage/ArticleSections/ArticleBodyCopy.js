import React from 'react';

import { Grid, Typography, makeStyles } from '@material-ui/core';

import annual from '../../assets/images/articles/annual.png';
import report from '../../assets/images/articles/report.png';

const useStyles = makeStyles({
  img: {
    maxWidth: '100%',
    height: 'auto'
  }
});

function ArticleBodyCopy() {
  const classes = useStyles();
  return (
    <Grid item style={{ padding: '0.8rem 0' }}>
      <Typography variant="body1">
        Rouhani Meter is a project that aims to monitor the accomplishment of
        promises made by Iranian President Hassan Rouhani. It is inspired by
        Morsi Meter,which was created by a group of young Egyptians to observe
        the actions taken by then Egyptian president, Mohamed Morsi,towards the
        promises that he had made. Rouhani Meter is an independent project by
        ASL19, which initially benefited from the support of the University of
        Toronto.
      </Typography>

      <img alt="report-data" className={classes.img} src={report} />
      <Typography variant="body1">
        Rouhani Meter is a project that aims to monitor the accomplishment of
        promises made by Iranian President Hassan Rouhani. It is inspired by
        Morsi Meter,which was created by a group of young Egyptians to observe
        the actions taken by then Egyptian president, Mohamed Morsi,towards the
        promises that he had made. Rouhani Meter is an independent project by
        ASL19, which initially benefited from the support of the University of
        Toronto.
      </Typography>

      <img alt="annual-report" className={classes.img} src={annual} />

      <Typography variant="body1">
        Rouhani Meter is a project that aims to monitor the accomplishment of
        promises made by Iranian President Hassan Rouhani. It is inspired by
        Morsi Meter,which was created by a group of young Egyptians to observe
        the actions taken by then Egyptian president, Mohamed Morsi,towards the
        promises that he had made. Rouhani Meter is an independent project by
        ASL19, which initially benefited from the support of the University of
        Toronto.
      </Typography>
    </Grid>
  );
}

export default ArticleBodyCopy;
