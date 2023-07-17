import { RichTypography, Section } from "@commons-ui/core";
import { Box, LinearProgress, Divider } from "@mui/material";
import React, { useState, useEffect, useRef } from "react";

import DocumentFilterBar from "./DocumentFilterBar";
import useDocuments from "./useDocuments";

import { neutral } from "@/charterafrica/colors";
import DocumentCard from "@/charterafrica/components/DocumentCard";
import NextPrevPagination from "@/charterafrica/components/NextPrevPagination";
import RichText from "@/charterafrica/components/RichText";

const Documents = React.forwardRef(function Documents(props, ref) {
  const {
    datasets,
    description,
    documents: documentsProp,
    documentOptions,
    filterBar: filterBarProp,
    labels,
    page: pageProp = 1,
    pathname,
    pinnedDocuments: originalPinnedDocuments,
    q,
    showDatasets,
    showFilterBar,
    sx,
    total: totalPagesProp = 0,
    title,
    showPinnedDocuments,
  } = props;

  const [documents, setDocuments] = useState(documentsProp);
  const [filtering, setFiltering] = useState(false);
  const [page, setPage] = useState(pageProp);
  const [pinnedDocuments, setPinnedDocuments] = useState(
    originalPinnedDocuments
  );
  const [search, setSearch] = useState();
  const [sort, setSort] = useState();
  const [totalPages, setTotalPages] = useState(totalPagesProp);
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
    pathname,
    showPinnedDocuments
  );
  useEffect(() => {
    if (!res?.isLoading) {
      const { data } = res;
      const {
        documents: foundDocuments,
        total,
        per_page: pageSize,
        page: currentPage,
        pinnedDocuments: newPinnedDocuments,
      } = data || {};
      setDocuments(foundDocuments);
      setPinnedDocuments(newPinnedDocuments);
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
              options={filterBarProp}
              showDatasets={showDatasets}
            />
          ) : null}
          {res.isLoading ? <LinearProgress color="secondary" /> : null}

          {pinnedDocuments?.map((document) => (
            <DocumentCard
              {...document}
              key={document.href}
              pinned
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
          <Divider sx={{ my: 2 }} />
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
