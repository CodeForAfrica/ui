import { Box } from "@mui/material";
import React from "react";

import EcosystemList from "@/charterafrica/components/EcosystemList";
import ToolCard from "@/charterafrica/components/ToolCard";

const Tools = React.forwardRef(function Tools(props, ref) {
  return (
    <Box sx={{ backgroundColor: "common.white" }}>
      <EcosystemList ref={ref} Component={ToolCard} {...props} />
    </Box>
  );
});

export default Tools;
