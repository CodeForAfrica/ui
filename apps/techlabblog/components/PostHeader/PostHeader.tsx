import { Box, Typography } from "@mui/material";
import React from "react";

import type { PostProps } from "@/techlabblog/components/Post";

const PostHeader = React.forwardRef(function PostHeader(
  props: PostProps,
  ref: React.Ref<HTMLDivElement>,
) {
  const { publishedDate, excerpt, sx, title } = props;

  return (
    <Box component="header" sx={sx} ref={ref}>
      <Typography
        component="time"
        variant="body2"
        sx={{ mt: { xs: 2.5, md: 7.5 } }}
      >
        {publishedDate}
      </Typography>
      <Typography variant="h1" sx={{ mt: { xs: 2.5, md: 5 } }}>
        {title}
      </Typography>
      <Typography
        variant="body1"
        sx={{
          mt: { xs: 2.5, md: 5 },
          typography: { md: "subheading" },
        }}
      >
        {excerpt}
      </Typography>
    </Box>
  );
});

export default PostHeader;
