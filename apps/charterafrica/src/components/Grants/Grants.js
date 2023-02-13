import { Typography, Box, Divider, styled } from "@mui/material";
import React from "react";

import GrantsList from "../GrantList";

import { neutral } from "@/charterafrica/colors";

const StyledDivider = styled(Divider)(() => ({
  width: "100%",
  height: "0px",
  color: neutral[200],
  border: "1px solid",
  borderColor: neutral[200],
  marginTop: "40px",
  marginBottom: "40px",
}));

const Grants = React.forwardRef(function Grants(props, ref) {
  const { grants } = props;

  const openGrants = grants.filter((grant) => grant.status === "open");
  const closedGrants = grants.filter((grant) => grant.status === "closed");
  const upcomingGrants = grants.filter((grant) => grant.status === "upcoming");

  return (
    <Box ref={ref}>
      <Typography
        variant="h3Small"
        color={neutral[900]}
        sx={{
          paddingBottom: "40px",
        }}
      >
        Grants
      </Typography>

      <GrantsList title="Open Calls" grants={openGrants} />
      <StyledDivider />
      <GrantsList title="Closed Calls" grants={closedGrants} />
      <StyledDivider />

      <GrantsList title="Upcoming Calls" grants={upcomingGrants} />
      <StyledDivider />
    </Box>
  );
});

export default Grants;
