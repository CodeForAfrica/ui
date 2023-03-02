import { Typography, Box, Button } from "@mui/material";
import React, { useState } from "react";

import FeaturedPostCard from "../FeaturedPostCard/FeaturedPostCard";

import OpportunityCardGrid from "./OpportunityCardGrid";
import OpportunityCardListHeader from "./OpportunityCardListHeader";

const OpportunityCards = React.forwardRef(function OpportunityCards(
  props,
  ref
) {
  const { config, items, title, sx } = props;

  const [showAll, setShowAll] = useState(false);
  const featuredEvent = items?.find((item) => item.featured);

  if (!items?.length) {
    return null;
  }
  return (
    <Box
      ref={ref}
      sx={{
        ...sx,
      }}
    >
      <OpportunityCardListHeader
        title={title}
        onClick={() => setShowAll(!showAll)}
        showAll={showAll}
        showAllText={config?.showAllText || "Show all"}
        showLessText={config?.showLessText || "Show less"}
      />
      {featuredEvent ? <FeaturedPostCard {...featuredEvent} /> : null}
      <OpportunityCardGrid items={items} config={config} showAll={showAll} />
      <Button
        onClick={() => {
          setShowAll(!showAll);
        }}
        fullWidth
        sx={{
          display: {
            xs: "block",
            md: "none",
          },
          marginTop: "40px",
          textAlign: "center",
          "&:hover": {
            backgroundColor: "transparent",
          },
        }}
      >
        <Typography
          color="neutral.dark"
          variant="p3SemiBold"
          sx={{
            textDecoration: "underline",
          }}
        >
          {showAll
            ? config?.showAllText || "Show All"
            : config?.showLessText || "Show Less"}
        </Typography>
      </Button>
    </Box>
  );
});

export default OpportunityCards;
