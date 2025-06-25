import { Section } from "@commons-ui/core";
import { Figure, Link } from "@commons-ui/next";
import { LexicalRichText } from "@commons-ui/payload";
import { Grid, Typography, Button, Box } from "@mui/material";
import React, { forwardRef } from "react";

const PostImageOverview = forwardRef(function PostImageOverview(
  {
    title,
    content,
    image,
    deadline,
    location,
    applicationLink,
    applicationActive = false,
  },
  ref,
) {
  if (!title && !content && !image) {
    return null;
  }

  const { url, alt } = image;

  return (
    <Box bgcolor="common.white" ref={ref}>
      <Section sx={{ py: 8, px: { xs: 2.5, md: 0 } }}>
        <Grid
          container
          alignItems="flex-start"
          sx={{
            flexWrap: "nowrap",
            gap: {
              xs: 6,
              md: 2,
            },
            flexDirection: { xs: "column", md: "row" },
          }}
          justifyContent="space-between"
        >
          <Grid item>
            <LexicalRichText
              elements={content}
              sx={{
                h1: {
                  borderBottom: `1px solid`,
                  mb: 3,
                  pb: 1,
                },
                p: {
                  mb: 3,
                },
              }}
              TypographyProps={{
                gutterBottom: true,
                sx: {
                  mb: 3,
                },
              }}
            />
          </Grid>
          <Grid
            item
            sx={{
              pl: { xs: 0, md: 2 },
              width: { xs: "100%", md: "360px" },
              minWidth: "360px",
              borderLeft: { xs: "none", md: "1px solid black" },
              textAlign: { xs: "center", md: "left" },
              position: "sticky",
              top: 64,
            }}
          >
            <Figure
              ImageProps={{
                alt,
                src: url,
              }}
              sx={{
                height: { xs: "374.47px", md: "268px" },
                m: 0,
                position: "relative",
                width: { xs: "100%", md: "360px" },
              }}
            />
            <Typography>{location}</Typography>
            <Typography sx={{ mt: 4 }}>{deadline}</Typography>
            <Button
              variant="contained"
              component={
                applicationLink?.href && applicationActive ? Link : undefined
              }
              href={applicationLink?.href}
              disabled={!applicationActive}
            >
              {applicationLink?.label}
            </Button>
          </Grid>
        </Grid>
      </Section>
    </Box>
  );
});

export default PostImageOverview;
