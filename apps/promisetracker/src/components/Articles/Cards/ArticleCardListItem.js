import React from 'react';
import propTypes from '../../propTypes';
import ArticleCardList from './ArticleCardList';

function ArticleCardListItem({ children }) {
  return (
    <li>
      <ArticleCardList>{children}</ArticleCardList>
    </li>
  );
}

ArticleCardListItem.propTypes = {
  children: propTypes.children.isRequired
};

export default ArticleCardListItem;
