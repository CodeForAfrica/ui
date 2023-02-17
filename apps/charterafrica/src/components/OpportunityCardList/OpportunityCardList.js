import { Typography, Box, Grid, Button } from "@mui/material";
import React, { useState } from "react";

import OpportunityCard from "../OpportunityCard";

import { neutral } from "@/charterafrica/colors";

const OpportunityCardList = React.forwardRef(function OpportunityCardList(
  props,
  ref
) {
  const { title, grants } = props;

  const [showAll, setShowAll] = useState(false);

  if (!grants) {
    return null;
  }
  return (
    <Box ref={ref}>
      <Grid container justifyContent="space-between" mb={5}>
        <Grid item xs={12} md={6}>
          <Typography
            variant="h5SemiBold"
            color={neutral[900]}
            textAlign={{ xs: "center", sm: "left" }}
            textTransform="capitalize"
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
              variant="p3SemiBold"
              color={neutral[900]}
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
        wrap="wrap"
        sx={{
          // hide from 5th child
          "& > :nth-of-type(n+5)": {
            display: showAll ? "block" : "none",
          },

          // hide from 4th child on only sm and md
          "& > :nth-of-type(4)": {
            display: {
              xs: showAll ? "block" : "none",
              sm: "block",
              md: showAll ? "block" : "none",
              lg: "block",
            },
          },
        }}
      >
        {grants.map((grant) => {
          return (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
              key={grant.id}
              display="flex"
              justifyContent={{
                xs: "center",
                md: "end",
              }}
            >
              <OpportunityCard {...grant} key={grant.id} />
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
          variant="p3SemiBold"
          color={neutral[900]}
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
