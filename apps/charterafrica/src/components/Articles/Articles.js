import { useMediaQuery, Box, LinearProgress } from "@mui/material";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import React, { useEffect, useImperativeHandle, useRef, useState } from "react";

import ArticlesFilterBar from "./ArticlesFilterBar";
import ArticleGrid from "./ArticlesGrid";
import useArticles from "./useArticles";

import { secondary } from "@/charterafrica/colors";
import FeaturedPost from "@/charterafrica/components/FeaturedPostCard";
import NextPrevPagination from "@/charterafrica/components/NextPrevPagination";
import queryString, {
  DEFAULT_SORTING,
} from "@/charterafrica/utils/articles/queryString";

const Articles = React.forwardRef(function Articles(props, ref) {
  const {
    articles: { results: articlesProp, totalPages: totalPagesProp },
    featured,
    filters,
    slug,
    sx,
  } = props;
  const [articles, setArticles] = useState(articlesProp);
  const [totalPages, setTotalPages] = useState(totalPagesProp);
  const [page, setPage] = useState(1);
  const [q, setQ] = useState("");
  const [sort, setSort] = useState(DEFAULT_SORTING);
  const [filtering, setFiltering] = useState(false);
  const router = useRouter();
  const articlesRef = useRef();
  useImperativeHandle(ref, () => articlesRef.current);
  const { asPath, locale } = router;
  const isDesktop = useMediaQuery((theme) => theme.breakpoints.up("md"));
  const pageSize = isDesktop ? 9 : 8;

  const handleChangeQ = (_, value) => {
    setFiltering(true);
    setQ(value);
  };
  const handleChangeSort = (_, value) => {
    setFiltering(true);
    setSort(value);
  };
  const handleChangePage = (_, value) => {
    setFiltering(true);
    setPage(value);
  };

  const query = queryString({ q, sort, page });
  useEffect(() => {
    const pathname = asPath.split("?")[0];
    router.push(
      {
        pathname,
        query,
      },
      undefined,
      { scroll: false, shallow: true }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  if (filtering && articlesRef.current) {
    articlesRef.current.scrollIntoView({ behavior: "smooth" });
  }
  const res = useArticles(slug, { locale, q, sort, page, pageSize });
  useEffect(() => {
    if (!res?.isLoading) {
      const { data } = res;
      const { results: foundArticles, totalPages: foundTotalPages = 0 } =
        data || {};
      setArticles(foundArticles);
      setTotalPages(foundTotalPages);
    }
  }, [res]);

  return (
    <Box
      sx={{
        backgroundColor: secondary[50],
        // TODO(kilemensi): May need to show "Articles not found message"
        minHeight: 76,
        // Main navbar height
        scrollMarginTop: { xs: "56px", sm: "64", md: "114px" },
        ...sx,
      }}
      ref={articlesRef}
    >
      <ArticlesFilterBar
        {...filters}
        onChangeSort={handleChangeSort}
        onChangeQ={handleChangeQ}
        sort={sort}
        q={q}
      />
      {res.isLoading ? <LinearProgress color="secondary" /> : null}
      {!query ? <FeaturedPost {...featured} /> : null}
      <ArticleGrid articles={articles} sx={{ py: 8 }} />
      <NextPrevPagination
        count={totalPages}
        onChange={handleChangePage}
        page={page}
        sx={{
          pb: 8,
        }}
      />
    </Box>
  );
});

Articles.propTypes = {
  articles: PropTypes.shape({
    results: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        date: PropTypes.string,
        author: PropTypes.string,
        image: PropTypes.shape({}),
        href: PropTypes.string,
      })
    ),
    totalPages: PropTypes.number,
  }),
  featured: PropTypes.shape({}),
  filter: PropTypes.shape({}),
  slug: PropTypes.string,
};

Articles.defaultProps = {
  articles: undefined,
  featured: undefined,
  filter: undefined,
  slug: undefined,
};

export default Articles;
