import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import Layout from '../../components/Layout';
import Content from '../../components/Contribute/Content';
import Form from '../../components/Contribute/Form';

const useStyles = makeStyles(theme => ({
  root: {
    [theme.breakpoints.up('md')]: {
      height: '28.375rem',
      background:
        'linear-gradient(to right, #f7b801, #f7b801 50%, #f6f6f6 50%, #f6f6f6)'
    }
  },
  contributeForm: {
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '31.1875rem'
    },
    '& > div': {
      marginBottom: '1.3125rem'
    },
    '& .MuiInputBase-input': {
      color: '#637381'
    }
  },
  contributeFormGrid: {
    padding: '1.25rem',
    justifyContent: 'flex-start',
    backgroundColor: '#f6f6f6',
    [theme.breakpoints.up('md')]: {
      padding: 'unset',
      backgroundColor: 'unset',
      justifyContent: 'flex-end'
    }
  },
  descriptionTextField: {
    height: '8.375rem'
  },
  contributeCallToAction: {
    padding: '1.25rem',
    justifyContent: 'center',
    backgroundColor: '#f7b801',
    '& h2:nth-child(1)': {
      marginBottom: '.875rem'
    },
    '& h3:nth-child(2)': {
      marginBottom: '1.75rem'
    },
    [theme.breakpoints.up('md')]: {
      padding: 'unset',
      backgroundColor: 'unset',
      justifyContent: 'flex-end'
    }
  },
  submitButton: {
    '&:hover': {
      color: 'white',
      border: '0.0625rem solid #f7b801',
      backgroundColor: '#f7b801',
      fontWeight: 'bold',
      boxShadow: '0 0.125rem 0.125rem 0.0625rem rgba(0,0,0,.1)'
    }
  }
}));

function ContributeSection() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Layout justify="center" alignItems="center">
        <Grid className={classes.contributeCallToAction} item xs={12} md={6}>
          <Content
            title="Contibute"
            subtitle="Have you spotted a promise in action?"
            description="See something wrong? Share data to help assess a promise!"
          />
        </Grid>
        <Grid
          className={classes.contributeFormGrid}
          container
          item
          xs={12}
          md={6}
        >
          <Form />
        </Grid>
      </Layout>
    </div>
  );
}

export default ContributeSection;
