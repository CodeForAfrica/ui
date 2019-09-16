import React from 'react';
import { makeStyles } from '@material-ui/styles';
import propTypes from './propTypes';

const useStyles = makeStyles({
  root: ({ square, width, height }) => ({
    width,
    height,
    float: 'left',
    position: 'relative',
    '&:not(:last-child):after': {
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
    }
  })
});

function ArticleCardItem({ square, width, height, children }) {
  const classes = useStyles({ square, width, height });
  return <li className={classes.root}>{children}</li>;
}

ArticleCardItem.propTypes = {
  children: propTypes.children.isRequired,
  square: propTypes.bool,
  width: propTypes.oneOfType([propTypes.number, propTypes.string]),
  height: propTypes.oneOfType([propTypes.number, propTypes.string])
};

ArticleCardItem.defaultProps = {
  square: false,
  width: undefined,
  height: undefined
};

export default ArticleCardItem;
