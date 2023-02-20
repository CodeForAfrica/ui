import { Typography, Box, Grid, Button } from "@mui/material";
import React, { useState } from "react";

import OpportunityCard from "../OpportunityCard";

import { neutral } from "@/charterafrica/colors";

const OpportunityCardList = React.forwardRef(function OpportunityCardList(
  props,
  ref
) {
  const { title, items } = props;

  const [showAll, setShowAll] = useState(false);

  if (!items?.length) {
    return null;
  }
  return (
    <Box ref={ref}>
      <Grid container justifyContent="space-between" mb={5}>
        <Grid item xs={12} md={6}>
          <Typography
            color="neutral.dark"
            textAlign={{ xs: "center", sm: "left" }}
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
            }}
            onClick={() => {
              setShowAll(!showAll);
            }}
          >
            <Typography
              color={neutral[900]}
              variant="p3SemiBold"
              sx={{
                textDecoration: "underline",
              }}
            >
              {showAll ? "Show Less" : "Show All"}
            </Typography>
          </Button>
        </Grid>
      </Grid>
      <Grid
        container
        spacing={5}
        wrap="wrap"
        sx={{
          // hide from 5th child
          "& > :nth-of-type(n+5)": {
            display: showAll ? "flex" : "none",
          },

          // hide from 4th child on only sm and md
          "& > :nth-of-type(4)": {
            display: {
              xs: showAll ? "flex" : "none",
              sm: "flex",
              md: showAll ? "flex" : "none",
              lg: "flex",
            },
          },
        }}
      >
        {items.map((item) => {
          return (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
              key={item.id}
              display="flex"
              justifyContent="center"
            >
              <OpportunityCard {...item} key={item.id} />
            </Grid>
          );
        })}
      </Grid>
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
          color={neutral[900]}
          variant="p3SemiBold"
          sx={{
            textDecoration: "underline",
          }}
        >
          {showAll ? "Show Less" : "Show All"}
        </Typography>
      </Button>
    </Box>
  );
});

export default OpportunityCardList;
