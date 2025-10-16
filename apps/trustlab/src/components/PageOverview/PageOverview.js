import { Section } from "@commons-ui/core";
import { Figure, Link } from "@commons-ui/next";
import { LexicalRichText } from "@commons-ui/payload";
import { Grid2 as Grid, Typography, Button, Box } from "@mui/material";
import React, { forwardRef } from "react";

const PostImageOverview = forwardRef(function PostImageOverview(
  {
    title,
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
  const NAVBAR_HEIGHT = 94;

  return (
    <Box
      sx={{
        backgroundColor,
      }}
      ref={ref}
    >
      <Section sx={{ pt: 8, px: { xs: 2.5, md: 0 } }}>
        {title ? (
          <Typography
            component="h1"
            sx={{
              borderBottom: "1px solid",
              mb: 3,
              pb: 1,
              fontSize: 20,
              fontWeight: 700,
              color: textColor,
              textAlign: { xs: "left", md: textAlign },
            }}
          >
            {title}
          </Typography>
        ) : null}
        <Grid
          container
          alignItems="flex-start"
          sx={{
            flexWrap: "nowrap",
            gap: {
              xs: 6,
              sm: 2,
            },
            flexDirection: { xs: "column", sm: "row" },
          }}
          justifyContent="space-between"
        >
          <Grid
            sx={{
              flexBasis: { sm: "66.666%", md: "50%" },
              maxWidth: { sm: "66.666%", md: "50%" },
              width: "100%",
            }}
          >
            <LexicalRichText
              elements={content}
              sx={{
                p: {
                  mb: 3,
                },
              }}
              TypographyProps={{
                gutterBottom: true,
                variant: "p2",
                sx: {
                  mb: 3,
                  color: textColor,
                  textAlign: { xs: "left", md: textAlign },
                },
              }}
            />
          </Grid>
          <Grid
            sx={(theme) => ({
              flexBasis: { sm: "33.333%", md: "50%" },
              maxWidth: { sm: "33.333%", md: "50%" },
              width: { xs: "fit-content", sm: "100%" },
              minWidth: { xs: "auto", sm: "33.333%" },
              textAlign: { xs: "left", sm: "center" },
              alignSelf: "flex-start",
              position: { xs: "relative", sm: "sticky" },
              top: {
                sm: `calc(${NAVBAR_HEIGHT}px + ${theme.spacing(2)})`,
              },
              display: "flex",
              flexDirection: "column",
              alignItems: { xs: "flex-start", sm: "center" },
            })}
          >
            <Figure
              ImageProps={{
                alt,
                src: url,
              }}
              sx={{
                height: { xs: "260px", sm: "300px", md: "366px" },
                m: 0,
                position: "relative",
                width: { xs: "220px", sm: "100%" },
                maxWidth: { sm: "280px", md: "360px" },
                mx: { xs: 0, sm: "auto" },
                "& span img": {
                  objectPosition: { xs: "left top", sm: "center top" },
                },
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
