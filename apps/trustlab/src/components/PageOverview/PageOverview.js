import { Section } from "@commons-ui/core";
import { Figure, Link } from "@commons-ui/next";
import { LexicalRichText } from "@commons-ui/payload";
import { Grid, Typography, Button, Box } from "@mui/material";
import React, { forwardRef } from "react";

const PostImageOverview = forwardRef(function PostImageOverview(
  {
    content,
    image,
    date,
    caption,
    buttonLink,
    isClosed = false,
    backgroundColor = "common.white",
    textColor = "text.primary",
    textAlign = "left",
  },
  ref,
) {
  if (!content && !image) {
    return null;
  }

  const { url, alt } = image;

  return (
    <Box
      sx={{
        backgroundColor,
      }}
      ref={ref}
    >
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
                  color: textColor,
                },
              }}
            />
          </Grid>
          <Grid
            item
            sx={{
              width: { xs: "100%", md: "360px" },
              minWidth: "360px",
              textAlign: { xs: "center", md: textAlign },
              alignSelf:
                caption || date || buttonLink?.href ? "flex-start" : "center",
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
            <Typography sx={{ mt: 2, color: textColor }}>{caption}</Typography>
            <Typography sx={{ mt: 4, color: textColor }}>{date}</Typography>
            {buttonLink?.href ? (
              <Button
                variant="contained"
                component={buttonLink?.href && !isClosed ? Link : undefined}
                href={buttonLink?.href}
                disabled={isClosed}
                sx={{
                  mt: 2,
                }}
              >
                {buttonLink?.label}
              </Button>
            ) : null}
          </Grid>
        </Grid>
      </Section>
    </Box>
  );
});

export default PostImageOverview;
