import { useMediaQuery, Box } from "@mui/material";
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
} from "@/charterafrica/utils/queryString";

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
  const router = useRouter();
  const articlesRef = useRef();
  useImperativeHandle(ref, () => articlesRef.current);
  const { asPath, locale } = router;
  const isDesktop = useMediaQuery((theme) => theme.breakpoints.up("md"));
  const pageSize = isDesktop ? 9 : 8;

  const handleChangeQ = (_, value) => {
    setQ(value);
  };
  const handleChangeSort = (_, value) => {
    setSort(value);
  };
  const handleChangePage = (_, value) => {
    setPage(value);
  };

  const queryParams = queryString({ q, sort, page });
  useEffect(() => {
    const pathname = asPath.split("?")[0];
    router.push(
      {
        pathname,
        query: queryParams,
      },
      undefined,
      { scroll: false, shallow: true }
    );
    if (queryParams && articlesRef.current) {
      articlesRef.current.scrollIntoView({ behavior: "smooth" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryParams]);

  const { data } = useArticles(slug, { locale, q, sort, page, pageSize });
  useEffect(() => {
    if (data) {
      const { results: foundArticles, totalPages: foundTotalPages } = data;
      setArticles(foundArticles);
      setTotalPages(foundTotalPages);
    }
  }, [data]);

  if (data?.isLoading) {
    return null;
  }
  return (
    <Box
      id="articles"
      sx={{
        backgroundColor: secondary[50],
        // Height of main navbar
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
      {!queryParams ? <FeaturedPost {...featured} /> : null}
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
