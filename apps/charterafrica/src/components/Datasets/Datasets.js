import { Section } from "@commons-ui/core";
import { Box } from "@mui/material";
import React from "react";

import DatasetCard from "./DatasetCard";

const Datasets = React.forwardRef(function Datasets(props, ref) {
  const { sx, data } = props;
  return (
    <Box bgcolor="common.white" sx={sx} ref={ref}>
      <Section sx={{ px: { xs: 2.5, sm: 0 }, py: { xs: 5, md: "50px" } }}>
        {data.map((dataset) => (
          <DatasetCard {...dataset} />
        ))}
      </Section>
    </Box>
  );
});

export default Datasets;
