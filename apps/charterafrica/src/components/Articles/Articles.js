import { Box } from "@mui/material";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";

import ArticleFilterBar from "./ArticlesFilterBar";
import ArticleGrid from "./ArticlesGrid";
import useArticles from "./useArticles";

import FeaturedPost from "@/charterafrica/components/FeaturedPostCard";
import useFilterQuery, {
  DEFAULT_SORTING,
} from "@/charterafrica/components/useFilterQuery";

const Articles = React.forwardRef(function Articles(props, ref) {
  const { articles: originalArticles, featured, filters, slug, sx } = props;
  const [articles, setArticles] = useState(originalArticles);
  const [sort, setSort] = useState(DEFAULT_SORTING);
  const [q, setQ] = useState("");
  const router = useRouter();
  const queryParams = useFilterQuery({ sort, q });
  const pathname = router.asPath.split("?")[0];

  const handleChangeSort = (_, value) => {
    setSort(value);
  };

  const handleChangeQ = (_, value) => {
    setQ(value);
  };

  const { data } = useArticles(slug, { locale: router.locale, sort, q });
  useEffect(() => {
    if (data) {
      const { articles: foundArticles } = data;
      setArticles(foundArticles);
    }
  }, [data]);

  useEffect(() => {
    router.push({
      pathname,
      query: queryParams,
    });

    // We don't want to listen to router changes here since we're the ones
    // updating them
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryParams]);

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
