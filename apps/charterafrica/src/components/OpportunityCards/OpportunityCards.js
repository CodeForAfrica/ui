import { Box, Button } from "@mui/material";
import React, { useState } from "react";

import FeaturedPostCard from "../FeaturedPostCard/FeaturedPostCard";

import OpportunityCardGrid from "./OpportunityCardGrid";
import OpportunityCardHeader from "./OpportunityCardHeader";

const OpportunityCards = React.forwardRef(
  function OpportunityCards(props, ref) {
    const { config, featured, items, title, sx } = props;

    const [showAll, setShowAll] = useState(false);

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
        <OpportunityCardHeader
          title={title}
          onClick={() => setShowAll(!showAll)}
          showAll={showAll}
          showAllText={config?.showAllText || "Show all"}
          showLessText={config?.showLessText || "Show less"}
        />
        <FeaturedPostCard {...featured} sx={{ pb: 5 }} />
        <OpportunityCardGrid items={items} config={config} showAll={showAll} />
        <Button
          onClick={() => {
            setShowAll(!showAll);
          }}
          fullWidth
          sx={{
            color: "neutral.dark",
            display: {
              xs: "block",
              md: "none",
            },
            marginTop: "40px",
            textAlign: "center",
            textDecoration: "underline",
            typography: "p3SemiBold",
            "&:hover": {
              backgroundColor: "transparent",
            },
          }}
        >
          {showAll
            ? config?.showAllText || "Show All"
            : config?.showLessText || "Show Less"}
        </Button>
      </Box>
    );
  },
);

export default OpportunityCards;
