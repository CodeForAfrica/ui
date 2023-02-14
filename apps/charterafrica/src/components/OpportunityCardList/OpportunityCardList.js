import Link from "@/commons-ui/next/Link";
import { Typography, Box } from "@mui/material";
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
  return (
    <Box ref={ref}>
      <Box
        sx={{
          display: "flex",
          justifyContent: {
            xs: "center",
            md: "space-between",
          },
          marginBottom: "40px",
        }}
      >
        <Typography
          variant="h5SemiBold"
          color={neutral[900]}
          sx={{
            textTransform: "capitalize",
          }}
        >
          {title}
        </Typography>
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
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: {
            xs: "column",
            sm: "row",
          },
          justifyContent: {
            xs: "center",
            md: "space-between",
          },
          alignItems: "center",
          gap: "40px",
          overflow: "hidden",
          flexWrap: {
            xs: "wrap",
            md: "nowrap",
          },
        }}
      >
        {isMobile
          ? grants.slice(0, 3).map((grant) => {
              return <OpportunityCard opportunity={grant} key={grant.id} />;
            })
          : grants.slice(0, 4).map((grant) => {
              return <OpportunityCard opportunity={grant} key={grant.id} />;
            })}
      </Box>
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
