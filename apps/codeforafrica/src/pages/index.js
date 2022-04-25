import { Typography } from "@mui/material";
import CardActionArea from "@mui/material/CardActionArea";
import React from "react";

import ArticleCard from "@/codeforafrica/components/ArticleCard";
import ArticleCardContent from "@/codeforafrica/components/ArticleCardContent";
import ArticleCardMedia from "@/codeforafrica/components/ArticleCardMedia";
import Page from "@/codeforafrica/components/Page";
import { getPageStaticProps } from "@/codeforafrica/lib";

function Index({ sections = [], ...props }) {
  return (
    <Page {...props}>
      {sections.map((section) =>
        section.slug === "news-stories"
          ? section.articles?.map((article) => (
              <ArticleCard
                sx={{
                  width: { xs: 350, sm: 230.67, md: 289.33, lg: 362.67 },
                  m: 2,
                }}
              >
                <CardActionArea href={article.href}>
                  <ArticleCardMedia src={article.src} />
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
            ))
          : null
      )}
    </Page>
  );
}

export async function getStaticProps() {
  return getPageStaticProps({ slug: "/" });
}

export default Index;
