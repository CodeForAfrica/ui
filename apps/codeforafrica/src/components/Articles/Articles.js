import React from "react";

import ArticleGrid from "@/codeforafrica/components/ArticleGrid";
import NextPreviousPagination from "@/codeforafrica/components/NextPreviousPagination";

const Articles = React.forwardRef(function Articles(props, ref) {
  const {
    articles,
    featured,
    sx,
    tags,
    title,
    search,
    pagination: { count, page = 1 },
  } = props;

  // TODO: Kelvin Handle filtering and pagination
  const handleChangePage = () => {};

  const handleChangeQ = () => {};

  const handleChangeTag = () => {};

  return (
    <div ref={ref}>
      <ArticleGrid
        articles={articles}
        featuredArticle={featured}
        onChangeQ={handleChangeQ}
        onChangeTag={handleChangeTag}
        tags={tags}
        searchLabel={search}
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
