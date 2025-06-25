import { Section } from "@commons-ui/core";
import { Box, Grid } from "@mui/material";

import PostCard from "@/trustlab/components/PostCard";

function PostList({ deadlineLabel, linkLabel, posts }) {
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
              deadlineLabel={deadlineLabel}
              linkLabel={linkLabel}
              key={post.id}
            />
          ))}
        </Grid>
      </Section>
    </Box>
  );
}

export default PostList;
