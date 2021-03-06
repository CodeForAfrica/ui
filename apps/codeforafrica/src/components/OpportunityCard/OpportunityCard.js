import { RichTypography } from "@commons-ui/core";
import { Link } from "@commons-ui/next";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import React from "react";

const OpportunityCard = React.forwardRef(function OpportunityCard(props, ref) {
  const { comments, date, content, image, href, tags, title, ...other } = props;

  if (!(title && content)) {
    return null;
  }
  return (
    <Card sx={{ boxShadow: "none", borderRadius: 0, ...other.sx }} ref={ref}>
      <CardActionArea component={href ? Link : undefined} href={href}>
        <CardMedia component="img" alt="" src={image?.src} />
        <CardContent sx={{ padding: 0 }}>
          <RichTypography sx={{ mt: 5, mb: 2.5 }} variant="h3">
            {title}
          </RichTypography>
          <Box sx={{ display: "flex" }}>
            <RichTypography
              sx={{ borderRight: "solid 1px", mr: 1.25, pr: 1.25 }}
            >
              {date}
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
            {content}
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
