import { RichTypography, Section } from "@commons-ui/core";
import { Box, LinearProgress } from "@mui/material";
import React, { useState, useEffect, useRef } from "react";

import DocumentFilterBar from "./DocumentFilterBar";
import useDocuments from "./useDocuments";

import { neutral } from "@/charterafrica/colors";
import DocumentCard from "@/charterafrica/components/DocumentCard";
import NextPrevPagination from "@/charterafrica/components/NextPrevPagination";
import RichText from "@/charterafrica/components/RichText";

const Documents = React.forwardRef(function Documents(props, ref) {
  const {
    description,
    documents: originalDocuments,
    documentOptions,
    q,
    sx,
    title,
    datasets,
    showDatasets,
    filterBar: documentsFilterBar,
    labels,
    pathname,
    showFilterBar,
  } = props;
  const [documents, setDocuments] = useState(originalDocuments);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const [filtering, setFiltering] = useState(false);
  const [sort, setSort] = useState();
  const [search, setSearch] = useState();
  const documentsRef = useRef();

  const handleChangePage = (_, value) => {
    setFiltering(true);
    setPage(value);
  };

  const handleChangeQ = (_, value) => {
    setFiltering(true);
    setSearch(value);
    setPage(1);
  };

  const handleChangeSort = (_, value) => {
    setFiltering(true);
    setSort(value);
    setPage(1);
  };

  if (filtering && documentsRef.current) {
    documentsRef.current.scrollIntoView({ behavior: "smooth" });
  }
  const res = useDocuments(
    q,
    {
      page,
      per_page: 8,
      contributor: true,
      sort,
      search,
      ...documentOptions,
    },
    pathname
  );
  useEffect(() => {
    if (!res?.isLoading) {
      const { data } = res;
      const {
        documents: foundDocuments,
        total,
        per_page: pageSize,
        page: currentPage,
      } = data || {};
      setDocuments(foundDocuments);
      setPage(currentPage);
      setTotalPages(Math.ceil(total / pageSize));
    }
  }, [res]);

  return (
    <Box
      bgcolor="common.white"
      sx={{
        ...sx,
      }}
      ref={ref}
    >
      <Section
        sx={{
          borderTop: `1px solid ${neutral[200]}`,
          px: { xs: 2.5, sm: 0 },
          py: { xs: 5, md: 0 },
          pb: { md: 5 },
        }}
      >
        <RichTypography color="neutral.dark" variant="h2">
          {title}
        </RichTypography>
        <RichText
          color="neutral.dark"
          elements={description}
          variant="p3"
          sx={{ mt: 2.5 }}
        />
        <Box
          sx={{
            // Main navbar height + first card margin top
            scrollMarginTop: { xs: 56 + 40, sm: 64 + 40, md: 114 + 40 },
          }}
          ref={documentsRef}
        >
          {showFilterBar ? (
            <DocumentFilterBar
              datasets={datasets}
              labels={labels}
              onChangeQ={handleChangeQ}
              onChangeSort={handleChangeSort}
              options={documentsFilterBar}
              showDatasets={showDatasets}
            />
          ) : null}
          {res.isLoading ? <LinearProgress color="secondary" /> : null}
          {documents?.map((document) => (
            <DocumentCard
              {...document}
              key={document.href}
              sx={{
                "&:first-of-type": {
                  mt: 5,
                },
                "&:last-of-type": {
                  mb: 0,
                },
              }}
            />
          ))}
          <NextPrevPagination
            count={totalPages}
            onChange={handleChangePage}
            page={page}
            sx={{
              bgcolor: "common.white",
            }}
          />
        </Box>
      </Section>
    </Box>
  );
});

export default Documents;
