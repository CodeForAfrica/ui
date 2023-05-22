import { Box } from "@mui/material";
import React from "react";

import ContributorCard from "@/charterafrica/components/ContributorCard";
import EcosystemList from "@/charterafrica/components/EcosystemList";

const People = React.forwardRef(function Tools(props, ref) {
  return (
    <Box sx={{ backgroundColor: "common.white" }}>
      <EcosystemList ref={ref} Component={ContributorCard} {...props} />
    </Box>
  );
});

export default People;
