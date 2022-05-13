import React, { useEffect, useState } from "react";

import ArticleGrid from "@/codeforafrica/components/ArticleGrid";
import NextPreviousPagination from "@/codeforafrica/components/NextPreviousPagination";

const ALL_TAG = "All";

function Articles(props) {
  // We use 10 because article 0 will be shown as featured article
  const { articles = [], page: pageProp = 1, pageSize = 10, title } = props;
  const [tags] = useState(() => {
    const uniqueTags = [...new Set(articles?.flatMap((a) => a.tags || []))];
    uniqueTags.unshift(ALL_TAG);
    return uniqueTags;
  });
  const [selectedTag, setSelectedTag] = useState(ALL_TAG);
  const [filteredArticles, setFilteredArticles] = useState(articles);
  const handleTagChange = (_, value) => {
    const newTag = value || ALL_TAG;
    setSelectedTag(newTag);
  };
  useEffect(() => {
    if (selectedTag !== ALL_TAG) {
      const found = articles.filter((a) => a.tags?.includes(selectedTag));
      setFilteredArticles(found);
    } else {
      setFilteredArticles(articles);
    }
  }, [articles, selectedTag]);
  const [page, setPage] = useState(pageProp);
  const [pageArticles, setPageArticles] = useState(
    filteredArticles.slice(0, pageSize)
  );
  const handlePageChange = (_, value) => {
    setPage(value);
  };
  useEffect(() => {
    setPageArticles(
      filteredArticles.slice((page - 1) * pageSize, page * pageSize)
    );
  }, [filteredArticles, page, pageSize]);

  return (
    <>
      <ArticleGrid
        articles={pageArticles}
        onChange={handleTagChange}
        selectedTag={selectedTag}
        tags={tags}
        title={title}
      />
      <NextPreviousPagination
        count={Math.ceil(filteredArticles.length / pageSize)}
        onChange={handlePageChange}
      />
    </>
  );
}

export default Articles;
