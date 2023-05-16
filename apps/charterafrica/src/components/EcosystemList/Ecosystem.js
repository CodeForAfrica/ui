import { Section, RichTypography } from "@commons-ui/core";
import { Box, Grid, LinearProgress } from "@mui/material";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import React, { useEffect, useRef, useState, useImperativeHandle } from "react";

import DigitalDemocracyFilter from "./EcosystemFilter";
import useDigitalDemocracy from "./useEcosystemList";

import NextPrevPagination from "@/charterafrica/components/NextPrevPagination";

const Ecosystem = React.forwardRef(function Ecosystem(props, ref) {
  const {
    sx,
    results: originalResults,
    searchPlaceholder,
    pagination,
    sortOrder,
    Component,
    title,
  } = props;
  const router = useRouter();
  const [values, setValues] = useState({
    sort: "name",
    page: router.query?.page,
    search: router?.query?.search,
  });

  const [search, setSearch] = useState("");
  const [data, setData] = useState({ results: originalResults, pagination });
  const listRef = useRef();
  useImperativeHandle(ref, () => listRef.current);
  const updateParams = (vals) => {
    const searchParams = new URLSearchParams(vals).toString();
    const [pathname] = router.asPath.split("?");
    router.replace(`${pathname}?${searchParams}`);
  };

  const onFilterChange = ({ search: s, ...value }) => {
    setSearch(s || "");
    const newValues = s
      ? { ...values, ...value }
      : { ...values, ...value, search: s };
    setValues(newValues);
  };
  const collection =
    router.query?.slugs[(router.query?.slugs?.length || 1) - 1];
  const res = useDigitalDemocracy({
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
    <Box
      sx={{
        backgroundColor: "common.white",
        py: 2.5,
        scrollMarginTop: { xs: "56px", sm: "64", md: "114px" },
        ...sx,
      }}
      ref={listRef}
    >
      <Section>
        <DigitalDemocracyFilter
          onChange={onFilterChange}
          searchPlaceholder={searchPlaceholder}
          values={{ ...values, search }}
          sortOrder={sortOrder}
          onQuerySearch={onQuerySearch}
        />
      </Section>
      <Section sx={{ pb: 5 }}>
        <RichTypography
          textAlign={{ xs: "center", sm: "left" }}
          color="neutral.dark"
          variant="h2SemiBold"
        >
          {title}
        </RichTypography>
        {loading ? <LinearProgress color="secondary" /> : null}
        <Grid sx={{ mt: 5 }} container columnSpacing={2.5} rowSpacing={5}>
          {results.map((item) => (
            <Grid key={item.id} item xs={12} sm={4} md={3} lg={3}>
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
      </Section>
    </Box>
  );
});

Ecosystem.propTypes = {
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

Ecosystem.defaultProps = {
  Component: undefined,
  pagination: undefined,
  results: undefined,
  searchPlaceholder: undefined,
  sortOrder: undefined,
  sx: undefined,
  title: undefined,
};
export default Ecosystem;
