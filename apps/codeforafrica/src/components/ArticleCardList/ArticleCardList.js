import CardActionArea from "@mui/material/CardActionArea";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import React from "react";

import ArticleCard from "@/codeforafrica/components/ArticleCard";
import ArticleCardContent from "@/codeforafrica/components/ArticleCardContent";
import ArticleCardMedia from "@/codeforafrica/components/ArticleCardMedia";

const ArticleCardList = React.forwardRef(function ArticleCardList(props, ref) {
  const { articles, ...other } = props;

  if (!articles?.length) {
    return null;
  }
  return (
    <Grid
      container
      rowSpacing={{ xs: "28px", md: 5 }}
      columnSpacing={{ xs: 0, sm: "18px", lg: "28px" }}
      {...other}
      ref={ref}
    >
      {articles?.map((article) => (
        <Grid item xs={12} sm={4} key={article.href}>
          <ArticleCard
            sx={{
              width: "100%",
              height: "100%",
            }}
          >
            <CardActionArea href={article.href}>
              <ArticleCardMedia
                sx={{
                  display: { xs: "none", sm: "block" },
                  height: "217.64px",
                }}
                src={article.thumbnail?.src || article.coverImage?.src}
              />
              <ArticleCardContent>
                <Typography variant="subtitle1">{article.title}</Typography>
                <Typography
                  sx={{ color: "#9F9494", display: "block", mt: 2 }}
                  variant="caption"
                >
                  {new Date(article.date).toLocaleDateString("en", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </Typography>
              </ArticleCardContent>
            </CardActionArea>
          </ArticleCard>
        </Grid>
      ))}
    </Grid>
  );
});

export default ArticleCardList;
