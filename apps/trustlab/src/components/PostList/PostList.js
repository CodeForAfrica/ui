import { Section } from "@commons-ui/core";
import { Box, Grid } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import usePosts from "./usePosts";

import Pagination from "@/trustlab/components/Pagination";
import PostCard from "@/trustlab/components/PostCard";

function PostList({
  posts: initialPosts,
  pagination: { count: countProp, page: pageProp = 1 },
  closedLabel,
  deadlineLabel,
  linkLabel,
}) {
  const [page, setPage] = useState(pageProp);
  const [count, setCount] = useState(countProp);
  const [posts, setPosts] = useState(initialPosts || []);

  const router = useRouter();
  const { query } = router;
  const { page: queryPage, slugs } = query;
  const path = Array.isArray(slugs) ? slugs[0] : slugs || "";

  useEffect(() => {
    if (queryPage) {
      const parsed = parseInt(queryPage, 10);
      if (parsed !== page) {
        setPage(parsed);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryPage]);

  const res = usePosts(page, path);

  useEffect(() => {
    if (!res.isLoading) {
      const {
        posts: fetchedPosts,
        pagination: { count: fetchedCount },
      } = res;
      setPosts(fetchedPosts);
      setCount(fetchedCount);
    }
  }, [res]);

  const handlePageChange = (value) => {
    setPage(value);
  };

  return (
    <Box
      sx={{
        px: { xs: 2.5, sm: 0 },
        py: 8,
      }}
    >
      <Section>
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
              deadlineLabel={deadlineLabel}
              linkLabel={linkLabel}
            />
          ))}
        </Grid>
        <Pagination count={count} page={page} onChange={handlePageChange} />
      </Section>
    </Box>
  );
}

export default PostList;
