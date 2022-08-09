import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import useArticles from "./useArticles";

import ArticleGrid from "@/codeforafrica/components/ArticleGrid";
import NextPreviousPagination from "@/codeforafrica/components/NextPreviousPagination";
import useFilterQuery, {
  ALL_TAG,
} from "@/codeforafrica/components/useFilterQuery";
import equalsIgnoreCase from "@/codeforafrica/utils/equalsIgnoreCase";

const Articles = React.forwardRef(function Articles(props, ref) {
  const {
    articles: {
      pagination: { count: countProp, page: pageProp = 1 },
      results: resultsProp,
    },
    sx,
    tags,
    title,
  } = props;
  const [articles, setArticles] = useState(resultsProp);
  const [count, setCount] = useState(countProp);
  const [featuredArticle, setFeaturedArticle] = useState(() =>
    resultsProp?.find((article) => article.featured)
  );
  const [page, setPage] = useState(pageProp);
  const [q, setQ] = useState();
  const [filtering, setFiltering] = useState(false);
  const [tag, setTag] = useState(ALL_TAG);
  const queryParams = useFilterQuery({ page, q, tag });
  const router = useRouter();

  const handleChangePage = (_, value) => {
    setPage(value);
  };

  const handleChangeQ = (_, value) => {
    setQ(value || undefined);
  };

  const handleChangeTag = (_, value) => {
    const newValue =
      (value && tags.find((t) => equalsIgnoreCase(value, t))) || ALL_TAG;
    setTag(newValue);
    setPage(1);
  };

  useEffect(() => {
    const isFiltering = page !== 1 || q || !equalsIgnoreCase(tag, ALL_TAG);
    setFiltering(isFiltering);
  }, [page, q, tag]);

  const { data } = useArticles({ page, q, tag });
  useEffect(() => {
    if (data) {
      const { results, pagination } = data;
      let newFeaturedArticle;
      let newArticles = results;
      if (!filtering) {
        newFeaturedArticle = newArticles.find((article) => article.featured);
        if (newFeaturedArticle) {
          newArticles = newArticles.filter(
            (article) => article.id !== newFeaturedArticle.id
          );
        }
      }
      setCount(pagination.count);
      setFeaturedArticle({ ...newFeaturedArticle });
      setArticles([...newArticles]);
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
        selectedTag={tag}
        tags={tags}
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
