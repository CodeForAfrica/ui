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
    countries = [],
    datasets: datasetsProp,
    documents,
    filterBar: datasetsFilterBar,
    labels,
    organizationId,
    pageUrl,
    showDocuments,
    sx,
    tags = [],
    totalPages: originalTotalPages,
  },
  ref,
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
  const pathname = asPath.split("?")[0];

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
    router.push({ pathname, query }, undefined, {
      scroll: false,
      shallow: true,
    });
  }, [query]);

  if (filtering && datasetsRef.current) {
    datasetsRef.current.scrollIntoView({ behavior: "smooth" });
  }
  const { data, isLoading } = useDatasets(
    {
      countries: selectedCountries,
      organizationId,
      locale,
      page,
      q,
      sort,
      tags: selectedTags,
    },
    pathname,
  );
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
          countriesList={countries}
          documents={documents}
          labels={labels}
          options={datasetsFilterBar}
          onChangeCountries={handleChangeCountries}
          onChangeQ={handleChangeQ}
          onChangeSort={handleChangeSort}
          onChangeTags={handleChangeTags}
          selectedCountries={selectedCountries}
          selectedTags={selectedTags}
          showDocuments={showDocuments}
          tagsList={tags}
        />

        {isLoading ? <LinearProgress color="secondary" /> : null}
        <Stack>
          {datasets?.map((dataset) => (
            <DatasetCard
              {...dataset}
              key={dataset.id}
              labels={labels}
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
          onChange={handleChangePage}
          page={page}
          sx={{ mt: 2.5, bgcolor: "common.white" }}
        />
      </Section>
    </Box>
  );
});

export default Datasets;
