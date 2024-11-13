/* eslint-env browser */
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
    articles: articlesList,
    featured: featuredArticle,
    sx,
    tags,
    title,
    labels: { search, readMore },
    pagination: { count: countProp, page: pageProp = 1 },
    primaryTag,
  } = props;
  const filteredTags = tags.filter(
    (tag) => !equalsIgnoreCase(tag.name, primaryTag),
  );
  const allTag = {
    name: ALL_TAG,
    slug: ALL_TAG,
  };
  const [articles, setArticles] = useState(articlesList);
  const [count, setCount] = useState(countProp);
  const [page, setPage] = useState(pageProp);
  const [q, setQ] = useState();
  const [filtering, setFiltering] = useState(false);
  const [tag, setTag] = useState(allTag);
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
      (value && tags.find((t) => equalsIgnoreCase(value, t.slug))) || allTag;
    setTag(newValue);
    setPage(1);
  };

  useEffect(() => {
    const isFiltering = page !== 1 || q || !equalsIgnoreCase(tag.slug, ALL_TAG);
    setFiltering(isFiltering);
  }, [page, q, tag]);

  const { data } = useArticles(
    { page, q, tag },
    {
      primaryTag,
      featured: !filtering && featuredArticle ? featuredArticle.slug : null,
    },
  );
  useEffect(() => {
    if (data) {
      const { posts: results, pagination } = data;
      setCount(pagination.count);
      setArticles(results);
    }
  }, [data, filtering]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const { pathname } = window.location;
    const url = `${pathname}${queryParams}`;
    router.push(url, undefined, {
      scroll: true,
      shallow: true,
    });

    // We don't want to listen to router changes here since we're the ones
    // updating them
  }, [queryParams]);

  return (
    <div ref={ref}>
      <ArticleGrid
        articles={articles}
        featuredArticle={filtering ? null : featuredArticle}
        onChangeQ={handleChangeQ}
        onChangeTag={handleChangeTag}
        selectedTag={tag}
        tags={[allTag, ...filteredTags]}
        searchLabel={search}
        q={q}
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
