import { Section } from "@commons-ui/core";
import { Box } from "@mui/material";
import React, { useState, useEffect } from "react";

import DocumentCard from "./DocumentCard";
import useDocumentSearch from "./useDocumentSearch";

import NextPrevPagination from "@/charterafrica/components/NextPrevPagination";
import RichText from "@/charterafrica/components/RichText";

const DocumentList = React.forwardRef(function DocumentList(props, ref) {
  const { description, groups, sx } = props;
  const [documents, setDocuments] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);

  const { data } = useDocumentSearch(groups, {
    page,
    per_page: 8,
    contributor: true,
  });
  const handleChangePage = (_, value) => {
    console.log("value", value);
    setPage(value);
  };
  useEffect(() => {
    if (data) {
      const {
        documents: foundDocuments,
        total,
        per_page: pageSize,
        page: currentPage,
      } = data;
      setDocuments(foundDocuments);
      setTotalPages(Math.ceil(total / pageSize));
      setPage(currentPage);
    }
  }, [data, page]);

  if (!documents.length) {
    return null;
  }
  return (
    <Box bgcolor="common.white" sx={sx} ref={ref}>
      <Section sx={{ px: { xs: 5, sm: 0 }, py: { xs: 5, md: 10 } }}>
        <Box
          color="neutral.dark"
          sx={(theme) => ({
            "& h1": {
              ...theme.typography.h1Small,
              mb: 3.75,
              [theme.breakpoints.up("md")]: {
                ...theme.typography.h1,
              },
            },
            "& h2": {
              mb: 2.5,
              ...theme.typography.h2Small,
              [theme.breakpoints.up("md")]: {
                ...theme.typography.h2,
              },
            },
            "& p": {
              ...theme.typography.p1,
              mb: 2,
              [theme.breakpoints.up("md")]: {
                ...theme.typography.subheading,
              },
            },
            "& p:last-of-type": {
              mb: 0,
            },
          })}
        >
          <RichText color="neutral.dark" elements={description} />
        </Box>
        <Box>
          {documents.map((document) => (
            <DocumentCard {...document} key={document.id} />
          ))}
        </Box>
        <NextPrevPagination
          count={totalPages}
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

export default DocumentList;
