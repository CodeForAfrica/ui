import { Section } from "@commons-ui/core";
import { Box } from "@mui/material";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";

import DatasetCard from "./DatasetCard";
import DatasetFilterBar from "./DatasetFilterBar";

import NextPrevPagination from "@/charterafrica/components/NextPrevPagination";
// import useDatasets from "./useDatasets";
import queryString from "@/charterafrica/utils/datasets/queryString";

const Datasets = React.forwardRef(function Datasets(props, ref) {
  const { sx, data = [], tags = [], countries = [], count = 0 } = props;
  const [page, setPage] = useState(1);
  const [q, setQ] = useState("");
  const [sort, setSort] = useState("");
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);

  const router = useRouter();
  const { asPath } = router;

  const handleChangePage = (_, value) => {
    setPage(value);
  };

  const handleChangeQ = (_, value) => {
    setQ(value);
  };

  const handleChangeSort = (_, value) => {
    setSort(value);
  };

  const handleChangeCountries = (_, value) => {
    setSelectedCountries(value);
  };

  const handleChangeTags = (_, value) => {
    setSelectedTags(value);
  };

  const query = queryString({
    page,
    q,
    sort,
    countries: selectedCountries,
    tags: selectedTags,
  });
  useEffect(() => {
    const pathname = asPath.split("?")[0];
    router.push(
      {
        pathname,
        query,
      },
      undefined,
      { scroll: false, shallow: true }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return (
    <Box bgcolor="common.white" sx={sx} ref={ref}>
      <Section sx={{ px: { xs: 2.5, sm: 0 }, py: { xs: 5, md: "50px" } }}>
        <DatasetFilterBar
          tags={tags}
          countries={countries}
          onQChange={handleChangeQ}
          onSortChange={handleChangeSort}
          onChangeCountries={handleChangeCountries}
          onChangeTags={handleChangeTags}
        />
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
