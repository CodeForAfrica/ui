import Link from "@/commons-ui/next/Link";
import { Typography, Box, Grid, Button } from "@mui/material";
import React, { useState } from "react";

import OpportunityCard from "../OpportunityCard";

import { neutral } from "@/charterafrica/colors";

const OpportunityCardList = React.forwardRef(function OpportunityCardList(
  props,
  ref
) {
  const { title, grants, url } = props;

  const [showAll, setShowAll] = useState(false);

  if (!grants) {
    return null;
  }
  return (
    <Box ref={ref}>
      <Grid container justifyContent="space-between" rowSpacing={5}>
        <Grid item xs={12} md={6}>
          <Typography
            variant="h5SemiBold"
            color={neutral[900]}
            sx={{
              textTransform: "capitalize",
            }}
          >
            {title}
          </Typography>
        </Grid>
        <Grid
          item
          md={6}
          textAlign="end"
          sx={{
            display: {
              xs: "none",
              md: "block",
            },
          }}
        >
          <Button
            variant="text"
            color="primary"
            onClick={() => {
              setShowAll(!showAll);
            }}
          >
            {showAll ? "Show Less" : "Show All"}
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
            <Grid item xs={12} sm={6} md={4} lg={3} key={grant.id}>
              <OpportunityCard opportunity={grant} key={grant.id} />
            </Grid>
          );
        })}
      </Grid>
      <Link
        href={url}
        underline="always"
        color={neutral[900]}
        sx={{
          variant: "p3SemiBold",
          display: {
            xs: "block",
            md: "none",
          },
          textAlign: "center",
          marginTop: "40px",
        }}
      >
        View All
      </Link>
    </Box>
  );
});

export default OpportunityCardList;
