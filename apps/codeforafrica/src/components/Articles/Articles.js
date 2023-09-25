import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";

import useArticles from "./useArticles";

import ArticleGrid from "@/codeforafrica/components/ArticleGrid";
import NextPreviousPagination from "@/codeforafrica/components/NextPreviousPagination";
import useFilterQuery from "@/codeforafrica/components/useFilterQuery";

const Articles = React.forwardRef(function Articles(props, ref) {
  const {
    articles: articlesList,
    featured,
    sx,
    tags,
    title,
    labels: { search, readMore },
    pagination: { count: countProp, page: pageProp = 1 },
  } = props;
  const [articles, setArticles] = useState(articlesList);
  const [count, setCount] = useState(countProp);
  const [featuredArticle, setFeaturedArticle] = useState(featured);
  const [page, setPage] = useState(pageProp);
  const [filtering, setFiltering] = useState(false);
  const queryParams = useFilterQuery({ page });
  const router = useRouter();
  const handleChangePage = (_, value) => {
    setPage(value);
  };

  // TODO: Kelvin Handle filtering a
  const handleChangeQ = () => {};

  const handleChangeTag = () => {};

  useEffect(() => {
    const isFiltering = page !== 1;
    setFiltering(isFiltering);
  }, [page]);

  const { data } = useArticles({ page });
  useEffect(() => {
    if (data) {
      const {
        articles: results,
        featured: newFeaturedArticle,
        pagination,
      } = data;

      if (!filtering) {
        setFeaturedArticle(newFeaturedArticle);
      }
      setCount(pagination.count);
      setArticles(results);
    }
  }, [data, filtering]);

  useEffect(() => {
    router.push(queryParams, undefined, {
      scroll: true,
      shallow: true,
    });

    // We don't want to listen to router changes here since we're the ones
    // updating them
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryParams]);

  return (
    <div ref={ref}>
      <ArticleGrid
        articles={articles}
        featuredArticle={featuredArticle}
        onChangeQ={handleChangeQ}
        onChangeTag={handleChangeTag}
        tags={tags}
        searchLabel={search}
        readMoreLabel={readMore}
        title={title}
        sx={sx}
      />
      <NextPreviousPagination
        count={count}
        onChange={handleChangePage}
        page={page}
      />
    </div>
  );
});

export default Articles;
