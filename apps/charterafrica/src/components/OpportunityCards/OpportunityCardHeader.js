import { Typography, Grid, Button } from "@mui/material";
import React from "react";

const OpportunityCardHeader = React.forwardRef(function OpportunityCardHeader(
  props,
  ref
) {
  const { onClick, title, sx, showAll, showAllText, showLessText } = props;

  return (
    <Grid
      ref={ref}
      container
      justifyContent="space-between"
      mb={5}
      sx={{
        ...sx,
      }}
    >
      <Grid item xs={12} md={6}>
        <Typography
          color="neutral.dark"
          textAlign={{ xs: "center", md: "left" }}
          textTransform="capitalize"
          variant="h5SemiBold"
        >
          {title}
        </Typography>
      </Grid>
      <Grid
        item
        md={6}
        textAlign="end"
        display={{
          xs: "none",
          md: "block",
        }}
      >
        <Button
          sx={{
            "&:hover": {
              backgroundColor: "transparent",
            },
            color: "neutral.dark",
            typography: "p3SemiBold",
          }}
          onClick={onClick}
        >
          {showAll ? showLessText : showAllText}
        </Button>
      </Grid>
    </Grid>
  );
});

export default OpportunityCardHeader;
