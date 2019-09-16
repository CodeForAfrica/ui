import React from 'react';
import { makeStyles } from '@material-ui/styles';
import propTypes from './propTypes';

const useStyles = makeStyles({
  root: {
    listStyle: 'none',
    margin: 0,
    padding: 0
  }
});

function ArticleCardList({ children }) {
  const classes = useStyles();
  return <ul className={classes.root}>{children}</ul>;
}

ArticleCardList.propTypes = {
  children: propTypes.children.isRequired
};

export default ArticleCardList;
