import { Section } from "@commons-ui/core";
import { Box } from "@mui/material";
import React, { useState } from "react";

import DatasetCard from "./DatasetCard";
import DatasetFilterBar from "./DatasetFilterBar";

import NextPrevPagination from "@/charterafrica/components/NextPrevPagination";

const Datasets = React.forwardRef(function Datasets(props, ref) {
  const { sx, data, tags, countries, count } = props;
  const [page, setPage] = useState(1);

  const handleChangePage = (_, value) => {
    setPage(value);
  };

  return (
    <Box bgcolor="common.white" sx={sx} ref={ref}>
      <Section sx={{ px: { xs: 2.5, sm: 0 }, py: { xs: 5, md: "50px" } }}>
        <DatasetFilterBar tags={tags} countries={countries} />
        {data.map((dataset) => (
          <DatasetCard {...dataset} key={dataset.name} />
        ))}
        <NextPrevPagination
          count={count}
          onChange={handleChangePage}
          page={page}
          sx={{
            bgcolor: "common.white",
          }}
        />
      </Section>
    </Box>
  );
});

export default Datasets;
