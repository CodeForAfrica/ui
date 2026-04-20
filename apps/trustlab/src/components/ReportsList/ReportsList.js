import { Section } from "@commons-ui/core";
import { Figure } from "@commons-ui/next";
import { LexicalRichText } from "@commons-ui/payload";
import { Grid2 as Grid, Box, Typography } from "@mui/material";
import { useRouter } from "next/router";
import {
  forwardRef,
  useImperativeHandle,
  useEffect,
  useRef,
  useState,
} from "react";

import useReports from "./useReports";

// eslint-disable-next-line import/no-unresolved
import ErrorPageIcon from "@/trustlab/assets/error-page-icon.svg?url";
import Filters from "@/trustlab/components/Filters";
import Pagination from "@/trustlab/components/Pagination";
import ReportCard from "@/trustlab/components/ReportCard";

const ReportsList = forwardRef(function ReportsList(props, ref) {
  const {
    reports: initialReports = [],
    condensed,
    cardActionLabel,
    hasPagination,
    hasFilters,
    hasSearch,
    hasSortBy,
    pagination: p = { page: 1, count: 1 },
    reportsType,
    reportsPerPage,
    notFoundTitleLabel,
    notFoundSubtitleLabel,
    // filter bar props — destructured so they don't leak into <Grid>
    filterByLabel,
    filters,
    clearFiltersLabel,
    applyFiltersLabel,
    searchPlaceholderLabel,
    sortByLabel,
    sortOptions,
    defaultSort,
  } = props;

  const [page, setPage] = useState(p?.page);
  const [params, setParams] = useState({
    reportsType,
    limit: reportsPerPage,
    ...(defaultSort ? { sort: defaultSort } : {}),
  });
  const listRef = useRef(null);
  useImperativeHandle(ref, () => listRef.current);
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
    !hasFilters && !hasPagination && !hasSearch && !hasSortBy,
  );

  const handlePageChange = (value) => {
    setPage(value);
    const searchParams = new URLSearchParams(window.location.search);
    if (value === 1) {
      searchParams.delete("page");
    } else {
      searchParams.set("page", value);
    }
    const queryString = searchParams.toString();
    let urlPath = window.location.pathname;
    if (queryString) {
      urlPath = `${urlPath}?${queryString}`;
    }
    router.push(urlPath, undefined, { shallow: true, scroll: false });
    if (listRef.current) {
      listRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const handleApplyFilters = (filterParams) => {
    // filter keys are singular (year/month/report); API expects plural
    const keyMap = { year: "years", month: "months", report: "reports" };
    const mappedParams = Object.fromEntries(
      Object.entries(filterParams).map(([k, v]) => [keyMap[k] ?? k, v]),
    );

    setParams((prev) => ({
      reportsType,
      limit: reportsPerPage,
      ...mappedParams,
      // preserve sort and search across filter changes
      ...(prev.sort ? { sort: prev.sort } : {}),
      ...(prev.search ? { search: prev.search } : {}),
    }));
    setPage(1);

    const searchParams = new URLSearchParams(window.location.search);
    // clear existing filter params before setting new ones
    ["years", "months", "reports"].forEach((k) => searchParams.delete(k));
    Object.entries(mappedParams).forEach(([key, value]) => {
      if (Array.isArray(value) && value.length > 0) {
        searchParams.set(key, value.join(","));
      } else if (value && typeof value === "string") {
        searchParams.set(key, value);
      }
    });
    searchParams.delete("page");

    const queryString = searchParams.toString();
    let urlPath = window.location.pathname;
    if (queryString) {
      urlPath = `${urlPath}?${queryString}`;
    }
    router.push(urlPath, undefined, { shallow: true, scroll: false });
  };

  const handleSortChange = (sortValue) => {
    setParams((prev) => {
      const next = { ...prev };
      if (sortValue) {
        next.sort = sortValue;
      } else {
        delete next.sort;
      }
      return next;
    });
    setPage(1);

    const searchParams = new URLSearchParams(window.location.search);
    if (sortValue) {
      searchParams.set("sort", sortValue);
    } else {
      searchParams.delete("sort");
    }
    searchParams.delete("page");

    const queryString = searchParams.toString();
    let urlPath = window.location.pathname;
    if (queryString) {
      urlPath = `${urlPath}?${queryString}`;
    }
    router.push(urlPath, undefined, { shallow: true, scroll: false });
  };

  const handleClearAll = () => {
    setParams({
      reportsType,
      limit: reportsPerPage,
      ...(defaultSort ? { sort: defaultSort } : {}),
    });
    setPage(1);
    router.push(window.location.pathname, undefined, {
      shallow: true,
      scroll: false,
    });
  };

  const handleSearch = (searchTerm) => {
    setParams((prev) => {
      const next = { ...prev };
      if (searchTerm) {
        next.search = searchTerm;
      } else {
        delete next.search;
      }
      return next;
    });
    setPage(1);

    const searchParams = new URLSearchParams(window.location.search);
    if (searchTerm) {
      searchParams.set("search", searchTerm);
    } else {
      searchParams.delete("search");
    }
    searchParams.delete("page");

    const queryString = searchParams.toString();
    let urlPath = window.location.pathname;
    if (queryString) {
      urlPath = `${urlPath}?${queryString}`;
    }
    router.push(urlPath, undefined, { shallow: true, scroll: false });
  };

  // Initialize params from URL on mount (e.g. bookmarked filtered URL)
  useEffect(() => {
    if (!router.isReady) {
      return;
    }
    const { years, months, reports: reportsFilter, sort, search } = query;
    if (!years && !months && !reportsFilter && !sort && !search) {
      return;
    }

    const parseParam = (v) =>
      typeof v === "string" && v.includes(",") ? v.split(",") : v;

    const newParams = {
      reportsType,
      limit: reportsPerPage,
      ...(defaultSort ? { sort: defaultSort } : {}),
    };
    if (years) {
      newParams.years = parseParam(years);
    }
    if (months) {
      newParams.months = parseParam(months);
    }
    if (reportsFilter) {
      newParams.reports = parseParam(reportsFilter);
    }
    if (sort) {
      newParams.sort = sort;
    }
    if (search) {
      newParams.search = search;
    }

    setParams(newParams);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);

  const showFiltersBar = hasFilters || hasSearch || hasSortBy;

  return (
    <Box ref={listRef}>
      {showFiltersBar ? (
        <Section sx={{ py: 2.5, px: { xs: 2.5, sm: 0 } }}>
          <Filters
            filterByLabel={filterByLabel}
            filters={filters}
            clearFiltersLabel={clearFiltersLabel}
            applyFiltersLabel={applyFiltersLabel}
            onApply={handleApplyFilters}
            onClearAll={handleClearAll}
            onSortChange={hasSortBy ? handleSortChange : undefined}
            sortByLabel={hasSortBy ? sortByLabel : undefined}
            sortOptions={hasSortBy ? sortOptions : undefined}
            onSearch={hasSearch ? handleSearch : undefined}
            searchPlaceholderLabel={
              hasSearch ? searchPlaceholderLabel : undefined
            }
          />
        </Section>
      ) : null}
      <Box sx={{ background: "#fff" }}>
        {reports.length ? (
          <Box>
            <Section sx={{ py: 8, px: { xs: 2.5, sm: 0 } }}>
              <Grid container spacing={3} rowSpacing={3.75}>
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
        ) : (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
            sx={{
              maxWidth: 400,
              margin: "0 auto",
              pt: 5,
              pb: 10,
            }}
            gap={2.5}
          >
            <Figure
              ImageProps={{
                alt: "Error page background",
                src: ErrorPageIcon,
                sx: { objectFit: "cover", opacity: 0.3 },
              }}
              sx={{
                alignItems: "center",
                display: "flex",
                justifyContent: "center",
                height: 150,
                width: 220,
              }}
            />
            <Typography variant="display4">
              {notFoundTitleLabel || "No Reports Found"}
            </Typography>
            <LexicalRichText
              elements={notFoundSubtitleLabel}
              TypographyProps={{
                gutterBottom: true,
                variant: "p2",
                sx: {
                  textAlign: "center",
                  mb: 0,
                },
              }}
            />
          </Box>
        )}
      </Box>
    </Box>
  );
});

export default ReportsList;
