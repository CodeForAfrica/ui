import { RichTypography } from "@commons-ui/next";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import React from "react";

const GuidingPrinciplesCard = React.forwardRef(function GuidingPrinciplesCard(
  props,
  ref
) {
  const { title, content, icon } = props;

  return (
    <Card
      sx={{
        alignItems: "center",
        borderRadius: 0,
        boxShadow: "none",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        p: 3,
        width: { sm: "354px", md: "329.33px", lg: "354px" },
        backgroundColor: "primary.light",
      }}
      ref={ref}
    >
      <CardMedia
        sx={{
          height: "auto",
          objectFit: "contain",
          width: "100%",
        }}
        component="img"
        image={icon?.src}
        alt=""
      />
      <CardContent sx={{ p: 0, "&:last-child": { p: 0 } }}>
        <RichTypography variant="h3" sx={{ my: 2.5 }}>
          {title}
        </RichTypography>
        <RichTypography>{content}</RichTypography>
      </CardContent>
    </Card>
  );
});

export default GuidingPrinciplesCard;
