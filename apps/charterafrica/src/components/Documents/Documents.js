import { Section } from "@commons-ui/core";
import { Box } from "@mui/material";
import React, { useState, useEffect } from "react";

import DocumentCard from "./DocumentCard";
import useDocuments from "./useDocuments";

import NextPrevPagination from "@/charterafrica/components/NextPrevPagination";

const Documents = React.forwardRef(function Documents(props, ref) {
  const { group, locale, sx } = props;
  const [documents, setDocuments] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);

  const handleChangePage = (_, value) => {
    setPage(value);
  };

  const { data } = useDocuments(group, {
    page,
    per_page: 8,
    contributor: true,
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
          <DocumentCard {...document} locale={locale} key={document.id} />
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
