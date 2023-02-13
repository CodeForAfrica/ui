import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import React from "react";

import { neutral, secondary } from "@/charterafrica/colors";

const OpportunityCard = React.forwardRef(function OpportunityCard(props, ref) {
  const { opportunity } = props;

  if (!opportunity) {
    return null;
  }

  return (
    <Card
      ref={ref}
      style={{
        width: "270px",
        boxShadow: "none",
        backgroundColor: secondary[50],
      }}
    >
      <CardMedia
        component="img"
        height={187.26}
        width={270}
        image={opportunity.image.url}
        alt={opportunity.image.alt}
        sx={{
          boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.1)",
          borderRadius: "5px",
          objectFit: "fill",
        }}
      />
      <CardContent
        sx={{
          padding: "0",
          marginTop: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          "&:last-child": {
            paddingBottom: "0",
          },
        }}
      >
        <Typography
          variant="h6"
          color={neutral[900]}
          sx={{
            textTransform: "uppercase",
          }}
        >
          {opportunity.title}
        </Typography>
        <Typography variant="p1" color={neutral[900]}>
          {opportunity.description}
        </Typography>
        <Typography
          variant="caption"
          color={neutral[900]}
          sx={{
            textTransform: "uppercase",
          }}
        >
          Deadline: {opportunity.deadline}
        </Typography>
      </CardContent>
    </Card>
  );
});

export default OpportunityCard;
