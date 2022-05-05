import { Link } from "@commons-ui/next";
import Button from "@mui/material/Button";
import CardActionArea from "@mui/material/CardActionArea";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import React from "react";

import ArticleCard from "@/codeforafrica/components/ArticleCard";
import ArticleCardContent from "@/codeforafrica/components/ArticleCardContent";
import ArticleCardMedia from "@/codeforafrica/components/ArticleCardMedia";

const ArticleCardList = React.forwardRef(function ArticleCardList(props, ref) {
  const {
    date,
    href,
    src,
    summary,
    title,
    variant = "standard",
    ...other
  } = props;

  return (
    <ArticleCard
      sx={{
        width: "100%",
        height: "100%",
      }}
      {...other}
      ref={ref}
    >
      <CardActionArea
        component={Link}
        sx={{ position: "relative" }}
        href={href}
      >
        <Grid
          container
          direction={{ xs: "column", md: "row" }}
          justifyContent="space-between"
          wrap="nowrap"
        >
          <Grid item xs={12} md={variant === "cover" ? 12 : "auto"}>
            <ArticleCardMedia
              src={src}
              sx={{
                height: {
                  xs: "217px",
                  sm: variant === "cover" ? "401px" : "217px",
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
              sx={{ display: "flex", flexDirection: "column" }}
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
                {summary}
              </Typography>
              <Button
                color="primary"
                variant="contained"
                sx={{
                  order: 3,
                  display: { xs: "none", md: "flex" },
                }}
              >
                READ STORY
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
                {new Date(date).toLocaleDateString("en", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </Typography>
            </ArticleCardContent>
          </Grid>
          <Grid
            item
            xs={12}
            md={3}
            container
            justifyContent="center"
            alignItems="center"
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
            <Grid
              item
              md={9}
              container
              justifyContent="center"
              alignItems="center"
            >
              <ArticleCardContent>
                <Typography
                  variant="h1"
                  textAlign="center"
                  sx={{ color: "text.secondary", textTransform: "uppercase" }}
                >
                  {title}
                </Typography>
              </ArticleCardContent>
              <Button color="primary" size="large" variant="contained-reverse">
                READ STORY
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </CardActionArea>
    </ArticleCard>
  );
});

export default ArticleCardList;
