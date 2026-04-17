import { Section } from "@commons-ui/core";
import { LexicalRichText } from "@commons-ui/payload";
import { Grid2 as Grid, Box, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { forwardRef, useState, useEffect, useRef } from "react";

import useOpportunities from "./useOpportunities";

import Filters from "@/trustlab/components/Filters";
import OpportunityCard from "@/trustlab/components/OpportunityCard";
import Pagination from "@/trustlab/components/Pagination";

const OpportunitiesList = forwardRef(function OpportunitiesList(props, ref) {
  const {
    items: initialItems = [],
    cardActionLabel,
    hasPagination,
    hasFilters,
    hasSearch,
    hasSortBy,
    pagination: p = { page: 1, count: 1 },
    itemsType,
    itemsPerPage,
    apiEndpoint,
    testId = "opportunities-list",
    filters,
    filterByLabel,
    applyFiltersLabel,
    clearFiltersLabel,
    searchPlaceholderLabel,
    sortByLabel,
    sortOptions,
    defaultSort,
    title,
    description,
    ...other
  } = props;

  const router = useRouter();
  const { query } = router;
  const { page: initialPage, ...queryParams } = query;

  const [page, setPage] = useState(() => {
    if (initialPage) {
      const parsed = parseInt(initialPage, 10);
      if (!Number.isNaN(parsed)) {
        return parsed;
      }
    }
    return p?.page ?? 1;
  });

  const [params, setParams] = useState(() => ({
    type: itemsType,
    limit: itemsPerPage,
    ...(defaultSort ? { sort: defaultSort } : {}),
    // Parse query params to restore filter state (may override defaultSort)
    ...Object.entries(queryParams).reduce((acc, [key, value]) => {
      if (typeof value === "string" && value.includes(",")) {
        acc[key] = value.split(",");
      } else if (value) {
        acc[key] = value;
      }
      return acc;
    }, {}),
  }));

  const listRef = useRef(null);

  // Sync page and params with URL query changes — wait until router is ready
  // so that query is populated on hard page loads with search params.
  useEffect(() => {
    if (!router.isReady) {
      return;
    }
    const { page: queryPage, ...currentQueryParams } = query;

    // Sync page from URL
    if (queryPage) {
      const parsed = parseInt(queryPage, 10);
      if (!Number.isNaN(parsed) && parsed !== page) {
        setPage(parsed);
      }
    }

    // Sync params from URL
    const newParams = {
      type: itemsType,
      limit: itemsPerPage,
      ...(defaultSort ? { sort: defaultSort } : {}),
      ...Object.entries(currentQueryParams).reduce((acc, [key, value]) => {
        if (typeof value === "string" && value.includes(",")) {
          acc[key] = value.split(",");
        } else if (value) {
          acc[key] = value;
        }
        return acc;
      }, {}),
    };
    setParams(newParams);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);

  const { items = [], pagination = p } = useOpportunities(
    page,
    params,
    initialItems,
    p?.count,
    !hasFilters && !hasPagination && !hasSearch && !hasSortBy,
    apiEndpoint,
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
    setParams((prev) => ({
      type: itemsType,
      limit: itemsPerPage,
      ...filterParams,
      ...(prev.sort ? { sort: prev.sort } : {}),
      ...(prev.search ? { search: prev.search } : {}),
    }));
    setPage(1);

    const searchParams = new URLSearchParams(window.location.search);
    // clear existing filter params before setting new ones
    ["year", "month", "location", "opportunity"].forEach((k) =>
      searchParams.delete(k),
    );
    Object.entries(filterParams).forEach(([key, value]) => {
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

  const handleClearAll = () => {
    setParams({
      type: itemsType,
      limit: itemsPerPage,
      ...(defaultSort ? { sort: defaultSort } : {}),
    });
    setPage(1);
    router.push(window.location.pathname, undefined, {
      shallow: true,
      scroll: false,
    });
  };

  function handleSortChange(sortValue) {
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
  }

  function handleSearch(searchTerm) {
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
  }

  return (
    <Box ref={listRef} data-testid={testId}>
      <Box sx={{ background: "#fff" }}>
        {title || description ? (
          <Section
            sx={{
              backgroundColor: "common.white",
              py: 5,
              px: { xs: 2.5, md: 0 },
            }}
          >
            <Typography variant="h2">{title}</Typography>
            {description && (
              <LexicalRichText
                elements={description}
                sx={{
                  h1: { mb: 1, fontWeight: 700, variant: "h1" },
                  h2: { mb: 1, fontWeight: 700, variant: "h2" },
                  h3: { mb: 1, fontWeight: 700, variant: "h3" },
                }}
                TypographyProps={{
                  gutterBottom: true,
                  variant: "p2",
                  component: "p",
                  sx: {
                    mb: 2,
                  },
                }}
              />
            )}
          </Section>
        ) : null}
      </Box>

      {hasFilters || hasSearch || hasSortBy ? (
        <Section sx={{ py: 2.5, px: { xs: 2.5, sm: 0 } }}>
          <Filters
            filterByLabel={filterByLabel}
            filters={filters}
            applyFiltersLabel={applyFiltersLabel}
            clearFiltersLabel={clearFiltersLabel}
            onApply={handleApplyFilters}
            onClearAll={handleClearAll}
            onSearch={hasSearch ? handleSearch : undefined}
            searchPlaceholderLabel={
              hasSearch ? searchPlaceholderLabel : undefined
            }
            onSortChange={hasSortBy ? handleSortChange : undefined}
            sortByLabel={hasSortBy ? sortByLabel : undefined}
            sortOptions={hasSortBy ? sortOptions : undefined}
          />
        </Section>
      ) : null}
      <Box sx={{ background: "#fff" }}>
        {items.length ? (
          <Box sx={{ background: "#fff" }}>
            <Section sx={{ py: 5, px: { xs: 2.5, sm: 0 } }}>
              <Grid
                container
                spacing={3}
                rowSpacing={3.75}
                ref={ref}
                {...other}
              >
                {items.map((item, index) => (
                  <Grid key={item.id ?? index} size={{ xs: 12, sm: 6, md: 4 }}>
                    <OpportunityCard
                      image={item.image}
                      title={item.title}
                      description={item.description}
                      link={item.link}
                      caption={item.caption}
                      location={item.location}
                      date={item.date}
                      viewMoreLabel={cardActionLabel}
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
    </Box>
  );
});

export default OpportunitiesList;
