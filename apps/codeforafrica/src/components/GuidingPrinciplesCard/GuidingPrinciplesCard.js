import { RichTypography } from "@commons-ui/core";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import React from "react";

const GuidingPrinciplesCard = React.forwardRef(function GuidingPrinciplesCard(
  props,
  ref
) {
  const { title, description, icon } = props;
  return (
    <Card
      sx={{
        borderRadius: 0,
        boxShadow: "none",
        marginTop: { lg: "40px", xs: "20px" },
        padding: "24px",
        width: { sm: "354px", md: "354px", lg: "324px", xl: "354px" },
        height: "721px",
        backgroundColor: "primary.light",
      }}
      ref={ref}
    >
      <CardMedia component="img" image={icon} alt="" />
      <CardContent>
        <RichTypography sx={{ margin: "20px 0" }} variant="h3">
          {title}
        </RichTypography>
        <RichTypography>{description}</RichTypography>
      </CardContent>
    </Card>
  );
});

export default GuidingPrinciplesCard;
