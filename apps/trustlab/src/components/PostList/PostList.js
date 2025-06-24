import { Section } from "@commons-ui/core";
import { Box, Grid } from "@mui/material";

import { neutral } from "@/trustlab/colors";
import PostCard from "@/trustlab/components/PostCard";

function PostList({ deadlineLabel, linkLabel, posts }) {
  return (
    <Box
      sx={{
        backgroundColor: neutral[100],
        px: { xs: 2.5, sm: 0 },
        py: 8,
      }}
    >
      <Section>
        <Grid
          container
          gap={3}
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
