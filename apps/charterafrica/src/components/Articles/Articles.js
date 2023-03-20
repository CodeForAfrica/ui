import { Box } from "@mui/material";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";

import ArticleFilterBar from "./ArticlesFilterBar";
import ArticleGrid from "./ArticlesGrid";
import useArticles from "./useArticles";

import FeaturedPost from "@/charterafrica/components/FeaturedPostCard";
import NextPrevPagination from "@/charterafrica/components/NextPrevPagination";
import useFilterQuery, {
  DEFAULT_SORTING,
} from "@/charterafrica/components/useFilterQuery";

const Articles = React.forwardRef(function Articles(props, ref) {
  const {
    articles: originalArticles,
    featured,
    filters,
    slug,
    totalPages,
    sx,
  } = props;
  const [articles, setArticles] = useState(originalArticles);
  const [page, setPage] = useState(1);
  const [q, setQ] = useState("");
  const [sort, setSort] = useState(DEFAULT_SORTING);
  const router = useRouter();
  const { asPath, locale } = router;

  const handleChangeQ = (_, value) => {
    setQ(value);
  };
  const handleChangeSort = (_, value) => {
    setSort(value);
  };

  const handlePageChange = (_, value) => {
    setPage(value);
  };

  const queryParams = useFilterQuery({ q, sort, page });
  useEffect(() => {
    const pathname = asPath.split("?")[0];
    router.push({
      pathname,
      query: queryParams,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryParams]);

  const { data } = useArticles(slug, { locale, q, sort, page });
  useEffect(() => {
    if (data) {
      const { articles: foundArticles } = data;
      setArticles(foundArticles);
    }
  }, [data]);

  return (
    <Box sx={sx} ref={ref}>
      <ArticleFilterBar
        {...filters}
        onChangeSort={handleChangeSort}
        onChangeQ={handleChangeQ}
        sort={sort}
        q={q}
      />
      <FeaturedPost {...featured} />
      <ArticleGrid articles={articles} />
      <NextPrevPagination
        count={totalPages}
        onChange={handlePageChange}
        page={page}
      />
    </Box>
  );
});

Articles.propTypes = {
  articles: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      date: PropTypes.string,
      author: PropTypes.string,
      image: PropTypes.shape({}),
      href: PropTypes.string,
    })
  ),
  filter: PropTypes.shape({}),
};

Articles.defaultProps = {
  articles: undefined,
  filter: undefined,
};

export default Articles;
