/* eslint-disable camelcase */
import { Link, RichTypography } from "@commons-ui/next";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
} from "@mui/material";
import React from "react";

const OpportunityCard = React.forwardRef(function OpportunityCard(props, ref) {
  const {
    image: { src, alt },
    excerpt,
    href,
    publishedOn,
    sx,
    tags,
    title,
    readMore,
  } = props;

  if (!(title && excerpt)) {
    return null;
  }
  return (
    <Card sx={{ boxShadow: "none", borderRadius: 0, ...sx }} ref={ref}>
      <CardActionArea component={href ? Link : undefined} href={href}>
        <CardMedia component="img" alt={alt} src={src} />
        <CardContent sx={{ padding: 0 }}>
          <RichTypography sx={{ mt: 5, mb: 2.5 }} variant="h3">
            {title}
          </RichTypography>
          <Box sx={{ display: "flex" }}>
            <RichTypography
              sx={{ borderRight: "solid 1px", mr: 1.25, mt: 0, pr: 1.25 }}
            >
              {publishedOn}
            </RichTypography>
            <RichTypography mt={0}>
              {tags.map((tag) => tag.name).join(", ")}
            </RichTypography>
          </Box>
          <RichTypography
            component="section"
            variant="body2"
            sx={{
              py: 2.5,
              display: "-webkit-box",
              WebkitLineClamp: "3",
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              maxHeight: 28 * 3.5,
            }}
          >
            {excerpt}
          </RichTypography>
        </CardContent>
        <CardActions sx={{ p: 0, mt: 2.5 }}>
          <Button component="div" variant="contained-reverse">
            {readMore}
          </Button>
        </CardActions>
      </CardActionArea>
    </Card>
  );
});

export default OpportunityCard;
