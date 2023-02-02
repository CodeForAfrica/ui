import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import React from "react";

import { neutral } from "@/charterafrica/colors";
import LineClampedRichTypography from "@/charterafrica/components/LineClampedRichTypography";
import RichText from "@/charterafrica/components/RichText";

const FeaturedPostCard = React.forwardRef(function FeaturedPostCard(
  props,
  ref
) {
  const { title, date, excerpt, image } = props;

  return (
    <Card
      sx={{
        display: "flex",
        boxShadow: "none",
      }}
      ref={ref}
    >
      <CardMedia
        component="img"
        image={image.url}
        alt={image.alt}
        sx={{ width: "820px", height: "487px" }}
      />
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <LineClampedRichTypography
          color={neutral[900]}
          html={false}
          mb={{ xs: 2.5, md: 5 }}
          textAlign="left"
          typography="h2SemiBold"
        >
          {title}
        </LineClampedRichTypography>
        <LineClampedRichTypography
          color={neutral[500]}
          html={false}
          mb={{ xs: 2.5, md: 5 }}
          textAlign="left"
          typography="p1"
        >
          {new Date(date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </LineClampedRichTypography>

        <RichText
          component="h1"
          color={neutral[900]}
          typography="subheading"
          textAlign="left"
          elements={excerpt}
        />
        <Typography
          color={neutral[900]}
          typography="p3"
          sx={{
            cursor: "pointer",
            textDecoration: "underline",
          }}
        >
          Read More
        </Typography>
      </CardContent>
    </Card>
  );
});

export default FeaturedPostCard;
