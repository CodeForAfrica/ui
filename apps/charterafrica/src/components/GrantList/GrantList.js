import Link from "@/commons-ui/next/Link";
import { Typography } from "@mui/material";
import React from "react";

import OpportunityCard from "../OpportunityCard";

import { neutral } from "@/charterafrica/colors";

const GrantsList = React.forwardRef(function GrantsList(props) {
  const { title, grants } = props;

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h5SemiBold" color={neutral[900]}>
          {title}
        </Typography>
        <Link
          href="/grants"
          underline="always"
          sx={{
            color: neutral[900],
            variant: "p3SemiBold",
          }}
        >
          View All
        </Link>
      </div>
      <div
        style={{
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
      </div>
    </div>
  );
});

export default GrantsList;
