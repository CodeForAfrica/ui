import { Link } from "@commons-ui/next";
import { Button, CardActionArea, Grid, Typography } from "@mui/material";
import React from "react";

import ArticleCard from "@/civicsignalblog/components/ArticleCard";
import ArticleCardContent from "@/civicsignalblog/components/ArticleCardContent";
import ArticleCardMedia from "@/civicsignalblog/components/ArticleCardMedia";

const FeaturedArticle = React.forwardRef(function FeaturedArticle(props, ref) {
  const {
    excerpt,
    image,
    href,
    publishedOn,
    sx,
    title,
    variant = "standard",
    readMoreLabel = "Read Story",
  } = props;

  return (
    <ArticleCard
      sx={{
        height: "100%",
        width: "100%",
        ...sx,
      }}
      ref={ref}
    >
      <CardActionArea
        component={href ? Link : undefined}
        href={href}
        sx={{ position: "relative" }}
      >
        <Grid container justifyContent="space-between">
          <Grid item xs={12} md={variant === "cover" ? 12 : "auto"}>
            <ArticleCardMedia
              alt={image.alt}
              src={image.src}
              sx={{
                height: {
                  xs: "217px",
                  sm: variant === "cover" ? "401px" : "297px",
                  md: "476px",
                },
                width: {
                  xs: "100%",
                  md: variant === "cover" ? "100%" : "758px",
                },
              }}
            />
          </Grid>
          <Grid
            item
            xs={12}
            md
            sx={{
              display: { sm: variant === "cover" ? "none" : "flex" },
            }}
          >
            <ArticleCardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <Typography
                sx={{
                  order: { xs: 0, md: 1 },
                  typography: { xs: "subtitle1", md: "h5", lg: "h3" },
                  mb: { xs: 2, md: "20px" },
                }}
              >
                {title}
              </Typography>
              <Typography
                sx={{
                  order: 2,
                  display: { xs: "none", md: "flex" },
                  mb: { md: "20px" },
                }}
              >
                {excerpt}
              </Typography>
              <Button
                color="primary"
                variant="contained"
                sx={{
                  order: 3,
                  display: { xs: "none", md: "flex" },
                }}
              >
                {readMoreLabel}
              </Button>
              <Typography
                sx={{
                  order: { xs: 1, md: 0 },
                  color: "#9F9494",
                  display: "block",
                  mb: { xs: 0, md: "20px" },
                }}
                variant="caption"
              >
                {publishedOn}
              </Typography>
            </ArticleCardContent>
          </Grid>
          <Grid
            item
            xs={12}
            container
            alignItems="center"
            justifyContent="center"
            sx={{
              display: {
                xs: "none",
                sm: variant === "cover" ? "flex" : "none",
              },
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
            }}
          >
            <Grid item>
              <ArticleCardContent
                sx={{
                  alignItems: "center",
                  display: "flex",
                  flexDirection: "column",
                  p: 0,
                  gap: 4.5,
                  width: { sm: "712px", md: "912px" },
                  "&:last-child": {
                    p: 0,
                  },
                }}
              >
                <Typography
                  variant="h1"
                  textAlign="center"
                  sx={{
                    color: "text.secondary",
                    textTransform: "uppercase",
                  }}
                >
                  {title}
                </Typography>
                <Button
                  color="primary"
                  size="large"
                  variant="contained-reverse"
                >
                  READ STORY
                </Button>
              </ArticleCardContent>
            </Grid>
          </Grid>
        </Grid>
      </CardActionArea>
    </ArticleCard>
  );
});

export default FeaturedArticle;
