"use client";
import { StyledLink } from "@/commons-ui/next/Link";
import { ArticleWithoutContent } from "@/engineeringblog/utils";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React from "react";

const ArticleCard = React.forwardRef(function ArticleCard(
  { title, publishDate, featuredImage, slug }: ArticleWithoutContent,
  ref: React.Ref<HTMLDivElement>,
) {
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
      <CardActionArea component={slug ? StyledLink : "div"} href={slug}>
        <CardMedia
          component="img"
          src={featuredImage}
          sx={{
            height: "217.64px",
            filter:
              "contrast(60%) sepia(100%) hue-rotate(190deg) saturate(500%)",
          }}
        />
        <CardContent>
          <Typography variant="subtitle1">{title}</Typography>
          <Typography
            sx={{ color: "#9F9494", display: "block", mt: 2 }}
            variant="caption"
          >
            {publishDate}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
});

export default ArticleCard;