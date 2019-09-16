import React from 'react';
import { makeStyles } from '@material-ui/styles';
import propTypes from './propTypes';
import ArticleCardList from './ArticleCardList';

const useStyles = makeStyles({
  root: ({ enableLastBorder, square, width, height }) => ({
    width,
    height,
    float: 'left',
    position: 'relative',
    '&:after': {
      content: '""',
      position: 'absolute',
      width: !square ? 'calc(100% - 2rem)' : undefined,
      height: square ? 'calc(100% - 2rem)' : undefined,
      right: 0,
      bottom: 0,
      top: square ? '1rem' : undefined,
      left: !square ? 0 : undefined,
      margin: '0 auto',
      borderBottom: !square ? '0.0625rem solid rgb(209, 209, 209)' : undefined,
      borderRight: square ? '0.0625rem solid rgb(209, 209, 209)' : undefined
    },
    '&:last-child:after': {
      border: !enableLastBorder ? 'unset' : undefined
    },
    row: {}
  })
});

function ArticleCardListItem({
  row,
  enableLastBorder,
  square,
  width,
  height,
  children
}) {
  const classes = useStyles({ enableLastBorder, square, width, height });
  return (
    <li className={classes.root}>
      {row ? <ArticleCardList>{children}</ArticleCardList> : children}
    </li>
  );
}

ArticleCardListItem.propTypes = {
  enableLastBorder: propTypes.bool,
  row: propTypes.bool,
  square: propTypes.bool,
  children: propTypes.children.isRequired,
  width: propTypes.oneOfType([propTypes.number, propTypes.string]),
  height: propTypes.oneOfType([propTypes.number, propTypes.string])
};

ArticleCardListItem.defaultProps = {
  enableLastBorder: false,
  row: false,
  square: false,
  width: undefined,
  height: undefined
};

export default ArticleCardListItem;
