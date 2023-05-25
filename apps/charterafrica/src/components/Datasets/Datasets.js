import { Section } from "@commons-ui/core";
import { Box, LinearProgress, Stack } from "@mui/material";
import { useRouter } from "next/router";
import React, { useState, useEffect, useRef, useImperativeHandle } from "react";

import DatasetFilterBar from "./DatasetFilterBar";
import useDatasets from "./useDatasets";

import { neutral } from "@/charterafrica/colors";
import DatasetCard from "@/charterafrica/components/DatasetCard";
import NextPrevPagination from "@/charterafrica/components/NextPrevPagination";
import queryString from "@/charterafrica/utils/datasets/queryString";

const Datasets = React.forwardRef(function Datasets(
  {
    sx,
    data: datasetsProp,
    labels,
    commonLabels,
    tags = [],
    countries = [],
    totalPages: originalTotalPages,
    sortOptions = [],
    pageUrl,
  },
  ref
) {
  const [datasets, setDatasets] = useState(datasetsProp || []);
  const [filtering, setFiltering] = useState(false);
  const [page, setPage] = useState(1);
  const [q, setQ] = useState("");
  const [sort, setSort] = useState();
  const [selectedCountries, setSelectedCountries] = useState();
  const [selectedTags, setSelectedTags] = useState([]);
  const [totalPages, setTotalPages] = useState(originalTotalPages);
  const router = useRouter();
  const datasetsRef = useRef();
  useImperativeHandle(ref, () => datasetsRef.current);
  const { asPath, locale } = router;

  const handleChangePage = (_, value) => {
    setPage(value);
    setFiltering(true);
  };
  const handleChangeQ = (_, value) => {
    setQ(value);
    setFiltering(true);
    setPage(1);
  };
  const handleChangeSort = (_, value) => {
    setSort(value);
    setFiltering(true);
    setPage(1);
  };
  const handleChangeCountries = (_, value) => {
    setSelectedCountries(value);
    setFiltering(true);
    setPage(1);
  };

  const handleChangeTags = (_, value) => {
    setSelectedTags(value);
    setFiltering(true);
    setPage(1);
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
    router.push({ pathname, query }, undefined, {
      scroll: false,
      shallow: true,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  if (filtering && datasetsRef.current) {
    datasetsRef.current.scrollIntoView({ behavior: "smooth" });
  }
  const { data, isLoading } = useDatasets({
    countries: selectedCountries,
    locale,
    page,
    q,
    sort,
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
    <Box
      bgcolor="common.white"
      sx={{
        scrollMarginTop: { xs: "56px", sm: "64", md: "114px" },
        ...sx,
      }}
      ref={datasetsRef}
    >
      <Section
        sx={{ px: { xs: 2.5, sm: 0 }, py: { xs: 5, md: 0 }, pb: { md: 5 } }}
      >
        <DatasetFilterBar
          countries={selectedCountries}
          countriesOptions={countries}
          labels={labels}
          sortOptions={sortOptions}
          onChangeQ={handleChangeQ}
          onChangeSort={handleChangeSort}
          onChangeCountries={handleChangeCountries}
          onChangeTags={handleChangeTags}
          sort={sort}
          tags={selectedTags}
          tagsOptions={tags}
        />
        {isLoading ? <LinearProgress color="secondary" /> : null}
        <Stack>
          {datasets?.map((dataset) => (
            <DatasetCard
              {...dataset}
              key={dataset.id}
              labels={labels}
              commonLabels={commonLabels}
              pageUrl={pageUrl}
              sx={{
                borderBottom: "none",
                "&:last-of-type": {
                  borderBottom: "1px solid",
                  borderColor: neutral[50],
                },
              }}
            />
          ))}
        </Stack>
        <NextPrevPagination
          count={totalPages}
          page={page}
          onChange={handleChangePage}
          sx={{ mt: 2.5, bgcolor: "common.white" }}
        />
      </Section>
    </Box>
  );
});

export default Datasets;
