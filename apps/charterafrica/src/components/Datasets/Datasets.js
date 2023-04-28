import { Section } from "@commons-ui/core";
import { Box } from "@mui/material";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";

import DatasetCard from "./DatasetCard";
import DatasetFilterBar from "./DatasetFilterBar";
import DocumentCard from "./DocumentCard";
import useDatasets from "./useDatasets";

import NextPrevPagination from "@/charterafrica/components/NextPrevPagination";
import queryString from "@/charterafrica/utils/datasets/queryString";

const Datasets = React.forwardRef(function Datasets(props, ref) {
  const {
    sx,
    data: originalDatasets,
    tags = [],
    countries = [],
    count: originalCount,
    documents: originalDocuments,
  } = props;
  const pageSize = 10;
  const [page, setPage] = useState(1);
  const [q, setQ] = useState("");
  const [sort, setSort] = useState("");
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [totalPages, setTotalPages] = useState(
    Math.ceil(originalCount / pageSize)
  );
  const [datasets, setDatasets] = useState(originalDatasets || []);
  const [documents, setDocuments] = useState(originalDocuments || []);
  const [resource, setShowResources] = useState("datasets");
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

  const handleResourceVisibility = (value) => {
    setShowResources(value);
  };

  const query = queryString({
    page,
    q,
    sort,
    countries: selectedCountries,
    tags: selectedTags,
    resource,
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

  const res = useDatasets({
    q,
    sort,
    page,
    pageSize,
    countries: selectedCountries,
    tags: selectedTags,
    resource,
  });
  useEffect(() => {
    if (!res?.isLoading) {
      const { data } = res;
      const {
        datasets: filteredDatasets,
        documents: filteredDocuments,
        count,
      } = data;
      setDatasets(filteredDatasets);
      setTotalPages(Math.ceil(count / pageSize));
      setDocuments(filteredDocuments);
    }
  }, [res]);

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
          onChangeResourceVisibility={handleResourceVisibility}
          resource={resource}
        />
        {resource === "documents"
          ? documents?.map((dataset) => (
              <DocumentCard {...dataset} key={dataset.name} />
            ))
          : datasets?.map((dataset) => (
              <DatasetCard {...dataset} key={dataset.name} />
            ))}
        <NextPrevPagination
          count={totalPages}
          onChange={handleChangePage}
          page={page}
          sx={{
            mt: 2.5,
            bgcolor: "common.white",
          }}
        />
      </Section>
    </Box>
  );
});

export default Datasets;
