import { Grid } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";
import React from "react";

import type { PostCardProps } from "./PostCard";
import PostCard from "./PostCard";

interface PostListProps {
  posts?: PostCardProps[];
  sx?: SxProps<Theme>;
}

const PostList = React.forwardRef(function PostList(
  props: PostListProps,
  ref: React.Ref<HTMLDivElement>,
) {
  const { posts, sx } = props;

  if (!posts?.length) {
    return null;
  }
  return (
    <Grid
      container
      rowSpacing={{ xs: "28px", md: 5 }}
      columnSpacing={{ xs: 0, sm: "18px", lg: "28px" }}
      sx={sx}
      ref={ref}
    >
      {posts.map((post) => (
        <Grid item xs={12} sm={6} md={4} key={post.slug}>
          <PostCard {...post} />
        </Grid>
      ))}
    </Grid>
  );
});

export default PostList;
