import { RichTypography } from "@commons-ui/core";
import {
  Card,
  CardContent,
  CardActions,
  CardMedia,
  Button,
} from "@mui/material";
import React from "react";

const OpportunityCard = React.forwardRef(function OpportunityCard(props, ref) {
  const { title, description, image, meta } = props;

  if (!title || !description) {
    return null;
  }
  return (
    <Card sx={{ boxShadow: "none", borderRadius: 0 }} ref={ref}>
      <CardMedia component="img" alt="" src={image?.src} />
      <CardContent sx={{ padding: 0 }}>
        <RichTypography sx={{ mt: "40px", mb: "20px" }} variant="h3">
          {title}
        </RichTypography>
        {meta && <RichTypography variant="body2">{meta}</RichTypography>}
        <RichTypography sx={{ py: "20px" }} variant="body2">
          {description}
        </RichTypography>
      </CardContent>
      <CardActions sx={{ padding: 0 }}>
        <Button variant="contained-reverse">Read More</Button>
      </CardActions>
    </Card>
  );
});

export default OpportunityCard;
