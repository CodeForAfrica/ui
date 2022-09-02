/* eslint-disable camelcase */
import { Link, RichTypography } from "@commons-ui/next";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import React from "react";

const OpportunityCard = React.forwardRef(function OpportunityCard(props, ref) {
  const { featureImage, html, href, publishedAt, sx, tags, title } = props;

  if (!(title && html)) {
    return null;
  }
  return (
    <Card sx={{ boxShadow: "none", borderRadius: 0, ...sx }} ref={ref}>
      <CardActionArea component={href ? Link : undefined} href={href}>
        <CardMedia component="img" alt="" src={featureImage} />
        <CardContent sx={{ padding: 0 }}>
          <RichTypography sx={{ mt: 5, mb: 2.5 }} variant="h3">
            {title}
          </RichTypography>
          <Box sx={{ display: "flex" }}>
            <RichTypography
              sx={{ borderRight: "solid 1px", mr: 1.25, pr: 1.25 }}
            >
              {publishedAt}
            </RichTypography>
            <RichTypography>{tags?.join(", ")}</RichTypography>
          </Box>
          <RichTypography
            variant="body2"
            sx={{
              py: 2.5,
              display: "-webkit-box",
              WebkitLineClamp: "3",
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              maxHeight: 28 * 3,
            }}
          >
            {html}
          </RichTypography>
        </CardContent>
        <CardActions sx={{ p: 0, mt: 2.5 }}>
          <Button component="div" variant="contained-reverse">
            Read More
          </Button>
        </CardActions>
      </CardActionArea>
    </Card>
  );
});

export default OpportunityCard;
