import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import React from "react";

import LineClampedRichTypography from "../LineClampedRichTypography";

import { neutral } from "@/charterafrica/colors";

const FeaturedPostCard = React.forwardRef(function FeaturedPostCard() {
  return (
    <Card
      sx={{
        display: "flex",
        boxShadow: "none",
      }}
    >
      <CardMedia
        component="img"
        image="/images/featured_post.png"
        alt="Featured Post"
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
          News Story title goes here and spans over second line
        </LineClampedRichTypography>
        <LineClampedRichTypography
          color={neutral[500]}
          html={false}
          mb={{ xs: 2.5, md: 5 }}
          textAlign="left"
          typography="p1"
        >
          2020-10-10 10:10:10
        </LineClampedRichTypography>

        <LineClampedRichTypography
          color={neutral[900]}
          html={false}
          mb={{ xs: 2.5, md: 5 }}
          textAlign="left"
          typography="subheading"
        >
          Lorem ipsum dolor sit amet consectetur adipiscing elit tempus nibh
          cursus, urna porta sagittis non eget taciti nunc sed felis dui,
          praesent ullamcorper facilisi euismod ut in platea laoreet integer.
          Lorem ipsum dolor sit amet consectetur
        </LineClampedRichTypography>
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
