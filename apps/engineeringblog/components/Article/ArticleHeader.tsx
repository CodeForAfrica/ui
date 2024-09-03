"use client";

import { Section } from "@commons-ui/core";
import { Typography } from "@mui/material";
import React from "react";

const ArticleHeader = React.forwardRef(function ArticleHeader(
  {
    date,
    excerpt,
    sx,
    title,
  }: { date: string; excerpt: string; sx: any; title: string },
  ref,
) {
  return (
    <Section
      component="header"
      sx={{
        px: { xs: 2.5, sm: 0 },
        maxWidth: {
          sm: "648px",
          md: "912px",
        },
        ...sx,
      }}
      ref={ref}
    >
      <Typography
        component="div"
        variant="body2"
        sx={{ mt: { xs: 2.5, md: 7.5 } }}
      >
        {date}
      </Typography>
      <Typography component="div" variant="h1" sx={{ mt: { xs: 2.5, md: 5 } }}>
        {title}
      </Typography>
      <Typography
        component="div"
        variant="body1"
        sx={{
          color: "primary.main",
          mt: { xs: 2.5, md: 5 },
          typography: { md: "subheading" },
        }}
      >
        {excerpt}
      </Typography>
    </Section>
  );
});

export default ArticleHeader;
