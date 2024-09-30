"use client";

import { StyledLink as Link } from "@commons-ui/next";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";
import React from "react";

import { PostFrontMatterProps } from "@/techlabblog/lib/data";

interface PostCardProps extends PostFrontMatterProps {
  sx?: SxProps<Theme>;
}

const PostCard = React.forwardRef(function ArticleCard(
  props: PostCardProps,
  ref: React.Ref<HTMLDivElement>,
) {
  const { title, publishedDate, featuredImage, slug, sx } = props;

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
        ...sx,
      }}
      ref={ref}
    >
      <CardActionArea component={slug ? Link : "div"} href={slug}>
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
            {publishedDate}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
});

export type { PostCardProps };
export default PostCard;
