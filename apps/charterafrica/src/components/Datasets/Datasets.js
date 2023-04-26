import { Section } from "@commons-ui/core";
import { Box } from "@mui/material";
import React from "react";

import DatasetCard from "./DatasetCard";
import DatasetFilterBar from "./DatasetFilterBar";

const Datasets = React.forwardRef(function Datasets(props, ref) {
  const { sx, data, tags, countries } = props;
  return (
    <Box bgcolor="common.white" sx={sx} ref={ref}>
      <Section sx={{ px: { xs: 2.5, sm: 0 }, py: { xs: 5, md: "50px" } }}>
        <DatasetFilterBar tags={tags} countries={countries} />
        {data.map((dataset) => (
          <DatasetCard {...dataset} />
        ))}
      </Section>
    </Box>
  );
});

export default Datasets;
