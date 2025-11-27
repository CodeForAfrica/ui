import { Section } from "@commons-ui/core";
import { Grid2 as Grid, Box } from "@mui/material";
import { useRouter } from "next/router";
import { forwardRef, useState, useEffect, useRef } from "react";

import useReports from "./useReports";

import Pagination from "@/trustlab/components/Pagination";
import ReportCard from "@/trustlab/components/ReportCard";
import ReportFilters from "@/trustlab/components/ReportFilters";

const ReportsList = forwardRef(function ReportsList(props, ref) {
  const {
    reports: initialReports = [],
    condensed,
    cardActionLabel,
    hasPagination,
    hasFilters,
    pagination: p = { page: 1, count: 1 },
    reportsType,
    ...other
  } = props;

  const [page, setPage] = useState(p?.page);
  const [params, setParams] = useState({
    reportsType,
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

  const { reports = [], pagination = p } = useReports(
    page,
    params,
    initialReports,
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
      {
        pathname: router.pathname,
        query: urlParams.toString(),
      },
      undefined,
      { shallow: true, scroll: false },
    );
    if (listRef.current) {
      listRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };
  function handleApplyFilters(filterParams) {
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
      {
        pathname: router.pathname,
        query: urlParams.toString(),
      },
      undefined,
      { shallow: true, scroll: false },
    );
  }

  return (
    <Box ref={listRef}>
      {hasFilters ? (
        <Section sx={{ py: 2.5, px: { xs: 2.5, md: 0 } }}>
          <ReportFilters
            {...other}
            onApply={(filterParams) => handleApplyFilters(filterParams)}
          />
        </Section>
      ) : null}
      {reports.length ? (
        <Box sx={{ background: "#fff" }}>
          <Section sx={{ py: 8, px: { xs: 2.5, md: 0 } }}>
            <Grid container spacing={3} ref={ref} {...other}>
              {reports.map((report, index) => (
                <Grid key={report.id ?? index} size={{ xs: 12, sm: 4 }}>
                  <ReportCard
                    condensed={condensed}
                    actionLabel={cardActionLabel}
                    {...report}
                    sx={
                      condensed && {
                        background: index % 2 === 0 ? "#E7E9FF" : "#F0F0F5",
                      }
                    }
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

export default ReportsList;
