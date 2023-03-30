import { Section } from "@commons-ui/core";
import { Box } from "@mui/material";
import React, { useState, useEffect } from "react";

import DocumentCard from "./DocumentCard";
import useDocuments from "./useDocuments";

import NextPrevPagination from "@/charterafrica/components/NextPrevPagination";

const Documents = React.forwardRef(function Documents(props, ref) {
  const {
    documents: originalDocuments,
    locale,
    options,
    page: originalPage,
    per_page: pagination,
    sx,
    total: totalItems,
    q,
  } = props;
  const [documents, setDocuments] = useState(originalDocuments);
  const [totalPages, setTotalPages] = useState(
    Math.ceil(totalItems / pagination)
  );
  const [page, setPage] = useState(originalPage);

  const handleChangePage = (_, value) => {
    setPage(value);
  };

  const { data } = useDocuments(q, {
    page,
    per_page: 8,
    contributor: true,
    ...options,
  });

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

  if (!documents?.length) {
    return null;
  }
  return (
    <Box bgcolor="common.white" sx={sx} ref={ref}>
      <Section sx={{ px: { xs: 5, sm: 0 }, py: { xs: 5, md: 10 } }}>
        {documents.map((document) => (
          <DocumentCard {...document} locale={locale} key={document.title} />
        ))}
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

export default Documents;
