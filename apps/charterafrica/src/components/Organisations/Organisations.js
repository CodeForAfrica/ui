import { Box } from "@mui/material";
import React from "react";

import EcosystemList from "@/charterafrica/components/EcosystemList";
import OrganisationCard from "@/charterafrica/components/OrganisationCard";

const Tools = React.forwardRef(function Tools(props, ref) {
  return (
    <Box sx={{ backgroundColor: "common.white" }}>
      <EcosystemList ref={ref} Component={OrganisationCard} {...props} />
    </Box>
  );
});

export default Tools;
