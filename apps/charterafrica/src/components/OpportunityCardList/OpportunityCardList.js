import { Typography, Box, Button } from "@mui/material";
import React, { useState } from "react";

import OpportunityCardListGrid from "./OpportunityCardListGrid";
import OpportunityCardListHeader from "./OpportunityCardListHeader";

import FeaturedEventCard from "@/charterafrica/components/FeaturedEventCard/FeaturedEventCard";

const OpportunityCardList = React.forwardRef(function OpportunityCardList(
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
        showAllText="Show all"
        showLessText="Show less"
      />
      {featuredEvent ? <FeaturedEventCard {...featuredEvent} /> : null}
      <OpportunityCardListGrid
        items={items}
        config={config}
        showAll={showAll}
      />
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
          {showAll ? config?.showLessText : config?.showAllText}
        </Typography>
      </Button>
    </Box>
  );
});

export default OpportunityCardList;
