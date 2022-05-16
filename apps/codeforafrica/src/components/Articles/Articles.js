import React, { useCallback, useEffect, useState } from "react";

import ArticleGrid from "@/codeforafrica/components/ArticleGrid";
import NextPreviousPagination from "@/codeforafrica/components/NextPreviousPagination";

const ALL_TAG = "All";

const computePagination = (allArtiles, page, pageSize) => {
  const count = Math.ceil(allArtiles.length / pageSize);
  const articles = allArtiles.slice((page - 1) * pageSize, page * pageSize);
  return { count, articles };
};

function Articles(props) {
  // We use 10 because article 0 will be shown as featured article
  const { articles = [], page: pageProp = 1, pageSize = 10, title } = props;
  const [tags] = useState(() => {
    const uniqueTags = [...new Set(articles?.flatMap((a) => a.tags || []))];
    uniqueTags.unshift(ALL_TAG);
    return uniqueTags;
  });
  const [selectedTag, setSelectedTag] = useState(ALL_TAG);
  const handleTagChange = (_, value) => {
    const newTag = value || ALL_TAG;
    setSelectedTag(newTag);
  };
  const getFilteredArticles = useCallback(() => {
    let filteredArticles;
    if (selectedTag !== ALL_TAG) {
      filteredArticles = articles.filter((a) => a.tags?.includes(selectedTag));
    } else {
      filteredArticles = articles;
    }
    return filteredArticles;
  }, [articles, selectedTag]);
  const [page, setPage] = useState(pageProp);
  const handlePageChange = (_, value) => {
    setPage(value);
  };
  const [pagination, setPagination] = useState(() => {
    return computePagination(getFilteredArticles(), page, pageSize);
  });
  useEffect(() => {
    setPagination(computePagination(getFilteredArticles(), page, pageSize));
  }, [getFilteredArticles, page, pageSize]);

  return (
    <>
      <ArticleGrid
        articles={pagination.articles}
        onChange={handleTagChange}
        selectedTag={selectedTag}
        tags={tags}
        title={title}
      />
      <NextPreviousPagination
        count={Math.ceil(pagination.count)}
        onChange={handlePageChange}
      />
    </>
  );
}

export default Articles;
