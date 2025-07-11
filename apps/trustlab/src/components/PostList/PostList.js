import { Section } from "@commons-ui/core";
import { Box, Grid, LinearProgress, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState, useRef } from "react";

import usePosts from "./usePosts";

import Pagination from "@/trustlab/components/Pagination";
import PostCard from "@/trustlab/components/PostCard";

function PostList({
  posts: initialPosts,
  pagination: { count: countProp, page: pageProp = 1 },
  closedLabel,
  dateLabel,
  publishedLabel,
  linkLabel,
  title,
  showAllPosts,
}) {
  const [page, setPage] = useState(pageProp);
  const listRef = useRef(null);

  const router = useRouter();
  const { query } = router;
  const { page: initialPage, slugs } = query;
  const path = Array.isArray(slugs) ? slugs[0] : slugs || "";
  useEffect(() => {
    if (initialPage) {
      const parsed = parseInt(initialPage, 10);
      if (parsed !== page) {
        setPage(parsed);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialPage]);

  const {
    isLoading,
    posts,
    pagination: { count },
  } = usePosts(page, path, initialPosts, countProp, showAllPosts);

  const handlePageChange = (value) => {
    setPage(value);

    const urlParams = new URLSearchParams(router.query);
    if (value === 1) {
      urlParams.delete("page");
    } else {
      urlParams.set("page", value);
    }
    router.push(
      {
        pathname: router.pathname,
        query: urlParams.toString(),
      },
      undefined,
      { shallow: true, scroll: false },
    );
    if (listRef.current) {
      listRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <Box
      ref={listRef}
      sx={{
        px: { xs: 2.5, sm: 0 },
        py: 8,
      }}
    >
      <Section>
        {isLoading && <LinearProgress sx={{ my: 2 }} />}
        {title && (
          <Typography
            variant="h1"
            sx={{
              borderBottom: `1px solid`,
              mb: 3,
              pb: 1,
            }}
          >
            {title}
          </Typography>
        )}
        <Grid
          container
          gap={1}
          justifyContent={{
            xs: "center",
            md: "space-between",
          }}
        >
          {posts.map((post) => (
            <PostCard
              {...post}
              key={post.id}
              closedLabel={closedLabel}
              dateLabel={dateLabel}
              linkLabel={linkLabel}
              publishedLabel={publishedLabel}
            />
          ))}
        </Grid>
        <Pagination count={count} page={page} onChange={handlePageChange} />
      </Section>
    </Box>
  );
}

export default PostList;
