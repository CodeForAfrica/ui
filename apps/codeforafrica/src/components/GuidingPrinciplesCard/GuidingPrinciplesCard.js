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
        marginBottom: "40px",
        width: { sm: "354px", md: "329px", lg: "354px", xl: "354px" },
        backgroundColor: "primary.light",
      }}
      ref={ref}
    >
      <CardMedia
        sx={{ padding: "24px 24px 0 24px" }}
        component="img"
        image={icon?.src}
        alt=""
      />
      <CardContent sx={{ padding: "0 24px" }}>
        <RichTypography sx={{ margin: "20px 0" }} variant="h3">
          {title}
        </RichTypography>
        <RichTypography>{description}</RichTypography>
      </CardContent>
    </Card>
  );
});

export default GuidingPrinciplesCard;
