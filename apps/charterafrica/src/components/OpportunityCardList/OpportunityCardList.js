import Link from "@/commons-ui/next/Link";
import { Typography, Box, Grid } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import React from "react";

import OpportunityCard from "../OpportunityCard";

import { neutral } from "@/charterafrica/colors";

const OpportunityCardList = React.forwardRef(function OpportunityCardList(
  props,
  ref
) {
  const { title, grants } = props;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isSmallDesktop = useMediaQuery(theme.breakpoints.only("md"));
  return (
    <Box ref={ref}>
      <Grid
        container
        justifyContent="space-between"
        sx={{
          marginBottom: "40px",
        }}
      >
        <Grid item>
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
        <Grid item>
          <Link
            href="/grants"
            underline="always"
            color={neutral[900]}
            sx={{
              variant: "p3SemiBold",
              display: {
                xs: "none",
                md: "block",
              },
            }}
          >
            View All
          </Link>
        </Grid>
      </Grid>
      <Grid
        container
        spacing={2}
        direction={isMobile ? "column" : "row"}
        justifyContent={{
          xs: "center",
          md: "space-between",
        }}
        alignItems="center"
      >
        {isMobile || isSmallDesktop
          ? grants.slice(0, 3).map((grant) => {
              return (
                <Grid
                  item
                  sx={{
                    marginBottom: "40px",
                  }}
                >
                  <OpportunityCard opportunity={grant} key={grant.id} />
                </Grid>
              );
            })
          : grants.slice(0, 4).map((grant) => {
              return (
                <Grid
                  item
                  sx={{
                    marginBottom: {
                      xs: "40px",
                      md: "0px",
                    },
                  }}
                >
                  <OpportunityCard opportunity={grant} key={grant.id} />
                </Grid>
              );
            })}
      </Grid>
      <Link
        href="/grants"
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
