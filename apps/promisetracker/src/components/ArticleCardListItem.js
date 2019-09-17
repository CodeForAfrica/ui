import React from 'react';
import { makeStyles } from '@material-ui/styles';
import propTypes from './propTypes';
import ArticleCardList from './ArticleCardList';

const useStyles = makeStyles(theme => ({
  root: ({ enableLastBorder, square, width, height }) => ({
    width: '100%',
    height: '11rem',
    [theme.breakpoints.up('md')]: {
      width: width || 'unset',
      height: height || 'unset'
    },
    float: 'left',
    position: 'relative',
    '&:after': {
      content: '""',
      position: 'absolute',
      right: 0,
      bottom: 0,
      top: square ? '1rem' : undefined,
      left: !square ? 0 : undefined,
      margin: '0 auto',
      width: 'calc(100% - 2rem)',
      borderBottom: '0.0625rem solid rgb(209, 209, 209)',
      [theme.breakpoints.up('md')]: {
        width: !square ? 'calc(100% - 2rem)' : 'unset',
        height: square ? 'calc(100% - 2rem)' : 'unset',
        borderBottom: !square ? '0.0625rem solid rgb(209, 209, 209)' : 'unset',
        borderRight: square ? '0.0625rem solid rgb(209, 209, 209)' : 'unset'
      }
    },
    '&:last-child:after': {
      border: !enableLastBorder ? 'unset' : undefined
    },
    row: {}
  })
}));

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
