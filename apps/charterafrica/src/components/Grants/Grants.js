import { Typography } from "@mui/material";
import React from "react";

import GrantsList from "../GrantList";

import { neutral } from "@/charterafrica/colors";

const Grants = React.forwardRef(function Grants(props, ref) {
  const { grants } = props;

  const openGrants = grants.filter((grant) => grant.status === "open");
  const closedGrants = grants.filter((grant) => grant.status === "closed");
  const upcomingGrants = grants.filter((grant) => grant.status === "upcoming");

  return (
    <div ref={ref}>
      <Typography
        variant="h3Small"
        color={neutral[900]}
        sx={{
          paddingBottom: "40px",
          paddingTop: "40px",
        }}
      >
        Grants
      </Typography>

      <GrantsList title="Open Grants" grants={openGrants} />
      <hr
        style={{
          width: "100%",
          height: "0px",
          color: neutral[200],
          border: "1px solid",
          borderColor: neutral[200],
        }}
      />
      <GrantsList title="Closed Grants" grants={closedGrants} />
      <hr
        style={{
          width: "100%",
          height: "0px",
          color: neutral[200],
          border: "1px solid",
          borderColor: neutral[200],
        }}
      />
      <GrantsList title="Upcoming Grants" grants={upcomingGrants} />
      <hr
        style={{
          width: "100%",
          height: "0px",
          color: neutral[200],
          border: "1px solid",
          borderColor: neutral[200],
        }}
      />
    </div>
  );
});

export default Grants;
