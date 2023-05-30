import { Section, RichTypography } from "@commons-ui/core";
import { Box, Grid, LinearProgress } from "@mui/material";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import React, { useEffect, useRef, useState, useImperativeHandle } from "react";

import EcosystemFilter from "./EcosystemFilter";
import useEcosystemList from "./useEcosystemList";

import NextPrevPagination from "@/charterafrica/components/NextPrevPagination";

function removeEmptyParams(urlSearchParams) {
  [...urlSearchParams].forEach(([param, value]) => {
    if (!value || value === "undefined") {
      urlSearchParams.delete(param);
    }
  });
  return urlSearchParams;
}

const EcosystemList = React.forwardRef(function EcosystemList(props, ref) {
  const {
    sx,
    results: originalResults,
    searchPlaceholder,
    pagination,
    sortOrder,
    Component,
    title,
    filterOptions,
  } = props;
  const router = useRouter();
  const [values, setValues] = useState({
    sort: router.query?.sort || "name",
    page: router.query?.page,
    search: router?.query?.search,
  });

  const [search, setSearch] = useState(router?.query?.search || "");
  const [data, setData] = useState({ results: originalResults, pagination });
  const listRef = useRef();
  useImperativeHandle(ref, () => listRef.current);

  const updateParams = (vals) => {
    const params = new URLSearchParams(vals);
    removeEmptyParams(params);
    const searchParams = params.toString();
    const [pathname] = router.asPath.split("?");
    router.replace(`${pathname}?${searchParams}`);
  };

  const onFilterChange = ({ search: s, ...value }) => {
    setSearch(s || "");
    const newValues = s
      ? { ...values, ...value }
      : { ...values, ...value, search: s };
    setValues(newValues);
    updateParams(newValues);
  };
  const collection =
    router.query?.slugs[(router.query?.slugs?.length || 1) - 1];
  const res = useEcosystemList({
    collection,
    ...values,
    search: (search && values.search) || "",
  });

  const { data: d, loading } = res;
  useEffect(() => {
    if (d) {
      setData(d);
    }
  }, [d]);

  const onQuerySearch = () => {
    const vals = { ...values, search, page: 1 };
    setValues(vals);
    updateParams(vals);
  };

  const onPageChange = (p) => {
    onFilterChange({ page: p });
    updateParams({ ...values, page: p, search });
  };

  const {
    results,
    pagination: { totalPages, page },
  } = data;

  if (loading && listRef.current) {
    listRef.current.scrollIntoView({ behavior: "smooth" });
  }
  if (!results.length && !values.search) {
    return null;
  }
  return (
    <Box ref={ref} sx={{ backgroundColor: "common.white" }}>
      <Section
        sx={{
          ...sx,
        }}
      >
        <Box
          sx={{
            p: 3.75,
            scrollMarginTop: { xs: "56px", sm: "64", md: "114px" },
          }}
          ref={listRef}
        >
          <EcosystemFilter
            onChange={onFilterChange}
            searchPlaceholder={searchPlaceholder}
            values={{ ...values, search }}
            sortOrder={sortOrder}
            filterOptions={filterOptions}
            onQuerySearch={onQuerySearch}
          />
          <RichTypography
            textAlign={{ xs: "center", sm: "left" }}
            color="neutral.dark"
            variant="h2SemiBold"
            sx={{ mt: 6.25 }}
          >
            {title}
          </RichTypography>
          {loading ? <LinearProgress color="secondary" /> : null}
          <Grid sx={{ py: 6.25 }} container columnSpacing={2.5} rowSpacing={5}>
            {results.map((item) => (
              <Grid key={item.id} item xs={12} sm={6} md={4} lg={3}>
                <Component key={item.id} {...item} />
              </Grid>
            ))}
          </Grid>
          <NextPrevPagination
            count={totalPages}
            onChange={(_, p) => onPageChange(p)}
            page={page}
            sx={{
              backgroundColor: "common.white",
              mt: 5,
              pb: 8,
            }}
          />
        </Box>
      </Section>
    </Box>
  );
});

EcosystemList.propTypes = {
  sx: PropTypes.shape({}),
  results: PropTypes.arrayOf(PropTypes.shape({})),
  searchPlaceholder: PropTypes.string,
  pagination: PropTypes.shape({
    page: PropTypes.number,
    totalPages: PropTypes.number,
  }),
  sortOrder: PropTypes.arrayOf(PropTypes.shape({})),
  Component: PropTypes.elementType,
  title: PropTypes.string,
};

EcosystemList.defaultProps = {
  Component: undefined,
  pagination: undefined,
  results: undefined,
  searchPlaceholder: undefined,
  sortOrder: undefined,
  sx: undefined,
  title: undefined,
};
export default EcosystemList;
