import { Section } from "@commons-ui/core";
import { Box, LinearProgress } from "@mui/material";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";

import DatasetCard from "./DatasetCard";
import DatasetFilterBar from "./DatasetFilterBar";
import useDatasets from "./useDatasets";

import NextPrevPagination from "@/charterafrica/components/NextPrevPagination";
import queryString from "@/charterafrica/utils/datasets/queryString";

function Datasets({
  sx,
  data: originalDatasets,
  labels,
  tags = [],
  countries = [],
  totalPages: originalTotalPages,
  sortOptions = [],
}) {
  const [page, setPage] = useState(1);
  const [q, setQ] = useState("");
  const [sort, setSort] = useState("");
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [totalPages, setTotalPages] = useState(originalTotalPages);
  const [datasets, setDatasets] = useState(originalDatasets || []);
  const router = useRouter();
  const { asPath } = router;

  const handleChangePage = (_, value) => setPage(value);
  const handleChangeQ = (_, value) => setQ(value);
  const handleChangeSort = (_, value) => setSort(value);
  const handleChangeCountries = (_, value) => {
    setSelectedCountries(value);
  };

  const handleChangeTags = (_, value) => setSelectedTags(value);

  const query = queryString({
    page,
    q,
    sort,
    countries: selectedCountries,
    tags: selectedTags,
  });

  useEffect(() => {
    const pathname = asPath.split("?")[0];
    router.push({ pathname, query }, undefined, {
      scroll: false,
      shallow: true,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  const { data, isLoading } = useDatasets({
    q,
    sort,
    page,
    countries: selectedCountries,
    tags: selectedTags,
  });

  useEffect(() => {
    if (!isLoading) {
      const { datasets: filteredDatasets, totalPages: filteredTotalPages } =
        data || {};
      setDatasets(filteredDatasets);
      setTotalPages(filteredTotalPages);
    }
  }, [data, isLoading]);

  return (
    <Box bgcolor="common.white" sx={sx}>
      <Section
        sx={{ px: { xs: 2.5, sm: 0 }, py: { xs: 5, md: 0 }, pb: { md: 5 } }}
      >
        <DatasetFilterBar
          tags={tags}
          countries={countries}
          labels={labels}
          sortOptions={sortOptions}
          onQChange={handleChangeQ}
          onSortChange={handleChangeSort}
          onChangeCountries={handleChangeCountries}
          onChangeTags={handleChangeTags}
        />
        {isLoading ? <LinearProgress color="secondary" /> : null}
        {datasets?.map((dataset) => (
          <DatasetCard
            key={dataset.name}
            {...dataset}
            readMore={labels.readMore}
            readLess={labels.readLess}
          />
        ))}
        <NextPrevPagination
          count={totalPages}
          page={page}
          onChange={handleChangePage}
          sx={{ mt: 2.5, bgcolor: "common.white" }}
        />
      </Section>
    </Box>
  );
}

export default Datasets;
