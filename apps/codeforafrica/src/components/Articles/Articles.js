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
  // We use 10 because article 0 will be shown as featured article
  const [count, setCount] = useState(countProp);
  const [page, setPage] = useState(pageProp);
  const [articles, setArticles] = useState(resultsProp);
  const [q, setQ] = useState();
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

  const { data } = useArticles({ page, q, tag });
  useEffect(() => {
    if (data) {
      const { results, pagination } = data;
      setCount(pagination.count);
      setArticles([...results]);
    }
  }, [data]);

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
