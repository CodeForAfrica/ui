import { Section } from "@commons-ui/core";
import { Grid2 as Grid, Box, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { forwardRef, useState, useEffect, useRef } from "react";

import usePlaybooks from "./usePlaybooks";

import Pagination from "@/trustlab/components/Pagination";
import ReportFilters from "@/trustlab/components/ReportFilters";
import RowCard from "@/trustlab/components/RowCard";

const PlaybooksList = forwardRef(function PlaybooksList(props, ref) {
  const {
    playbooks: initialPlaybooks = [],
    hasPagination,
    hasFilters,
    pagination: p = { page: 1, count: 1 },
    title,
    filters,
    filterByLabel,
    applyFiltersLabel,
    clearFiltersLabel,
    cardActionLabel,
    ...other
  } = props;

  const [page, setPage] = useState(p?.page);
  const [params, setParams] = useState({});
  const listRef = useRef(null);
  const router = useRouter();
  const { query } = router;
  const { page: initialPage } = query;

  useEffect(() => {
    if (initialPage) {
      const parsed = parseInt(initialPage, 10);
      if (parsed !== page) {
        setPage(parsed);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialPage]);

  const { playbooks = [], pagination = p } = usePlaybooks(
    page,
    params,
    initialPlaybooks,
    p?.count,
    !hasPagination,
  );

  const handlePageChange = (value) => {
    setPage(value);
    const urlParams = new URLSearchParams(router.query);
    if (value === 1) {
      urlParams.delete("page");
    } else {
      urlParams.set("page", value);
    }
    router.push(
      { pathname: router.pathname, query: urlParams.toString() },
      undefined,
      { shallow: true, scroll: false },
    );
    if (listRef.current) {
      listRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleApplyFilters = (filterParams) => {
    setParams((prev) => ({ ...prev, ...filterParams }));
    setPage(1);
    const urlParams = new URLSearchParams(router.query);
    Object.entries(filterParams).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        urlParams.set(key, value.join(","));
      } else {
        urlParams.set(key, value);
      }
    });
    urlParams.delete("page");
    router.push(
      { pathname: router.pathname, query: urlParams.toString() },
      undefined,
      { shallow: true, scroll: false },
    );
  };

  return (
    <Box sx={{ backgroundColor: "background.paper" }}>
      {hasFilters ? (
        <Section sx={{ py: 2.5, px: { xs: 2.5, md: 0 } }}>
          <ReportFilters
            filters={filters}
            filterByLabel={filterByLabel}
            hasFilters={hasFilters}
            applyFiltersLabel={applyFiltersLabel}
            clearFiltersLabel={clearFiltersLabel}
            onApply={handleApplyFilters}
          />
        </Section>
      ) : null}
      {playbooks.length ? (
        <Box sx={{ background: "#fff" }} ref={listRef}>
          <Section sx={{ py: 8, px: { xs: 2.5, md: 0 } }}>
            <Typography sx={{ mb: 2 }} variant="subheading2">
              {title}
            </Typography>
            <Grid container ref={ref} {...other}>
              {playbooks.map((pb) => (
                <Grid key={pb.id} size={{ xs: 12 }}>
                  <RowCard
                    sx={{
                      borderTop: "1px solid #000",
                      borderRadius: 0,
                    }}
                    actionLabel={cardActionLabel}
                    {...pb}
                  />
                </Grid>
              ))}
            </Grid>
            {hasPagination ? (
              <Box display="flex" justifyContent="flex-end" mt={4}>
                <Pagination
                  page={pagination?.page ?? 1}
                  count={pagination?.count ?? 1}
                  onChange={handlePageChange}
                />
              </Box>
            ) : null}
          </Section>
        </Box>
      ) : null}
    </Box>
  );
});

export default PlaybooksList;
