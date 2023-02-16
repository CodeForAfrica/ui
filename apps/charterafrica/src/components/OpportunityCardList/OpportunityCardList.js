import Link from "@/commons-ui/next/Link";
import { Typography, Box, Grid } from "@mui/material";
import React from "react";

import OpportunityCard from "../OpportunityCard";

import { neutral } from "@/charterafrica/colors";

const OpportunityCardList = React.forwardRef(function OpportunityCardList(
  props,
  ref
) {
  const { title, grants, url } = props;
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
          <Link
            href={url}
            underline="always"
            color={neutral[900]}
            sx={{
              variant: "p3SemiBold",
            }}
          >
            View All
          </Link>
        </Grid>
      </Grid>
      <Grid
        container
        spacing={5}
        direction={{
          xs: "column",
          sm: "row",
        }}
        justifyContent={{
          xs: "center",
          md: "space-between",
        }}
        flexWrap={{
          xs: "nowrap",
          sm: "wrap",
          md: "nowrap",
        }}
      >
        {grants.slice(0, 4).map((grant) => {
          return (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
              xl={3}
              justifyContent="space-between"
            >
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
