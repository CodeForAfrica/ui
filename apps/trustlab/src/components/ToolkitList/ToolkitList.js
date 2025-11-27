import { Section } from "@commons-ui/core";
import { Grid2 as Grid, Box } from "@mui/material";
import { useRouter } from "next/router";
import { forwardRef, useState, useEffect, useRef } from "react";

import CategoryCard from "../CategoryCard/CategoryCard";
import ReportFilters from "../ReportFilters/ReportFilters";

import useToolkits from "./useToolkits";

import Pagination from "@/trustlab/components/Pagination";

const ToolkitList = forwardRef(function ToolkitList(props, ref) {
  const {
    toolkits: initialToolkits = [],
    hasPagination,
    hasFilters,
    pagination: p = { page: 1, count: 1 },
    // filter props passthrough
    filters,
    filterByLabel,
    applyFiltersLabel,
    clearFiltersLabel,
    toolkitsPerPage,
    ...other
  } = props;

  const [page, setPage] = useState(p?.page);
  const [params, setParams] = useState({
    limit: toolkitsPerPage || 12,
  });
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

  const { toolkits = [], pagination = p } = useToolkits(
    page,
    params,
    initialToolkits,
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
    <Box ref={ref}>
      {hasFilters && (
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
      )}
      {toolkits.length > 0 && (
        <Box sx={{ background: "#fff" }} ref={listRef}>
          <Section sx={{ py: 8, px: { xs: 2.5, md: 0 } }}>
            <Grid container spacing={3} {...other}>
              {toolkits.map((tk) => (
                <Grid key={tk.id} size={{ xs: 12, sm: 4 }}>
                  <CategoryCard {...tk} />
                </Grid>
              ))}
            </Grid>
            {hasPagination && (
              <Box display="flex" justifyContent="flex-end" mt={4}>
                <Pagination
                  page={pagination?.page ?? 1}
                  count={pagination?.count ?? 1}
                  onChange={handlePageChange}
                />
              </Box>
            )}
          </Section>
        </Box>
      )}
    </Box>
  );
});

export default ToolkitList;
