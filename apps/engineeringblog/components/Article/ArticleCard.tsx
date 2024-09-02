import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React from "react";

type Article = {
  slug: string;
  title: string;
  description: string;
  date: string;
  featuredImage: string;
};

export type ArticleCardProps = {
  article: Article;
};

const ArticleCard = React.forwardRef(function ArticleCard(
  props: ArticleCardProps,
  ref: React.Ref<HTMLDivElement>,
) {
  const { article } = props;

  return (
    <Card
      elevation={0}
      square={true}
      variant="outlined"
      sx={{
        "&:hover": {
          border: `1px solid "#ED1C24"`,
          img: {
            filter: "none",
          },
        },
        border: "1px solid #DAD5D5",
        filter: "drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.1))",
      }}
    >
      <CardActionArea
        component={article.slug ? "a" : "div"}
        href={article.slug}
      >
        <CardMedia
          component="img"
          src={article.featuredImage}
          sx={{
            height: "217.64px",
            filter:
              "contrast(60%) sepia(100%) hue-rotate(190deg) saturate(500%)",
          }}
        />
        <CardContent>
          <Typography variant="subtitle1">{article.title}</Typography>
          <Typography
            sx={{ color: "#9F9494", display: "block", mt: 2 }}
            variant="caption"
          >
            {article.date}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
});

export default ArticleCard;
