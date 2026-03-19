import { Section } from "@commons-ui/core";
import { Grid2 as Grid, Box } from "@mui/material";
import { useRouter } from "next/router";
import { forwardRef, useState, useEffect, useRef } from "react";

import useOpportunities from "./useOpportunities";

import Filters from "@/trustlab/components/Filters";
import OpportunityCard from "@/trustlab/components/OpportunityCard";
import Pagination from "@/trustlab/components/Pagination";

const OpportunityList = forwardRef(function OpportunityList(props, ref) {
  const {
    items: initialItems = [],
    cardActionLabel,
    hasPagination,
    hasFilters,
    pagination: p = { page: 1, count: 1 },
    itemsType,
    itemsPerPage,
    apiEndpoint,
    testId = "opportunity-list",
    filters,
    filterByLabel,
    applyFiltersLabel,
    clearFiltersLabel,
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
    // Parse query params to restore filter state
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

  // Sync page and params with URL query changes
  useEffect(() => {
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
  }, []);

  const { items = [], pagination = p } = useOpportunities(
    page,
    params,
    initialItems,
    p?.count,
    !hasFilters && !hasPagination,
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

  function handleApplyFilters(filterParams) {
    setParams((prev) => ({ ...prev, ...filterParams }));
    setPage(1);
    const searchParams = new URLSearchParams(window.location.search);
    Object.entries(filterParams).forEach(([key, value]) => {
      if (Array.isArray(value) && value.length > 0) {
        searchParams.set(key, value.join(","));
      } else if (value) {
        searchParams.set(key, value);
      } else {
        searchParams.delete(key);
      }
    });
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
      {hasFilters ? (
        <Section sx={{ py: 2.5, px: { xs: 2.5, md: 0 } }}>
          <Filters
            {...other}
            onApply={(filterParams) => handleApplyFilters(filterParams)}
            filters={filters}
            filterByLabel={filterByLabel}
            hasFilters={hasFilters}
            applyFiltersLabel={applyFiltersLabel}
            clearFiltersLabel={clearFiltersLabel}
          />
        </Section>
      ) : null}
      <Box sx={{ background: "#fff" }}>
        {items.length ? (
          <Box sx={{ background: "#fff" }}>
            <Section sx={{ py: 8, px: { xs: 2.5, md: 0 } }}>
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

export default OpportunityList;
