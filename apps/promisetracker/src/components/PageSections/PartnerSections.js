import React from 'react';
import { Grid, makeStyles, Typography, Container } from '@material-ui/core';

import A from 'components/A';
import SectionBox from './SectionBox';

const useStyles = makeStyles(theme => ({
  img_box: {
    marginTop: '30px'
  },
  img: {
    maxWidth: '170px',
    maxHeight: '70px'
  },
  typoGrid: {
    textAlign: 'center',
    margin: '1.5rem',
    color: theme.palette.common.black
  },
  imgGrid: {
    padding: '2rem'
  },
  link: {
    textAlign: 'center'
  }
}));

function PartnersSection() {
  const classes = useStyles();
  const partners = [
    {
      name: 'ANCIR',
      image_filename: 'ancir-gray.png',
      url: 'https://investigate.africa/'
    },
    {
      name: 'DWA',
      image_filename: 'dwa-gray.png',
      url: 'https://www.dw.com/en/dw-akademie/about-us/s-9519'
    },
    {
      name: 'Meedan',
      image_filename: 'meedan-gray.png',
      url: 'https://meedan.com/en/'
    },
    {
      name: 'Meedan Check',
      image_filename: 'check-gray.png',
      url: 'https://meedan.com/en/check/'
    },
    {
      name: 'Code for Africa',
      image_filename: 'cfafrica-gray.png',
      url: 'https://codeforafrica.org/'
    }
  ];
  const images = require.context('../../assets/images/logos', true);
  return (
    <SectionBox bgcolor="#fff" textAlign="center">
      <Container>
        <Typography variant="h5" paragraph>
          Made Possible With Support From:
        </Typography>
        <Grid container spacing={2} className={classes.img_box}>
          {partners.map(partner => {
            const img = images(`./${partner.image_filename}`);
            return (
              <Grid item xs>
                <A href={partner.url} className={classes.link}>
                  <img src={img} alt={partner.name} className={classes.img} />
                </A>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </SectionBox>
  );
}

export default PartnersSection;
