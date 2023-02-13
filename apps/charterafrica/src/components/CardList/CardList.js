import Link from "@/commons-ui/next/Link";
import { Typography, Box } from "@mui/material";
import React from "react";

import OpportunityCard from "../OpportunityCard";

import { neutral } from "@/charterafrica/colors";

const CardList = React.forwardRef(function CardList(props, ref) {
  const { title, grants } = props;

  return (
    <Box ref={ref}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "40px",
        }}
      >
        <Typography variant="h5SemiBold" color={neutral[900]}>
          {title}
        </Typography>
        <Link
          href="/grants"
          underline="always"
          color={neutral[900]}
          sx={{
            variant: "p3SemiBold",
          }}
        >
          View All
        </Link>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "nowrap",
          justifyContent: "space-between",
        }}
      >
        {grants.slice(0, 4).map((grant) => {
          return (
            <div>
              <OpportunityCard opportunity={grant} key={grant.id} />
            </div>
          );
        })}
      </Box>
    </Box>
  );
});

export default CardList;
