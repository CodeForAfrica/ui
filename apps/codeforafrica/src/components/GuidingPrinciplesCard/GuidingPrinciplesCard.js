import { RichTypography } from "@commons-ui/next";
import { Card, CardContent, CardMedia } from "@mui/material";
import React from "react";

import RichText from "@/codeforafrica/components/RichText";

const GuidingPrinciplesCard = React.forwardRef(
  function GuidingPrinciplesCard(props, ref) {
    const { title, description, icon } = props;

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
          <RichText elements={description} />
        </CardContent>
      </Card>
    );
  },
);

export default GuidingPrinciplesCard;
